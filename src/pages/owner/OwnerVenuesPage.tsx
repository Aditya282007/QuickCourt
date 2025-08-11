import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Building, Clock, CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';
import { getCurrentUser } from '../../utils/auth';

const OwnerVenuesPage = () => {
  const user = getCurrentUser();
  const [venues, setVenues] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    if (user) {
      // Load venues from localStorage
      const pendingVenues = JSON.parse(localStorage.getItem('pendingVenues') || '[]');
      const approvedVenues = JSON.parse(localStorage.getItem('approvedVenues') || '[]');
      
      const userVenues = [...pendingVenues, ...approvedVenues].filter(
        venue => venue.ownerId === user.id
      );
      
      setVenues(userVenues);
    }
  }, [user]);

  const filteredVenues = venues.filter(venue => 
    filter === 'all' || venue.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'rejected':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'pending':
        return Clock;
      default:
        return Clock;
    }
  };

  const deleteVenue = (venueId: string) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      const pendingVenues = JSON.parse(localStorage.getItem('pendingVenues') || '[]');
      const approvedVenues = JSON.parse(localStorage.getItem('approvedVenues') || '[]');
      
      const updatedPending = pendingVenues.filter((v: any) => v.id !== venueId);
      const updatedApproved = approvedVenues.filter((v: any) => v.id !== venueId);
      
      localStorage.setItem('pendingVenues', JSON.stringify(updatedPending));
      localStorage.setItem('approvedVenues', JSON.stringify(updatedApproved));
      
      setVenues(prev => prev.filter(v => v.id !== venueId));
    }
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return venues.length;
    return venues.filter(venue => venue.status === status).length;
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Venues</h1>
            <p className="text-gray-400">Manage your sports venues and track their approval status</p>
          </div>
          <Link to="/owner/add-venue">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold px-6 py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Venue</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 mb-8 inline-flex"
        >
          {[
            { key: 'all', label: 'All Venues' },
            { key: 'pending', label: 'Pending' },
            { key: 'approved', label: 'Approved' },
            { key: 'rejected', label: 'Rejected' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                filter === key
                  ? 'bg-[#C5A880] text-black'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filter === key
                  ? 'bg-black/20 text-black'
                  : 'bg-white/20 text-gray-400'
              }`}>
                {getStatusCount(key)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue, index) => {
              const StatusIcon = getStatusIcon(venue.status);
              
              return (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                  <div className="relative">
                    {venue.images && venue.images.length > 0 ? (
                      <img
                        src={venue.images[0]}
                        alt={venue.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-white/10 flex items-center justify-center">
                        <Building className="w-16 h-16 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(venue.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-white font-semibold text-lg mb-2">{venue.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{venue.location}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {venue.sports?.slice(0, 3).map((sport: string) => (
                        <span
                          key={sport}
                          className="px-2 py-1 bg-[#C5A880]/20 text-[#C5A880] text-xs rounded-lg border border-[#C5A880]/30"
                        >
                          {sport}
                        </span>
                      ))}
                      {venue.sports?.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg">
                          +{venue.sports.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gray-400 text-sm">
                        {venue.courts?.length || 0} courts
                      </div>
                      <div className="text-gray-400 text-sm">
                        Submitted {new Date(venue.submittedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center space-x-2 bg-white/10 text-gray-300 border border-white/20 rounded-xl py-2 hover:bg-white/20 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteVenue(venue.id)}
                        className="flex items-center justify-center p-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
              <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">
                {filter === 'all' ? 'No venues yet' : `No ${filter} venues`}
              </h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You haven't added any venues yet. Start by adding your first venue!"
                  : `You don't have any ${filter} venues at the moment.`
                }
              </p>
              {filter === 'all' && (
                <Link to="/owner/add-venue">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold px-6 py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200"
                  >
                    Add Your First Venue
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        {venues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-[#C5A880] text-3xl font-bold mb-2">{venues.length}</h3>
              <p className="text-gray-300">Total Venues</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-green-400 text-3xl font-bold mb-2">
                {venues.filter(v => v.status === 'approved').length}
              </h3>
              <p className="text-gray-300">Approved</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-yellow-400 text-3xl font-bold mb-2">
                {venues.filter(v => v.status === 'pending').length}
              </h3>
              <p className="text-gray-300">Pending</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-red-400 text-3xl font-bold mb-2">
                {venues.filter(v => v.status === 'rejected').length}
              </h3>
              <p className="text-gray-300">Rejected</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OwnerVenuesPage;