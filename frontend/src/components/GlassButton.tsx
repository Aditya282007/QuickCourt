import React from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  const baseClasses = 'backdrop-blur-md border rounded-2xl font-medium transition-all duration-300 hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-white/10 border-white/20 text-white hover:bg-premium-purple-500/20 hover:border-premium-purple-500/40',
    secondary: 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};