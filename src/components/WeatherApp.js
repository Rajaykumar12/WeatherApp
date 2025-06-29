import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PWAInstall from "./PWAInstall";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  Zap,
  Waves
} from "lucide-react";

// Import all our new components
import SearchBox from "./ui/SearchBox";
import Header from "./ui/Header";
import WeatherCard from "./ui/WeatherCard";
import TabNavigation from "./ui/TabNavigation";
import CurrentWeather from "./ui/CurrentWeather";
import HourlyForecast from "./ui/HourlyForecast";
import DailyForecast from "./ui/DailyForecast";
import ActionButtons from "./ui/ActionButtons";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const UV_URL = "https://api.openweathermap.org/data/2.5/uvi";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [unit] = useState("metric");
  const [activeTab, setActiveTab] = useState("current");

  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      "01d": Sun,    // clear sky day
      "01n": Sun,    // clear sky night
      "02d": Cloud,  // few clouds day
      "02n": Cloud,  // few clouds night
      "03d": Cloud,  // scattered clouds day
      "03n": Cloud,  // scattered clouds night
      "04d": Cloud,  // broken clouds day
      "04n": Cloud,  // broken clouds night
      "09d": CloudRain, // shower rain day
      "09n": CloudRain, // shower rain night
      "10d": CloudRain, // rain day
      "10n": CloudRain, // rain night
      "11d": Zap,       // thunderstorm day
      "11n": Zap,       // thunderstorm night
      "13d": Snowflake, // snow day
      "13n": Snowflake, // snow night
      "50d": Waves,     // mist/fog day
      "50n": Waves,     // mist/fog night
    };
    
    return iconMap[weatherCode] || Sun;
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
      
      // Fetch UV Index data using coordinates
      try {
        const uvResponse = await axios.get(UV_URL, {
          params: {
            lat: weatherResponse.data.coord.lat,
            lon: weatherResponse.data.coord.lon,
            appid: API_KEY,
          },
        });
        setUvIndex(uvResponse.data.value);
      } catch (uvError) {
        console.error("Error fetching UV data:", uvError);
        setUvIndex(null);
      }
      
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
        windSpeed: Math.round(item.wind.speed * 3.6),
        pressure: item.main.pressure,
        pop: Math.round(item.pop * 100),
        visibility: item.visibility ? Math.round(item.visibility / 1000) : null
      }));
      
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAgain = () => {
    setWeather(null);
    setHourlyForecast(null);
    setUvIndex(null);
    setActiveTab('current');
  };

  const handleRefresh = () => {
    fetchWeather();
  };

  // Show search screen if no weather data
  if (!weather) {
    return (
      <SearchBox
        city={city}
        setCity={setCity}
        loading={loading}
        onSearch={fetchWeather}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);

  return (
    <div className={`font-sf-pro w-screen min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-darkPalette-blend1 via-darkPalette-blend2 to-darkPalette-accent' 
        : 'bg-gradient-to-br from-lightPalette-primary via-lightPalette-secondary to-lightPalette-tertiary'
    } ${
      darkMode ? 'text-darkPalette-text' : 'text-lightPalette-text'
    } p-4 md:p-6 lg:p-8 relative overflow-x-hidden overflow-y-auto scrollbar-hide box-border flex flex-col justify-start`}>
      {/* Glassmorphism background effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-indigo-400/10 via-blue-400/8 to-indigo-500/12' 
          : 'bg-gradient-to-br from-white/15 via-transparent to-white/10'
      }`} />
      <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
        darkMode 
          ? 'bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.15)_0%,_transparent_45%),_radial-gradient(circle_at_70%_80%,_rgba(79,70,229,0.12)_0%,_transparent_45%),_radial-gradient(circle_at_50%_50%,_rgba(67,56,202,0.08)_0%,_transparent_60%)]'
          : 'bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.15)_0%,_transparent_40%),_radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.1)_0%,_transparent_40%)]'
      }`} />

      {/* Header */}
      <Header 
        location={weather.name}
        country={weather.sys.country}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Weather Card */}
      <div className="mb-6 md:mb-8">
        <WeatherCard 
          weather={weather}
          unit={unit}
          WeatherIcon={WeatherIcon}
          darkMode={darkMode}
        />
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 md:mb-6">
        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Tab Content - Flex container for optimal spacing */}
      <motion.div 
        className="flex-1 overflow-y-auto scrollbar-hide min-h-0 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {activeTab === 'current' && (
          <div className="mb-6">
            <CurrentWeather weather={weather} uvIndex={uvIndex} darkMode={darkMode} />
          </div>
        )}
        {activeTab === 'hourly' && hourlyForecast && (
          <div className="mb-6">
            <HourlyForecast 
              hourlyForecast={hourlyForecast}
              getWeatherIcon={getWeatherIcon}
              darkMode={darkMode}
            />
          </div>
        )}
        {activeTab === 'daily' && forecast && (
          <div className="mb-6">
            <DailyForecast 
              forecast={forecast}
              getWeatherIcon={getWeatherIcon}
              darkMode={darkMode}
            />
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="mt-auto pt-4">
        <ActionButtons 
          onSearchAgain={handleSearchAgain}
          onRefresh={handleRefresh}
        />
      </div>
      
      <PWAInstall />
    </div>
  );
};

export default WeatherApp;
