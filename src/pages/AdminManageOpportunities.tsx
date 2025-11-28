import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockOpportunities } from '../lib/mockData';
import { Search, Eye, Edit, Pause, Play, Trash2, BarChart, Download } from 'lucide-react';

export function AdminManageOpportunities() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Manage Opportunities</h1>
          <p className="text-gray-600">View and manage all active and expired opportunities</p>
        </div>

        {/* Top Actions */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search opportunities..." 
                className="pl-10"
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-cat">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cat">All Categories</SelectItem>
                <SelectItem value="volunteering">Volunteering</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="competitions">Competitions</SelectItem>
                <SelectItem value="internships">Internships</SelectItem>
                <SelectItem value="jobs">Jobs</SelectItem>
                <SelectItem value="events">Events</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600">
                {selectedItems.length} selected
              </span>
              <Button size="sm" variant="outline">
                <Pause className="h-4 w-4 mr-1" />
                Pause Selected
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                <Trash2 className="h-4 w-4 mr-1" />
                Remove Selected
              </Button>
            </div>
          )}
        </div>

        {/* Opportunities Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {mockOpportunities.map((opportunity) => {
                const isActive = new Date(opportunity.deadline) > new Date();
                const statusColor = isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
                
                return (
                  <div key={opportunity.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={selectedItems.includes(opportunity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedItems([...selectedItems, opportunity.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== opportunity.id));
                          }
                        }}
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg">{opportunity.title}</h3>
                          <Badge className={statusColor}>
                            {isActive ? 'Live' : 'Expired'}
                          </Badge>
                          {opportunity.verified && (
                            <Badge className="bg-green-500 text-white">Verified</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span>{opportunity.organization}</span>
                          <Badge variant="outline">{opportunity.category}</Badge>
                          <span>Posted: {new Date(opportunity.postedDate).toLocaleDateString()}</span>
                          <span>Expires: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {opportunity.views} views
                          </span>
                          <span>{opportunity.applications} applications</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/opportunity/${opportunity.id}`} target="_blank">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                        <Button size="sm" variant="outline">
                          {isActive ? (
                            <><Pause className="h-4 w-4 mr-1" /> Pause</>
                          ) : (
                            <><Play className="h-4 w-4 mr-1" /> Activate</>
                          )}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1-{mockOpportunities.length} of {mockOpportunities.length}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-slate-700 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
