import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import WeatherCard from "./components/WeatherCard";
import DarkModeToggle from "./components/DarkModeToggle";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [darkMode, setDarkMode] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/videos/sunny.mp4"); // Default video

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          units: unit,
          appid: API_KEY,
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Update background video based on weather conditions
  useEffect(() => {
    if (!weather) return; // Do nothing if no weather data

    const condition = weather.weather[0].main.toLowerCase();
    const temperature = weather.main.temp;

    if (condition.includes("rain") || condition.includes("thunderstorm")) {
      setVideoSrc("/videos/rainy.mp4");
    } else if (temperature > 30) {
      setVideoSrc("/videos/sunny.mp4");
    } else if (temperature < 20) {
      setVideoSrc("/videos/cold.mp4");
    } else {
      setVideoSrc("/videos/sunny.mp4"); // Default fallback
    }
  }, [weather]); // This effect only runs when `weather` changes

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`vh-100 w-100 position-relative ${darkMode ? "bg-black" : "bg-light"}`}
    >
      {/* Background Video */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <video
          key={videoSrc} // Ensure the video is reloaded when the `videoSrc` changes
          autoPlay
          loop
          muted
          className="w-100 h-100 object-fit-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className={`position-absolute top-0 start-0 w-100 h-100 ${darkMode ? "bg-black opacity-75" : "bg-light opacity-50"}`}
        ></div>
      </div>

      {/* Content */}
      <div className="position-relative d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <WeatherCard
          weather={weather}
          fetchWeather={fetchWeather}
          city={city}
          setCity={setCity}
          unit={unit}
          setUnit={setUnit}
          darkMode={darkMode}
        />
      </div>
    </motion.div>
  );
};

export default WeatherApp;
