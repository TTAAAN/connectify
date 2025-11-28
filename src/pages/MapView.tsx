import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { mockOpportunities } from '../lib/mockData';
import { 
  MapPin, Search, Layers, Locate, X,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom colored markers
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

function LocateControl() {
  const map = useMap();
  
  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 12 });
  };
  
  return (
    <div className="absolute bottom-24 right-4 z-[1000]">
      <Button size="icon" className="bg-white text-gray-700 shadow-lg hover:bg-gray-50" onClick={handleLocate}>
        <Locate className="h-5 w-5" />
      </Button>
    </div>
  );
}

export function MapView() {
  const [showPanel, setShowPanel] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);

  const categoryColors: Record<string, string> = {
    'Volunteering': '#0ea5e9',
    'Workshops': '#3b82f6',
    'Competitions': '#6366f1',
    'Internships': '#06b6d4',
    'Jobs': '#2563eb',
    'Events': '#60a5fa'
  };

  return (
    <div className="h-screen flex flex-col">
      <Header isAuthenticated />

      <div className="flex-1 relative">
        {/* Map Area */}
        <div className="absolute inset-0 bg-gray-100">
          {/* Simulated Map */}
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
            {/* Map Controls */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-white rounded-lg shadow-lg p-2 w-96">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search location..." 
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-2">
                <Badge className="cursor-pointer bg-sky-500 text-white">Volunteering</Badge>
                <Badge className="cursor-pointer bg-blue-500 text-white">Workshops</Badge>
                <Badge className="cursor-pointer bg-indigo-500 text-white">Competitions</Badge>
                <Badge className="cursor-pointer bg-cyan-500 text-white">Internships</Badge>
                <Badge className="cursor-pointer bg-blue-600 text-white">Jobs</Badge>
                <Badge className="cursor-pointer bg-blue-400 text-white">Events</Badge>
              </div>
            </div>

            {/* Current Location Button */}
            <div className="absolute bottom-24 right-4 z-10">
              <Button size="icon" className="bg-white text-gray-700 shadow-lg hover:bg-gray-50">
                <Locate className="h-5 w-5" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 z-10">
              <Card className="w-64">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4" />
                    <span className="text-sm">Legend</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(categoryColors).map(([category, color]) => (
                      <div key={category} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color}`}></div>
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Simulated Map Markers */}
            <div className="absolute top-1/4 left-1/4">
              <div className={`w-8 h-8 ${categoryColors['Volunteering']} rounded-full border-4 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform`}
                   onClick={() => setSelectedOpportunity('1')}>
              </div>
            </div>
            <div className="absolute top-1/3 right-1/3">
              <div className={`w-8 h-8 ${categoryColors['Workshops']} rounded-full border-4 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform`}
                   onClick={() => setSelectedOpportunity('2')}>
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/3">
              <div className={`w-8 h-8 ${categoryColors['Competitions']} rounded-full border-4 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform`}
                   onClick={() => setSelectedOpportunity('3')}>
              </div>
            </div>

            {/* Selected Marker Popup */}
            {selectedOpportunity && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <Card className="w-80 shadow-xl">
                  <CardContent className="pt-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedOpportunity(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {(() => {
                      const opp = mockOpportunities.find(o => o.id === selectedOpportunity);
                      if (!opp) return null;
                      return (
                        <>
                          <Badge className={categoryColors[opp.category].replace('bg-', 'bg-') + ' text-white mb-2'}>
                            {opp.category}
                          </Badge>
                          <h3 className="mb-1">{opp.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{opp.organization}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{opp.location}</span>
                          </div>
                          <Link to={`/opportunity/${opp.id}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              View Details
                            </Button>
                          </Link>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Left Slide-out Panel */}
        <div className={`absolute top-0 left-0 bottom-0 bg-white shadow-xl transition-transform duration-300 ${showPanel ? 'translate-x-0' : '-translate-x-full'}`}
             style={{ width: '400px' }}>
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className="p-4 border-b">
              <h2 className="text-xl mb-2">Nearby Opportunities</h2>
              <p className="text-sm text-gray-600">{mockOpportunities.length} opportunities found</p>
            </div>

            {/* Opportunity List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mockOpportunities.slice(0, 8).map((opportunity) => (
                <Card key={opportunity.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedOpportunity(opportunity.id)}>
                  <CardContent className="pt-4">
                    <Badge className={categoryColors[opportunity.category] + ' text-white text-xs mb-2'}>
                      {opportunity.category}
                    </Badge>
                    <h3 className="text-sm mb-1">{opportunity.title}</h3>
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
          className={`absolute top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-lg hover:bg-gray-50 transition-all ${showPanel ? 'left-[400px]' : 'left-0'}`}
          onClick={() => setShowPanel(!showPanel)}
        >
          {showPanel ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}