import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sun, Moon } from 'lucide-react';

const Header = ({ location, country, darkMode, setDarkMode }) => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      className="flex justify-between items-start mb-8 relative z-10 flex-shrink-0 px-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-3 text-base font-medium opacity-90">
        <motion.div
          className="p-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MapPin className="w-4 h-4 text-white/80 dark:text-blue-200/80" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-white dark:text-blue-100 font-semibold">{location}, {country}</span>
          <span className="text-white/70 dark:text-blue-200/70 text-sm font-normal">{getCurrentDate()}</span>
        </div>
      </div>
      
      <motion.button
        className={`
          relative p-3 rounded-full transition-all duration-500 backdrop-blur-sm border
          ${darkMode 
            ? 'bg-gray-800/90 border-gray-600/30 text-yellow-300 hover:bg-gray-700/90' 
            : 'bg-white/20 border-white/10 text-white hover:bg-white/30'
          }
          hover:scale-110 active:scale-95 shadow-lg
        `}
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          key={darkMode ? 'sun' : 'moon'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default Header;
