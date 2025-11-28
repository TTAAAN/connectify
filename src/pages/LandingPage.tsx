import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  Search, MapPin, Bell, CheckCircle, 
  Users, Briefcase, Calendar, TrendingUp,
  Shield, Zap, Target
} from 'lucide-react';
import { partnerLogos, testimonials } from '../lib/mockData';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl mb-6 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Find Your Next Opportunity
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Discover volunteering, workshops, competitions, internships, jobs, and events — all verified by our admin team for your peace of mind.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button size="lg" variant="outline" className="text-lg px-8 border-blue-300 text-blue-700 hover:bg-blue-50">
                  Browse Opportunities
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Join 10,000+ students and graduates already using Connectify
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl text-center mb-12 text-slate-800">Why Choose Connectify?</h2>
          <div className="grid grid-cols-4 gap-8">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Smart Search & Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Find exactly what you're looking for with powerful filters and intelligent search.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>Interactive Map</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Visualize opportunities near you with our interactive map view.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Admin Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Every opportunity is reviewed by our moderation team for authenticity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-sky-600" />
                </div>
                <CardTitle>Smart Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Get personalized alerts for opportunities that match your interests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Showcase */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl mb-2">2,500+</div>
              <div className="text-blue-100">Opportunities Listed</div>
            </div>
            <div>
              <div className="text-5xl mb-2">10,000+</div>
              <div className="text-blue-100">Students Helped</div>
            </div>
            <div>
              <div className="text-5xl mb-2">500+</div>
              <div className="text-blue-100">Partner Organizations</div>
            </div>
            <div>
              <div className="text-5xl mb-2">95%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl text-center mb-12 text-slate-800">How It Works</h2>
          
          {/* For Users */}
          <div className="mb-12">
            <h3 className="text-2xl text-center mb-8 text-blue-700">For Students & Graduates</h3>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">1</span>
                </div>
                <h4 className="text-xl mb-2 text-slate-800">Create Your Profile</h4>
                <p className="text-slate-600">
                  Sign up for free and set your preferences to receive personalized recommendations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">2</span>
                </div>
                <h4 className="text-xl mb-2 text-slate-800">Discover & Browse</h4>
                <p className="text-slate-600">
                  Search through verified opportunities using filters, map view, or personalized feed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">3</span>
                </div>
                <h4 className="text-xl mb-2 text-slate-800">Apply & Connect</h4>
                <p className="text-slate-600">
                  Apply directly through our platform or visit organization websites with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* For Organizations */}
          <div>
            <h3 className="text-2xl text-center mb-8 text-blue-700">For normal users</h3>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl text-slate-800">Post Your Event or Opportunity</h4>
                      <p className="text-slate-600">Submit your listing for admin review (24-48 hours)</p>
                    </div>
                  </div>
                  <Link to="/submit">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Submit an Opportunity
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Verification Badge */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4 text-slate-800">Trust Through Moderation</h2>
            <p className="text-xl text-slate-600 mb-6">
              Every opportunity on Connectify goes through our rigorous admin review process. Look for the verified badge to ensure legitimacy and quality.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="mb-2 text-slate-800">Quality Check</h4>
                <p className="text-sm text-slate-600">We verify organization details and opportunity authenticity</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <Shield className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                <h4 className="mb-2 text-slate-800">Safety First</h4>
                <p className="text-sm text-slate-600">Flagged content is reviewed immediately</p>
              </div>
              <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-100">
                <Users className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                <h4 className="mb-2 text-slate-800">Community Trust</h4>
                <p className="text-sm text-slate-600">Users can report problematic content</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students discovering their next big opportunity
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
