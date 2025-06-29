import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./ModernWeatherApp.css";
import PWAInstall from "./PWAInstall";
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiFog,
  WiStrongWind,
  WiHumidity,
  WiSunrise,
  WiThermometer
} from "react-icons/wi";
import { FiSearch, FiMapPin } from "react-icons/fi";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const ModernWeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [unit] = useState("metric");
  const [activeTab, setActiveTab] = useState("current"); // current, hourly, daily

  const getWeatherIcon = (weatherCode, isDay = true) => {
    const iconMap = {
      "01d": WiDaySunny,
      "01n": WiDaySunny,
      "02d": WiCloudy,
      "02n": WiCloudy,
      "03d": WiCloudy,
      "03n": WiCloudy,
      "04d": WiCloudy,
      "04n": WiCloudy,
      "09d": WiRain,
      "09n": WiRain,
      "10d": WiRain,
      "10n": WiRain,
      "11d": WiThunderstorm,
      "11n": WiThunderstorm,      "13d": WiSnow,
      "13n": WiSnow,
      "50d": WiFog,
      "50n": WiFog,
    };
    
    return iconMap[weatherCode] || WiDaySunny;
  };

  const fetchWeather = async (searchCity = city) => {
    if (!searchCity) return;
    
    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(BASE_URL, {
          params: {
            q: searchCity,
            units: unit,
            appid: API_KEY,
          },
        }),
        axios.get(FORECAST_URL, {
          params: {
            q: searchCity,
            units: unit,
            appid: API_KEY,
          },
        })
      ]);
      
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      
      // Process hourly forecast (next 12 hours)
      const hourlyData = forecastResponse.data.list.slice(0, 12).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
        pressure: item.main.pressure,
        pop: Math.round(item.pop * 100), // Probability of precipitation
        visibility: item.visibility ? Math.round(item.visibility / 1000) : null
      }));
      
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!weather) {
    return (
      <div className={`modern-weather-app ${darkMode ? 'dark-mode' : ''}`}>
        {/* Dark Mode Toggle for Search Screen */}
        <motion.div
          className="search-dark-toggle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </motion.div>

        <div className="search-container">
          <motion.div 
            className="app-branding"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="app-title"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
            >
              KNOWEA
            </motion.h1>
            <motion.p 
              className="app-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Beautiful Weather, Beautiful Experience
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="search-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="search-icon-wrapper"
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
            >
              <FiSearch className="search-icon" />
            </motion.div>
            <input
              type="text"
              placeholder={loading ? "Searching..." : "Search for a city..."}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
              className="search-input"
              disabled={loading}
            />
            {loading && (
              <motion.div
                className="loading-spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.div>
          
          <motion.div
            className="search-suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>Try searching for cities like:</p>
            <div className="suggestion-buttons">
              {['New York', 'London', 'Tokyo', 'Paris'].map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  className="suggestion-btn"
                  onClick={() => {
                    setCity(suggestion);
                    fetchWeather(suggestion);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);
  // const hourlyData = getHourlyForecast(); // Using hourlyForecast state instead

  return (
    <div className={`modern-weather-app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Enhanced Header with Dark Mode Toggle */}
      <motion.div 
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="location">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <FiMapPin className="location-icon" />
          </motion.div>
          <span>{weather.name}, {weather.sys.country}</span>
        </div>
        <div className="header-controls">
          <div className="date">{getCurrentDate()}</div>
          <motion.button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Main Weather Display */}
      <motion.div 
        className="main-weather"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="weather-icon-display"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
        >
          <WeatherIcon size={120} />
        </motion.div>
        
        <motion.div 
          className="temperature"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
        </motion.div>
        
        <motion.div 
          className="weather-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {weather.weather[0].description}
        </motion.div>
        
        <motion.div 
          className="temperature-range"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span>↑ {Math.round(weather.main.temp_max)}°</span>
          <span>↓ {Math.round(weather.main.temp_min)}°</span>
        </motion.div>
        
        <motion.div 
          className="feels-like"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Feels like {Math.round(weather.main.feels_like)}°
        </motion.div>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div 
        className="tab-navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {[
          { key: 'current', label: 'Current', icon: '🌤️' },
          { key: 'hourly', label: 'Hourly', icon: '⏰' },
          { key: 'daily', label: '5-Day', icon: '📅' }
        ].map((tab, index) => (
          <motion.button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div 
        className="tab-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Current Weather Details */}
        {activeTab === 'current' && (
          <motion.div 
            className="current-weather-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="details-grid">
              {[
                { icon: WiSunrise, label: 'Sunrise', value: formatTime(weather.sys.sunrise) },
                { icon: WiStrongWind, label: 'Wind', value: `${Math.round(weather.wind.speed * 3.6)} km/h` },
                { icon: WiHumidity, label: 'Humidity', value: `${weather.main.humidity}%` },
                { icon: WiThermometer, label: 'Pressure', value: `${weather.main.pressure} hPa` },
                { icon: WiCloudy, label: 'Clouds', value: `${weather.clouds.all}%` },
                { icon: WiDaySunny, label: 'UV Index', value: weather.uvi || 'N/A' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="detail-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <item.icon size={24} className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-value">{item.value}</div>
                    <div className="detail-label">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Hourly Forecast */}
        {activeTab === 'hourly' && hourlyForecast && (
          <motion.div 
            className="hourly-forecast-enhanced"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hourly-scroll">
              {hourlyForecast.map((hour, index) => {
                const HourIcon = getWeatherIcon(hour.icon);
                return (
                  <motion.div
                    key={index}
                    className="hourly-item-enhanced"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="hourly-time">{hour.time}</div>
                    <motion.div 
                      className="hourly-icon"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <HourIcon size={32} />
                    </motion.div>
                    <div className="hourly-temp">{hour.temp}°</div>
                    <div className="hourly-feels">Feels {hour.feels_like}°</div>
                    <div className="hourly-details">
                      <div className="hourly-humidity">💧 {hour.humidity}%</div>
                      {hour.pop > 0 && <div className="hourly-rain">🌧️ {hour.pop}%</div>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Daily Forecast */}
        {activeTab === 'daily' && forecast && (
          <motion.div 
            className="daily-forecast-enhanced"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="daily-scroll">
              {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day, index) => {
                const DayIcon = getWeatherIcon(day.weather[0].icon);
                return (
                  <motion.div
                    key={index}
                    className="daily-item-enhanced"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="daily-day">
                      {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <motion.div 
                      className="daily-icon"
                      whileHover={{ scale: 1.2 }}
                    >
                      <DayIcon size={36} />
                    </motion.div>
                    <div className="daily-temps">
                      <span className="daily-high">{Math.round(day.main.temp_max)}°</span>
                      <span className="daily-low">{Math.round(day.main.temp_min)}°</span>
                    </div>
                    <div className="daily-desc">{day.weather[0].description}</div>
                    <div className="daily-details">
                      <span>💧 {day.main.humidity}%</span>
                      {day.pop > 0 && <span>🌧️ {Math.round(day.pop * 100)}%</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Search Again Button */}
      <motion.div
        className="action-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button 
          className="search-again-btn enhanced"
          onClick={() => {
            setWeather(null);
            setHourlyForecast(null);
            setActiveTab('current');
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiSearch size={18} />
          Search Another City
        </motion.button>
        
        <motion.button 
          className="refresh-btn"
          onClick={() => fetchWeather()}
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          title="Refresh weather data"
        >
          🔄
        </motion.button>
      </motion.div>
      
      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
  );
};

export default ModernWeatherApp;
