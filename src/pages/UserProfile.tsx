import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { mockOpportunities } from '../lib/mockData';
import { toast } from 'sonner';
import { 
  MapPin, Calendar, Bookmark,
  Edit, CheckCircle, Clock, Upload, Camera, Loader2, Trash2, ExternalLink
} from 'lucide-react';

export function UserProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const savedOpportunities = mockOpportunities.slice(0, 4);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Changes saved successfully!');
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = () => {
    if (previewUrl) {
      setSelectedPhoto(previewUrl);
      setIsPhotoDialogOpen(false);
      setPreviewUrl(null);
      toast.success('Profile photo updated!');
    }
  };

  const handleRemoveSaved = (title: string) => {
    toast.info('Removed from saved', {
      description: `${title} has been removed from your saved items.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl mb-8">My Profile</h1>

        <div className="grid grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Overview */}
          <div className="col-span-1">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-blue-50">
                      {selectedPhoto ? (
                        <img src={selectedPhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-500 text-white text-3xl">
                          JD
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-4 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-1.5 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsPhotoDialogOpen(true)}>
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h2 className="text-xl mb-1">Jane Doe</h2>
                  <p className="text-sm text-gray-600 mb-2">jane.doe@email.com</p>
                  <Badge className="bg-blue-100 text-blue-700">Student</Badge>
                </div>

                <Separator className="my-4" />

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Member Since</span>
                    <span>Jan 2025</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Saved Items</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Applications</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Submissions</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">1</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6" onClick={() => setIsPhotoDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Photo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Tabbed Sections */}
          <div className="col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-6 w-full mb-6 h-12">
                <TabsTrigger value="personal" className="text-sm">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences" className="text-sm">Preferences</TabsTrigger>
                <TabsTrigger value="saved" className="text-sm">Saved</TabsTrigger>
                <TabsTrigger value="applications" className="text-sm">Applications</TabsTrigger>
                <TabsTrigger value="submissions" className="text-sm">My Submissions</TabsTrigger>
                <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="mt-0">
                <Card className="shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-8">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Jane" className="h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="jane.doe@email.com" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State/Country" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Tell us about yourself..."
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                    </div>
                    <Separator className="my-8" />
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" className="h-11 px-6">Cancel</Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 h-11 px-6"
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="mt-0">
                <Card className="shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-8">Preferences & Interests</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <Label className="text-base font-medium mb-4 block">Interested Categories</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {['Volunteering', 'Workshops', 'Competitions', 'Internships', 'Jobs', 'Events'].map((cat) => (
                            <div key={cat} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Switch id={cat} defaultChecked={cat === 'Workshops' || cat === 'Internships'} />
                              <Label htmlFor={cat} className="cursor-pointer">{cat}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-medium mb-4 block">Notification Settings</Label>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">Email Notifications</div>
                              <div className="text-sm text-gray-600">Receive updates about new opportunities</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">Deadline Reminders</div>
                              <div className="text-sm text-gray-600">Get notified 3 days before deadlines</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">Weekly Digest</div>
                              <div className="text-sm text-gray-600">Summary of new opportunities each week</div>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="preferredLocation">Preferred Location</Label>
                        <Input id="preferredLocation" placeholder="e.g., San Francisco, CA" className="h-11 max-w-md" />
                      </div>
                    </div>

                    <Separator className="my-8" />
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" className="h-11 px-6">Cancel</Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 h-11 px-6"
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Preferences'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved Opportunities Tab */}
              <TabsContent value="saved" className="mt-0">
                <Card className="shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-semibold">Saved Opportunities</h3>
                      <Badge variant="outline" className="text-blue-600">{savedOpportunities.length} saved</Badge>
                    </div>
                    <div className="space-y-4">
                      {savedOpportunities.map((opportunity) => (
                        <div key={opportunity.id} className="border rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all hover:border-blue-200 bg-white">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-lg font-medium">{opportunity.title}</h4>
                              {opportunity.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{opportunity.organization}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                {opportunity.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {new Date(opportunity.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-gray-500 hover:text-red-600 hover:border-red-200"
                              onClick={() => handleRemoveSaved(opportunity.title)}
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
                    {savedOpportunities.length === 0 && (
                      <div className="text-center py-12">
                        <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h4 className="text-lg text-gray-700 mb-2">No saved opportunities</h4>
                        <p className="text-gray-500 mb-4">Start exploring and save opportunities you're interested in</p>
                        <Link to="/opportunities">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Browse Opportunities
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="mt-0">
                <Card className="shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-8">Application History</h3>
                    <div className="space-y-4">
                      {mockOpportunities.slice(0, 5).map((opportunity, index) => {
                        const statuses = ['Under Review', 'Accepted', 'Pending', 'Submitted', 'Waitlisted'];
                        const status = statuses[index % statuses.length];
                        const statusColors: Record<string, string> = {
                          'Under Review': 'bg-blue-100 text-blue-700',
                          'Accepted': 'bg-green-100 text-green-700',
                          'Pending': 'bg-blue-100 text-blue-700',
                          'Submitted': 'bg-gray-100 text-gray-700',
                          'Waitlisted': 'bg-yellow-100 text-yellow-700'
                        };

                        return (
                          <div key={opportunity.id} className="border rounded-lg p-4 flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg mb-1">{opportunity.title}</h4>
                              <p className="text-gray-600 text-sm mb-2">{opportunity.organization}</p>
                              <div className="flex items-center gap-3">
                                <Badge className={statusColors[status]}>{status}</Badge>
                                <span className="text-sm text-gray-500">Applied on Nov {10 + index}, 2025</span>
                              </div>
                            </div>
                            <Button variant="outline">View Application</Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Submissions Tab */}
              <TabsContent value="submissions">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl mb-6">My Event Submissions</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg mb-1">Blockchain Development Conference</h4>
                            <p className="text-gray-600 text-sm">Submitted on Nov 15, 2025</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 gap-1">
                            <Clock className="h-3 w-3" />
                            Under Review
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Your submission is currently being reviewed by our admin team. Typical review time is 24-48 hours.
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Edit Submission</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Withdraw</Button>
                        </div>
                      </div>

                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Want to share an opportunity with the community?</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Submit New Event
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl mb-6">Security Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-4">Change Password</h4>
                        <div className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Update Password
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="mb-4">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between max-w-md">
                          <div>
                            <div className="font-medium">Enable 2FA</div>
                            <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="mb-4">Connected Accounts</h4>
                        <div className="space-y-3 max-w-md">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <span>Google</span>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <span>LinkedIn</span>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />

      {/* Photo Upload Dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogDescription>
              Upload a new profile photo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center mt-4">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-500 text-white text-3xl">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Label
              htmlFor="picture"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-6 w-6 text-gray-500 mb-2" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <Input
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Label>
          </div>
          {previewUrl && (
            <div className="flex items-center justify-center mt-4">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-500 text-white text-3xl">
                  JD
                </AvatarFallback>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 mx-auto mb-4"
                />
              </Avatar>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              className="bg-gray-100 text-gray-900 hover:bg-gray-200"
              onClick={() => setIsPhotoDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handlePhotoUpload}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}