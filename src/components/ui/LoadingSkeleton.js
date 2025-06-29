import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ darkMode }) => {
  const shimmerVariants = {
    loading: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`font-sf-pro w-screen min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-darkPalette-blend1 via-darkPalette-blend2 to-darkPalette-accent' 
        : 'bg-gradient-to-br from-lightPalette-primary via-lightPalette-secondary to-lightPalette-tertiary'
    } p-4 md:p-6 lg:p-8 relative overflow-x-hidden overflow-y-auto scrollbar-hide box-border flex flex-col justify-start`}>
      
      {/* Glassmorphism background effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-indigo-400/10 via-blue-400/8 to-indigo-500/12' 
          : 'bg-gradient-to-br from-white/15 via-transparent to-white/10'
      }`} />

      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8 z-10 relative">
        <div>
          <motion.div 
            className={`h-8 w-48 rounded-lg mb-2 ${
              darkMode ? 'bg-white/10' : 'bg-white/20'
            }`}
            variants={shimmerVariants}
            animate="loading"
          />
          <motion.div 
            className={`h-5 w-32 rounded-lg ${
              darkMode ? 'bg-white/5' : 'bg-white/10'
            }`}
            variants={shimmerVariants}
            animate="loading"
          />
        </div>
        <motion.div 
          className={`w-12 h-12 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-white/20'
          }`}
          variants={shimmerVariants}
          animate="loading"
        />
      </div>

      {/* Main Weather Card Skeleton */}
      <motion.div 
        className={`backdrop-blur-xl rounded-2xl p-8 mb-8 ${
          darkMode ? 'bg-white/5' : 'bg-white/10'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div 
            className={`w-32 h-32 rounded-full mx-auto mb-6 ${
              darkMode ? 'bg-white/10' : 'bg-white/20'
            }`}
            variants={shimmerVariants}
            animate="loading"
          />
          <motion.div 
            className={`h-12 w-24 rounded-lg mx-auto mb-4 ${
              darkMode ? 'bg-white/10' : 'bg-white/20'
            }`}
            variants={shimmerVariants}
            animate="loading"
          />
          <motion.div 
            className={`h-6 w-40 rounded-lg mx-auto ${
              darkMode ? 'bg-white/5' : 'bg-white/10'
            }`}
            variants={shimmerVariants}
            animate="loading"
          />
        </div>
      </motion.div>

      {/* Tab Navigation Skeleton */}
      <motion.div 
        className={`flex justify-center gap-1 mb-8 p-1.5 rounded-2xl ${
          darkMode ? 'bg-white/5' : 'bg-white/10'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[1, 2, 3, 4].map((_, index) => (
          <motion.div
            key={index}
            className={`h-12 w-20 rounded-xl ${
              darkMode ? 'bg-white/5' : 'bg-white/10'
            }`}
            variants={shimmerVariants}
            animate="loading"
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </motion.div>

      {/* Content Area Skeleton */}
      <motion.div 
        className={`backdrop-blur-xl rounded-2xl p-6 mb-6 ${
          darkMode ? 'bg-white/5' : 'bg-white/10'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <motion.div
              key={index}
              className={`p-5 rounded-xl ${
                darkMode ? 'bg-white/3' : 'bg-white/5'
              }`}
              variants={shimmerVariants}
              animate="loading"
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className={`w-10 h-10 rounded-lg mb-4 ${
                  darkMode ? 'bg-white/5' : 'bg-white/10'
                }`}
                variants={shimmerVariants}
                animate="loading"
              />
              <motion.div 
                className={`h-6 w-16 rounded mb-2 ${
                  darkMode ? 'bg-white/5' : 'bg-white/10'
                }`}
                variants={shimmerVariants}
                animate="loading"
              />
              <motion.div 
                className={`h-4 w-12 rounded ${
                  darkMode ? 'bg-white/5' : 'bg-white/10'
                }`}
                variants={shimmerVariants}
                animate="loading"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons Skeleton */}
      <div className="mt-auto pt-4 flex gap-4">
        <motion.div 
          className={`flex-1 h-12 rounded-full ${
            darkMode ? 'bg-white/5' : 'bg-white/10'
          }`}
          variants={shimmerVariants}
          animate="loading"
        />
        <motion.div 
          className={`flex-1 h-12 rounded-full ${
            darkMode ? 'bg-white/5' : 'bg-white/10'
          }`}
          variants={shimmerVariants}
          animate="loading"
        />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
