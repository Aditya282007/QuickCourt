import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, DollarSign, X } from 'lucide-react';
import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'completed':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'cancelled':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">{booking.venueName}</h3>
            <p className="text-gray-400 text-sm">{booking.courtName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
            {booking.status === 'upcoming' && onCancel && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onCancel(booking.id)}
                className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{booking.timeSlot}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2 text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Duration: {booking.duration}h</span>
          </div>
          <div>
            <span className="text-[#C5A880] font-bold text-lg">${booking.totalPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;