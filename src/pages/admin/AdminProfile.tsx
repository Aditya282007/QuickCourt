import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Save, Edit } from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@quickcourt.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Platform administrator with 5+ years of experience in sports facility management.',
    permissions: ['user_management', 'facility_approval', 'content_moderation', 'system_admin']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const permissionLabels: { [key: string]: string } = {
    user_management: 'User Management',
    facility_approval: 'Facility Approval',
    content_moderation: 'Content Moderation',
    system_admin: 'System Administration'
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Profile</h1>
          <p className="text-gray-400">Manage your admin account settings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 rounded-xl px-4 py-2 hover:bg-[#C5A880]/30 transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-[#C5A880]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-[#C5A880]" />
            </div>
            <h2 className="text-white font-semibold text-xl mb-1">{formData.name}</h2>
            <p className="text-gray-400">Platform Administrator</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-5 h-5" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="w-5 h-5" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5" />
              <span>{formData.location}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-white font-medium mb-3 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#C5A880]" />
              <span>Permissions</span>
            </h3>
            <div className="space-y-2">
              {formData.permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C5A880] rounded-full"></div>
                  <span className="text-gray-300 text-sm">{permissionLabels[permission]}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
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

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 resize-none"
              />
            </div>

            {isEditing && (
              <div className="flex items-center space-x-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold px-6 py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </motion.button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-white/10 text-gray-300 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Activity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-[#C5A880] text-2xl font-bold mb-2">156</h3>
          <p className="text-gray-300">Facilities Approved</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-blue-400 text-2xl font-bold mb-2">23</h3>
          <p className="text-gray-300">Users Managed</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-green-400 text-2xl font-bold mb-2">89</h3>
          <p className="text-gray-300">Reports Resolved</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-purple-400 text-2xl font-bold mb-2">2.5</h3>
          <p className="text-gray-300">Years as Admin</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;