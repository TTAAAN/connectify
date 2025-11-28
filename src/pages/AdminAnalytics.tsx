import { AdminHeader } from '../components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Users, FileText, CheckCircle } from 'lucide-react';

export function AdminAnalytics() {
  // Mock data for charts
  const submissionsData = [
    { date: 'Nov 11', approved: 12, rejected: 3, pending: 8 },
    { date: 'Nov 12', approved: 15, rejected: 2, pending: 10 },
    { date: 'Nov 13', approved: 10, rejected: 5, pending: 12 },
    { date: 'Nov 14', approved: 18, rejected: 4, pending: 7 },
    { date: 'Nov 15', approved: 14, rejected: 3, pending: 9 },
    { date: 'Nov 16', approved: 20, rejected: 2, pending: 11 },
    { date: 'Nov 17', approved: 16, rejected: 4, pending: 8 },
  ];

  const categoryData = [
    { name: 'Volunteering', value: 45 },
    { name: 'Workshops', value: 65 },
    { name: 'Competitions', value: 28 },
    { name: 'Internships', value: 52 },
    { name: 'Jobs', value: 38 },
    { name: 'Events', value: 72 },
  ];

  const reviewTimeData = [
    { date: 'Nov 11', avgHours: 36 },
    { date: 'Nov 12', avgHours: 28 },
    { date: 'Nov 13', avgHours: 42 },
    { date: 'Nov 14', avgHours: 24 },
    { date: 'Nov 15', avgHours: 32 },
    { date: 'Nov 16', avgHours: 18 },
    { date: 'Nov 17', avgHours: 26 },
  ];

  const engagementData = [
    { date: 'Nov 11', views: 1200, bookmarks: 340, applications: 156 },
    { date: 'Nov 12', views: 1450, bookmarks: 380, applications: 178 },
    { date: 'Nov 13', views: 1100, bookmarks: 310, applications: 142 },
    { date: 'Nov 14', views: 1680, bookmarks: 420, applications: 203 },
    { date: 'Nov 15', views: 1520, bookmarks: 390, applications: 185 },
    { date: 'Nov 16', views: 1890, bookmarks: 480, applications: 234 },
    { date: 'Nov 17', views: 1650, bookmarks: 410, applications: 198 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#0891b2', '#0ea5e9', '#06b6d4', '#6366f1'];

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Platform insights and performance metrics</p>
          </div>
          <Select defaultValue="7days">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Submissions</span>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl mb-1">105</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+18% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Approval Rate</span>
                <CheckCircle className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl mb-1">84%</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+3% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Avg Review Time</span>
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl mb-1">28h</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingDown className="h-4 w-4" />
                <span>-12h from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Users</span>
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl mb-1">10.2K</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+234 this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Submissions Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Submissions Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={submissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                  <Bar dataKey="pending" fill="#3b82f6" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#3b82f6"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Average Review Time */}
          <Card>
            <CardHeader>
              <CardTitle>Average Review Time (Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reviewTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="avgHours" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Avg Hours"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" name="Views" />
                  <Line type="monotone" dataKey="bookmarks" stroke="#0891b2" name="Bookmarks" />
                  <Line type="monotone" dataKey="applications" stroke="#10b981" name="Applications" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
