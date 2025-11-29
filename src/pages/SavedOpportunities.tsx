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

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Saved Opportunities</h1>
          <p className="text-gray-600">Your bookmarked opportunities for quick access</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Your Saved Items</h3>
              <Badge variant="outline" className="text-blue-600">{savedOpportunities.length} saved</Badge>
            </div>
            
            {savedOpportunities.length > 0 ? (
              <div className="space-y-4">
                {savedOpportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-all hover:border-blue-200 bg-white"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-700">{opportunity.category}</Badge>
                        <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                        {opportunity.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{opportunity.organization}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {opportunity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(opportunity.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-gray-500 hover:text-red-600 hover:border-red-200"
                        onClick={() => handleRemoveSaved(opportunity.id, opportunity.title)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                      <Link to={`/opportunity/${opportunity.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h4 className="text-xl text-gray-700 mb-2">No saved opportunities</h4>
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
