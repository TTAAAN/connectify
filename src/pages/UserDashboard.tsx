import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OpportunityCard } from '../components/OpportunityCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockOpportunities } from '../lib/mockData';
import { 
  Bookmark, Send, TrendingUp, Calendar,
  Plus, Clock
} from 'lucide-react';

export function UserDashboard() {
  const recommendedOpportunities = mockOpportunities.filter(o => o.verified).slice(0, 3);
  const recentOpportunities = mockOpportunities.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        {/* Greeting and Stats */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome back, Jane!</h1>
          <p className="text-gray-600">Here's what's happening with your opportunities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saved Items</p>
                  <p className="text-3xl">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bookmark className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <p className="text-3xl">8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recommendations</p>
                  <p className="text-3xl">24</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Deadlines Soon</p>
                  <p className="text-3xl">5</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl mb-2">Submit Your Event</h3>
                  <p className="text-gray-600 mb-4">Have an opportunity to share? Submit it for admin review</p>
                  <Link to="/submit">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Event
                    </Button>
                  </Link>
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  1 Pending
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="pt-6">
              <div>
                <h3 className="text-xl mb-2">Upcoming Deadlines</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">AI Hackathon 2025</span>
                    <span className="text-red-600">Dec 1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">UX Design Workshop</span>
                    <span className="text-blue-600">Nov 30</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Software Internship</span>
                    <span className="text-blue-600">Dec 10</span>
                  </div>
                </div>
                <Button variant="link" className="mt-3 p-0">
                  View all deadlines →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended for You */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl">Recommended for You</h2>
            <Link to="/opportunities">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {recommendedOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>

        {/* Recently Posted */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl">Recently Posted</h2>
              <p className="text-gray-600">Fresh opportunities just added to the platform</p>
            </div>
            <Link to="/opportunities">
              <Button variant="outline">Browse All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {recentOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
