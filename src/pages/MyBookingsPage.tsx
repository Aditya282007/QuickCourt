import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import { dummyBookings } from '../data/dummyData';
import { Booking } from '../types';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );
    }
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(booking => booking.status === status).length;
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-[#C5A880]" />
            <h1 className="text-4xl font-bold text-white">My Bookings</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage your sports venue bookings and track your playing history.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 mb-8 inline-flex"
        >
          {[
            { key: 'all', label: 'All Bookings' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' }
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

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookingCard booking={booking} onCancel={handleCancelBooking} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">
                {filter === 'all' ? 'No bookings found' : `No ${filter} bookings`}
              </h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You haven't made any bookings yet. Start by exploring our venues!"
                  : `You don't have any ${filter} bookings at the moment.`
                }
              </p>
              {filter === 'all' && (
                <motion.a
                  href="/venues"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold px-6 py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200"
                >
                  Browse Venues
                </motion.a>
              )}
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        {bookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-[#C5A880] text-3xl font-bold mb-2">{bookings.length}</h3>
              <p className="text-gray-300">Total Bookings</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-[#C5A880] text-3xl font-bold mb-2">
                {bookings.filter(b => b.status === 'completed').length}
              </h3>
              <p className="text-gray-300">Games Played</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
              <h3 className="text-[#C5A880] text-3xl font-bold mb-2">
                ${bookings.reduce((total, booking) => total + booking.totalPrice, 0)}
              </h3>
              <p className="text-gray-300">Total Spent</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;