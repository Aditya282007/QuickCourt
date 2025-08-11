import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Calendar, MapPin, User, Mail } from 'lucide-react';
import { PendingFacility } from '../../types/admin';
import FacilityModal from '../../components/admin/FacilityModal';

const FacilityApproval = () => {
  const [facilities, setFacilities] = useState<PendingFacility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<PendingFacility | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');

  React.useEffect(() => {
    // Load pending venues from localStorage
    const pendingVenues = JSON.parse(localStorage.getItem('pendingVenues') || '[]');
    setFacilities(pendingVenues.filter((v: any) => v.status === 'pending'));
  }, []);

  const handleAction = (facilityId: string, action: 'approve' | 'reject', comment?: string) => {
    // Update facility status
    const pendingVenues = JSON.parse(localStorage.getItem('pendingVenues') || '[]');
    const approvedVenues = JSON.parse(localStorage.getItem('approvedVenues') || '[]');
    
    const facility = pendingVenues.find((v: any) => v.id === facilityId);
    if (facility) {
      facility.status = action === 'approve' ? 'approved' : 'rejected';
      facility.adminComment = comment;
      facility.reviewedAt = new Date().toISOString();
      
      // Remove from pending and add to appropriate list
      const updatedPending = pendingVenues.filter((v: any) => v.id !== facilityId);
      localStorage.setItem('pendingVenues', JSON.stringify(updatedPending));
      
      if (action === 'approve') {
        localStorage.setItem('approvedVenues', JSON.stringify([...approvedVenues, facility]));
      }
      
      // Add notification for venue owner
      const notification = {
        id: Date.now().toString(),
        userId: facility.ownerId,
        type: action === 'approve' ? 'venue_approved' : 'venue_rejected',
        title: action === 'approve' ? 'Venue Approved!' : 'Venue Rejected',
        message: action === 'approve' 
          ? `Your venue "${facility.name}" has been approved and is now live on the platform.`
          : `Your venue "${facility.name}" has been rejected. ${comment || 'Please contact support for more details.'}`,
        read: false,
        createdAt: new Date().toISOString()
      };
      
      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      localStorage.setItem('notifications', JSON.stringify([...existingNotifications, notification]));
      
      // Update local state
      setFacilities(prev => prev.filter(f => f.id !== facilityId));
    }
    
    setIsModalOpen(false);
    setComment('');
    setActionType(null);
  };

  const openActionModal = (facility: PendingFacility, action: 'approve' | 'reject') => {
    setSelectedFacility(facility);
    setActionType(action);
    setIsModalOpen(true);
  };

  const pendingCount = facilities.filter(f => f.status === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Facility Approval</h1>
          <p className="text-gray-400">Review and approve new facility submissions</p>
        </div>
        <div className="bg-[#C5A880]/20 text-[#C5A880] px-4 py-2 rounded-xl border border-[#C5A880]/30">
          <span className="font-medium">{pendingCount} Pending</span>
        </div>
      </motion.div>

      {/* Facilities List */}
      <div className="space-y-6">
        {facilities.map((facility, index) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Facility Images */}
                <div className="lg:col-span-1">
                  <div className="grid grid-cols-2 gap-2">
                    {facility.images.slice(0, 4).map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`${facility.name} ${idx + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Facility Details */}
                <div className="lg:col-span-2">
                  <h3 className="text-white font-semibold text-xl mb-2">{facility.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{facility.ownerName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{facility.ownerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Submitted {new Date(facility.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {facility.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {facility.sports.map((sport) => (
                      <span
                        key={sport}
                        className="px-2 py-1 bg-[#C5A880]/20 text-[#C5A880] text-xs rounded-lg border border-[#C5A880]/30"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>

                  <div className="text-gray-400 text-sm">
                    <span>{facility.courts.length} courts • {facility.amenities.length} amenities</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-1 flex flex-col space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFacility(facility);
                      setIsModalOpen(true);
                      setActionType(null);
                    }}
                    className="flex items-center justify-center space-x-2 bg-white/10 text-gray-300 border border-white/20 rounded-xl py-3 hover:bg-white/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openActionModal(facility, 'approve')}
                    className="flex items-center justify-center space-x-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl py-3 hover:bg-green-500/30 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openActionModal(facility, 'reject')}
                    className="flex items-center justify-center space-x-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl py-3 hover:bg-red-500/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {pendingCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
              <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">All caught up!</h3>
              <p className="text-gray-400">No pending facility approvals at the moment.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Facility Modal */}
      {selectedFacility && (
        <FacilityModal
          facility={selectedFacility}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFacility(null);
            setActionType(null);
            setComment('');
          }}
          actionType={actionType}
          comment={comment}
          onCommentChange={setComment}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default FacilityApproval;