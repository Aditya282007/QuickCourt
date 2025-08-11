import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, User, Mail, Calendar, Check, Ban } from 'lucide-react';
import { PendingFacility } from '../../types/admin';

interface FacilityModalProps {
  facility: PendingFacility;
  isOpen: boolean;
  onClose: () => void;
  actionType: 'approve' | 'reject' | null;
  comment: string;
  onCommentChange: (comment: string) => void;
  onAction: (facilityId: string, action: 'approve' | 'reject', comment?: string) => void;
}

const FacilityModal: React.FC<FacilityModalProps> = ({
  facility,
  isOpen,
  onClose,
  actionType,
  comment,
  onCommentChange,
  onAction
}) => {
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
            className="relative bg-[#0D0D0D]/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white font-semibold text-xl">Facility Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Facility Info */}
              <div className="mb-8">
                <h3 className="text-white font-semibold text-2xl mb-4">{facility.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <User className="w-4 h-4" />
                      <span>{facility.ownerName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span>{facility.ownerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>Submitted {new Date(facility.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Sports Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.sports.map((sport) => (
                        <span
                          key={sport}
                          className="px-3 py-1 bg-[#C5A880]/20 text-[#C5A880] text-sm rounded-lg border border-[#C5A880]/30"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-2">Description</h4>
                  <p className="text-gray-300">{facility.description}</p>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="mb-8">
                <h4 className="text-white font-medium mb-4">Photos</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {facility.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${facility.name} ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Courts */}
              <div className="mb-8">
                <h4 className="text-white font-medium mb-4">Courts ({facility.courts.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {facility.courts.map((court) => (
                    <div
                      key={court.id}
                      className="bg-white/10 rounded-xl p-4 border border-white/20"
                    >
                      <h5 className="text-white font-medium mb-1">{court.name}</h5>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">{court.sport}</span>
                        <span className="text-[#C5A880] font-bold">${court.pricePerHour}/hr</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h4 className="text-white font-medium mb-4">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-lg border border-white/20"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              {actionType && (
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                    {actionType === 'approve' ? (
                      <>
                        <Check className="w-5 h-5 text-green-400" />
                        <span>Approve Facility</span>
                      </>
                    ) : (
                      <>
                        <Ban className="w-5 h-5 text-red-400" />
                        <span>Reject Facility</span>
                      </>
                    )}
                  </h4>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm mb-2">
                      {actionType === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason'}
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => onCommentChange(e.target.value)}
                      placeholder={
                        actionType === 'approve' 
                          ? 'Add any notes for the facility owner...'
                          : 'Please provide a reason for rejection...'
                      }
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAction(facility.id, actionType, comment)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                        actionType === 'approve'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                      }`}
                    >
                      {actionType === 'approve' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Ban className="w-4 h-4" />
                      )}
                      <span>Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}</span>
                    </motion.button>
                    
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-white/10 text-gray-300 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FacilityModal;