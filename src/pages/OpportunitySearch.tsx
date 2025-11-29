import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OpportunityCard } from '../components/OpportunityCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { mockOpportunities, allSubcategories } from '../lib/mockData';
import { Grid3x3, List, MapPin, RotateCcw, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function OpportunitySearch() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9); // default items per page
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedPosterTypes, setSelectedPosterTypes] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');

  const categories = ['Volunteering', 'Workshops', 'Competitions', 'Internships', 'Jobs', 'Events'];
  const subcategories = allSubcategories;
  
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
    'Kampong Thom',
    'Kampong Speu',
    'Kampong Chhnang',
    'Pursat',
    'Kratie',
    'Mondulkiri',
    'Ratanakiri',
    'Stung Treng',
    'Preah Vihear',
    'Oddar Meanchey',
    'Banteay Meanchey',
    'Pailin',
    'Koh Kong',
    'Tbong Khmum'
  ];

  // Initialize search from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

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

  const handleLocationTypeToggle = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedLocationTypes([...selectedLocationTypes, type]);
    } else {
      setSelectedLocationTypes(selectedLocationTypes.filter(t => t !== type));
    }
  };

  const handleProvinceToggle = (province: string, checked: boolean) => {
    if (checked) {
      setSelectedProvinces([...selectedProvinces, province]);
    } else {
      setSelectedProvinces(selectedProvinces.filter(p => p !== province));
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedPosterTypes([]);
    setSelectedLocationTypes([]);
    setDateRange('');
    setSelectedProvinces([]);
    setSortBy('relevance');
    setSearchQuery('');
    toast.info('Filters reset', { description: 'All filters have been cleared.' });
  };
  
  // Filter opportunities
  const filteredOpportunities = mockOpportunities.filter(opportunity => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        opportunity.title.toLowerCase().includes(query) ||
        opportunity.organization.toLowerCase().includes(query) ||
        opportunity.description.toLowerCase().includes(query) ||
        opportunity.location.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Province filter (for Cambodia locations)
    if (selectedProvinces.length > 0) {
      const matchesProvince = selectedProvinces.some(province => 
        opportunity.location.toLowerCase().includes(province.toLowerCase())
      );
      if (!matchesProvince) return false;
    }

    // Category filter
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(opportunity.category)) return false;
    }

    // Subcategory filter (filters by subcategory field or subcategories array)
    if (selectedSubcategories.length > 0) {
      const oppSubcategories = opportunity.subcategories || (opportunity.subcategory ? [opportunity.subcategory] : []);
      const hasMatchingSubcategory = selectedSubcategories.some(sub => oppSubcategories.includes(sub));
      if (!hasMatchingSubcategory) return false;
    }

    // Poster type filter
    if (selectedPosterTypes.length > 0) {
      if (selectedPosterTypes.includes('user') && !selectedPosterTypes.includes('partnered') && opportunity.isPartnered) return false;
      if (selectedPosterTypes.includes('partnered') && !selectedPosterTypes.includes('user') && !opportunity.isPartnered) return false;
    }

    // Location type filter
    if (selectedLocationTypes.length > 0) {
      const isRemote = opportunity.isRemote;
      if (selectedLocationTypes.includes('remote') && !selectedLocationTypes.includes('inperson') && !isRemote) return false;
      if (selectedLocationTypes.includes('inperson') && !selectedLocationTypes.includes('remote') && isRemote) return false;
    }

    // Date range filter
    if (dateRange) {
      const today = new Date();
      const oppDate = new Date(opportunity.date);
      
      switch (dateRange) {
        case 'today':
          if (oppDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'week':
          const weekFromNow = new Date(today);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          if (oppDate > weekFromNow) return false;
          break;
        case 'month':
          const monthFromNow = new Date(today);
          monthFromNow.setMonth(monthFromNow.getMonth() + 1);
          if (oppDate > monthFromNow) return false;
          break;
      }
    }

    return true;
  });

  // Sort opportunities
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'verified':
        if (a.verified === b.verified) return 0;
        return a.verified ? -1 : 1;
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalResults = sortedOpportunities.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  // Clamp current page when totalPages change
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  // Reset to first page when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, JSON.stringify(selectedCategories), JSON.stringify(selectedSubcategories), JSON.stringify(selectedPosterTypes), JSON.stringify(selectedLocationTypes), dateRange, JSON.stringify(selectedProvinces), sortBy, pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);
  const paginatedOpportunities = sortedOpportunities.slice(startIndex, startIndex + pageSize);

  const activeFiltersCount = selectedCategories.length + selectedSubcategories.length + selectedPosterTypes.length +
    selectedLocationTypes.length + (dateRange ? 1 : 0) + selectedProvinces.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl mb-2">Discover Opportunities</h1>
          <p className="text-gray-600">Find the perfect opportunity that matches your interests and goals</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search opportunities by title, organization, or location..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg">
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </h3>
                  <Button variant="ghost" size="sm" className="text-blue-600" onClick={resetFilters}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>

                {/* Filter by Location - Cambodia Provinces (moved to top) */}
                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2">
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
                        <span
                          key={province}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full cursor-pointer hover:bg-blue-200"
                          onClick={() => handleProvinceToggle(province, false)}
                        >
                          {province} ×
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Category - Main categories first */}
                <div className="mb-6">
                  <h4 className="mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                        />
                        <Label htmlFor={category} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Subcategory Filter - Using dropdown for scalability */}
                <div className="mb-6">
                  <h4 className="mb-3">Subcategory</h4>
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
                        <span
                          key={subcategory}
                          className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full cursor-pointer hover:bg-green-200"
                          onClick={() => handleSubcategoryToggle(subcategory, false)}
                        >
                          {subcategory} ×
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Location Type */}
                <div className="mb-6">
                  <h4 className="mb-3">Location Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remote"
                        checked={selectedLocationTypes.includes('remote')}
                        onCheckedChange={(checked) => handleLocationTypeToggle('remote', checked as boolean)}
                      />
                      <Label htmlFor="remote" className="cursor-pointer">
                        Remote
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="inperson"
                        checked={selectedLocationTypes.includes('inperson')}
                        onCheckedChange={(checked) => handleLocationTypeToggle('inperson', checked as boolean)}
                      />
                      <Label htmlFor="inperson" className="cursor-pointer">
                        In-Person
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="hybrid" />
                      <Label htmlFor="hybrid" className="cursor-pointer">
                        Hybrid
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Date Range */}
                <div className="mb-6">
                  <h4 className="mb-3">Date Range</h4>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="all">All Dates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-6" />

                {/* Posted By */}
                <div className="mb-6">
                  <h4 className="mb-3">Posted By</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="user"
                        checked={selectedPosterTypes.includes('user')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPosterTypes([...selectedPosterTypes, 'user']);
                          } else {
                            setSelectedPosterTypes(selectedPosterTypes.filter(t => t !== 'user'));
                          }
                        }}
                      />
                      <Label htmlFor="user" className="cursor-pointer">
                        Posted by User
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="partnered"
                        checked={selectedPosterTypes.includes('partnered')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPosterTypes([...selectedPosterTypes, 'partnered']);
                          } else {
                            setSelectedPosterTypes(selectedPosterTypes.filter(t => t !== 'partnered'));
                          }
                        }}
                      />
                      <Label htmlFor="partnered" className="cursor-pointer">
                        Posted by Partnered Organization
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-lg border p-4 mb-6 flex items-center justify-between">
              <div className="text-sm text-gray-600 flex items-center gap-4">
                <div>
                  Showing <span className="text-gray-900 font-medium">{totalResults === 0 ? 0 : startIndex + 1}</span> - <span className="text-gray-900 font-medium">{endIndex}</span> of <span className="text-gray-900 font-medium">{totalResults}</span> opportunities
                  {searchQuery && (
                    <span className="ml-1">for "<span className="text-blue-600">{searchQuery}</span>"</span>
                  )}
                </div>
                <div className="ml-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Per page</span>
                  <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="18">18</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by Relevance</SelectItem>
                    <SelectItem value="date">Newest First</SelectItem>
                    <SelectItem value="deadline">Deadline Soon</SelectItem>
                    <SelectItem value="verified">Verified First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Opportunity Grid */}
            {paginatedOpportunities.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl text-gray-700 mb-2">No opportunities found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={resetFilters} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div>
                <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}>
                  {paginatedOpportunities.map((opportunity) => (
                    <div key={opportunity.id}>
                      <OpportunityCard opportunity={opportunity} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                Previous
              </Button>

              {/* dynamic page buttons (show up to 5 pages around current) */}
              {(() => {
                const pages: number[] = [];
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + 4);
                if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);
                for (let p = startPage; p <= endPage; p++) pages.push(p);
                return (
                  <>
                    {startPage > 1 && (
                      <Button key={1} variant="ghost" onClick={() => setCurrentPage(1)}>1</Button>
                    )}
                    {startPage > 2 && <span className="px-2">…</span>}
                    {pages.map((p) => (
                      <Button key={p} variant={p === currentPage ? 'secondary' : 'outline'} onClick={() => setCurrentPage(p)}>
                        {p}
                      </Button>
                    ))}
                    {endPage < totalPages - 1 && <span className="px-2">…</span>}
                    {endPage < totalPages && (
                      <Button key={totalPages} variant="ghost" onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
                    )}
                  </>
                );
              })()}

              <Button variant="outline" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
