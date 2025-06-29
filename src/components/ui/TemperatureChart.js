import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

const TemperatureChart = ({ hourlyForecast, darkMode }) => {
  // Process forecast data for the chart (next 24 hours)
  const chartData = hourlyForecast?.slice(0, 8).map((item, index) => {
    const timeStr = item.time;
    return {
      time: timeStr,
      temp: Math.round(item.temp),
      feels_like: Math.round(item.feels_like),
      humidity: item.humidity,
      pop: item.pop
    };
  }) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-3 rounded-lg border backdrop-blur-sm ${
            darkMode 
              ? 'bg-darkPalette-card/90 border-darkPalette-accent/30 text-darkPalette-text' 
              : 'bg-lightPalette-accent/90 border-lightPalette-secondary/30 text-lightPalette-text'
          }`}
        >
          <p className="font-semibold mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Temperature: {payload[0]?.value}°C
            </p>
            <p className="text-sm flex items-center">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              Feels like: {payload[1]?.value}°C
            </p>
            {payload[2] && (
              <p className="text-sm flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Humidity: {payload[2]?.value}%
              </p>
            )}
          </div>
        </motion.div>
      );
    }
    return null;
  };

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
      <h3 className={`text-lg md:text-xl font-semibold mb-6 ${
        darkMode ? 'text-darkPalette-text' : 'text-lightPalette-text'
      }`}>
        24-Hour Temperature Trend
      </h3>
      
      {chartData.length > 0 ? (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkMode ? '#475569' : '#8b5cf6'} 
                strokeOpacity={0.2}
              />
              <XAxis 
                dataKey="time" 
                tick={{ 
                  fill: darkMode ? '#cbd5e1' : '#7c3aed', 
                  fontSize: 12 
                }}
                axisLine={{ stroke: darkMode ? '#475569' : '#8b5cf6', strokeOpacity: 0.3 }}
              />
              <YAxis 
                tick={{ 
                  fill: darkMode ? '#cbd5e1' : '#7c3aed', 
                  fontSize: 12 
                }}
                axisLine={{ stroke: darkMode ? '#475569' : '#8b5cf6', strokeOpacity: 0.3 }}
                label={{ 
                  value: '°C', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: darkMode ? '#cbd5e1' : '#7c3aed' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke={darkMode ? '#3b82f6' : '#8b5cf6'} 
                strokeWidth={3}
                dot={{ fill: darkMode ? '#3b82f6' : '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: darkMode ? '#1d4ed8' : '#7c3aed', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="feels_like" 
                stroke={darkMode ? '#f97316' : '#ec4899'} 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: darkMode ? '#f97316' : '#ec4899', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: darkMode ? '#ea580c' : '#db2777', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className={`text-center py-8 ${
          darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
        }`}>
          <p>No temperature data available</p>
        </div>
      )}
      
      <div className="flex justify-center mt-6 space-x-6">
        <div className="flex items-center text-sm">
          <span className="inline-block w-4 h-0.5 bg-blue-500 mr-2"></span>
          <span className={darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'}>
            Temperature
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="inline-block w-4 h-0.5 bg-orange-500 border-dashed border-t-2 border-orange-500 mr-2"></span>
          <span className={darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'}>
            Feels Like
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TemperatureChart;
