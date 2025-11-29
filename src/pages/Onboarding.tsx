import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { 
  Heart, Briefcase, GraduationCap, Users, Trophy, Calendar,
  MapPin, Check, ChevronRight, ChevronLeft, Sparkles, Target,
  Globe, Code, Palette, Stethoscope, Leaf, Dumbbell, Building2
} from 'lucide-react';

const categories = [
  { id: 'volunteering', name: 'Volunteering', icon: Heart, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'workshops', name: 'Workshops', icon: GraduationCap, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: 'competitions', name: 'Competitions', icon: Trophy, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { id: 'internships', name: 'Internships', icon: Briefcase, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 'jobs', name: 'Jobs', icon: Building2, color: 'bg-green-100 text-green-600 border-green-200' },
  { id: 'events', name: 'Events', icon: Calendar, color: 'bg-cyan-100 text-cyan-600 border-cyan-200' },
];

const skills = [
  { id: 'technology', name: 'Technology', icon: Code },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'arts', name: 'Arts & Design', icon: Palette },
  { id: 'health', name: 'Health & Wellness', icon: Stethoscope },
  { id: 'environment', name: 'Environment', icon: Leaf },
  { id: 'sports', name: 'Sports & Fitness', icon: Dumbbell },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'social', name: 'Social Impact', icon: Users },
];

const provinces = [
  'Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Kampong Cham',
  'Kep', 'Kampot', 'Kratie', 'Pursat', 'Takeo', 'Prey Veng', 'Svay Rieng',
  'Kandal', 'Kompong Thom', 'Banteay Meanchey', 'Remote / Online'
];

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [includeRemote, setIncludeRemote] = useState(true);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleLocation = (location: string) => {
    if (location === 'Remote / Online') {
      setIncludeRemote(!includeRemote);
    } else {
      setSelectedLocations(prev => 
        prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
      );
    }
  };

  const handleComplete = () => {
    toast.success('Welcome to Connectify! 🎉', {
      description: 'Your preferences have been saved. Start exploring opportunities tailored for you!',
    });
    navigate('/dashboard');
  };

  const canProceed = () => {
    if (step === 1) return selectedCategories.length > 0;
    if (step === 2) return selectedSkills.length > 0;
    if (step === 3) return selectedLocations.length > 0 || includeRemote;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Connectify
              </span>
            </div>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              Skip for now
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Categories */}
        {step === 1 && (
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">What are you looking for?</h1>
                <p className="text-gray-600">Select the types of opportunities you're interested in</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategories.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                      {isSelected && (
                        <Check className="h-5 w-5 text-blue-600 mx-auto mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {selectedCategories.length} selected
                </div>
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Skills & Interests */}
        {step === 2 && (
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">What are your interests?</h1>
                <p className="text-gray-600">Choose topics that match your skills and passions</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-purple-600 bg-purple-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">{skill.name}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-purple-600 mx-auto mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="text-sm text-gray-500">
                  {selectedSkills.length} selected
                </div>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Where are you located?</h1>
                <p className="text-gray-600">Select your preferred locations for opportunities</p>
              </div>

              {/* Remote Option */}
              <button
                onClick={() => toggleLocation('Remote / Online')}
                className={`w-full p-4 rounded-xl border-2 mb-4 flex items-center justify-between transition-all ${
                  includeRemote 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className={`h-5 w-5 ${includeRemote ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="font-medium">Include Remote / Online Opportunities</span>
                </div>
                {includeRemote && <Check className="h-5 w-5 text-green-600" />}
              </button>

              <div className="mb-4">
                <Label className="text-sm text-gray-600 mb-2 block">Select provinces:</Label>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {provinces.filter(p => p !== 'Remote / Online').map((province) => {
                  const isSelected = selectedLocations.includes(province);
                  return (
                    <button
                      key={province}
                      onClick={() => toggleLocation(province)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        isSelected 
                          ? 'border-green-600 bg-green-50 text-green-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {province}
                      {isSelected && <Check className="h-4 w-4 inline ml-2" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="text-sm text-gray-500">
                  {selectedLocations.length + (includeRemote ? 1 : 0)} selected
                </div>
                <Button 
                  onClick={handleComplete} 
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Complete Setup
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        {(selectedCategories.length > 0 || selectedSkills.length > 0 || selectedLocations.length > 0) && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Your selections:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(id => {
                const cat = categories.find(c => c.id === id);
                return cat ? (
                  <Badge key={id} variant="outline" className="bg-blue-50">
                    {cat.name}
                  </Badge>
                ) : null;
              })}
              {selectedSkills.map(id => {
                const skill = skills.find(s => s.id === id);
                return skill ? (
                  <Badge key={id} variant="outline" className="bg-purple-50">
                    {skill.name}
                  </Badge>
                ) : null;
              })}
              {includeRemote && (
                <Badge variant="outline" className="bg-green-50">
                  Remote
                </Badge>
              )}
              {selectedLocations.map(location => (
                <Badge key={location} variant="outline" className="bg-green-50">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
