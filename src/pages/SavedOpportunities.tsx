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

      <div className="container mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Saved Opportunities</h1>
          <p className="text-gray-600 text-lg">Your bookmarked opportunities for quick access</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-semibold">Your Saved Items</h3>
              <Badge variant="outline" className="text-blue-600 px-4 py-2 text-sm">{savedOpportunities.length} saved</Badge>
            </div>
            
            {savedOpportunities.length > 0 ? (
              <div className="space-y-8">
                {savedOpportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className="border rounded-xl p-8 flex items-center justify-between hover:shadow-lg transition-all hover:border-blue-300 bg-white"
                  >
                    <div className="flex-1 pr-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-blue-100 text-blue-700 px-3 py-1">{opportunity.category}</Badge>
                        <h4 className="text-xl font-semibold">{opportunity.title}</h4>
                        {opportunity.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-5 text-base">{opportunity.organization}</p>
                      <div className="flex items-center gap-10 text-sm text-gray-500">
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
                    <div className="flex items-center gap-5">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="text-gray-500 hover:text-red-600 hover:border-red-200"
                        onClick={() => handleRemoveSaved(opportunity.id, opportunity.title)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                      <Link to={`/opportunity/${opportunity.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Bookmark className="h-20 w-20 mx-auto text-gray-300 mb-8" />
                <h4 className="text-2xl text-gray-700 mb-4">No saved opportunities</h4>
                <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                  Start exploring and save opportunities you're interested in to access them quickly later
                </p>
                <Link to="/opportunities">
                  <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
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
