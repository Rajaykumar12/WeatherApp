import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Gauge, AlertCircle, CheckCircle } from 'lucide-react';

const AirQualityCard = ({ airQuality, darkMode }) => {
  if (!airQuality) return null;

  const pollutants = [
    { name: 'CO', value: airQuality.components.co, unit: 'μg/m³', description: 'Carbon Monoxide' },
    { name: 'NO₂', value: airQuality.components.no2, unit: 'μg/m³', description: 'Nitrogen Dioxide' },
    { name: 'O₃', value: airQuality.components.o3, unit: 'μg/m³', description: 'Ozone' },
    { name: 'SO₂', value: airQuality.components.so2, unit: 'μg/m³', description: 'Sulfur Dioxide' },
    { name: 'PM2.5', value: airQuality.components.pm2_5, unit: 'μg/m³', description: 'Fine Particles' },
    { name: 'PM10', value: airQuality.components.pm10, unit: 'μg/m³', description: 'Coarse Particles' },
    { name: 'NH₃', value: airQuality.components.nh3, unit: 'μg/m³', description: 'Ammonia' }
  ];

  const getHealthIcon = (aqi) => {
    return aqi <= 2 ? CheckCircle : AlertCircle;
  };

  const HealthIcon = getHealthIcon(airQuality.aqi);

  return (
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
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${
          darkMode
            ? 'bg-white/5'
            : 'bg-white/10'
        }`}>
          <Wind className={`w-6 h-6 ${
            darkMode ? 'text-blue-200/80' : 'text-white/80'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg md:text-xl font-semibold ${
            darkMode ? 'text-blue-100/90' : 'text-white/90'
          }`}>
            Air Quality
          </h3>
          <div className="flex items-center gap-2">
            <HealthIcon className={`w-4 h-4 ${airQuality.color}`} />
            <span className={`text-sm font-medium ${airQuality.color}`}>
              {airQuality.label}
            </span>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-4 rounded-xl ${
        darkMode
          ? 'bg-white/3'
          : 'bg-white/5'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <Gauge className={`w-5 h-5 ${airQuality.color}`} />
          <span className={`text-lg font-semibold ${airQuality.color}`}>
            AQI {airQuality.aqi}
          </span>
        </div>
        <p className={`text-sm ${
          darkMode ? 'text-blue-200/70' : 'text-white/70'
        }`}>
          {airQuality.description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pollutants.map((pollutant, index) => (
          <motion.div
            key={pollutant.name}
            className={`p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode
                ? 'bg-white/3 hover:bg-white/8'
                : 'bg-white/5 hover:bg-white/10'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`text-xs mb-1 opacity-70 ${
              darkMode ? 'text-blue-200/70' : 'text-white/70'
            }`}>
              {pollutant.description}
            </div>
            <div className={`font-semibold text-lg mb-1 ${
              darkMode ? 'text-blue-100' : 'text-white'
            }`}>
              {pollutant.name}
            </div>
            <div className={`text-sm ${
              darkMode ? 'text-blue-200/80' : 'text-white/80'
            }`}>
              {pollutant.value.toFixed(1)} {pollutant.unit}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AirQualityCard;
