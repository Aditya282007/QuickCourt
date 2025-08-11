import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const Footer: React.FC = () => {
  return (
    <GlassCard className="mt-20 mx-4 p-8" hover={false}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-gray-300" />
              <span className="text-xl font-bold text-white">QuickCourt</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your premier destination for booking local sports venues. 
              Find and reserve courts, fields, and facilities near you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Browse Venues</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Popular Sports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gray-100">How it Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gray-100">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@quickcourt.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock size={16} />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 QuickCourt. All rights reserved.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};