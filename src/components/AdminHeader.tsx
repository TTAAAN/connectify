import { Bell, Shield, Home, Clock, CheckCircle, X, AlertTriangle, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useRef, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'pending' | 'flagged' | 'approved' | 'info';
}

const mockAdminNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Submission',
    message: 'Beach Cleanup Initiative - Volunteering event awaiting review',
    time: '2 min ago',
    read: false,
    type: 'pending'
  },
  {
    id: '2',
    title: 'Content Flagged',
    message: 'User reported "Tech Internship Program" for inappropriate content',
    time: '15 min ago',
    read: false,
    type: 'flagged'
  },
  {
    id: '3',
    title: 'Bulk Action Complete',
    message: 'Successfully approved 8 workshop submissions',
    time: '1 hour ago',
    read: false,
    type: 'approved'
  },
  {
    id: '4',
    title: 'New Submission',
    message: 'Marketing Workshop - Event submission needs review',
    time: '2 hours ago',
    read: false,
    type: 'pending'
  },
  {
    id: '5',
    title: 'System Alert',
    message: 'Review queue has reached 12 pending items',
    time: '3 hours ago',
    read: false,
    type: 'info'
  }
];

export function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockAdminNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);

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
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="border-b bg-slate-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl">Connectify</span>
              <Badge className="ml-2 bg-blue-500">Admin</Badge>
            </div>
          </Link>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-400">Pending: </span>
              <span className="text-blue-400">12</span>
            </div>
            <div>
              <span className="text-gray-400">Flagged: </span>
              <span className="text-cyan-400">2</span>
            </div>
            <div>
              <span className="text-gray-400">Active: </span>
              <span className="text-sky-400">156</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="gap-2 border-blue-500 text-white hover:bg-blue-600 bg-blue-600">
                <Home className="h-4 w-4" />
                Back to Main
              </Button>
            </Link>
            <div ref={notificationRef} className="relative">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-slate-800" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-500">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 top-12 bg-white shadow-xl rounded-lg border w-96 z-50">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg text-gray-900">Admin Notifications</h3>
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
                          className={`p-4 border-b hover:bg-blue-50 transition-colors cursor-pointer ${
                            !n.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {n.type === 'pending' && (
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                </div>
                              )}
                              {n.type === 'flagged' && (
                                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                                  <Flag className="h-4 w-4 text-cyan-600" />
                                </div>
                              )}
                              {n.type === 'approved' && (
                                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4 text-sky-600" />
                                </div>
                              )}
                              {n.type === 'info' && (
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className={`text-sm text-gray-900 ${!n.read ? '' : 'text-gray-700'}`}>
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
                      <Link to="/admin/review" className="text-sm text-blue-600 hover:text-blue-700">
                        View Review Queue
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div>Admin User</div>
              <div className="text-gray-400 text-xs">Super Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}