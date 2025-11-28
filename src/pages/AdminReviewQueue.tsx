import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { mockSubmissions } from '../lib/mockData';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Flag, AlertTriangle } from 'lucide-react';

export function AdminReviewQueue() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Submissions Review Queue</h1>
          <p className="text-gray-600">Review and moderate submitted opportunities</p>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h3 className="text-lg mb-4">Filters</h3>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <Label className="mb-3 block">Status</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="pending" defaultChecked />
                        <Label htmlFor="pending" className="cursor-pointer">Pending</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="approved" />
                        <Label htmlFor="approved" className="cursor-pointer">Approved</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rejected" />
                        <Label htmlFor="rejected" className="cursor-pointer">Rejected</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="flagged" />
                        <Label htmlFor="flagged" className="cursor-pointer">Flagged</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Category */}
                  <div>
                    <Label htmlFor="category" className="mb-3 block">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="volunteering">Volunteering</SelectItem>
                        <SelectItem value="workshops">Workshops</SelectItem>
                        <SelectItem value="competitions">Competitions</SelectItem>
                        <SelectItem value="internships">Internships</SelectItem>
                        <SelectItem value="jobs">Jobs</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Submission Age */}
                  <div>
                    <Label className="mb-3 block">Submission Age</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="age-new" />
                        <Label htmlFor="age-new" className="cursor-pointer">New (&lt;24hrs)</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="age-24-48" />
                        <Label htmlFor="age-24-48" className="cursor-pointer">24-48 hours</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="age-urgent" defaultChecked />
                        <Label htmlFor="age-urgent" className="cursor-pointer">&gt;48 hours</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="age-old" />
                        <Label htmlFor="age-old" className="cursor-pointer">&gt;7 days</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Priority */}
                  <div>
                    <Label className="mb-3 block">Priority Level</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="priority-urgent" />
                        <Label htmlFor="priority-urgent" className="cursor-pointer">Urgent</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="priority-high" />
                        <Label htmlFor="priority-high" className="cursor-pointer">High</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="priority-normal" />
                        <Label htmlFor="priority-normal" className="cursor-pointer">Normal</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-lg border p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {mockSubmissions.length} submissions
                </span>
                {selectedItems.length > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-sm">
                      {selectedItems.length} selected
                    </span>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Bulk Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        Bulk Reject
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <Select defaultValue="oldest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submissions List */}
            <div className="space-y-3">
              {mockSubmissions.map((submission) => {
                const isExpanded = expandedId === submission.id;
                const priorityColors: Record<string, string> = {
                  Urgent: 'bg-red-100 text-red-700',
                  High: 'bg-blue-100 text-blue-700',
                  Normal: 'bg-gray-100 text-gray-700'
                };

                const statusColors: Record<string, string> = {
                  Pending: 'bg-blue-100 text-blue-700',
                  Approved: 'bg-green-100 text-green-700',
                  Rejected: 'bg-red-100 text-red-700',
                  Flagged: 'bg-red-100 text-red-700'
                };

                return (
                  <Card key={submission.id} className={
                    submission.priority === 'Urgent' ? 'border-blue-300 border-2' : ''
                  }>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <Checkbox 
                          checked={selectedItems.includes(submission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedItems([...selectedItems, submission.id]);
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== submission.id));
                            }
                          }}
                        />

                        <div className="flex-1">
                          {/* Header Row */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{submission.id}</Badge>
                                <Badge className={statusColors[submission.status]}>
                                  {submission.status}
                                </Badge>
                                <Badge className={priorityColors[submission.priority]}>
                                  {submission.priority}
                                </Badge>
                                <Badge variant="outline">{submission.category}</Badge>
                                {submission.priority === 'Urgent' && (
                                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                                )}
                              </div>
                              <h3 className="text-lg mb-1">{submission.title}</h3>
                              <p className="text-gray-600 text-sm">{submission.organization}</p>
                            </div>
                            <div className="text-right text-sm">
                              <div className="text-gray-600">Submitted</div>
                              <div>{new Date(submission.submittedDate).toLocaleDateString()}</div>
                              <div className="text-blue-600 mt-1">Waiting: {submission.timeWaiting}</div>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Submitted by: </span>
                                  <span>{submission.submittedBy}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Category: </span>
                                  <span>{submission.category}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 mt-3">
                            <Link to={`/admin/review/${submission.id}`}>
                              <Button size="sm" className="bg-slate-700 hover:bg-slate-800">
                                Review
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                              <Flag className="h-4 w-4 mr-1" />
                              Flag
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-slate-700 text-white">
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
    </div>
  );
}
