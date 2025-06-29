import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, BarChart3, PieChart, Thermometer, Droplets, Wind, Gauge } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdvancedCharts = ({ hourlyForecast, weather, darkMode }) => {
  const [activeChart, setActiveChart] = useState('temperature');

  // Prepare data for different chart types
  const chartData = useMemo(() => {
    if (!hourlyForecast || hourlyForecast.length === 0) return null;

    const labels = hourlyForecast.slice(0, 12).map(item => item.time);
    
    return {
      temperature: {
        labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: hourlyForecast.slice(0, 12).map(item => item.temp),
            borderColor: darkMode ? '#3b82f6' : '#8b5cf6',
            backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: darkMode ? '#3b82f6' : '#8b5cf6',
            pointBorderColor: darkMode ? '#1d4ed8' : '#7c3aed',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Feels Like (°C)',
            data: hourlyForecast.slice(0, 12).map(item => item.feels_like),
            borderColor: darkMode ? '#f59e0b' : '#ec4899',
            backgroundColor: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(236, 72, 153, 0.1)',
            fill: false,
            tension: 0.4,
            borderDash: [5, 5],
            pointBackgroundColor: darkMode ? '#f59e0b' : '#ec4899',
            pointBorderColor: darkMode ? '#d97706' : '#db2777',
            pointBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      humidity: {
        labels,
        datasets: [
          {
            label: 'Humidity (%)',
            data: hourlyForecast.slice(0, 12).map(item => item.humidity),
            backgroundColor: hourlyForecast.slice(0, 12).map((_, index) => 
              `rgba(${darkMode ? '59, 130, 246' : '139, 92, 246'}, ${0.7 - (index * 0.05)})`
            ),
            borderColor: darkMode ? '#3b82f6' : '#8b5cf6',
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
          }
        ]
      },
      wind: {
        labels,
        datasets: [
          {
            label: 'Wind Speed (km/h)',
            data: hourlyForecast.slice(0, 12).map(item => item.windSpeed),
            borderColor: darkMode ? '#10b981' : '#06b6d4',
            backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: darkMode ? '#10b981' : '#06b6d4',
            pointBorderColor: darkMode ? '#059669' : '#0891b2',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      pressure: {
        labels,
        datasets: [
          {
            label: 'Pressure (hPa)',
            data: hourlyForecast.slice(0, 12).map(item => item.pressure),
            borderColor: darkMode ? '#ef4444' : '#f97316',
            backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(249, 115, 22, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: darkMode ? '#ef4444' : '#f97316',
            pointBorderColor: darkMode ? '#dc2626' : '#ea580c',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      }
    };
  }, [hourlyForecast, darkMode]);

  // Weather conditions distribution (Doughnut chart)
  const weatherDistribution = useMemo(() => {
    if (!hourlyForecast || hourlyForecast.length === 0) return null;

    const conditions = hourlyForecast.reduce((acc, item) => {
      const condition = item.description.split(' ')[0]; // Get first word
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});

    const colors = darkMode 
      ? ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
      : ['#8b5cf6', '#06b6d4', '#f97316', '#ef4444', '#10b981', '#3b82f6'];

    return {
      labels: Object.keys(conditions),
      datasets: [
        {
          data: Object.values(conditions),
          backgroundColor: colors.slice(0, Object.keys(conditions).length),
          borderColor: darkMode ? '#1e293b' : '#ffffff',
          borderWidth: 2,
          hoverBorderWidth: 3
        }
      ]
    };
  }, [hourlyForecast, darkMode]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#cbd5e1' : '#374151',
          font: {
            size: 12,
            weight: 'bold'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#cbd5e1' : '#374151',
        bodyColor: darkMode ? '#cbd5e1' : '#374151',
        borderColor: darkMode ? '#475569' : '#d1d5db',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: activeChart !== 'conditions' ? {
      x: {
        grid: {
          color: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)',
          borderColor: darkMode ? '#475569' : '#d1d5db'
        },
        ticks: {
          color: darkMode ? '#cbd5e1' : '#374151',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)',
          borderColor: darkMode ? '#475569' : '#d1d5db'
        },
        ticks: {
          color: darkMode ? '#cbd5e1' : '#374151',
          font: {
            size: 11
          }
        }
      }
    } : {},
    elements: {
      point: {
        hoverBorderWidth: 3
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#cbd5e1' : '#374151',
          font: {
            size: 12
          },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#cbd5e1' : '#374151',
        bodyColor: darkMode ? '#cbd5e1' : '#374151',
        borderColor: darkMode ? '#475569' : '#d1d5db',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    cutout: '60%'
  };

  const chartTypes = [
    { id: 'temperature', label: 'Temperature', icon: Thermometer, component: Line },
    { id: 'humidity', label: 'Humidity', icon: Droplets, component: Bar },
    { id: 'wind', label: 'Wind', icon: Wind, component: Line },
    { id: 'pressure', label: 'Pressure', icon: Gauge, component: Line },
    { id: 'conditions', label: 'Conditions', icon: PieChart, component: Doughnut }
  ];

  if (!chartData || !hourlyForecast || hourlyForecast.length === 0) {
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
        <div className={`text-center py-8 ${
          darkMode ? 'text-blue-200' : 'text-white/80'
        }`}>
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No forecast data available for charts</p>
        </div>
      </motion.div>
    );
  }

  const ActiveChartComponent = chartTypes.find(chart => chart.id === activeChart)?.component || Line;
  const activeChartData = activeChart === 'conditions' ? weatherDistribution : chartData[activeChart];
  const activeOptions = activeChart === 'conditions' ? doughnutOptions : chartOptions;

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg md:text-xl font-semibold ${
          darkMode ? 'text-blue-100' : 'text-white'
        }`}>
          Weather Analytics
        </h3>
        <TrendingUp className={`w-6 h-6 ${
          darkMode ? 'text-blue-300' : 'text-white/80'
        }`} />
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTypes.map((chart) => {
          const IconComponent = chart.icon;
          return (
            <motion.button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeChart === chart.id
                  ? darkMode
                    ? 'bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/30'
                    : 'bg-white/20 text-white ring-1 ring-white/30'
                  : darkMode
                    ? 'bg-white/5 text-blue-300 hover:bg-white/10'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{chart.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Chart Container */}
      <motion.div 
        className="relative h-64 md:h-80"
        key={activeChart}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {activeChartData && (
          <ActiveChartComponent 
            data={activeChartData} 
            options={activeOptions}
          />
        )}
      </motion.div>

      {/* Chart Legend/Info */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {activeChart === 'temperature' && (
          <>
            <div className={`text-center p-3 rounded-lg ${
              darkMode ? 'bg-white/5' : 'bg-white/10'
            }`}>
              <div className={`text-lg font-semibold ${
                darkMode ? 'text-blue-200' : 'text-white'
              }`}>
                {weather?.main?.temp}°C
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-blue-300' : 'text-white/80'
              }`}>
                Current
              </div>
            </div>
            <div className={`text-center p-3 rounded-lg ${
              darkMode ? 'bg-white/5' : 'bg-white/10'
            }`}>
              <div className={`text-lg font-semibold ${
                darkMode ? 'text-orange-200' : 'text-white'
              }`}>
                {weather?.main?.feels_like}°C
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-orange-300' : 'text-white/80'
              }`}>
                Feels Like
              </div>
            </div>
          </>
        )}
        
        {activeChart === 'humidity' && (
          <div className={`text-center p-3 rounded-lg ${
            darkMode ? 'bg-white/5' : 'bg-white/10'
          }`}>
            <div className={`text-lg font-semibold ${
              darkMode ? 'text-blue-200' : 'text-white'
            }`}>
              {weather?.main?.humidity}%
            </div>
            <div className={`text-sm ${
              darkMode ? 'text-blue-300' : 'text-white/80'
            }`}>
              Current Humidity
            </div>
          </div>
        )}

        {activeChart === 'wind' && (
          <div className={`text-center p-3 rounded-lg ${
            darkMode ? 'bg-white/5' : 'bg-white/10'
          }`}>
            <div className={`text-lg font-semibold ${
              darkMode ? 'text-green-200' : 'text-white'
            }`}>
              {Math.round(weather?.wind?.speed * 3.6)} km/h
            </div>
            <div className={`text-sm ${
              darkMode ? 'text-green-300' : 'text-white/80'
            }`}>
              Current Wind
            </div>
          </div>
        )}

        {activeChart === 'pressure' && (
          <div className={`text-center p-3 rounded-lg ${
            darkMode ? 'bg-white/5' : 'bg-white/10'
          }`}>
            <div className={`text-lg font-semibold ${
              darkMode ? 'text-red-200' : 'text-white'
            }`}>
              {weather?.main?.pressure} hPa
            </div>
            <div className={`text-sm ${
              darkMode ? 'text-red-300' : 'text-white/80'
            }`}>
              Current Pressure
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdvancedCharts;
