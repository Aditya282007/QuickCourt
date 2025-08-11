import React from 'react';
import { motion } from 'framer-motion';
import { ChartData } from '../../types/admin';

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: ChartData;
  type: 'line' | 'bar' | 'doughnut';
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, data, type }) => {
  // This is a placeholder for the actual chart implementation
  // In a real app, you would use a charting library like Chart.js or Recharts
  
  const renderPlaceholderChart = () => {
    switch (type) {
      case 'line':
        return (
          <div className="h-64 flex items-end justify-between space-x-2 p-4">
            {data.labels.map((label, index) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-[#C5A880]/30 rounded-t-lg mb-2"
                  style={{ 
                    height: `${(data.datasets[0].data[index] / Math.max(...data.datasets[0].data)) * 200}px` 
                  }}
                />
                <span className="text-gray-400 text-xs">{label}</span>
              </div>
            ))}
          </div>
        );
      case 'bar':
        return (
          <div className="h-64 flex items-end justify-between space-x-2 p-4">
            {data.labels.map((label, index) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-[#C5A880]/50 rounded-t-lg mb-2"
                  style={{ 
                    height: `${(data.datasets[0].data[index] / Math.max(...data.datasets[0].data)) * 200}px` 
                  }}
                />
                <span className="text-gray-400 text-xs">{label}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="h-64 flex items-center justify-center">
            <div className="w-32 h-32 border-8 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
    >
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      
      <div className="relative">
        {renderPlaceholderChart()}
        
        {/* Chart.js or other charting library would be integrated here */}
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-lg px-3 py-1">
          <span className="text-gray-300 text-xs">Chart Placeholder</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChartCard;