import { useMemo } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Users, FileText, CheckCircle } from 'lucide-react';
import { mockOpportunities, mockSubmissions } from '../lib/mockData';

export function AdminAnalytics() {
  // Calculate dynamic analytics from mockData
  const analytics = useMemo(() => {
    const today = new Date();
    
    // Total submissions (all opportunities + pending submissions)
    const totalOpportunities = mockOpportunities.length;
    const pendingSubmissions = mockSubmissions.filter(s => s.status === 'Pending').length;
    const totalSubmissions = totalOpportunities + pendingSubmissions;
    
    // Verified vs unverified for approval rate
    const verifiedCount = mockOpportunities.filter(o => o.verified).length;
    const approvalRate = Math.round((verifiedCount / totalOpportunities) * 100);
    
    // Calculate total views and applications from opportunities
    const totalViews = mockOpportunities.reduce((sum, o) => sum + o.views, 0);
    const totalApplications = mockOpportunities.reduce((sum, o) => sum + o.applications, 0);
    
    // Simulated active users based on views
    const activeUsers = Math.round(totalViews / 100);
    
    // Average review time (simulated based on data patterns)
    const avgReviewTime = 28;
    
    return {
      totalSubmissions,
      approvalRate,
      avgReviewTime,
      activeUsers,
      totalViews,
      totalApplications
    };
  }, []);

  // Generate submissions data over time from mock data
  const submissionsData = useMemo(() => {
    const categories = ['Volunteering', 'Workshops', 'Competitions', 'Internships', 'Jobs', 'Events'];
    const dates: string[] = [];
    const today = new Date();
    
    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return dates.map((date, idx) => {
      // Distribute opportunities across dates based on posted date
      const dayOpps = mockOpportunities.filter((_, i) => i % 7 === idx);
      const approved = dayOpps.filter(o => o.verified).length;
      const rejected = Math.floor(dayOpps.length * 0.1);
      const pending = dayOpps.length - approved - rejected;
      
      return {
        date,
        approved: Math.max(10, approved % 25),
        rejected: Math.max(2, rejected % 8),
        pending: Math.max(5, pending % 15)
      };
    });
  }, []);

  // Calculate category distribution from actual data
  const categoryData = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    
    mockOpportunities.forEach(opp => {
      categoryCounts[opp.category] = (categoryCounts[opp.category] || 0) + 1;
    });
    
    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value
    }));
  }, []);

  // Generate review time data
  const reviewTimeData = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    // Simulate review times with some variance
    return dates.map((date, idx) => ({
      date,
      avgHours: 20 + Math.floor(Math.sin(idx) * 10) + Math.floor(idx * 2)
    }));
  }, []);

  // Generate engagement data from actual opportunity stats
  const engagementData = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return dates.map((date, idx) => {
      // Distribute engagement across days
      const dayOpps = mockOpportunities.filter((_, i) => i % 7 === idx);
      const views = dayOpps.reduce((sum, o) => sum + Math.floor(o.views / 7), 0);
      const applications = dayOpps.reduce((sum, o) => sum + Math.floor(o.applications / 7), 0);
      const bookmarks = Math.floor(views * 0.25);
      
      return {
        date,
        views: Math.max(1000, views),
        bookmarks: Math.max(250, bookmarks),
        applications: Math.max(100, applications)
      };
    });
  }, []);

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
              <div className="text-3xl mb-1">{analytics.totalSubmissions.toLocaleString()}</div>
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
              <div className="text-3xl mb-1">{analytics.approvalRate}%</div>
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
              <div className="text-3xl mb-1">{analytics.avgReviewTime}h</div>
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
              <div className="text-3xl mb-1">{(analytics.activeUsers / 1000).toFixed(1)}K</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+{Math.floor(analytics.activeUsers * 0.02)} this week</span>
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
