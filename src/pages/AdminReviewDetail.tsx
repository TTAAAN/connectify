import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockSubmissions } from '../lib/mockData';
import { 
  CheckCircle, XCircle, AlertTriangle, MessageSquare, 
  Shield, Link as LinkIcon, FileText, User, Calendar, MapPin
} from 'lucide-react';

export function AdminReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRequestChangesDialog, setShowRequestChangesDialog] = useState(false);

  const submission = mockSubmissions.find(s => s.id === id);

  if (!submission) {
    return <div>Submission not found</div>;
  }

  const handleApprove = () => {
    alert('Submission approved!');
    navigate('/admin/review-queue');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/review-queue')}>
            ← Back to Queue
          </Button>
          <h1 className="text-4xl mt-4 mb-2">Review Submission</h1>
          <p className="text-gray-600">ID: {submission.id}</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Submission Details */}
          <div className="col-span-2">
            {/* Preview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Submission Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
                    {submission.organization.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{submission.category}</Badge>
                      <Badge className="bg-blue-100 text-blue-700">Pending Review</Badge>
                    </div>
                    <h2 className="text-2xl mb-2">{submission.title}</h2>
                    <p className="text-lg text-gray-600">{submission.organization}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2">Description</h3>
                    <p className="text-gray-700">
                      {submission.fullData.description || 'Learn about the latest in blockchain technology and Web3 development. Connect with industry leaders and build the future of decentralized applications.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{submission.fullData.location || 'Denver, CO'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{submission.fullData.date || 'December 20, 2025'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Submission Data */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Detailed Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Organization</div>
                    <div>{submission.organization}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Category</div>
                    <div>{submission.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Capacity</div>
                    <div>{submission.fullData.capacity || '300'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Deadline</div>
                    <div>{submission.fullData.deadline || 'December 15, 2025'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Submission ID</span>
                  <span>{submission.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Submitted By</span>
                  <span>{submission.submittedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Submission Date</span>
                  <span>{new Date(submission.submittedDate).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time Waiting</span>
                  <span className="text-blue-600">{submission.timeWaiting}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">IP Address</span>
                  <span className="font-mono text-xs">192.168.1.1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Admin Actions */}
          <div>
            {/* Quick Decision Panel */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleApprove}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Submission
                </Button>
                <Button 
                  variant="outline"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Submission
                </Button>
                <Button 
                  variant="outline"
                  className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                  onClick={() => setShowRequestChangesDialog(true)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Request Changes
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Flag for Review
                </Button>
              </CardContent>
            </Card>

            {/* Automated Checks */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Automated Checks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Duplicate Detection</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Pass</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Link Verification</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Pass</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Content Filter</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Warning</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Organization Verified</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Pass</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add internal notes (not visible to submitter)..."
                  rows={4}
                  className="mb-3"
                />
                <Button variant="outline" size="sm" className="w-full">
                  Save Notes
                </Button>

                <Separator className="my-4" />

                <div className="text-sm">
                  <div className="mb-2">Action History:</div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">
                      • Assigned to Admin User - {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card>
              <CardHeader>
                <CardTitle>Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mb-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Submitter
                </Button>
                <div className="text-sm text-gray-600">
                  No previous correspondence
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>
              Provide details about why this submission is being rejected. The submitter will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="reason">Reason for Rejection *</Label>
              <Select>
                <SelectTrigger id="reason" className="mt-2">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete">Incomplete Information</SelectItem>
                  <SelectItem value="duplicate">Duplicate Submission</SelectItem>
                  <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                  <SelectItem value="unverifiable">Unverifiable Organization</SelectItem>
                  <SelectItem value="out-of-scope">Outside Platform Scope</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Common Issues (check all that apply)</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="issue1" />
                  <Label htmlFor="issue1" className="cursor-pointer">Incomplete information</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="issue2" />
                  <Label htmlFor="issue2" className="cursor-pointer">Duplicate submission</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="issue3" />
                  <Label htmlFor="issue3" className="cursor-pointer">Inappropriate content</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="feedback">Detailed Feedback *</Label>
              <Textarea 
                id="feedback"
                placeholder="Provide specific reasons for rejection..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="notify" defaultChecked />
              <Label htmlFor="notify" className="cursor-pointer">Send notification to submitter</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setShowRejectDialog(false);
                navigate('/admin/review-queue');
              }}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Changes Dialog */}
      <Dialog open={showRequestChangesDialog} onOpenChange={setShowRequestChangesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Changes</DialogTitle>
            <DialogDescription>
              Specify what changes are needed before this submission can be approved.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="changes">What needs to be changed? *</Label>
              <Textarea 
                id="changes"
                placeholder="Describe the changes needed..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Fields Needing Revision</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="field1" />
                  <Label htmlFor="field1" className="cursor-pointer">Description</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="field2" />
                  <Label htmlFor="field2" className="cursor-pointer">Requirements</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="field3" />
                  <Label htmlFor="field3" className="cursor-pointer">Date/Time</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="deadline">Resubmission Deadline</Label>
              <input type="date" id="deadline" className="w-full mt-2 rounded-md border px-3 py-2" />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="notify2" defaultChecked />
              <Label htmlFor="notify2" className="cursor-pointer">Send notification to submitter</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestChangesDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setShowRequestChangesDialog(false);
                navigate('/admin/review-queue');
              }}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}