import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sun, Moon } from 'lucide-react';

const SearchBox = ({ 
  city, 
  setCity, 
  loading, 
  onSearch, 
  darkMode, 
  setDarkMode 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    onSearch(suggestion);
  };

  const handleDarkModeToggle = () => {
    console.log('Dark mode toggle clicked, current state:', darkMode);
    console.log('setDarkMode function:', typeof setDarkMode);
    
    if (typeof setDarkMode === 'function') {
      const newDarkMode = !darkMode;
      console.log('Setting dark mode to:', newDarkMode);
      setDarkMode(newDarkMode);
    } else {
      console.error('setDarkMode is not a function:', setDarkMode);
    }
  };

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
        
        <motion.div 
          className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className={`relative flex items-center backdrop-blur-lg rounded-full border-2 transition-all duration-300 focus-within:shadow-lg ${
            darkMode 
              ? 'bg-darkPalette-card/40 border-darkPalette-accent/30 focus-within:bg-darkPalette-card/60 focus-within:border-darkPalette-accent/50'
              : 'bg-lightPalette-accent/20 border-lightPalette-secondary/20 focus-within:bg-lightPalette-accent/30 focus-within:border-lightPalette-secondary/40'
          }`}>
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
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`flex-1 py-4 px-3 pr-5 text-base bg-transparent border-none outline-none disabled:opacity-70 disabled:cursor-not-allowed ${
                darkMode 
                  ? 'text-darkPalette-text placeholder-darkPalette-textSecondary'
                  : 'text-lightPalette-text placeholder-lightPalette-textSecondary'
              }`}
              disabled={loading}
            />
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
        </motion.div>
        
        <motion.div
          className="text-center opacity-80 w-full max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`mb-4 text-sm md:text-base ${
            darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
          }`}>Try searching for cities like:</p>
          <div className="flex gap-3 md:gap-4 flex-wrap justify-center items-center">
            {['Mangalore', 'Bangalore', 'Tokyo', 'Paris'].map((suggestion, index) => (
              <motion.button
                key={suggestion}
                className={`py-2 px-4 md:py-3 md:px-5 border rounded-full md:rounded-3xl text-sm md:text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 ${
                  darkMode 
                    ? 'bg-darkPalette-card/30 border-darkPalette-accent/40 text-darkPalette-text hover:bg-darkPalette-card/50'
                    : 'bg-lightPalette-accent/10 border-lightPalette-secondary/20 text-lightPalette-text hover:bg-lightPalette-accent/20'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
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
