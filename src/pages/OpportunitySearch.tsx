import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OpportunityCard } from '../components/OpportunityCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { mockOpportunities } from '../lib/mockData';
import { Grid3x3, List, MapPin, RotateCcw } from 'lucide-react';

export function OpportunitySearch() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPosterTypes, setSelectedPosterTypes] = useState<string[]>([]);

  const categories = ['Volunteering', 'Workshops', 'Competitions', 'Internships', 'Jobs', 'Events'];
  
  const filteredOpportunities = mockOpportunities.filter(opportunity => {
    if (selectedPosterTypes.length > 0) {
      if (selectedPosterTypes.includes('user') && opportunity.isPartnered) return false;
      if (selectedPosterTypes.includes('partnered') && !opportunity.isPartnered) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl mb-2">Discover Opportunities</h1>
          <p className="text-gray-600">Find the perfect opportunity that matches your interests and goals</p>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <h4 className="mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox id={category} />
                        <Label htmlFor={category} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Location Type */}
                <div className="mb-6">
                  <h4 className="mb-3">Location Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remote" />
                      <Label htmlFor="remote" className="cursor-pointer">
                        Remote
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="inperson" />
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-6" />

                {/* Location */}
                <div className="mb-6">
                  <h4 className="mb-3">Location</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="sf">San Francisco, CA</SelectItem>
                      <SelectItem value="ny">New York, NY</SelectItem>
                      <SelectItem value="boston">Boston, MA</SelectItem>
                      <SelectItem value="seattle">Seattle, WA</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 mt-3">
                    <Switch id="mapToggle" />
                    <Label htmlFor="mapToggle" className="cursor-pointer text-sm">
                      Show map view
                    </Label>
                  </div>
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

                <Separator className="my-6" />

                {/* Organization Type */}
                <div className="mb-6">
                  <h4 className="mb-3">Organization Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="nonprofit" />
                      <Label htmlFor="nonprofit" className="cursor-pointer">
                        Non-Profit
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="corporate" />
                      <Label htmlFor="corporate" className="cursor-pointer">
                        Corporate
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="educational" />
                      <Label htmlFor="educational" className="cursor-pointer">
                        Educational
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
              <div className="text-sm text-gray-600">
                Showing <span className="text-gray-900">{filteredOpportunities.length}</span> opportunities
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
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
            <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">
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