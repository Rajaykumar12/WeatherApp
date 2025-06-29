import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, CloudRain } from 'lucide-react';

const DailyForecast = ({ forecast, getWeatherIcon }) => {
  const dailyData = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <motion.div 
      className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-white/5 mx-2 transition-colors duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg md:text-xl font-semibold mb-6 text-white/90 dark:text-blue-100/90">5-Day Forecast</h3>
      <div className="flex gap-4 overflow-x-auto py-3 scrollbar-hide">
        {dailyData.map((day, index) => {
          const DayIcon = getWeatherIcon(day.weather[0].icon);
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-4 p-5 bg-white/5 dark:bg-white/3 rounded-xl border border-white/5 dark:border-white/3 transition-all duration-300 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] text-center flex-shrink-0 hover:bg-white/10 dark:hover:bg-white/8 hover:-translate-y-2 hover:shadow-lg group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="font-semibold text-sm md:text-base mb-2 text-white/90 dark:text-blue-100/90">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              
              <div className="text-center mb-3">
                <div className="p-2 rounded-lg bg-white/10 dark:bg-white/5 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors duration-300">
                  <DayIcon size={40} />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 items-center mb-3">
                <span className="font-bold text-xl md:text-2xl text-white dark:text-blue-100">{Math.round(day.main.temp_max)}°</span>
                <span className="opacity-70 text-sm md:text-base text-blue-100 dark:text-blue-200">{Math.round(day.main.temp_min)}°</span>
              </div>
              
              <div className="text-xs md:text-sm capitalize text-center mb-3 leading-tight opacity-90 text-blue-100 dark:text-blue-200">
                {day.weather[0].description}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                  <Droplets className="w-3 h-3" />
                  <span>{day.main.humidity}%</span>
                </div>
                {day.pop > 0 && (
                  <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                    <CloudRain className="w-3 h-3" />
                    <span>{Math.round(day.pop * 100)}%</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DailyForecast;
