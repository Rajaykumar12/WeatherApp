import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ city, setCity, fetchWeather, darkMode }) => {
  return (
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
        onClick={fetchWeather}
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
  );
};

export default SearchBox;
