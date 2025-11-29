import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { mockOpportunities } from '../lib/mockData';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Search, Layers, Locate,
  ChevronLeft, ChevronRight, Calendar
} from 'lucide-react';
import { toast } from 'sonner';

// Fix for default marker icon in Leaflet with webpack/vite
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create colored markers for different categories
const createCategoryIcon = (color: string) => new Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const categoryIcons: Record<string, Icon> = {
  'Volunteering': createCategoryIcon('blue'),
  'Workshops': createCategoryIcon('green'),
  'Competitions': createCategoryIcon('violet'),
  'Internships': createCategoryIcon('orange'),
  'Jobs': createCategoryIcon('red'),
  'Events': createCategoryIcon('gold'),
  'Fun': createCategoryIcon('yellow'),
  'Technology': createCategoryIcon('grey'),
  'Education': createCategoryIcon('black'),
  'ETC': createCategoryIcon('green'),
};

// Component to handle map center updates
function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function MapView() {
  const [showPanel, setShowPanel] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([12.5657, 104.9910]); // Center of Cambodia

  const categoryColors: Record<string, string> = {
    'Volunteering': 'bg-sky-500',
    'Workshops': 'bg-green-500',
    'Competitions': 'bg-violet-500',
    'Internships': 'bg-orange-500',
    'Jobs': 'bg-red-500',
    'Events': 'bg-yellow-500',
    'Fun': 'bg-amber-400',
    'Technology': 'bg-gray-500',
    'Education': 'bg-slate-800',
    'ETC': 'bg-emerald-500'
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(opp.category)) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return opp.title.toLowerCase().includes(query) || 
             opp.location.toLowerCase().includes(query) ||
             opp.organization.toLowerCase().includes(query);
    }
    return true;
  });

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          toast.success('Location found!', {
            description: 'Map centered on your current location.',
          });
        },
        () => {
          toast.error('Could not get location', {
            description: 'Please enable location services in your browser.',
          });
        }
      );
    } else {
      toast.error('Geolocation not supported', {
        description: 'Your browser does not support geolocation.',
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = filteredOpportunities.find(opp => 
      opp.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found && found.coordinates) {
      setMapCenter([found.coordinates.lat, found.coordinates.lng]);
      toast.success('Location found!', {
        description: `Showing opportunities near ${found.location}`,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header isAuthenticated />

      <div className="flex-1 relative">
        {/* Map Area */}
        <div className="absolute inset-0 bg-gray-200">
          <MapContainer 
            center={mapCenter} 
            zoom={7} 
            minZoom={3}
            maxZoom={18}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            maxBounds={[[-90, -180], [90, 180]]}
            maxBoundsViscosity={1.0}
            worldCopyJump={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController center={mapCenter} />
            
            {filteredOpportunities.map((opportunity) => (
              <Marker
                key={opportunity.id}
                position={[opportunity.coordinates.lat, opportunity.coordinates.lng]}
                icon={categoryIcons[opportunity.category] || defaultIcon}
                eventHandlers={{
                  click: () => setSelectedOpportunity(opportunity.id),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <Badge className={categoryColors[opportunity.category] + ' text-white mb-2'}>
                      {opportunity.category}
                    </Badge>
                    <h3 className="font-semibold mb-1">{opportunity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{opportunity.organization}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/opportunity/${opportunity.id}`}>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Search Bar - positioned below header with proper spacing */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-2 w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search location..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Filter Chips - positioned below search bar */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white rounded-lg shadow-lg p-2 max-w-[90vw]">
              {Object.entries(categoryColors).map(([category, color]) => (
                <Badge 
                  key={category}
                  className={`cursor-pointer transition-opacity ${color} text-white text-xs ${
                    selectedCategories.length > 0 && !selectedCategories.includes(category) 
                      ? 'opacity-50' 
                      : ''
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Current Location Button */}
          <div className="absolute bottom-36 right-4 z-[1000] pointer-events-auto">
            <Button 
              size="icon" 
              className="bg-white text-gray-700 shadow-lg hover:bg-gray-50"
              onClick={handleLocate}
            >
              <Locate className="h-5 w-5" />
            </Button>
          </div>

          {/* Legend - positioned in bottom right with proper spacing */}
          <div className="absolute bottom-4 right-4 z-[1000] pointer-events-auto">
            <Card className="w-48 bg-white/95 backdrop-blur-sm shadow-lg">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm font-medium">Legend</span>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                  {Object.entries(categoryColors).map(([category, color]) => (
                    <div key={category} className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`}></div>
                      <span className="truncate">{category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Left Slide-out Panel */}
        <div 
          className={`absolute top-0 left-0 bottom-0 bg-white shadow-xl transition-transform duration-300 z-[1000] ${
            showPanel ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '400px' }}
        >
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className="p-4 border-b">
              <h2 className="text-xl mb-2">Nearby Opportunities</h2>
              <p className="text-sm text-gray-600">{filteredOpportunities.length} opportunities found</p>
            </div>

            {/* Opportunity List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredOpportunities.map((opportunity) => (
                <Card 
                  key={opportunity.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedOpportunity === opportunity.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
                    setSelectedOpportunity(opportunity.id);
                    setMapCenter([opportunity.coordinates.lat, opportunity.coordinates.lng]);
                  }}
                >
                  <CardContent className="pt-4">
                    <Badge className={categoryColors[opportunity.category] + ' text-white text-xs mb-2'}>
                      {opportunity.category}
                    </Badge>
                    <h3 className="text-sm font-medium mb-1">{opportunity.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{opportunity.organization}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{opportunity.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Toggle Button */}
        <Button
          size="icon"
          className={`absolute top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-lg hover:bg-gray-50 transition-all z-[1001] ${
            showPanel ? 'left-[400px]' : 'left-0'
          }`}
          onClick={() => setShowPanel(!showPanel)}
        >
          {showPanel ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}