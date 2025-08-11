import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Users, Wifi, Car, Coffee, Shield, ArrowLeft } from 'lucide-react';
import { dummyVenues } from '../data/dummyData';

const SingleVenuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = dummyVenues.find(v => v.id === id);

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

  const amenityIcons: { [key: string]: any } = {
    'Parking': Car,
    'Changing Rooms': Users,
    'Cafeteria': Coffee,
    'Equipment Rental': Shield,
    'AC': Wifi,
    'Locker Rooms': Users,
    'Pro Shop': Coffee,
    'Floodlights': Shield,
    'Spectator Stands': Users,
    'Restaurant': Coffee
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/venues')}
          className="flex items-center space-x-2 text-gray-400 hover:text-[#C5A880] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Venues</span>
        </motion.button>

        {/* Venue Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-8"
        >
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{venue.name}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-5 h-5" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-[#C5A880] fill-current" />
                    <span>{venue.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#C5A880]">${venue.pricePerHour}</div>
                <div className="text-gray-300">per hour</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-white text-2xl font-bold mb-4">About This Venue</h2>
              <p className="text-gray-300 leading-relaxed">{venue.description}</p>
            </motion.div>

            {/* Sports Offered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-white text-2xl font-bold mb-4">Sports Available</h2>
              <div className="flex flex-wrap gap-3">
                {venue.sports.map((sport) => (
                  <span
                    key={sport}
                    className="px-4 py-2 bg-[#C5A880]/20 text-[#C5A880] rounded-lg border border-[#C5A880]/30 font-medium"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Courts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-white text-2xl font-bold mb-4">Available Courts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venue.courts.map((court) => (
                  <div
                    key={court.id}
                    className="bg-white/10 rounded-xl p-4 border border-white/20"
                  >
                    <h3 className="text-white font-semibold mb-2">{court.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{court.sport}</span>
                      <span className="text-[#C5A880] font-bold">${court.pricePerHour}/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            {venue.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-white text-2xl font-bold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {venue.reviews.map((review) => (
                    <div key={review.id} className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{review.userName}</span>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-[#C5A880] fill-current' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Now Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-24"
            >
              <h3 className="text-white text-xl font-bold mb-4">Book This Venue</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>Open 6 AM - 11 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Users className="w-5 h-5" />
                  <span>{venue.courts.length} courts available</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/booking/${venue.id}`)}
                className="w-full bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold py-3 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200"
              >
                Book Now
              </motion.button>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-white text-xl font-bold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {venue.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Shield;
                  return (
                    <div key={amenity} className="flex items-center space-x-2 text-gray-300">
                      <Icon className="w-4 h-4 text-[#C5A880]" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVenuePage;