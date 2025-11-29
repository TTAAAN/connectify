import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { 
  Bell, CheckCircle, Clock, AlertCircle, X, Settings, 
  Mail, Smartphone, Calendar, Trash2, ExternalLink,
  Filter, BellRing, BellOff, Check
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  type: 'success' | 'info' | 'warning' | 'deadline' | 'application';
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Submission Approved! 🎉',
    message: 'Your "Community Food Drive" event has been approved and is now live on the platform.',
    time: '5 min ago',
    date: '2025-11-29',
    read: false,
    type: 'success',
    link: '/opportunity/1'
  },
  {
    id: '2',
    title: 'New Opportunity Near You',
    message: 'Tech Workshop at Innovation Hub - 2km away. Matches your interests in Technology.',
    time: '2 hours ago',
    date: '2025-11-29',
    read: false,
    type: 'info',
    link: '/opportunity/5'
  },
  {
    id: '3',
    title: 'Application Status Update',
    message: 'Your application for "UX Design Internship" is now under review.',
    time: '5 hours ago',
    date: '2025-11-29',
    read: false,
    type: 'application',
    link: '/profile?tab=applications'
  },
  {
    id: '4',
    title: 'Deadline Reminder ⏰',
    message: 'The deadline for "Blockchain Development Conference" is in 3 days.',
    time: '1 day ago',
    date: '2025-11-28',
    read: true,
    type: 'deadline',
    link: '/opportunity/10'
  },
  {
    id: '5',
    title: 'Submission Under Review',
    message: 'Your "Marketing Internship" posting is being reviewed by our team. Typical review time is 24-48 hours.',
    time: '2 days ago',
    date: '2025-11-27',
    read: true,
    type: 'warning'
  },
  {
    id: '6',
    title: 'Application Accepted! 🎊',
    message: 'Congratulations! Your application for "Data Science Workshop" has been accepted.',
    time: '3 days ago',
    date: '2025-11-26',
    read: true,
    type: 'success',
    link: '/opportunity/15'
  },
  {
    id: '7',
    title: 'Weekly Digest',
    message: '12 new opportunities matching your interests were posted this week.',
    time: '4 days ago',
    date: '2025-11-25',
    read: true,
    type: 'info',
    link: '/opportunities'
  },
];

const notificationSettings = [
  {
    id: 'email_new_opportunities',
    title: 'New Opportunities',
    description: 'Get notified when new opportunities match your interests',
    email: true,
    push: true,
  },
  {
    id: 'email_deadlines',
    title: 'Deadline Reminders',
    description: 'Receive reminders 3 days before saved opportunity deadlines',
    email: true,
    push: true,
  },
  {
    id: 'email_applications',
    title: 'Application Updates',
    description: 'Updates on your application status',
    email: true,
    push: true,
  },
  {
    id: 'email_submissions',
    title: 'Submission Reviews',
    description: 'Notifications about your event submission reviews',
    email: true,
    push: false,
  },
  {
    id: 'email_weekly',
    title: 'Weekly Digest',
    description: 'Summary of new opportunities each week',
    email: true,
    push: false,
  },
  {
    id: 'email_marketing',
    title: 'Platform Updates',
    description: 'News and updates about Connectify features',
    email: false,
    push: false,
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState(notificationSettings);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info('Notification deleted');
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.read));
    toast.info('Cleared all read notifications');
  };

  const toggleSetting = (id: string, type: 'email' | 'push') => {
    setSettings(prev => 
      prev.map(s => s.id === id ? { ...s, [type]: !s[type] } : s)
    );
    toast.success('Notification preference updated');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'deadline':
        return <Calendar className="h-5 w-5 text-red-600" />;
      case 'application':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'deadline':
        return 'bg-red-100';
      case 'application':
        return 'bg-blue-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your opportunities and applications</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="notifications" className="gap-2">
              <BellRing className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-0">
                {/* Toolbar */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={filter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('all')}
                      className={filter === 'all' ? 'bg-blue-600' : ''}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === 'unread' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('unread')}
                      className={filter === 'unread' ? 'bg-blue-600' : ''}
                    >
                      Unread ({unreadCount})
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        <Check className="h-4 w-4 mr-1" />
                        Mark all read
                      </Button>
                    )}
                    {notifications.some(n => n.read) && (
                      <Button variant="ghost" size="sm" onClick={clearAllRead} className="text-gray-500">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear read
                      </Button>
                    )}
                  </div>
                </div>

                {/* Notification List */}
                <div className="divide-y">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-12 text-center">
                      <BellOff className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl text-gray-700 mb-2">
                        {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {filter === 'unread' 
                          ? "You're all caught up! Check back later for new updates."
                          : "When you receive notifications about opportunities and applications, they'll appear here."}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full ${getNotificationBg(notification.type)} flex items-center justify-center flex-shrink-0`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium text-gray-700'}`}>
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                                <button
                                  className="text-gray-400 hover:text-gray-600 p-1"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                              {notification.link && (
                                <Link to={notification.link}>
                                  <Button size="sm" variant="outline" className="h-8">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View Details
                                  </Button>
                                </Link>
                              )}
                              {!notification.read && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 text-gray-500"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
                <p className="text-gray-600 mb-8">
                  Choose how you want to be notified about opportunities and updates.
                </p>

                <div className="space-y-6">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-2 border-b">
                    <div className="col-span-8">Notification Type</div>
                    <div className="col-span-2 text-center flex items-center justify-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                    <div className="col-span-2 text-center flex items-center justify-center gap-1">
                      <Smartphone className="h-4 w-4" />
                      Push
                    </div>
                  </div>

                  {/* Settings */}
                  {settings.map((setting) => (
                    <div key={setting.id} className="grid grid-cols-12 gap-4 items-center py-2">
                      <div className="col-span-8">
                        <div className="font-medium">{setting.title}</div>
                        <div className="text-sm text-gray-500">{setting.description}</div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Switch
                          checked={setting.email}
                          onCheckedChange={() => toggleSetting(setting.id, 'email')}
                        />
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Switch
                          checked={setting.push}
                          onCheckedChange={() => toggleSetting(setting.id, 'push')}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-8" />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Email Frequency</h4>
                  <p className="text-sm text-blue-700 mb-4">
                    You're currently receiving immediate notifications for important updates. 
                    Weekly digest emails are sent every Monday morning.
                  </p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Manage Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
