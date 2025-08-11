import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: number;
  changeType: 'increase' | 'decrease';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, change, changeType }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#C5A880]/20 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#C5A880]" />
        </div>
        <div className={`flex items-center space-x-1 ${
          changeType === 'increase' ? 'text-green-400' : 'text-red-400'
        }`}>
          {changeType === 'increase' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{change}%</span>
        </div>
      </div>
      
      <h3 className="text-white text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </motion.div>
  );
};

export default StatsCard;