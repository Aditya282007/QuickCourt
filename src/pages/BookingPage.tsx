import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CreditCard, Check } from 'lucide-react';
import { dummyVenues, dummyTimeSlots } from '../data/dummyData';
import { TimeSlot } from '../types';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = dummyVenues.find(v => v.id === id);
  
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Venue not found</h2>
          <button
            onClick={() => navigate('/venues')}
            className="bg-[#C5A880] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#D4B897] transition-colors"
          >
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  const handleTimeSlotToggle = (timeSlot: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(timeSlot)
        ? prev.filter(slot => slot !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const calculateTotal = () => {
    const court = venue.courts.find(c => c.id === selectedCourt);
    if (!court || selectedTimeSlots.length === 0) return 0;
    return selectedTimeSlots.length * court.pricePerHour;
  };

  const handleBooking = () => {
    if (!selectedCourt || !selectedDate || selectedTimeSlots.length === 0) {
      alert('Please fill in all booking details');
      return;
    }
    
    // Simulate booking process
    alert('Booking successful! You will be redirected to your bookings page.');
    navigate('/bookings');
  };

  // Generate next 7 days for date selection
  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const nextSevenDays = getNextSevenDays();

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(`/venues/${id}`)}
          className="flex items-center space-x-2 text-gray-400 hover:text-[#C5A880] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Venue</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Book Your Court</h1>
          <p className="text-gray-400 mb-8">{venue.name} - {venue.location}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Court Selection */}
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Check className="w-5 h-5 text-[#C5A880]" />
                  <span>Select Court</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.courts.map((court) => (
                    <motion.div
                      key={court.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedCourt(court.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedCourt === court.id
                          ? 'border-[#C5A880] bg-[#C5A880]/10'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <h4 className="text-white font-semibold mb-1">{court.name}</h4>
                      <p className="text-gray-400 text-sm mb-2">{court.sport}</p>
                      <p className="text-[#C5A880] font-bold">${court.pricePerHour}/hr</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#C5A880]" />
                  <span>Select Date</span>
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                  {nextSevenDays.map((date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const dayName = date.toLocaleDateString('en', { weekday: 'short' });
                    const dayNumber = date.getDate();
                    
                    return (
                      <motion.button
                        key={dateStr}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-3 rounded-xl text-center transition-all duration-200 ${
                          selectedDate === dateStr
                            ? 'bg-[#C5A880] text-black'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <div className="text-xs font-medium">{dayName}</div>
                        <div className="text-lg font-bold">{dayNumber}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#C5A880]" />
                  <span>Select Time Slots</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {dummyTimeSlots.map((slot) => (
                    <motion.button
                      key={slot.time}
                      whileHover={{ scale: slot.available ? 1.05 : 1 }}
                      onClick={() => slot.available && handleTimeSlotToggle(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        !slot.available
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : selectedTimeSlots.includes(slot.time)
                          ? 'bg-[#C5A880] text-black'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <div>{slot.time}</div>
                      <div className="text-xs">${slot.price}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-[#C5A880]" />
                  <span>Payment Method</span>
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#C5A880] focus:ring-[#C5A880]/50"
                    />
                    <span className="text-white">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#C5A880] focus:ring-[#C5A880]/50"
                    />
                    <span className="text-white">PayPal</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#C5A880] focus:ring-[#C5A880]/50"
                    />
                    <span className="text-white">Digital Wallet</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white/10 rounded-xl p-6 h-fit sticky top-24">
              <h3 className="text-white text-xl font-semibold mb-4">Booking Summary</h3>
              
              {selectedCourt && (
                <div className="mb-4 pb-4 border-b border-white/20">
                  <p className="text-gray-300 text-sm">Court</p>
                  <p className="text-white font-medium">
                    {venue.courts.find(c => c.id === selectedCourt)?.name}
                  </p>
                </div>
              )}
              
              {selectedDate && (
                <div className="mb-4 pb-4 border-b border-white/20">
                  <p className="text-gray-300 text-sm">Date</p>
                  <p className="text-white font-medium">
                    {new Date(selectedDate).toLocaleDateString('en', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
              
              {selectedTimeSlots.length > 0 && (
                <div className="mb-4 pb-4 border-b border-white/20">
                  <p className="text-gray-300 text-sm">Time Slots ({selectedTimeSlots.length}h)</p>
                  <div className="space-y-1">
                    {selectedTimeSlots.map(slot => (
                      <p key={slot} className="text-white text-sm">{slot}</p>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total</span>
                  <span className="text-[#C5A880] text-2xl font-bold">${calculateTotal()}</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                disabled={!selectedCourt || !selectedDate || selectedTimeSlots.length === 0}
                className="w-full bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;