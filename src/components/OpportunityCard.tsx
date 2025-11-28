import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { MapPin, Calendar, Bookmark, CheckCircle, Clock, Building2, User } from 'lucide-react';
import { Opportunity } from '../lib/mockData';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const categoryColors: Record<string, string> = {
    'Volunteering': 'bg-sky-100 text-sky-700',
    'Workshops': 'bg-blue-100 text-blue-700',
    'Competitions': 'bg-indigo-100 text-indigo-700',
    'Internships': 'bg-cyan-100 text-cyan-700',
    'Jobs': 'bg-blue-200 text-blue-800',
    'Events': 'bg-blue-50 text-blue-600'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={categoryColors[opportunity.category]}>
            {opportunity.category}
          </Badge>
          {opportunity.isPartnered ? (
            <Badge className="bg-slate-700 text-white flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Partnered
            </Badge>
          ) : (
            <Badge className="bg-slate-100 text-slate-700 flex items-center gap-1">
              <User className="h-3 w-3" />
              User
            </Badge>
          )}
        </div>
        <h3 className="text-xl">{opportunity.title}</h3>
        <p className="text-gray-600">{opportunity.organization}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(opportunity.date).toLocaleDateString()}</span>
          </div>
        </div>
        <p className="mt-3 text-gray-700 line-clamp-2">
          {opportunity.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between mt-auto">
        <Link to={`/opportunity/${opportunity.id}`}>
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 h-10">
            View Details
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Bookmark className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}