import React, { useState, useEffect } from "react";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const WeatherCard = ({ weather, fetchWeather, city, setCity, unit, setUnit, darkMode }) => {
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  // Update local temperature & wind speed when weather data changes
  useEffect(() => {
    if (weather && weather.main) {
      setTemperature(weather.main.temp);
      setWindSpeed(weather.wind.speed);
    }
  }, [weather]);
  // Function to toggle units
  const toggleUnit = () => {
    if (temperature !== null && windSpeed !== null) {
      if (unit === "metric") {
        setTemperature((temperature * 9) / 5 + 32); // Convert °C to °F
        setWindSpeed(windSpeed * 2.237); // Convert m/s to mph
        setUnit("imperial");
      } else {
        setTemperature(((temperature - 32) * 5) / 9); // Convert °F to °C
        setWindSpeed(windSpeed / 2.237); // Convert mph to m/s
        setUnit("metric");
      }
    }
  };

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`card shadow-lg ${darkMode ? "bg-dark border-0" : "bg-light border-0"}`}
        style={{
          maxWidth: "400px",
          width: "90%",
          backgroundColor: darkMode ? "#1c1c1e" : "#f8f9fa",
          color: darkMode ? "#66ffff" : "#005f99",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
        }}
      >
        <div className="card-body">
          <h1 className="card-title" style={{ color: darkMode ? "#ff99ff" : "#008f00" }}>
            Weather App
          </h1>

          {/* Search Box */}
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
                color: darkMode ? "#66ffff" : "#005f99",
                border: darkMode ? "1px solid #444" : "1px solid #ddd",
              }}
            />
            <motion.button
              onClick={() => fetchWeather(city)}
              className="btn d-flex align-items-center gap-2"
              whileHover={{ scale: 1.1 }}
              style={{
                backgroundColor: darkMode ? "#333333" : "#d0d0d0",
                color: darkMode ? "#66ffff" : "#005f99",
                border: darkMode ? "1px solid #444" : "1px solid #ddd",
              }}
            >
              <FaSearch size={18} /> Search
            </motion.button>
          </div>

          {/* Weather Details */}
          {weather && weather.main && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <h2 className="display-6" style={{ color: darkMode ? "#ff99ff" : "#008f00" }}>
                {weather.name}
              </h2>
              <p className="lead text-capitalize" style={{ color: darkMode ? "#66ffff" : "#005f99" }}>
                {weather.weather[0].description}
              </p>
              <h3 className="fw-bold" style={{ color: darkMode ? "#ff99ff" : "#008f00" }}>
                {temperature !== null ? Math.round(temperature) : "N/A"}°{unit === "metric" ? "C" : "F"}
              </h3>
              <div className="d-flex justify-content-around mt-3">
                <p style={{ color: darkMode ? "#66ffff" : "#005f99" }}>Humidity: {weather.main.humidity}%</p>
                <p style={{ color: darkMode ? "#66ffff" : "#005f99" }}>
                  Wind: {windSpeed !== null ? windSpeed.toFixed(2) : "N/A"} {unit === "metric" ? "m/s" : "mph"}
                </p>
              </div>

              {/* Toggle Temperature & Wind Unit */}
              <motion.button
                onClick={toggleUnit}
                className="btn mt-3 d-flex align-items-center gap-2"
                whileHover={{ scale: 1.1 }}
                style={{
                  backgroundColor: darkMode ? "#444" : "#ccc",
                  color: darkMode ? "#66ffff" : "#005f99",
                  border: darkMode ? "1px solid #555" : "1px solid #ccc",
                }}
              >
                <FaSyncAlt size={18} /> Toggle °C/°F
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
