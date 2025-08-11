import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Wifi, 
  Car, 
  ShowerHead,
  Volume2,
  Snowflake,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { venues } from '../data/venues';

export const SingleVenuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const venue = venues.find(v => v.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!venue) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Venue Not Found</h2>
          <p className="text-gray-400 mb-6">The venue you're looking for doesn't exist.</p>
          <Link to="/venues">
            <GlassButton>Back to Venues</GlassButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Air Conditioning': <Snowflake size={20} />,
    'Sound System': <Volume2 size={20} />,
    'Changing Rooms': <Users size={20} />,
    'Parking': <Car size={20} />,
    'Equipment Rental': <Clock size={20} />,
    'Wifi': <Wifi size={20} />,
    'Showers': <ShowerHead size={20} />,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.gallery.length) % venue.gallery.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link to="/venues">
            <GlassButton variant="secondary" className="flex items-center space-x-2">
              <ArrowLeft size={18} />
              <span>Back to Venues</span>
            </GlassButton>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="overflow-hidden mb-8">
            <div className="relative h-64 md:h-96">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{venue.name}</h1>
                    <div className="flex items-center space-x-4 text-white/80">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{venue.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span>{venue.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${venue.pricePerHour}</div>
                    <div className="text-white/80">per hour</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">About This Venue</h2>
                <p className="text-gray-300 leading-relaxed">{venue.description}</p>
              </GlassCard>
            </motion.div>

            {/* Sports Offered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Sports Offered</h2>
                <div className="flex flex-wrap gap-3">
                  {venue.sportsOffered.map((sport) => (
                    <span
                      key={sport}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-gray-300 text-sm"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3 text-gray-300">
                      <div className="text-gray-400">
                        {amenityIcons[amenity] || <Clock size={20} />}
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Gallery */}
            {venue.gallery.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <GlassCard className="p-6">
                  <h2 className="font-serif text-2xl font-bold text-white mb-4">Photo Gallery</h2>
                  <div className="relative">
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={venue.gallery[currentImageIndex]}
                        alt={`${venue.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {venue.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                    <div className="flex justify-center space-x-2 mt-4">
                      {venue.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? 'bg-gray-400'
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <GlassCard className="p-6">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Reviews</h2>
                <div className="space-y-4">
                  {venue.reviews.map((review) => (
                    <div key={review.id} className="border-b border-white/10 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{review.userName}</h4>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{review.comment}</p>
                      <p className="text-gray-500 text-xs">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-6 sticky top-28">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-1">${venue.pricePerHour}</div>
                  <div className="text-gray-400">per hour</div>
                </div>
                
                <GlassButton 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={() => setShowBookingModal(true)}
                >
                  Book Now
                </GlassButton>
                
                <div className="text-center text-sm text-gray-400">
                  Free cancellation up to 24 hours before your booking
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard className="p-6">
               <h3 className="font-serif text-xl font-bold text-white mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <div className="w-5 h-5 text-gray-400">🏀</div>
                    <span>Sport: {venue.sport}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span>Rating: {venue.rating}/5</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{venue.location}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard className="p-6">
                <h3 className="font-serif text-2xl font-bold text-white mb-6">Book {venue.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                      <input
                        type="time"
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                      <input
                        type="time"
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <GlassButton
                    onClick={() => setShowBookingModal(false)}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton className="flex-1">
                    Confirm Booking
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};