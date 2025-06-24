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
  WiSunrise
} from "react-icons/wi";
import { FiSearch, FiMapPin } from "react-icons/fi";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const ModernWeatherApp = () => {
  const [city, setCity] = useState("");  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit] = useState("metric");

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

  const getHourlyForecast = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 4).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description
    }));
  };
  if (!weather) {
    return (
      <div className="modern-weather-app">
        <div className="search-container">
          <div className="app-branding">
            <h1 className="app-title">KNOWEA</h1>
            <p className="app-subtitle">Beautiful Weather, Beautiful Experience</p>
          </div>
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
              className="search-input"
            />
          </div>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);
  const hourlyData = getHourlyForecast();

  return (
    <div className="modern-weather-app">
      {/* Header */}
      <div className="header">
        <div className="location">
          <FiMapPin className="location-icon" />
          <span>{weather.name}, {weather.sys.country}</span>
        </div>
        <div className="date">{getCurrentDate()}</div>
      </div>

      {/* Main Weather Display */}
      <motion.div 
        className="main-weather"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="temperature">
          {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
        </div>
        <div className="temperature-range">
          <span>↑ {Math.round(weather.main.temp_max)}°</span>
          <span>↓ {Math.round(weather.main.temp_min)}°</span>
        </div>
      </motion.div>

      {/* Weather Details Card */}
      <motion.div 
        className="weather-details-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="current-conditions">
          <div className="condition-item">
            <div className="condition-time">
              <WiSunrise size={20} />
              {formatTime(weather.sys.sunrise)}
            </div>
            <div className="condition-label">Sunrise</div>
          </div>
          
          <div className="condition-item">
            <div className="condition-time">
              <WiStrongWind size={20} />
              {Math.round(weather.wind.speed)} {unit === 'metric' ? 'km/h' : 'mph'}
            </div>
            <div className="condition-label">Wind</div>
          </div>
          
          <div className="condition-item">
            <div className="condition-time">
              <WiHumidity size={20} />
              {weather.main.humidity}%
            </div>
            <div className="condition-label">Humidity</div>
          </div>
        </div>
      </motion.div>

      {/* Hourly Forecast */}
      {hourlyData.length > 0 && (
        <motion.div 
          className="hourly-forecast"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="forecast-title">Hourly Forecast</h3>
          <div className="hourly-items">
            {hourlyData.map((item, index) => {
              const HourlyIcon = getWeatherIcon(item.icon);
              return (
                <div key={index} className="hourly-item">
                  <div className="hourly-time">{item.time}</div>
                  <HourlyIcon size={30} className="hourly-icon" />
                  <div className="hourly-temp">{item.temp}°</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Weather Description */}
      <motion.div 
        className="weather-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="description-item">
          <WeatherIcon size={24} />
          <span>{weather.weather[0].description}</span>
        </div>
      </motion.div>      {/* Search Again Button */}
      <motion.button 
        className="search-again-btn"
        onClick={() => setWeather(null)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Search Another City
      </motion.button>
      
      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
  );
};

export default ModernWeatherApp;
