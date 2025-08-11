import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <GlassCard className="fixed top-4 left-4 right-4 z-50 px-6 py-4" hover={false}>
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-8 w-8 text-gray-300" />
          <span className="text-xl font-bold text-white">QuickCourt</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive(item.path)
                  ? 'text-gray-300 bg-gray-700/30'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 pt-4 border-t border-white/20"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive(item.path)
                  ? 'text-gray-300 bg-gray-700/30'
                  : 'text-white hover:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </GlassCard>
  );
};