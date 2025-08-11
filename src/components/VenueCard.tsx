import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users } from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
    >
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#C5A880] fill-current" />
            <span className="text-white text-sm font-medium">{venue.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#C5A880] transition-colors">
          {venue.name}
        </h3>
        
        <div className="flex items-center space-x-2 text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{venue.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {venue.sports.slice(0, 3).map((sport) => (
            <span
              key={sport}
              className="px-2 py-1 bg-[#C5A880]/20 text-[#C5A880] text-xs rounded-lg border border-[#C5A880]/30"
            >
              {sport}
            </span>
          ))}
          {venue.sports.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg">
              +{venue.sports.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#C5A880] font-bold text-lg">${venue.pricePerHour}</span>
            <span className="text-gray-400 text-sm">/hour</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <Users className="w-4 h-4" />
            <span>{venue.courts.length} courts</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard;