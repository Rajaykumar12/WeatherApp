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
import AirQualityCard from "./ui/AirQualityCard";
import LoadingSkeleton from "./ui/LoadingSkeleton";
import TemperatureChart from "./ui/TemperatureChart";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const UV_URL = "https://api.openweathermap.org/data/2.5/uvi";
const AIR_QUALITY_URL = "https://api.openweathermap.org/data/2.5/air_pollution";
const GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [extendedForecast, setExtendedForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [unit] = useState("metric");
  const [activeTab, setActiveTab] = useState("current");
  const [locationError, setLocationError] = useState(null);

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

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        let errorMessage = "Unable to retrieve location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        setLocationError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Fetch weather data using coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(BASE_URL, {
          params: {
            lat,
            lon,
            units: unit,
            appid: API_KEY,
          },
        }),
        axios.get(FORECAST_URL, {
          params: {
            lat,
            lon,
            units: unit,
            appid: API_KEY,
          },
        })
      ]);
      
      setWeather(weatherResponse.data);
      setCity(weatherResponse.data.name);
      
      // Fetch UV Index (free API)
      try {
        const uvResponse = await axios.get(UV_URL, {
          params: {
            lat,
            lon,
            appid: API_KEY,
          },
        });
        setUvIndex(uvResponse.data.value);
      } catch (uvError) {
        console.error("Error fetching UV data:", uvError);
        setUvIndex(null);
      }
      
      // Process hourly forecast (next 40 hours from 5-day forecast)
      const hourlyData = forecastResponse.data.list.slice(0, 40).map(item => ({
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
        visibility: item.visibility ? Math.round(item.visibility / 1000) : null,
        uvi: 0, // Not available in free API
        clouds: item.clouds.all,
        dewPoint: null // Not available in free API
      }));
      
      setHourlyForecast(hourlyData);
      
      // Process daily forecast (5 days from forecast data)
      const dailyMap = new Map();
      forecastResponse.data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyMap.has(date)) {
          dailyMap.set(date, {
            date: new Date(item.dt * 1000),
            temps: [],
            humidity: [],
            pressure: [],
            windSpeed: [],
            pop: [],
            weather: item.weather[0],
            clouds: item.clouds.all
          });
        }
        dailyMap.get(date).temps.push(item.main.temp);
        dailyMap.get(date).humidity.push(item.main.humidity);
        dailyMap.get(date).pressure.push(item.main.pressure);
        dailyMap.get(date).windSpeed.push(item.wind.speed * 3.6);
        dailyMap.get(date).pop.push(item.pop * 100);
      });
      
      const dailyData = Array.from(dailyMap.values()).slice(0, 5).map(day => ({
        date: day.date,
        temp: {
          max: Math.round(Math.max(...day.temps)),
          min: Math.round(Math.min(...day.temps)),
          day: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
          night: Math.round(Math.min(...day.temps))
        },
        feels_like: {
          day: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
          night: Math.round(Math.min(...day.temps))
        },
        icon: day.weather.icon,
        description: day.weather.description,
        humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
        windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length),
        pressure: Math.round(day.pressure.reduce((a, b) => a + b, 0) / day.pressure.length),
        pop: Math.round(day.pop.reduce((a, b) => a + b, 0) / day.pop.length),
        uvi: 0, // Not available in free API
        clouds: day.clouds,
        sunrise: weatherResponse.data.sys.sunrise ? new Date(weatherResponse.data.sys.sunrise * 1000) : null,
        sunset: weatherResponse.data.sys.sunset ? new Date(weatherResponse.data.sys.sunset * 1000) : null,
        moonPhase: 0 // Not available in free API
      }));
      
      setExtendedForecast(dailyData);
      
      // Fetch Air Quality data
      await fetchAirQuality(lat, lon);
      
      // Clear weather alerts since One Call API is not available
      setWeatherAlerts([]);
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLocationError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Air Quality data
  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(AIR_QUALITY_URL, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });
      
      const aqiData = response.data.list[0];
      const aqi = aqiData.main.aqi;
      const components = aqiData.components;
      
      let aqiLabel, aqiColor, aqiDescription;
      switch (aqi) {
        case 1:
          aqiLabel = "Good";
          aqiColor = "text-green-500";
          aqiDescription = "Air quality is satisfactory";
          break;
        case 2:
          aqiLabel = "Fair";
          aqiColor = "text-yellow-500";
          aqiDescription = "Moderate air quality";
          break;
        case 3:
          aqiLabel = "Moderate";
          aqiColor = "text-orange-500";
          aqiDescription = "Unhealthy for sensitive groups";
          break;
        case 4:
          aqiLabel = "Poor";
          aqiColor = "text-red-500";
          aqiDescription = "Unhealthy air quality";
          break;
        case 5:
          aqiLabel = "Very Poor";
          aqiColor = "text-purple-500";
          aqiDescription = "Very unhealthy air quality";
          break;
        default:
          aqiLabel = "Unknown";
          aqiColor = "text-gray-500";
          aqiDescription = "Air quality data unavailable";
      }
      
      setAirQuality({
        aqi,
        label: aqiLabel,
        color: aqiColor,
        description: aqiDescription,
        components: {
          co: components.co,
          no: components.no,
          no2: components.no2,
          o3: components.o3,
          so2: components.so2,
          pm2_5: components.pm2_5,
          pm10: components.pm10,
          nh3: components.nh3
        }
      });
    } catch (error) {
      console.error("Error fetching air quality data:", error);
      setAirQuality(null);
    }
  };

  const fetchWeather = async (searchCity = city) => {
    if (!searchCity) return;
    
    setLoading(true);
    setLocationError(null);
    try {
      // First get coordinates from city name
      const geocodeResponse = await axios.get(GEOCODING_URL, {
        params: {
          q: searchCity,
          limit: 1,
          appid: API_KEY,
        },
      });
      
      if (!geocodeResponse.data.length) {
        setLocationError("City not found. Please check the spelling and try again.");
        setLoading(false);
        return;
      }
      
      const { lat, lon } = geocodeResponse.data[0];
      await fetchWeatherByCoords(lat, lon);
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLocationError("Failed to fetch weather data. Please try again.");
      setLoading(false);
    }
  };

  const handleSearchAgain = () => {
    setWeather(null);
    setHourlyForecast(null);
    setUvIndex(null);
    setAirQuality(null);
    setWeatherAlerts([]);
    setExtendedForecast(null);
    setLocationError(null);
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
        onLocationSearch={getCurrentLocation}
        locationError={locationError}
      />
    );
  }

  // Show loading skeleton while fetching data
  if (loading && weather) {
    return <LoadingSkeleton darkMode={darkMode} />;
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
            <CurrentWeather 
              weather={weather} 
              uvIndex={uvIndex} 
              airQuality={airQuality}
              weatherAlerts={weatherAlerts}
              darkMode={darkMode} 
            />
          </div>
        )}
        {activeTab === 'hourly' && hourlyForecast && (
          <div className="space-y-6">
            <TemperatureChart 
              hourlyForecast={hourlyForecast}
              darkMode={darkMode}
            />
            <HourlyForecast 
              hourlyForecast={hourlyForecast}
              getWeatherIcon={getWeatherIcon}
              darkMode={darkMode}
            />
          </div>
        )}
        {activeTab === 'daily' && extendedForecast && (
          <div className="mb-6">
            <DailyForecast 
              extendedForecast={extendedForecast}
              getWeatherIcon={getWeatherIcon}
              darkMode={darkMode}
            />
          </div>
        )}
        {activeTab === 'air' && (
          <div className="mb-6">
            <AirQualityCard 
              airQuality={airQuality}
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
