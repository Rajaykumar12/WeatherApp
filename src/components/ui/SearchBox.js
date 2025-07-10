import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, MapPin, X } from 'lucide-react';

const SearchBox = ({ 
  city, 
  setCity, 
  loading, 
  onSearch, 
  darkMode, 
  setDarkMode,
  onLocationSearch,
  locationError
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchTimeoutRef = useRef(null);
  const suggestionRef = useRef(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Fetch suggestions from OpenWeatherMap Geocoding API
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      console.warn('Weather API key is not configured. Suggestions will not work.');
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setIsLoadingSuggestions(true);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format suggestions with country and state info
      const formattedSuggestions = data.map(item => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
        displayName: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`,
        fullName: item.local_names?.en || item.name // Use English name if available
      }));

      // Remove duplicates based on coordinates
      const uniqueSuggestions = formattedSuggestions.filter((item, index, self) => 
        index === self.findIndex(t => (
          Math.abs(t.lat - item.lat) < 0.01 && Math.abs(t.lon - item.lon) < 0.01
        ))
      );

      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
      // Don't show error to user for autocomplete failures, just fail silently
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounced search input handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setSelectedSuggestionIndex(-1); // Reset selection when typing

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Only fetch suggestions if there's a meaningful input
    if (value.trim().length >= 2) {
      // Set new timeout for debounced search
      searchTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(value.trim());
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
        // Select the highlighted suggestion
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else {
        // Search with current input
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        onSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.displayName);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    // Use the exact city name from the suggestion for better accuracy
    onSearch(suggestion.fullName || suggestion.name);
  };

  const handleQuickCityClick = (cityName) => {
    setCity(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    onSearch(cityName);
  };

  const clearSearch = () => {
    setCity('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleDarkModeToggle = () => {
    if (typeof setDarkMode === 'function') {
      setDarkMode(!darkMode);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, []);

  // Cleanup timeout when component unmounts or city changes
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, [city]);

  return (
    <div className={`font-sf-pro w-screen h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-darkPalette-blend1 via-darkPalette-blend2 to-darkPalette-accent' 
        : 'bg-gradient-to-br from-lightPalette-primary via-lightPalette-secondary to-lightPalette-tertiary'
    } ${
      darkMode ? 'text-darkPalette-text' : 'text-lightPalette-text'
    } p-4 relative overflow-x-hidden overflow-y-auto scrollbar-hide box-border flex flex-col`}>
      
      {/* Dark Mode Toggle for Search Screen */}
      <div className="absolute top-5 right-5 z-50">
        <button
          className={`
            relative p-3 rounded-full transition-all duration-500 backdrop-blur-sm border cursor-pointer
            ${darkMode 
              ? 'bg-darkPalette-card/90 border-darkPalette-accent/30 text-darkPalette-highlight hover:bg-darkPalette-accent/20' 
              : 'bg-lightPalette-accent/30 border-lightPalette-textSecondary/20 text-lightPalette-text hover:bg-lightPalette-accent/50'
            }
            hover:scale-110 active:scale-95 shadow-lg
          `}
          onClick={handleDarkModeToggle}
          style={{ cursor: 'pointer' }}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </div>
        </button>
      </div>

      <div className="flex flex-col justify-center items-center w-full min-h-screen relative z-10 p-5 box-border">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={`text-6xl md:text-7xl lg:text-8xl font-extrabold mb-2 tracking-wider ${
              darkMode 
                ? 'bg-gradient-to-r from-darkPalette-text via-darkPalette-highlight to-darkPalette-text text-darkPalette-text' 
                : 'bg-gradient-to-r from-lightPalette-text via-lightPalette-secondary to-lightPalette-tertiary text-lightPalette-text'
            } bg-clip-text text-transparent`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
          >
            KNOWEA
          </motion.h1>
          <motion.p 
            className={`text-lg md:text-xl lg:text-2xl font-light mb-5 lg:mb-10 tracking-wide opacity-80 ${
              darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Beautiful Weather, Beautiful Experience
          </motion.p>
        </motion.div>
        
        {/* Search Container with Autocomplete */}
        <motion.div 
          ref={suggestionRef}
          className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className={`relative flex items-center backdrop-blur-lg rounded-full border-2 transition-all duration-300 focus-within:shadow-lg ${
            darkMode 
              ? 'bg-darkPalette-card/40 border-darkPalette-accent/30 focus-within:bg-darkPalette-card/60 focus-within:border-darkPalette-accent/50'
              : 'bg-lightPalette-accent/20 border-lightPalette-secondary/20 focus-within:bg-lightPalette-accent/30 focus-within:border-lightPalette-secondary/40'
          } ${showSuggestions ? 'rounded-b-none' : ''}`}>
            
            <motion.div
              className="flex items-center justify-center pl-5 pr-2 pointer-events-none"
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
            >
              <Search className={`w-5 h-5 ${
                darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
              }`} />
            </motion.div>
            
            <input
              type="text"
              placeholder={loading ? "Searching..." : "Search for a city..."}
              value={city}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className={`flex-1 py-4 px-3 text-base bg-transparent border-none outline-none disabled:opacity-70 disabled:cursor-not-allowed ${
                darkMode 
                  ? 'text-darkPalette-text placeholder-darkPalette-textSecondary'
                  : 'text-lightPalette-text placeholder-lightPalette-textSecondary'
              }`}
              disabled={loading}
              autoComplete="off"
            />
            
            {/* Clear Button */}
            {city && (
              <button
                type="button"
                onClick={clearSearch}
                className={`mr-3 p-1 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-darkPalette-textSecondary hover:bg-darkPalette-accent/20' 
                    : 'text-lightPalette-textSecondary hover:bg-lightPalette-accent/20'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {loading && (
              <motion.div
                className="flex items-center justify-center pr-5 pl-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </motion.div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-0 right-0 backdrop-blur-xl rounded-b-2xl border-t-0 border-2 overflow-hidden shadow-xl z-20 ${
                  darkMode 
                    ? 'bg-darkPalette-card/90 border-darkPalette-accent/30' 
                    : 'bg-lightPalette-accent/90 border-lightPalette-secondary/20'
                }`}
              >
                {isLoadingSuggestions ? (
                  <div className={`p-4 text-center ${
                    darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 bg-current rounded-full animate-pulse"></div>
                      <span>Loading suggestions...</span>
                    </div>
                  </div>
                ) : (
                  suggestions.map((suggestion, index) => (
                    <motion.button
                      key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full p-4 text-left transition-colors border-b last:border-b-0 ${
                        selectedSuggestionIndex === index
                          ? darkMode 
                            ? 'bg-darkPalette-accent/30 text-darkPalette-highlight border-darkPalette-accent/30' 
                            : 'bg-lightPalette-accent/30 text-lightPalette-secondary border-lightPalette-secondary/30'
                          : darkMode 
                            ? 'text-darkPalette-text hover:bg-darkPalette-accent/20 border-darkPalette-accent/20' 
                            : 'text-lightPalette-text hover:bg-lightPalette-accent/20 border-lightPalette-secondary/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className={`w-4 h-4 ${
                          darkMode ? 'text-darkPalette-highlight' : 'text-lightPalette-secondary'
                        }`} />
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                          <div className={`text-sm ${
                            darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
                          }`}>
                            {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Geolocation Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            onClick={onLocationSearch}
            disabled={loading}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm border-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode 
                ? 'bg-darkPalette-card/40 border-darkPalette-accent/30 text-darkPalette-text hover:bg-darkPalette-card/60 hover:border-darkPalette-accent/50'
                : 'bg-lightPalette-accent/20 border-lightPalette-secondary/20 text-lightPalette-text hover:bg-lightPalette-accent/30 hover:border-lightPalette-secondary/40'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm md:text-base font-medium">Use My Location</span>
          </button>
        </motion.div>

        {/* Location Error */}
        {locationError && (
          <motion.div
            className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-center max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm md:text-base">{locationError}</p>
          </motion.div>
        )}
        
        <motion.div
          className="text-center opacity-80 w-full max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`mb-4 text-sm md:text-base ${
            darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
          }`}>Popular cities to explore:</p>
          <div className="flex gap-3 md:gap-4 flex-wrap justify-center items-center">
            {['New York', 'London', 'Tokyo', 'Sydney', 'Dubai', 'Mumbai'].map((suggestion, index) => (
              <motion.button
                key={suggestion}
                className={`py-2 px-4 md:py-3 md:px-5 border rounded-full md:rounded-3xl text-sm md:text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 ${
                  darkMode 
                    ? 'bg-darkPalette-card/30 border-darkPalette-accent/40 text-darkPalette-text hover:bg-darkPalette-card/50'
                    : 'bg-lightPalette-accent/10 border-lightPalette-secondary/20 text-lightPalette-text hover:bg-lightPalette-accent/20'
                }`}
                onClick={() => handleQuickCityClick(suggestion)}
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
};

export default SearchBox;
