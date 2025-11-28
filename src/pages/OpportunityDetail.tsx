import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { OpportunityCard } from '../components/OpportunityCard';
import { mockOpportunities } from '../lib/mockData';
import { 
  MapPin, Calendar, Clock, Users, Mail, Globe, 
  Bookmark, Share2, Flag, CheckCircle, AlertCircle,
  ChevronRight, ExternalLink, Building2, User
} from 'lucide-react';

export function OpportunityDetail() {
  const { id } = useParams();
  const opportunity = mockOpportunities.find(o => o.id === id);
  const similarOpportunities = mockOpportunities.filter(o => o.id !== id && o.category === opportunity?.category).slice(0, 3);

  if (!opportunity) {
    return <div>Opportunity not found</div>;
  }

  const categoryColors: Record<string, string> = {
    'Volunteering': 'bg-sky-100 text-sky-700',
    'Workshops': 'bg-blue-100 text-blue-700',
    'Competitions': 'bg-indigo-100 text-indigo-700',
    'Internships': 'bg-cyan-100 text-cyan-700',
    'Jobs': 'bg-blue-200 text-blue-800',
    'Events': 'bg-blue-50 text-blue-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/opportunities" className="hover:text-blue-600">Opportunities</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/opportunities" className="hover:text-blue-600">{opportunity.category}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{opportunity.title}</span>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Hero Section */}
            <div className="bg-white rounded-lg border p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  {opportunity.organization.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className={categoryColors[opportunity.category]}>
                      {opportunity.category}
                    </Badge>
                    
                    {opportunity.isPartnered ? (
                      <Badge className="bg-slate-700 text-white gap-1">
                        <Building2 className="h-3 w-3" />
                        Partnered Organization
                      </Badge>
                    ) : (
                      <>
                        <Badge className="bg-slate-100 text-slate-700 gap-1">
                          <User className="h-3 w-3" />
                          User
                        </Badge>
                        {opportunity.verified ? (
                          <Badge className="bg-blue-50 text-blue-700 gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified by Admin
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-blue-600 border-blue-600 gap-1">
                            <Clock className="h-3 w-3" />
                            Pending Verification
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  <h1 className="text-4xl mb-2">{opportunity.title}</h1>
                  <p className="text-xl text-gray-600">{opportunity.organization}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!opportunity.isPartnered && !opportunity.verified}
                >
                  {(opportunity.isPartnered || opportunity.verified) ? 'Apply Now' : 'Pending Verification'}
                </Button>
                <Button variant="outline" size="lg">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="lg" className="ml-auto">
                  <Flag className="h-5 w-5 mr-2" />
                  Report
                </Button>
              </div>

              {!opportunity.isPartnered && !opportunity.verified && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-900 mb-1">This opportunity is pending admin verification</p>
                    <p className="text-blue-700">Applications will be enabled once our moderation team verifies the authenticity of this listing.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {opportunity.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">Benefits</h2>
                <ul className="space-y-2">
                  {opportunity.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* About Organization */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl mb-4">About {opportunity.organization}</h2>
                <p className="text-gray-700">
                  {opportunity.organization} is committed to creating meaningful opportunities for students and graduates. 
                  Visit our website to learn more about our mission and impact.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Key Information */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-lg mb-4">Key Information</h3>
                
                <div className="space-y-4">
                  {/* Status */}
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <Badge className={
                      opportunity.status === 'Open' ? 'bg-green-100 text-green-700' :
                      opportunity.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }>
                      {opportunity.status}
                    </Badge>
                  </div>

                  <Separator />

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Event Date</div>
                      <div>{new Date(opportunity.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div>{opportunity.location}</div>
                      {opportunity.isRemote && <Badge variant="outline" className="mt-1">Remote</Badge>}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Application Deadline</div>
                      <div>{new Date(opportunity.deadline).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Capacity</div>
                      <div>{opportunity.capacity} {opportunity.capacity !== 'Unlimited' ? 'spots' : ''}</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact */}
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Contact</div>
                      <a href={`mailto:${opportunity.contact}`} className="text-blue-600 hover:underline">
                        {opportunity.contact}
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Website</div>
                      <a href={opportunity.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        Visit website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <Separator />

                  {/* Meta Information */}
                  <div>
                    <div className="text-sm text-gray-600">Posted</div>
                    <div className="text-sm">{new Date(opportunity.postedDate).toLocaleDateString()}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Last Updated</div>
                    <div className="text-sm">{new Date(opportunity.lastUpdated).toLocaleDateString()}</div>
                  </div>

                  {!opportunity.isPartnered && opportunity.verified && opportunity.verifiedDate && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Verified by Admin
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Verified on {new Date(opportunity.verifiedDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map Preview */}
            {!opportunity.isRemote && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg mb-4">Location</h3>
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-gray-400" />
                  </div>
                  <Link to="/map">
                    <Button variant="outline" className="w-full mt-4">
                      View on Map
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Similar Opportunities */}
        {similarOpportunities.length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-3xl mb-6">Similar Opportunities</h2>
            <div className="grid grid-cols-3 gap-6">
              {similarOpportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
