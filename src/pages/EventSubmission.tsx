import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { AlertCircle, CheckCircle, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DRAFT_KEY = 'connectify_event_draft';

export function EventSubmission() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    organization: '',
    organizationWebsite: '',
    shortDescription: '',
    fullDescription: '',
    requirements: '',
    benefits: '',
    capacity: '',
    targetAudience: '',
    eventType: '',
    address: '',
    virtualLink: '',
    startDate: '',
    endDate: '',
    deadline: ''
  });
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed.formData);
        setCurrentStep(parsed.currentStep || 1);
        toast.info('Draft restored', {
          description: 'Your previous draft has been loaded.',
        });
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title || formData.organization) {
        saveDraft(true);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [formData, currentStep]);

  const saveDraft = async (auto = false) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        formData,
        currentStep,
        savedAt: new Date().toISOString()
      }));
      
      setLastSaved(new Date());
      
      if (!auto) {
        toast.success('Draft saved!', {
          description: 'Your progress has been saved locally.',
        });
      }
    } catch (error) {
      // Handle localStorage errors (quota exceeded, unavailable, etc.)
      if (!auto) {
        toast.error('Failed to save draft', {
          description: 'Your browser storage may be full or unavailable.',
        });
      }
    }
    
    setIsSaving(false);
  };

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.title || !formData.category || !formData.organization) {
        toast.error('Please fill in required fields', {
          description: 'Title, Category, and Organization are required.',
        });
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!formData.eventType || !formData.startDate || !formData.deadline) {
        toast.error('Please fill in required fields', {
          description: 'Event type, start date, and deadline are required.',
        });
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      saveDraft(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isConfirmed) {
      toast.error('Please confirm your submission', {
        description: 'You must confirm that the information is accurate.',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear draft after successful submission
    localStorage.removeItem(DRAFT_KEY);
    
    toast.success('Submission successful!', {
      description: 'Your opportunity has been submitted for review.',
    });
    
    setIsSubmitting(false);
    navigate('/submission-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        {/* Banner Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-blue-900 mb-1">Admin Approval Required</h3>
            <p className="text-blue-700 text-sm">
              All submissions require admin approval before going live on the platform. 
              Typical review time is 24-48 hours. You'll receive an email notification once your submission is reviewed.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-2">Submit an Opportunity</h1>
          <p className="text-gray-600 mb-8">
            Share your event, workshop, job, or other opportunity with our community
          </p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              <div className={currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}>
                Basic Info
              </div>
              <div className={currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}>
                Details
              </div>
              <div className={currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}>
                Location & Date
              </div>
              <div className={currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}>
                Review & Submit
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-4">Basic Information</h2>
                  
                  <div>
                    <Label htmlFor="title">Opportunity Title *</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., UX Design Workshop for Beginners"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="volunteering">Volunteering</SelectItem>
                        <SelectItem value="workshops">Workshops</SelectItem>
                        <SelectItem value="competitions">Competitions</SelectItem>
                        <SelectItem value="internships">Internships</SelectItem>
                        <SelectItem value="jobs">Jobs</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                    <Select value={formData.subcategory} onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="fun">Fun</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="etc">ETC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization Name *</Label>
                    <Input 
                      id="organization" 
                      placeholder="Your organization or company name"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="organizationWebsite">Organization Website</Label>
                    <Input 
                      id="organizationWebsite" 
                      type="url"
                      placeholder="https://example.com"
                      value={formData.organizationWebsite}
                      onChange={(e) => setFormData({...formData, organizationWebsite: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description * (Max 200 characters)</Label>
                    <Textarea 
                      id="shortDescription" 
                      placeholder="Brief summary that will appear in search results"
                      maxLength={200}
                      rows={3}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    />
                    <div className="text-sm text-gray-500 text-right mt-1">
                      {formData.shortDescription.length}/200
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-4">Detailed Information</h2>

                  <div>
                    <Label htmlFor="fullDescription">Full Description *</Label>
                    <Textarea 
                      id="fullDescription" 
                      placeholder="Provide a detailed description of the opportunity..."
                      rows={8}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea 
                      id="requirements" 
                      placeholder="List requirements (one per line)&#10;• Requirement 1&#10;• Requirement 2"
                      rows={5}
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="benefits">Benefits</Label>
                    <Textarea 
                      id="benefits" 
                      placeholder="List benefits (one per line)&#10;• Benefit 1&#10;• Benefit 2"
                      rows={5}
                      value={formData.benefits}
                      onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input 
                        id="capacity" 
                        placeholder="e.g., 50 or Unlimited"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Input 
                        id="targetAudience" 
                        placeholder="e.g., College students, Recent graduates"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Date */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-4">Location & Date Information</h2>

                  <div>
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inperson">In-Person</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.eventType === 'inperson' || formData.eventType === 'hybrid') && (
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input 
                        id="address" 
                        placeholder="123 Main St, City, State ZIP"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                      <div className="mt-3 bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500">
                        Map Preview (Click to select location)
                      </div>
                    </div>
                  )}

                  {(formData.eventType === 'remote' || formData.eventType === 'hybrid') && (
                    <div>
                      <Label htmlFor="virtualLink">Virtual Meeting Link</Label>
                      <Input 
                        id="virtualLink" 
                        type="url"
                        placeholder="https://zoom.us/j/..."
                        value={formData.virtualLink}
                        onChange={(e) => setFormData({...formData, virtualLink: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startDate">Start Date & Time *</Label>
                      <Input 
                        id="startDate" 
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate">End Date & Time *</Label>
                      <Input 
                        id="endDate" 
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deadline">Application Deadline *</Label>
                    <Input 
                      id="deadline" 
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-4">Review Your Submission</h2>

                  {/* Preview Card */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    <h3 className="text-lg mb-2">Preview</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This is how your opportunity will appear to users once approved
                    </p>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-2 mb-3">
                          <Badge className="bg-blue-100 text-blue-700">
                            {formData.category || 'Category'}
                          </Badge>
                          <Badge variant="outline" className="text-blue-600 border-blue-600 gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Pending Review
                          </Badge>
                        </div>
                        <h4 className="text-xl mb-2">{formData.title || 'Your Opportunity Title'}</h4>
                        <p className="text-gray-600 mb-3">{formData.organization || 'Your Organization'}</p>
                        <p className="text-gray-700 text-sm line-clamp-3">
                          {formData.shortDescription || 'Your short description will appear here...'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Confirmation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="mb-3">What happens next?</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Your submission will be reviewed by our admin team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>You'll receive an email notification within 24-48 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Once approved, your opportunity will be visible to all users</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="confirm" 
                      checked={isConfirmed}
                      onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                    />
                    <Label htmlFor="confirm" className="cursor-pointer">
                      I confirm that this information is accurate and complete *
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  Previous
                </Button>

                <Button 
                  variant="ghost" 
                  className="gap-2"
                  onClick={() => saveDraft()}
                  disabled={isSaving || isSubmitting}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isSaving ? 'Saving...' : 'Save as Draft'}
                </Button>

                {currentStep < totalSteps ? (
                  <Button 
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit for Review'
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Auto-save Indicator */}
          <div className="text-center mt-4 text-sm text-gray-500">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 inline mr-1 animate-spin" />
                Saving...
              </>
            ) : lastSaved ? (
              <>
                <CheckCircle className="h-4 w-4 inline mr-1 text-green-500" />
                Last saved {lastSaved.toLocaleTimeString()}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Changes will auto-save
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
