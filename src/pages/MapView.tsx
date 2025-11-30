import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { mockOpportunities, uniqueLocations, allSubcategories, SubcategoryType } from '../lib/mockData';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Search, Layers, Locate,
  ChevronLeft, ChevronRight, Calendar, SlidersHorizontal, X, RotateCcw, AlertCircle, DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';
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
  'Events': createCategoryIcon('black'), // changed from 'gold' to 'yellow'
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

// Cambodia provinces for location filter
const cambodiaProvinces = [
  'Phnom Penh',
  'Siem Reap',
  'Battambang',
  'Sihanoukville',
  'Kampong Cham',
  'Kep',
  'Kampot',
  'Kandal',
  'Takeo',
  'Prey Veng',
  'Svay Rieng',
  'Kompong Thom',
  'Pursat',
  'Kratie',
  'Banteay Meanchey',
];

export function MapView() {
  const [showPanel, setShowPanel] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('');
  const [feeFilter, setFeeFilter] = useState<string>('all');
  const [hideExpired, setHideExpired] = useState(true);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([12.5657, 104.9910]); // Center of Cambodia
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = ['Volunteering', 'Workshops', 'Competitions', 'Internships', 'Jobs', 'Events'];
  const subcategories = allSubcategories;

    const categoryColors: Record<string, string> = {
      'Volunteering': 'bg-sky-500',
      'Workshops': 'bg-green-500',
      'Competitions': 'bg-indigo-500',
      'Internships': 'bg-orange',
      'Jobs': 'bg-red-500',
      'Events': 'bg-black',
    };

  const handleCategoryToggle = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleSubcategoryToggle = (subcategory: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    } else {
      setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcategory));
    }
  };

  const handleProvinceToggle = (province: string, checked: boolean) => {
    if (checked) {
      setSelectedProvinces([...selectedProvinces, province]);
    } else {
      setSelectedProvinces(selectedProvinces.filter(p => p !== province));
    }
  };

  const handleLocationTypeToggle = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedLocationTypes([...selectedLocationTypes, type]);
    } else {
      setSelectedLocationTypes(selectedLocationTypes.filter(t => t !== type));
    }
  };

  // Check if deadline has passed
  const isDeadlinePassed = (deadline: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  const filteredOpportunities = useMemo(() => {
    const today = new Date();
    
    return mockOpportunities.filter(opp => {
      // Filter out unverified/pending opportunities - only show verified ones
      if (!opp.verified) {
        return false;
      }

      // Hide expired opportunities (past deadline)
      if (hideExpired && isDeadlinePassed(opp.deadline)) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(opp.category)) {
        return false;
      }
      
      // Province filter (for Cambodia locations)
      if (selectedProvinces.length > 0) {
        const matchesProvince = selectedProvinces.some(province => 
          opp.location.toLowerCase().includes(province.toLowerCase())
        );
        if (!matchesProvince) return false;
      }

      // Subcategory filter
      if (selectedSubcategories.length > 0) {
        const oppSubcategories = opp.subcategories || (opp.subcategory ? [opp.subcategory] : []);
        const hasMatchingSubcategory = selectedSubcategories.some(sub => oppSubcategories.includes(sub));
        if (!hasMatchingSubcategory) return false;
      }

      // Location type filter
      if (selectedLocationTypes.length > 0) {
        const isRemote = opp.isRemote;
        const isInPerson = !opp.isRemote;
        if (selectedLocationTypes.includes('remote') && !selectedLocationTypes.includes('inperson') && !isRemote) return false;
        if (selectedLocationTypes.includes('inperson') && !selectedLocationTypes.includes('remote') && isRemote) return false;
      }

      // Date range filter - filter by deadline date
      if (dateRange && dateRange !== 'all') {
        const deadlineDate = new Date(opp.deadline);
        
        switch (dateRange) {
          case 'today':
            if (deadlineDate.toDateString() !== today.toDateString()) return false;
            break;
          case 'week':
            const weekFromNow = new Date(today);
            weekFromNow.setDate(weekFromNow.getDate() + 7);
            if (deadlineDate > weekFromNow || deadlineDate < today) return false;
            break;
          case 'month':
            const monthFromNow = new Date(today);
            monthFromNow.setMonth(monthFromNow.getMonth() + 1);
            if (deadlineDate > monthFromNow || deadlineDate < today) return false;
            break;
        }
      }

      // Fee filter
      if (feeFilter === 'free' && opp.fee !== 0) return false;
      if (feeFilter === 'paid' && opp.fee === 0) return false;

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return opp.title.toLowerCase().includes(query) || 
               opp.location.toLowerCase().includes(query) ||
               opp.organization.toLowerCase().includes(query);
      }
      return true;
    });
  }, [selectedCategories, selectedSubcategories, selectedProvinces, selectedLocationTypes, dateRange, feeFilter, hideExpired, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedOpportunities = filteredOpportunities.slice(startIndex, endIndex);

  // Reset to first page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedSubcategories, selectedProvinces, selectedLocationTypes, dateRange, feeFilter, hideExpired, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedProvinces([]);
    setSelectedLocationTypes([]);
    setDateRange('');
    setFeeFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
    toast.info('Filters reset', { description: 'All filters have been cleared.' });
  };

  const activeFiltersCount = selectedCategories.length + selectedSubcategories.length + 
    selectedProvinces.length + selectedLocationTypes.length + (dateRange ? 1 : 0) + (feeFilter !== 'all' ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0 || searchQuery !== '';

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
                    {isDeadlinePassed(opportunity.deadline) && (
                      <Badge variant="destructive" className="ml-1 mb-2 text-xs">
                        Expired
                      </Badge>
                    )}
                    <h3 className="font-semibold mb-1">{opportunity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{opportunity.organization}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>Event: {new Date(opportunity.date).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm mb-1 ${isDeadlinePassed(opportunity.deadline) ? 'text-red-500' : 'text-gray-500'}`}>
                      <AlertCircle className="h-3 w-3" />
                      <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm mb-3 ${opportunity.fee === 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      <DollarSign className="h-3 w-3" />
                      <span>{opportunity.fee === 0 ? 'Free' : `$${opportunity.fee}`}</span>
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

          {/* Search Bar and Advanced Filter Button */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 w-[420px]">
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
                  onClick={() => setShowAdvancedFilters(true)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Advanced Filter
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </form>
              
              {/* Active filter tags */}
              {hasActiveFilters && (
                <div className="mt-2 pt-2 border-t flex flex-wrap gap-1 items-center">
                  {selectedCategories.map(cat => (
                    <Badge key={cat} variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200" onClick={() => handleCategoryToggle(cat, false)}>
                      {cat} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedProvinces.map(prov => (
                    <Badge key={prov} variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200" onClick={() => handleProvinceToggle(prov, false)}>
                      {prov} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedSubcategories.map(sub => (
                    <Badge key={sub} variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200" onClick={() => handleSubcategoryToggle(sub, false)}>
                      {sub} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {dateRange && (
                    <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200" onClick={() => setDateRange('')}>
                      {dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'This Week' : 'This Month'} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                  {feeFilter !== 'all' && (
                    <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200" onClick={() => setFeeFilter('all')}>
                      {feeFilter === 'free' ? 'Free Only' : 'Paid Only'} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2" onClick={clearAllFilters}>
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Category Chips - positioned below search bar */}
          <div className={`absolute ${hasActiveFilters ? 'top-32' : 'top-20'} left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto transition-all`}>
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white rounded-lg shadow-lg p-2 max-w-[90vw]">
              {Object.entries(categoryColors).map(([category, color]) => (
                <Badge 
                  key={category}
                  className={`cursor-pointer transition-opacity ${color} text-white text-xs ${
                    selectedCategories.length > 0 && !selectedCategories.includes(category) 
                      ? 'opacity-50' 
                      : ''
                  }`}
                  onClick={() => handleCategoryToggle(category, !selectedCategories.includes(category))}
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
                  } ${isDeadlinePassed(opportunity.deadline) ? 'opacity-60' : ''}`}
                  onClick={() => {
                    setSelectedOpportunity(opportunity.id);
                    setMapCenter([opportunity.coordinates.lat, opportunity.coordinates.lng]);
                  }}
                >
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge className={categoryColors[opportunity.category] + ' text-white text-xs'}>
                        {opportunity.category}
                      </Badge>
                      {opportunity.subcategory && (
                        <Badge variant="outline" className="text-xs">
                          {opportunity.subcategory}
                        </Badge>
                      )}
                      {isDeadlinePassed(opportunity.deadline) && (
                        <Badge variant="destructive" className="text-xs">
                          Expired
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-medium mb-1">{opportunity.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{opportunity.organization}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${isDeadlinePassed(opportunity.deadline) ? 'text-red-500' : 'text-gray-500'}`}>
                      <Calendar className="h-3 w-3" />
                      <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs mt-1 ${opportunity.fee === 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      <DollarSign className="h-3 w-3" />
                      <span>{opportunity.fee === 0 ? 'Free' : `$${opportunity.fee}`}</span>
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
                      .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
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

      {/* Advanced Filter Dialog */}
      <Dialog open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Advanced Filters
              {activeFiltersCount > 0 && (
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {activeFiltersCount} active
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              Filter opportunities by location, category, subcategory, and more.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Hide Expired Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                <Label htmlFor="hide-expired" className="cursor-pointer">
                  Hide expired opportunities (past deadline)
                </Label>
              </div>
              <Checkbox 
                id="hide-expired"
                checked={hideExpired}
                onCheckedChange={(checked) => setHideExpired(checked as boolean)}
              />
            </div>

            <Separator />

            {/* Filter by Location */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-medium">
                <MapPin className="h-4 w-4" />
                Filter by Location
              </h4>
              <Select 
                value={selectedProvinces.length > 0 ? "selected" : ""}
                onValueChange={() => {}}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provinces" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {cambodiaProvinces.map((province) => (
                      <div key={province} className="flex items-center gap-2 py-1">
                        <Checkbox 
                          id={`province-${province}`}
                          checked={selectedProvinces.includes(province)}
                          onCheckedChange={(checked) => handleProvinceToggle(province, checked as boolean)}
                        />
                        <Label htmlFor={`province-${province}`} className="cursor-pointer text-sm">
                          {province}
                        </Label>
                      </div>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              {selectedProvinces.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedProvinces.map((province) => (
                    <Badge 
                      key={province}
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-gray-200"
                      onClick={() => handleProvinceToggle(province, false)}
                    >
                      {province} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Category */}
            <div>
              <h4 className="mb-3 font-medium">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox 
                      id={`cat-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                    />
                    <Label htmlFor={`cat-${category}`} className="cursor-pointer text-sm flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${categoryColors[category]}`}></div>
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Subcategory Filter */}
            <div>
              <h4 className="mb-3 font-medium">Subcategory</h4>
              <Select 
                value={selectedSubcategories.length > 0 ? "selected" : ""}
                onValueChange={() => {}}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategories" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {subcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center gap-2 py-1">
                        <Checkbox 
                          id={`subcategory-${subcategory}`}
                          checked={selectedSubcategories.includes(subcategory)}
                          onCheckedChange={(checked) => handleSubcategoryToggle(subcategory, checked as boolean)}
                        />
                        <Label htmlFor={`subcategory-${subcategory}`} className="cursor-pointer text-sm">
                          {subcategory}
                        </Label>
                      </div>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              {selectedSubcategories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedSubcategories.map((subcategory) => (
                    <Badge 
                      key={subcategory}
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSubcategoryToggle(subcategory, false)}
                    >
                      {subcategory} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Location Type */}
            <div>
              <h4 className="mb-3 font-medium">Location Type</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="remote" 
                    checked={selectedLocationTypes.includes('remote')}
                    onCheckedChange={(checked) => handleLocationTypeToggle('remote', checked as boolean)}
                  />
                  <Label htmlFor="remote" className="cursor-pointer text-sm">
                    Remote
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="inperson" 
                    checked={selectedLocationTypes.includes('inperson')}
                    onCheckedChange={(checked) => handleLocationTypeToggle('inperson', checked as boolean)}
                  />
                  <Label htmlFor="inperson" className="cursor-pointer text-sm">
                    In-Person
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Date Range */}
            <div>
              <h4 className="mb-3 font-medium">Date Range</h4>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Fee Filter */}
            <div>
              <h4 className="mb-3 font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Fee to Join
              </h4>
              <Select value={feeFilter} onValueChange={setFeeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All (Free & Paid)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All (Free & Paid)</SelectItem>
                  <SelectItem value="free">Free Only</SelectItem>
                  <SelectItem value="paid">Paid Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={clearAllFilters} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset All
            </Button>
            <Button onClick={() => setShowAdvancedFilters(false)} className="bg-blue-600 hover:bg-blue-700">
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
