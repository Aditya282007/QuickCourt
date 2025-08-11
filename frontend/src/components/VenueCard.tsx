import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Venue } from '../data/venues';

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  return (
    <GlassCard className="overflow-hidden" onClick={onClick}>
      <div className="relative h-48">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{venue.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-white text-lg font-semibold mb-2">{venue.name}</h3>
        
        <div className="flex items-center space-x-1 text-gray-300 text-sm mb-2">
          <MapPin className="h-4 w-4" />
          <span>{venue.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">{venue.sport}</span>
          <span className="text-white font-bold">${venue.pricePerHour}/hr</span>
        </div>
      </div>
    </GlassCard>
  );
};