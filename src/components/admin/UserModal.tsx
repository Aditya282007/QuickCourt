import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Calendar, DollarSign, Building, Ban, CheckCircle } from 'lucide-react';
import { AdminUser } from '../../types/admin';

interface UserModalProps {
  user: AdminUser;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (userId: string, newStatus: 'active' | 'banned' | 'suspended') => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'banned':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'suspended':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'owner':
        return 'text-[#C5A880] bg-[#C5A880]/20 border-[#C5A880]/30';
      case 'user':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#0D0D0D]/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white font-semibold text-xl">User Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* User Profile */}
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-20 h-20 bg-[#C5A880]/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-[#C5A880]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-2xl mb-2">{user.name}</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>Last active {new Date(user.lastActive).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {user.role === 'owner' ? (
                  <>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Building className="w-8 h-8 text-[#C5A880]" />
                        <div>
                          <p className="text-[#C5A880] text-2xl font-bold">{user.facilities}</p>
                          <p className="text-gray-300 text-sm">Facilities Owned</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-8 h-8 text-green-400" />
                        <div>
                          <p className="text-green-400 text-2xl font-bold">$0</p>
                          <p className="text-gray-300 text-sm">Revenue Generated</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-8 h-8 text-blue-400" />
                        <div>
                          <p className="text-blue-400 text-2xl font-bold">{user.totalBookings}</p>
                          <p className="text-gray-300 text-sm">Total Bookings</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-8 h-8 text-green-400" />
                        <div>
                          <p className="text-green-400 text-2xl font-bold">${user.totalSpent}</p>
                          <p className="text-gray-300 text-sm">Total Spent</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Booking History Placeholder */}
              <div className="mb-8">
                <h4 className="text-white font-medium mb-4">Recent Activity</h4>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-gray-400 text-center py-8">
                    Booking history and activity details would be displayed here
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {user.status === 'active' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStatusChange(user.id, 'banned')}
                    className="flex items-center space-x-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl px-6 py-3 hover:bg-red-500/30 transition-colors"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Ban User</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStatusChange(user.id, 'active')}
                    className="flex items-center space-x-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl px-6 py-3 hover:bg-green-500/30 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Activate User</span>
                  </motion.button>
                )}
                
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/10 text-gray-300 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserModal;