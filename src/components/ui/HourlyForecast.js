import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, CloudRain } from 'lucide-react';

const HourlyForecast = ({ hourlyForecast, getWeatherIcon }) => {
  return (
    <motion.div 
      className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-white/5 w-full overflow-hidden mx-2 transition-colors duration-300"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-6 text-white/90 dark:text-blue-100/90">Next 12 Hours</h3>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden py-3 scrollbar-hide -webkit-overflow-scrolling-touch whitespace-nowrap">
        {hourlyForecast.slice(0, 12).map((hour, index) => {
          const HourIcon = getWeatherIcon(hour.icon);
          return (
            <motion.div
              key={`hour-${index}-${hour.time}`}
              className="min-w-[140px] md:min-w-[160px] lg:min-w-[180px] flex-shrink-0 flex-grow-0 text-center p-5 bg-white/5 dark:bg-white/3 rounded-xl border border-white/5 dark:border-white/3 transition-all duration-300 inline-block hover:bg-white/10 dark:hover:bg-white/8 hover:-translate-y-2 hover:shadow-lg group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="text-sm md:text-base opacity-80 mb-3 font-medium text-white/80 dark:text-blue-200/80">{hour.time}</div>
              
              <div className="my-4 flex justify-center">
                <div className="p-2 rounded-lg bg-white/10 dark:bg-white/5 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors duration-300">
                  <HourIcon className="w-9 h-9 text-white dark:text-blue-100" />
                </div>
              </div>
              
              <div className="text-xl md:text-2xl font-bold my-3 text-white dark:text-blue-100">{hour.temp}°</div>
              <div className="text-sm opacity-70 mb-4 text-blue-100 dark:text-blue-200">Feels {hour.feels_like}°</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs md:text-sm opacity-80">
                  <Droplets className="w-3 h-3" />
                  <span>{hour.humidity}%</span>
                </div>
                {hour.pop > 0 && (
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm opacity-80">
                    <CloudRain className="w-3 h-3" />
                    <span>{hour.pop}%</span>
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

export default HourlyForecast;
