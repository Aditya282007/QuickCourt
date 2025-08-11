import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { VenueCard } from '../components/VenueCard';
import { venues, sports } from '../data/venues';

export const VenuesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 6;

  // Filter venues
  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'all' || venue.sport.toLowerCase() === selectedSport.toLowerCase();
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && venue.pricePerHour <= 30) ||
                        (priceRange === 'mid' && venue.pricePerHour > 30 && venue.pricePerHour <= 50) ||
                        (priceRange === 'high' && venue.pricePerHour > 50);
    const matchesRating = venue.rating >= minRating;

    return matchesSearch && matchesSport && matchesPrice && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSport('all');
    setPriceRange('all');
    setMinRating(0);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">Find Venues</h1>
          <p className="text-gray-400">Discover and book the perfect sports venue for your needs</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-6 mb-6">
            {/* Search Bar */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search venues, sports, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50 focus:border-premium-purple-500/50"
                />
              </div>
              <GlassButton
                onClick={() => setShowFilters(!showFilters)}
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <Filter size={18} />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </GlassButton>
            </div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/20"
              >
                {/* Sport Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50"
                  >
                    <option value="all" className="bg-premium-black">All Sports</option>
                    {sports.map((sport) => (
                      <option key={sport.name} value={sport.name} className="bg-premium-black">
                        {sport.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50"
                  >
                    <option value="all" className="bg-premium-black">All Prices</option>
                    <option value="low" className="bg-premium-black">Under $30/hr</option>
                    <option value="mid" className="bg-premium-black">$30-50/hr</option>
                    <option value="high" className="bg-premium-black">Above $50/hr</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-premium-purple-500/50"
                  >
                    <option value={0} className="bg-premium-black">Any Rating</option>
                    <option value={3} className="bg-premium-black">3+ Stars</option>
                    <option value={4} className="bg-premium-black">4+ Stars</option>
                    <option value={4.5} className="bg-premium-black">4.5+ Stars</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <GlassButton
                    onClick={clearFilters}
                    variant="secondary"
                    className="w-full"
                  >
                    Clear Filters
                  </GlassButton>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center mb-6"
        >
          <p className="text-gray-400">
            Showing {paginatedVenues.length} of {filteredVenues.length} venues
          </p>
        </motion.div>

        {/* Venue Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {paginatedVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Link to={`/venue/${venue.id}`}>
                <VenueCard venue={venue} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredVenues.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">No venues found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your filters or search terms</p>
              <GlassButton onClick={clearFilters}>Clear All Filters</GlassButton>
            </GlassCard>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <GlassButton
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="secondary"
                  size="sm"
                  className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  <ChevronLeft size={16} />
                </GlassButton>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <GlassButton
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? 'primary' : 'secondary'}
                    size="sm"
                    className="min-w-[40px]"
                  >
                    {page}
                  </GlassButton>
                ))}

                <GlassButton
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="secondary"
                  size="sm"
                  className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  <ChevronRight size={16} />
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};