import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Bell, Settings, Upload, Check, X } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { Notification } from '../types';

const UserProfilePage = () => {
  const user = getCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  useEffect(() => {
    if (user) {
      // Load notifications from localStorage
      const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const userNotifications = allNotifications.filter((n: Notification) => n.userId === user.id);
      setNotifications(userNotifications);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          avatar: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      window.location.reload(); // Refresh to update navbar
    }
  };

  const markAsRead = (notificationId: string) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = allNotifications.map((n: Notification) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const deleteNotification = (notificationId: string) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = allNotifications.filter((n: Notification) => n.id !== notificationId);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'venue_approved':
        return Check;
      case 'venue_rejected':
        return X;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'venue_approved':
        return 'text-green-400 bg-green-400/20';
      case 'venue_rejected':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account settings and notifications</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#C5A880]/30"
                  />
                ) : (
                  <div className="w-24 h-24 bg-[#C5A880]/20 rounded-full flex items-center justify-center border-4 border-[#C5A880]/30">
                    <User className="w-12 h-12 text-[#C5A880]" />
                  </div>
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-[#C5A880] text-black rounded-full p-2 cursor-pointer hover:bg-[#D4B897] transition-colors">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="text-white font-semibold text-xl mt-4 mb-1">{user.name}</h2>
              <p className="text-gray-400 capitalize">{user.role}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              {isEditing ? (
                <div className="space-y-4">
                  <button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-white/10 text-gray-300 border border-white/20 rounded-xl py-3 hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-white/10 text-gray-300 border border-white/20 rounded-xl py-3 hover:bg-white/20 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Profile Form & Notifications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-white font-semibold text-xl mb-6">Profile Information</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    disabled
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white opacity-50"
                  />
                </div>
              </form>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-xl flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-[#C5A880]" />
                  <span>Notifications</span>
                </h3>
                <span className="bg-[#C5A880]/20 text-[#C5A880] px-3 py-1 rounded-lg text-sm">
                  {notifications.filter(n => !n.read).length} unread
                </span>
              </div>

              {notifications.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const NotificationIcon = getNotificationIcon(notification.type);
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          notification.read
                            ? 'bg-white/5 border-white/10'
                            : 'bg-white/10 border-[#C5A880]/30'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                            <NotificationIcon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-white font-medium mb-1">{notification.title}</h4>
                            <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                            <p className="text-gray-500 text-xs">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 text-[#C5A880] hover:bg-[#C5A880]/20 rounded-lg transition-colors"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">No notifications</h4>
                  <p className="text-gray-400 text-sm">You're all caught up!</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;