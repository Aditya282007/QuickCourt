import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Star, ArrowRight, Play } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { VenueCard } from '../components/VenueCard';
import { venues, sports } from '../data/venues';

export const HomePage: React.FC = () => {
  const featuredVenues = venues.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(112,63,183,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight">
              Because Boring
              <br />
              <span className="text-premium-purple-500">is Bad</span>
              <br />
              for Sports
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover premium sports venues in your city. Book courts, fields, and facilities 
            with the elegance they deserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/venues">
              <GlassButton size="lg" className="flex items-center space-x-3 group">
                <Search size={20} />
                <span>Explore Venues</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </GlassButton>
            </Link>
            
            <GlassButton variant="secondary" size="lg" className="flex items-center space-x-3">
              <Play size={20} />
              <span>Watch Demo</span>
            </GlassButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Quick Search Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Venue
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Search through our curated collection of premium sports facilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search venues, sports, or locations..."
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50 focus:border-premium-purple-500/50"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select className="pl-12 pr-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50 appearance-none min-w-[200px]">
                    <option value="" className="bg-premium-black">All Locations</option>
                    <option value="downtown" className="bg-premium-black">Downtown</option>
                    <option value="uptown" className="bg-premium-black">Uptown</option>
                    <option value="suburbs" className="bg-premium-black">Suburbs</option>
                  </select>
                </div>
                <Link to="/venues">
                  <GlassButton className="px-8 py-4">
                    Search
                  </GlassButton>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Popular Sports
            </h2>
            <p className="text-gray-400 text-lg">
              Choose from our wide range of sports facilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {sports.map((sport, index) => (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center group cursor-pointer">
                  <div className="text-4xl mb-3">{sport.icon}</div>
                  <h3 className="text-white font-semibold mb-1">{sport.name}</h3>
                  <p className="text-gray-400 text-sm">{sport.venues} venues</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Venues
            </h2>
            <p className="text-gray-400 text-lg">
              Handpicked premium facilities for the ultimate sports experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/venue/${venue.id}`}>
                  <VenueCard venue={venue} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/venues">
              <GlassButton size="lg" className="flex items-center space-x-3 mx-auto">
                <span>View All Venues</span>
                <ArrowRight size={20} />
              </GlassButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Book your perfect venue in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search & Discover',
                description: 'Browse through our curated collection of premium sports venues in your area.',
                icon: <Search size={32} />
              },
              {
                step: '02',
                title: 'Select & Schedule',
                description: 'Choose your preferred time slot and customize your booking requirements.',
                icon: <Clock size={32} />
              },
              {
                step: '03',
                title: 'Play & Enjoy',
                description: 'Arrive at your venue and enjoy a premium sports experience.',
                icon: <Star size={32} />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <div className="text-premium-purple-500 mb-6">{item.icon}</div>
                  <div className="text-premium-purple-500 font-bold text-sm mb-2">{item.step}</div>
                  <h3 className="text-white text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Play?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of athletes who trust QuickCourt for their venue booking needs. 
                Start your premium sports experience today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/venues">
                  <GlassButton size="lg" className="flex items-center space-x-3">
                    <span>Book Your Venue</span>
                    <ArrowRight size={20} />
                  </GlassButton>
                </Link>
                <GlassButton variant="secondary" size="lg">
                  Learn More
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};