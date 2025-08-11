import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  Flag, 
  User, 
  Menu, 
  X,
  LogOut,
  Settings
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Check if user is admin
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Facility Approval', path: '/admin/facilities', icon: Building },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Reports & Moderation', path: '/admin/reports', icon: Flag },
    { name: 'Profile', path: '/admin/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed inset-y-0 left-0 z-50 w-70 bg-black/40 backdrop-blur-xl border-r border-white/10 lg:relative lg:translate-x-0 lg:block"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              Quick<span className="text-[#C5A880]">Court</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="space-y-2">
              <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 w-full">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4 ml-auto">
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-gray-400 text-sm">Platform Administrator</p>
              </div>
              <div className="w-10 h-10 bg-[#C5A880]/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#C5A880]" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default AdminLayout;