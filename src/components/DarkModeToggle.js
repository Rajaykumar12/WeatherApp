import React from "react";
import { WiDaySunny, WiMoonAltWaxingCrescent4 } from "react-icons/wi";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="btn position-absolute top-0 end-0 m-3 d-flex align-items-center gap-2"
      style={{
        backgroundColor: darkMode ? "#1c1c1e" : "#e0e0e0",
        color: darkMode ? "#66ffff" : "#005f99",
        border: darkMode ? "1px solid #444" : "1px solid #ddd",
      }}
    >
      {darkMode ? <WiDaySunny size={18} /> : <WiMoonAltWaxingCrescent4 size={18} />}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
