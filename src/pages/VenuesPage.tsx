import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VenueCard from '../components/VenueCard';
import FilterBar from '../components/FilterBar';
import { dummyVenues } from '../data/dummyData';
import { Venue } from '../types';

const VenuesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState(0);

  const filteredVenues = dummyVenues.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'All' || venue.sports.includes(selectedSport);
    const matchesPrice = venue.pricePerHour <= priceRange[1];
    const matchesRating = venue.rating >= minRating;

    return matchesSearch && matchesSport && matchesPrice && matchesRating;
  });

  const handleVenueClick = (venue: Venue) => {
    navigate(`/venues/${venue.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Venue</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover premium sports facilities in your area. Filter by sport, price, and rating to find exactly what you need.
          </p>
        </motion.div>

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Found <span className="text-[#C5A880] font-semibold">{filteredVenues.length}</span> venues
          </p>
        </div>

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <VenueCard venue={venue} onClick={() => handleVenueClick(venue)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
              <h3 className="text-white font-semibold text-xl mb-2">No venues found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your filters to find more venues.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSport('All');
                  setPriceRange([0, 100]);
                  setMinRating(0);
                }}
                className="bg-[#C5A880] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#D4B897] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VenuesPage;