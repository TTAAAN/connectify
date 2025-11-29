import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockOpportunities } from '../lib/mockData';
import { toast } from 'sonner';
import { 
  MapPin, Calendar, Bookmark, CheckCircle, Trash2, ExternalLink, Search
} from 'lucide-react';

export function SavedOpportunities() {
  const [savedOpportunities, setSavedOpportunities] = useState(mockOpportunities.slice(0, 4));

  const handleRemoveSaved = (id: string, title: string) => {
    setSavedOpportunities(prev => prev.filter(opp => opp.id !== id));
    toast.success('Removed from saved', {
      description: `${title} has been removed from your saved items.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Saved Opportunities</h1>
          <p className="text-gray-600">Your bookmarked opportunities for quick access</p>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">Your Saved Items</h3>
              <Badge variant="outline" className="text-blue-600 px-3 py-1">{savedOpportunities.length} saved</Badge>
            </div>
            
            {savedOpportunities.length > 0 ? (
              <div className="space-y-6">
                {savedOpportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className="border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-all hover:border-blue-200 bg-white"
                  >
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-blue-100 text-blue-700">{opportunity.category}</Badge>
                        <h4 className="text-lg font-medium">{opportunity.title}</h4>
                        {opportunity.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{opportunity.organization}</p>
                      <div className="flex items-center gap-8 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {opportunity.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(opportunity.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        className="text-gray-500 hover:text-red-600 hover:border-red-200"
                        onClick={() => handleRemoveSaved(opportunity.id, opportunity.title)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                      <Link to={`/opportunity/${opportunity.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Bookmark className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                <h4 className="text-xl text-gray-700 mb-3">No saved opportunities</h4>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start exploring and save opportunities you're interested in to access them quickly later
                </p>
                <Link to="/opportunities">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Opportunities
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
