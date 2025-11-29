import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { mockOpportunities, uniqueLocations, allSubcategories, SubcategoryType } from '../lib/mockData';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Search, Layers, Locate,
  ChevronLeft, ChevronRight, Calendar, Filter, X
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

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
};

// Component to handle map center updates
function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const ITEMS_PER_PAGE = 20;

export function MapView() {
  const [showPanel, setShowPanel] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([12.5657, 104.9910]); // Center of Cambodia
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const categoryColors: Record<string, string> = {
    'Volunteering': 'bg-sky-500',
    'Workshops': 'bg-green-500',
    'Competitions': 'bg-violet-500',
    'Internships': 'bg-orange-500',
    'Jobs': 'bg-red-500',
    'Events': 'bg-yellow-500'
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter(opp => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(opp.category)) {
        return false;
      }
      // Location filter
      if (selectedLocation !== 'all' && opp.location !== selectedLocation) {
        return false;
      }
      // Subcategory filter - checks both subcategories array and subcategory property for compatibility
      if (selectedSubcategory !== 'all') {
        const hasSubcategory = opp.subcategories?.includes(selectedSubcategory as SubcategoryType) || 
                               opp.subcategory === selectedSubcategory;
        if (!hasSubcategory) {
          return false;
        }
      }
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return opp.title.toLowerCase().includes(query) || 
               opp.location.toLowerCase().includes(query) ||
               opp.organization.toLowerCase().includes(query);
      }
      return true;
    });
  }, [selectedCategories, selectedLocation, selectedSubcategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedOpportunities = filteredOpportunities.slice(startIndex, endIndex);

  // Reset to first page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLocation, selectedSubcategory, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation('all');
    setSelectedSubcategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
                           selectedLocation !== 'all' || 
                           selectedSubcategory !== 'all' ||
                           searchQuery !== '';

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header isAuthenticated />

      {/* Main content area with proper height calculation */}
      <div className="flex-1 relative" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Map Area */}
        <div className="absolute inset-0 bg-gray-200 z-0">
          <MapContainer
            center={mapCenter}
            zoom={7} 
            minZoom={3}
            maxZoom={18}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
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

          {/* Search Bar and Filters - positioned below header with proper spacing */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 w-[500px]">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search opportunities..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? 'bg-blue-50 border-blue-300' : ''}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </form>
              
              {/* Filter Dropdowns */}
              {showFilters && (
                <div className="mt-2 pt-2 border-t space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {uniqueLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Subcategories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subcategories</SelectItem>
                        {allSubcategories.map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs text-gray-500"
                      onClick={clearAllFilters}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Filter Chips - positioned below search bar */}
          <div className={`absolute ${showFilters ? 'top-44' : 'top-20'} left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto transition-all`}>
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
              <p className="text-sm text-gray-600">
                {filteredOpportunities.length} opportunities found
                {filteredOpportunities.length > ITEMS_PER_PAGE && (
                  <span className="ml-1">
                    (showing {startIndex + 1}-{Math.min(endIndex, filteredOpportunities.length)})
                  </span>
                )}
              </p>
            </div>

            {/* Opportunity List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {paginatedOpportunities.map((opportunity) => (
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
                    {opportunity.subcategory && (
                      <Badge variant="outline" className="ml-1 text-xs mb-2">
                        {opportunity.subcategory}
                      </Badge>
                    )}
                    <h3 className="text-sm font-medium mb-1">{opportunity.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{opportunity.organization}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{opportunity.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredOpportunities.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No opportunities match your filters.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={clearAllFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Prev
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {/* Show page numbers with ellipsis */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Always show first, last, current, and adjacent pages
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - currentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, index, arr) => {
                        // Add ellipsis between non-adjacent pages
                        const showEllipsisBefore = index > 0 && page - arr[index - 1] > 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsisBefore && (
                              <span className="px-2 text-gray-400">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
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