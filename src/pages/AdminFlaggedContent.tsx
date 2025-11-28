import { Link } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { mockFlaggedContent } from '../lib/mockData';
import { AlertTriangle, Eye, MessageSquare, Trash2, CheckCircle, Ban } from 'lucide-react';

export function AdminFlaggedContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Flagged & Reported Content</h1>
          <p className="text-gray-600">Review user-reported content requiring moderation</p>
        </div>

        <div className="space-y-6">
          {mockFlaggedContent.map((item) => {
            const severityColors: Record<string, string> = {
              Low: 'bg-yellow-100 text-yellow-700',
              Medium: 'bg-blue-100 text-blue-700',
              High: 'bg-red-100 text-red-700'
            };

            const statusColors: Record<string, string> = {
              New: 'bg-blue-100 text-blue-700',
              'In Progress': 'bg-cyan-100 text-cyan-700',
              Resolved: 'bg-green-100 text-green-700'
            };

            return (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{item.id}</Badge>
                        <Badge className={severityColors[item.severity]}>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {item.severity} Severity
                        </Badge>
                        <Badge className={statusColors[item.status]}>
                          {item.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{item.contentTitle}</CardTitle>
                      <p className="text-gray-600 text-sm">Content ID: {item.contentId}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-gray-600">Reported</div>
                      <div>{new Date(item.reportDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Report Details */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="mb-2">Report Reason</h4>
                      <p className="text-sm text-gray-700">{item.reportReason}</p>
                      <div className="mt-3 text-sm">
                        <span className="text-gray-600">Reported by: </span>
                        <span>{item.reporter}</span>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="mb-2">Content Preview</h4>
                      <p className="text-sm text-gray-600">
                        This is a preview of the flagged content. View full details to see complete submission.
                      </p>
                    </div>

                    {/* Investigation Notes */}
                    <div>
                      <h4 className="mb-2">Investigation Notes</h4>
                      <Textarea 
                        placeholder="Add notes about your investigation..."
                        rows={3}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Link to={`/opportunity/${item.contentId}`} target="_blank">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Full Content
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact Reporter
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact Poster
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Dismiss Report
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove Content
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                          <Ban className="h-4 w-4 mr-1" />
                          Ban User
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {mockFlaggedContent.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl mb-2">All Clear!</h3>
              <p className="text-gray-600">No flagged content to review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}