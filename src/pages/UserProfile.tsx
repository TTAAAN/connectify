import { useState } from 'react';
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
import { 
  User, Mail, MapPin, Calendar, Bookmark,
  Send, FileText, Lock, Edit, CheckCircle, Clock, Upload, Camera
} from 'lucide-react';

export function UserProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const savedOpportunities = mockOpportunities.slice(0, 4);

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
      // Here you would typically upload to a server
      console.log('Photo uploaded successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl mb-8">My Profile</h1>

        <div className="grid grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Overview */}
          <div className="col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
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
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="submissions">My Submissions</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-8">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input id="firstName" defaultValue="Jane" className="h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input id="email" type="email" defaultValue="jane.doe@email.com" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                        <Input id="location" placeholder="City, State/Country" className="h-11" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Tell us about yourself..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-10 pt-6 border-t">
                      <Button variant="outline" className="px-6">Cancel</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-8">Preferences & Interests</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <Label className="text-base font-medium mb-4 block">Interested Categories</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {['Volunteering', 'Workshops', 'Competitions', 'Internships', 'Jobs', 'Events'].map((cat) => (
                            <div key={cat} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                              <Switch id={cat} defaultChecked={cat === 'Workshops' || cat === 'Internships'} />
                              <Label htmlFor={cat} className="cursor-pointer font-normal">{cat}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-medium mb-4 block">Notification Settings</Label>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                              <div className="font-medium">Email Notifications</div>
                              <div className="text-sm text-gray-600 mt-1">Receive updates about new opportunities</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                              <div className="font-medium">Deadline Reminders</div>
                              <div className="text-sm text-gray-600 mt-1">Get notified 3 days before deadlines</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                              <div className="font-medium">Weekly Digest</div>
                              <div className="text-sm text-gray-600 mt-1">Summary of new opportunities each week</div>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="preferredLocation" className="text-sm font-medium">Preferred Location</Label>
                        <Input id="preferredLocation" placeholder="e.g., San Francisco, CA" className="h-11 max-w-md" />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-10 pt-6 border-t">
                      <Button variant="outline" className="px-6">Cancel</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved Opportunities Tab */}
              <TabsContent value="saved" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-8">Saved Opportunities</h3>
                    <div className="space-y-4">
                      {savedOpportunities.map((opportunity) => (
                        <div key={opportunity.id} className="border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow bg-white">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-lg font-medium">{opportunity.title}</h4>
                              {opportunity.verified && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{opportunity.organization}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
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
                          <div className="flex items-center gap-3 ml-6">
                            <Button variant="outline" className="px-4">Remove</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 px-4">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-8">Application History</h3>
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
                          <div key={opportunity.id} className="border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium mb-2">{opportunity.title}</h4>
                              <p className="text-gray-600 text-sm mb-3">{opportunity.organization}</p>
                              <div className="flex items-center gap-4">
                                <Badge className={statusColors[status]}>{status}</Badge>
                                <span className="text-sm text-gray-500">Applied on Nov {10 + index}, 2025</span>
                              </div>
                            </div>
                            <Button variant="outline" className="px-4">View Application</Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Submissions Tab */}
              <TabsContent value="submissions" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-8">My Event Submissions</h3>
                    <div className="space-y-6">
                      <div className="border rounded-xl p-6 bg-blue-50/50">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium mb-2">Blockchain Development Conference</h4>
                            <p className="text-gray-600 text-sm">Submitted on Nov 15, 2025</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 gap-1 px-3 py-1">
                            <Clock className="h-3 w-3" />
                            Under Review
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Your submission is currently being reviewed by our admin team. Typical review time is 24-48 hours.
                        </p>
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm" className="px-4">Edit Submission</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 px-4">Withdraw</Button>
                        </div>
                      </div>

                      <div className="text-center py-12 border-2 border-dashed rounded-xl">
                        <p className="text-gray-600 mb-4">Want to share an opportunity with the community?</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                          Submit New Event
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-8">Security Settings</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-lg font-medium mb-6">Change Password</h4>
                        <div className="space-y-5 max-w-lg">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                            <Input id="currentPassword" type="password" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                            <Input id="newPassword" type="password" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" className="h-11" />
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 px-6 mt-2">
                            Update Password
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-lg font-medium mb-6">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between max-w-lg p-4 rounded-lg border">
                          <div>
                            <div className="font-medium">Enable 2FA</div>
                            <div className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</div>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-lg font-medium mb-6">Connected Accounts</h4>
                        <div className="space-y-4 max-w-lg">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <span className="font-medium">Google</span>
                            <Button variant="outline" size="sm" className="px-4">Connect</Button>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <span className="font-medium">LinkedIn</span>
                            <Button variant="outline" size="sm" className="px-4">Connect</Button>
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