import { Link } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockSubmissions } from '../lib/mockData';
import { 
  Clock, CheckCircle, XCircle, TrendingUp, 
  FileText, Users, Flag, BarChart, Settings, 
  AlertTriangle
} from 'lucide-react';

export function AdminDashboard() {
  const pendingCount = mockSubmissions.filter(s => s.status === 'Pending').length;
  const approvedThisWeek = 42;
  const rejectedThisWeek = 8;
  const activeOpportunities = 156;

  const urgentItems = mockSubmissions.filter(s => 
    s.priority === 'Urgent' || s.status === 'Flagged'
  );

  const recentActivity = [
    { action: 'Approved submission', id: 'SUB-1004', time: '5 mins ago', type: 'success' },
    { action: 'Rejected submission', id: 'SUB-997', time: '12 mins ago', type: 'error' },
    { action: 'Flagged content', id: 'FLAG-002', time: '23 mins ago', type: 'warning' },
    { action: 'New submission received', id: 'SUB-1002', time: '1 hour ago', type: 'info' },
    { action: 'Approved submission', id: 'SUB-999', time: '2 hours ago', type: 'success' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and moderate platform content</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-4xl mt-1">{pendingCount}</p>
                  {pendingCount > 10 && (
                    <div className="flex items-center gap-1 text-blue-600 mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs">High volume</span>
                    </div>
                  )}
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved This Week</p>
                  <p className="text-4xl mt-1">{approvedThisWeek}</p>
                  <div className="flex items-center gap-1 text-green-600 mt-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs">+12% from last week</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected This Week</p>
                  <p className="text-4xl mt-1">{rejectedThisWeek}</p>
                </div>
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-7 w-7 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Opportunities</p>
                  <p className="text-4xl mt-1">{activeOpportunities}</p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Priority Queue Section */}
          <div className="col-span-2">
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Needs Immediate Attention</CardTitle>
                <Link to="/admin/review-queue">
                  <Button variant="outline">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {urgentItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <p>All caught up! No urgent items.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {urgentItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-600">
                              {item.priority}
                            </Badge>
                            <Badge variant="outline">
                              {item.category}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-600">{item.timeWaiting}</span>
                        </div>
                        <h4 className="mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{item.organization}</p>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/review/${item.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Review Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Link to="/admin/review-queue">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="mb-1">Review Submissions</h4>
                        <Badge className="bg-blue-600">{pendingCount} pending</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/admin/manage">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Settings className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="mb-1">Manage Opportunities</h4>
                        <Badge className="bg-blue-600">{activeOpportunities} active</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/admin/flagged">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-red-50 to-red-100">
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Flag className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="mb-1">View Reports</h4>
                        <Badge className="bg-red-600">2 new</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-cyan-50 to-cyan-100">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-1">User Management</h4>
                      <p className="text-sm text-gray-600">10,234 users</p>
                    </CardContent>
                  </Card>

                  <Link to="/admin/analytics">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <BarChart className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="mb-1">Analytics</h4>
                        <p className="text-sm text-gray-600">View insights</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-1">Settings</h4>
                      <p className="text-sm text-gray-600">Platform config</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const typeColors: Record<string, string> = {
                      success: 'bg-green-100 text-green-700',
                      error: 'bg-red-100 text-red-700',
                      warning: 'bg-blue-100 text-blue-700',
                      info: 'bg-cyan-100 text-cyan-700'
                    };

                    return (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'success' ? 'bg-green-600' :
                          activity.type === 'error' ? 'bg-red-600' :
                          activity.type === 'warning' ? 'bg-blue-600' :
                          'bg-cyan-600'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm mb-1">{activity.action}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {activity.id}
                            </Badge>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Service</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <Badge variant="outline">78% used</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
