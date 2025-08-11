import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSport: string;
  onSportChange: (sport: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedSport,
  onSportChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
}) => {
  const sports = ['All', 'Football', 'Basketball', 'Tennis', 'Badminton', 'Cricket', 'Table Tennis'];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-[#C5A880]" />
        <h3 className="text-white font-semibold">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
          />
        </div>

        {/* Sport Filter */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Sport</label>
          <select
            value={selectedSport}
            onChange={(e) => onSportChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
          >
            {sports.map((sport) => (
              <option key={sport} value={sport} className="bg-gray-900">
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Max Price/Hour</label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <span>$0</span>
            <span className="text-[#C5A880] font-medium">${priceRange[1]}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Min Rating</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => onRatingChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <span>0★</span>
            <span className="text-[#C5A880] font-medium">{minRating}★</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;