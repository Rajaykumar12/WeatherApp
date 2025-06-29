import React from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw } from 'lucide-react';

const ActionButtons = ({ onSearchAgain, onRefresh }) => {
  return (
    <motion.div
      className="flex gap-4 justify-center mt-4 md:mt-6 lg:mt-12 flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <motion.button 
        className="flex items-center gap-2 md:gap-3 py-3 md:py-4 px-6 md:px-7 lg:px-8 bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-3xl text-white text-base md:text-lg font-medium cursor-pointer transition-all duration-300 backdrop-blur-xl hover:bg-white/30 dark:hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg"
        onClick={onSearchAgain}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="w-4 h-4 md:w-5 md:h-5" />
        Search Another City
      </motion.button>
      
      <motion.button 
        className="p-3 md:p-4 bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-full text-white text-base md:text-lg cursor-pointer transition-all duration-300 backdrop-blur-xl w-12 md:w-14 h-12 md:h-14 flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/20 hover:-translate-y-1"
        onClick={onRefresh}
        whileHover={{ scale: 1.05, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        title="Refresh weather data"
      >
        <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>
    </motion.div>
  );
};

export default ActionButtons;
