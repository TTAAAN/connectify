import { Bell, Search, User, Shield, Clock, CheckCircle, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface HeaderProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'pending';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Submission Approved',
    message: 'Your "Community Food Drive" event has been approved and is now live!',
    time: '5 min ago',
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'New Opportunity Near You',
    message: 'Tech Workshop at Innovation Hub - 2km away',
    time: '2 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: '3',
    title: 'Submission Under Review',
    message: 'Your "Marketing Internship" posting is being reviewed by our team.',
    time: '1 day ago',
    read: false,
    type: 'pending'
  }
];

export function Header({ isAuthenticated = false, isAdmin = false }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

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
    toast.info('Notification dismissed');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`);
      navigate(`/opportunities?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">C</span>
            </div>
            <span className="text-2xl bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Connectify
            </span>
          </Link>

          {/* Navigation */}
          {isAuthenticated && !isAdmin && (
            <nav className="flex items-center gap-6">
              <Link to="/opportunities" className="text-gray-700 hover:text-blue-600 transition-colors">
                Opportunities
              </Link>
              <Link to="/map" className="text-gray-700 hover:text-blue-600 transition-colors">
                Map
              </Link>
              <Link to="/saved" className="text-gray-700 hover:text-blue-600 transition-colors">
                Saved
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                Profile
              </Link>
            </nav>
          )}

          {/* Search Bar (for authenticated users) */}
          {isAuthenticated && !isAdmin && (
            <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search opportunities..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Admin Button - Always shown for demonstration */}
                <Link to="/admin">
                  <Button variant="outline" className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {unreadCount}
                  </Badge>
                </Button>
                <Link to="/profile">
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-500 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div ref={notificationRef} className="absolute right-6 top-16 bg-white shadow-xl rounded-lg border w-96 z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-sm text-blue-600 hover:text-blue-700" 
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 border-b hover:bg-blue-100 transition-colors cursor-pointer ${
                    !n.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {n.type === 'success' && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                      {n.type === 'info' && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bell className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      {n.type === 'pending' && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm ${!n.read ? '' : 'text-gray-700'}`}>
                          {n.title}
                        </h4>
                        <button
                          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(n.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}