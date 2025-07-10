import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, CloudRain, Sun, Wind } from 'lucide-react';

const DailyForecast = ({ extendedForecast, getWeatherIcon, darkMode }) => {
  // Use extended forecast data if available, otherwise fallback to processing forecast
  const dailyData = extendedForecast || [];

  return (
    <motion.div 
      className={`backdrop-blur-xl rounded-2xl p-6 transition-colors duration-300 mx-2 ${
        darkMode 
          ? 'bg-white/5 border-0' 
          : 'bg-white/10 border border-white/10'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={`text-lg md:text-xl font-semibold mb-6 ${
        darkMode ? 'text-blue-100/90' : 'text-white/90'
      }`}>5-Day Forecast</h3>
      <div className="flex gap-4 overflow-x-auto py-3 scrollbar-hide">
        {dailyData.map((day, index) => {
          const DayIcon = getWeatherIcon(day.icon);
          const isToday = index === 0;
          
          return (
            <motion.div
              key={`day-${index}-${day.date.toISOString()}`}
              className={`flex flex-col items-center gap-4 p-5 rounded-xl border transition-all duration-300 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] text-center flex-shrink-0 hover:-translate-y-2 hover:shadow-lg group ${
                darkMode
                  ? 'bg-white/3 border-white/3 hover:bg-white/8'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className={`font-semibold text-sm md:text-base mb-2 ${
                darkMode ? 'text-blue-100/90' : 'text-white/90'
              }`}>
                {isToday ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              
              <div className="text-center mb-3">
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                  darkMode
                    ? 'bg-white/5 group-hover:bg-white/10'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <DayIcon className={`w-10 h-10 ${
                    darkMode ? 'text-blue-200/80' : 'text-white/80'
                  }`} />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 items-center mb-3">
                <span className={`font-bold text-xl md:text-2xl ${
                  darkMode ? 'text-blue-100' : 'text-white'
                }`}>
                  {day.temp.max}°
                </span>
                <span className={`opacity-70 text-sm md:text-base ${
                  darkMode ? 'text-blue-200' : 'text-blue-100'
                }`}>
                  {day.temp.min}°
                </span>
              </div>
              
              <div className={`text-xs md:text-sm capitalize text-center mb-3 leading-tight opacity-90 ${
                darkMode ? 'text-blue-200' : 'text-blue-100'
              }`}>
                {day.description}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                  <Droplets className="w-3 h-3" />
                  <span>{day.humidity}%</span>
                </div>
                {day.pop > 0 && (
                  <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                    <CloudRain className="w-3 h-3" />
                    <span>{day.pop}%</span>
                  </div>
                )}
                {day.uvi && (
                  <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                    <Sun className="w-3 h-3" />
                    <span>UV {Math.round(day.uvi)}</span>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                  <Wind className="w-3 h-3" />
                  <span>{day.windSpeed} km/h</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DailyForecast;
