import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const WeatherCard = ({ weather, unit, WeatherIcon, darkMode }) => {
  return (
    <motion.div 
      className="text-center mb-5 md:mb-8 lg:mb-0 p-6 md:p-8 lg:p-10 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 flex-shrink-0 transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div 
        className="mb-5"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
      >
        <WeatherIcon size={120} />
      </motion.div>
      
      <motion.div 
        className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-2 md:mb-3 bg-gradient-to-br bg-clip-text text-transparent ${
          darkMode 
            ? 'from-darkPalette-text to-darkPalette-highlight' 
            : 'from-lightPalette-text to-lightPalette-secondary'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
      </motion.div>
      
      <motion.div 
        className={`text-lg md:text-xl font-normal opacity-90 mb-3 capitalize ${
          darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {weather.weather[0].description}
      </motion.div>
      
      <motion.div 
        className="flex justify-center items-center gap-6 text-base md:text-lg opacity-80 font-medium mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <span>{Math.round(weather.main.temp_max)}°</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingDown className="w-4 h-4" />
          <span>{Math.round(weather.main.temp_min)}°</span>
        </div>
      </motion.div>
      
      <motion.div 
        className={`text-base opacity-70 ${
          darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Feels like {Math.round(weather.main.feels_like)}°
      </motion.div>
    </motion.div>
  );
};

export default WeatherCard;
