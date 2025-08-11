import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, Calendar, Home, MapPin, Phone, LogOut, Building } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Venues', path: '/venues', icon: MapPin },
    ...(user ? [{ name: 'My Bookings', path: '/bookings', icon: Calendar }] : []),
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white"
            >
              Quick<span className="text-[#C5A880]">Court</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-[#C5A880] bg-white/10'
                      : 'text-gray-300 hover:text-[#C5A880] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#C5A880]/30"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#C5A880]/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#C5A880]" />
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs capitalize">{user.role}</p>
                  </div>
                </Link>
                {user.role === 'owner' && (
                  <Link
                    to="/owner/venues"
                    className="flex items-center space-x-2 px-3 py-2 bg-[#C5A880]/20 text-[#C5A880] rounded-lg hover:bg-[#C5A880]/30 transition-all duration-200"
                  >
                    <Building className="w-4 h-4" />
                    <span>My Venues</span>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
                </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-[#C5A880]/20 text-[#C5A880] rounded-lg hover:bg-[#C5A880]/30 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-black/40 backdrop-blur-xl rounded-b-2xl"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-[#C5A880] bg-white/10'
                      : 'text-gray-300 hover:text-[#C5A880] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#C5A880]/30"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-[#C5A880]/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#C5A880]" />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm capitalize">{user.role}</p>
                  </div>
                </Link>
                {user.role === 'owner' && (
                  <Link
                    to="/owner/venues"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 bg-[#C5A880]/20 text-[#C5A880] rounded-lg hover:bg-[#C5A880]/30 transition-all duration-200"
                  >
                    <Building className="w-5 h-5" />
                    <span>My Venues</span>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-3 px-3 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 bg-[#C5A880]/20 text-[#C5A880] rounded-lg hover:bg-[#C5A880]/30 transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;