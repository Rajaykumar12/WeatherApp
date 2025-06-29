import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sunrise, 
  Wind, 
  Droplets, 
  Thermometer,
  Cloud,
  Sun,
  Sunset,
  AlertTriangle,
  Gauge,
  Eye
} from 'lucide-react';

const CurrentWeather = ({ weather, uvIndex, airQuality, weatherAlerts, darkMode }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getUVIndexInfo = (uv) => {
    if (uv === null || uv === undefined) return { 
      level: 'N/A', 
      color: darkMode ? 'text-gray-500' : 'text-gray-400' 
    };
    
    if (uv <= 2) return { 
      level: `${uv} (Low)`, 
      color: darkMode ? 'text-green-300' : 'text-green-400' 
    };
    if (uv <= 5) return { 
      level: `${uv} (Moderate)`, 
      color: darkMode ? 'text-yellow-300' : 'text-yellow-400' 
    };
    if (uv <= 7) return { 
      level: `${uv} (High)`, 
      color: darkMode ? 'text-orange-300' : 'text-orange-400' 
    };
    if (uv <= 10) return { 
      level: `${uv} (Very High)`, 
      color: darkMode ? 'text-red-300' : 'text-red-400' 
    };
    return { 
      level: `${uv} (Extreme)`, 
      color: darkMode ? 'text-purple-300' : 'text-purple-400' 
    };
  };

  const uvInfo = getUVIndexInfo(uvIndex);

  const weatherDetails = [
    { icon: Sunrise, label: 'Sunrise', value: formatTime(weather.sys.sunrise) },
    { icon: Sunset, label: 'Sunset', value: formatTime(weather.sys.sunset) },
    { icon: Wind, label: 'Wind', value: `${Math.round(weather.wind.speed * 3.6)} km/h` },
    { icon: Droplets, label: 'Humidity', value: `${weather.main.humidity}%` },
    { icon: Thermometer, label: 'Pressure', value: `${weather.main.pressure} hPa` },
    { icon: Cloud, label: 'Clouds', value: `${weather.clouds.all}%` },
    { icon: Sun, label: 'UV Index', value: uvInfo.level, colorClass: uvInfo.color },
    { 
      icon: Eye, 
      label: 'Visibility', 
      value: weather.visibility ? `${Math.round(weather.visibility / 1000)} km` : 'N/A' 
    }
  ];

  // Add air quality if available
  if (airQuality) {
    weatherDetails.push({
      icon: Gauge,
      label: 'Air Quality',
      value: airQuality.label,
      colorClass: airQuality.color
    });
  }

  return (
    <div>
      {/* Weather Alerts */}
      {weatherAlerts && weatherAlerts.length > 0 && (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {weatherAlerts.map((alert, index) => (
            <motion.div
              key={index}
              className={`backdrop-blur-xl rounded-2xl p-4 mb-4 border-l-4 transition-colors duration-300 ${
                darkMode 
                  ? 'bg-red-900/20 border-red-400 text-red-200' 
                  : 'bg-red-100/20 border-red-500 text-red-800'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">{alert.event}</h3>
                  <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                  <div className="text-xs opacity-70">
                    <span>From: {new Date(alert.start * 1000).toLocaleDateString()}</span>
                    {alert.end && (
                      <span className="ml-4">To: {new Date(alert.end * 1000).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Current Weather Details */}
      <motion.div 
        className={`backdrop-blur-xl rounded-2xl p-6 transition-colors duration-300 mx-2 ${
          darkMode 
            ? 'bg-white/5 border-0' 
            : 'bg-white/10 border border-white/10'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherDetails.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.label}
                className={`flex items-center lg:flex-col lg:text-center gap-3 lg:gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group ${
                  darkMode
                    ? 'bg-white/3 border-0 hover:bg-white/8'
                    : 'bg-white/5 border border-white/5 hover:bg-white/10'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                  darkMode
                    ? 'bg-white/5 group-hover:bg-white/10'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <IconComponent className={`w-5 h-5 lg:w-6 lg:h-6 ${
                    darkMode ? 'text-blue-200/80' : 'text-white/80'
                  }`} />
                </div>
                <div className="flex-1 lg:flex-none">
                  <div className={`text-lg lg:text-xl font-semibold mb-1 ${
                    item.colorClass || (darkMode ? 'text-blue-100' : 'text-white')
                  }`}>
                    {item.value}
                  </div>
                  <div className={`text-sm opacity-80 ${
                    darkMode ? 'text-blue-200/70' : 'text-white/70'
                  }`}>{item.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentWeather;
