import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Clock, Shield } from 'lucide-react';
import VenueCard from '../components/VenueCard';
import { dummyVenues } from '../data/dummyData';

const HomePage = () => {
  const popularVenues = dummyVenues.slice(0, 3);
  const popularSports = [
    { name: 'Football', image: 'https://images.pexels.com/photos/159832/soccer-football-sports-ball-159832.jpeg?auto=compress&cs=tinysrgb&w=400', count: '150+ venues' },
    { name: 'Basketball', image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400', count: '120+ venues' },
    { name: 'Tennis', image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400', count: '90+ venues' },
    { name: 'Badminton', image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400', count: '80+ venues' }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Book your favorite courts in seconds with real-time availability.'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Safe and secure payment processing with multiple payment options.'
    },
    {
      icon: Star,
      title: 'Quality Venues',
      description: 'Only premium venues with excellent ratings and facilities.'
    },
    {
      icon: MapPin,
      title: 'Find Nearby',
      description: 'Discover courts and venues in your neighborhood easily.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Book 
                <span className="text-[#C5A880] block">Sports Venues</span>
                Instantly
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-md">
                Discover and book the best sports facilities in your area. 
                From basketball courts to tennis clubs, find your perfect playing space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/venues">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold px-8 py-4 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>Explore Venues</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-[#C5A880] text-[#C5A880] font-semibold px-8 py-4 rounded-xl hover:bg-[#C5A880]/10 transition-all duration-200"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Hero 3D Model Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 h-96 flex items-center justify-center">
                {/* Placeholder for Spline Model #2 */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#C5A880]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-12 h-12 text-[#C5A880]" />
                  </div>
                  <p className="text-gray-400">
                    {/* Spline Model #2 will be placed here */}
                    Interactive 3D Sports Venue Model
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose QuickCourt?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We make sports venue booking simple, secure, and efficient for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#C5A880]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#C5A880]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Venues Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold text-white">Popular Venues</h2>
            <Link
              to="/venues"
              className="text-[#C5A880] hover:text-[#D4B897] transition-colors flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <VenueCard
                  venue={venue}
                  onClick={() => window.location.href = `/venues/${venue.id}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Popular Sports</h2>
            <p className="text-gray-400">Find venues for your favorite sports</p>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4" style={{ minWidth: 'fit-content' }}>
              {popularSports.map((sport, index) => (
                <motion.div
                  key={sport.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="min-w-[280px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden cursor-pointer"
                >
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{sport.name}</h3>
                    <p className="text-gray-400 text-sm">{sport.count}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;