# 🌤️ KNOWEA - Beautiful Weather, Beautiful Experience

<div align="center">
  <h1>KNOWEA</h1>
  <h3>Beautiful Weather. Beautiful Experience.</h3>
  <p>A modern Progressive Web App for weather forecasting with intelligent search and offline support</p>
  
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/PWA-Enabled-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="PWA" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.4.7-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/OpenWeather-API-orange?style=for-the-badge&logo=weather&logoColor=white" alt="OpenWeather API" />
</div>

<div align="center">
  <h3>Experience weather like never before with KNOWEA's intelligent search and beautiful interface</h3>
  <p>Built with React, featuring glassmorphism UI design, smart autocomplete, and mobile-first architecture</p>
</div>

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** - Beautiful gradient backgrounds with blur effects
- **KNOWEA Branding** - Custom logo and professional appearance
- **Mobile-First** - Responsive design optimized for all screen sizes
- **Smooth Animations** - Powered by Framer Motion for seamless transitions
- **Dynamic Weather Icons** - Beautiful icons that change with conditions
- **Dark/Light Theme Support** - Adaptive design for all lighting conditions

### 🔍 **Intelligent Search System**
- **Smart Autocomplete** - Real-time city suggestions as you type
- **Global City Database** - Access to worldwide locations via OpenWeatherMap Geocoding
- **Keyboard Navigation** - Arrow keys, Enter, and Escape support
- **Popular Cities** - Curated list of major global cities (New York, London, Tokyo, Sydney, Dubai, Mumbai)
- **Duplicate Filtering** - Smart filtering to show unique city suggestions
- **Error Handling** - Graceful handling of API failures and network issues
- **Debounced Search** - Optimized API calls for better performance

### 📱 **Progressive Web App**
- **Installable** - Add KNOWEA to home screen on any device
- **Offline Support** - Works without internet connection with cached data
- **Service Worker** - Advanced caching strategy for lightning-fast loading
- **App-like Experience** - Runs in standalone mode like a native app
- **Cross-Platform** - Works perfectly on iOS, Android, and Desktop
- **Background Sync** - Updates weather data when connection is restored

### 🌦️ **Weather Features**
- **Real-time Weather** - Current conditions for any city worldwide
- **5-Day Forecast** - Extended weather predictions with detailed breakdown
- **Hourly Forecast** - Next 24 hours detailed breakdown
- **Comprehensive Metrics** - Temperature, humidity, wind speed, pressure, visibility
- **Location Detection** - Automatic weather for your current location
- **Weather Alerts** - Important weather warnings and notifications
- **Multiple Units** - Celsius/Fahrenheit, km/h and mph wind speeds

### 🛡️ **Enhanced Reliability**
- **API Error Handling** - Robust error handling for all API calls
- **Secure HTTPS** - All API calls use secure HTTPS connections
- **Environment Configuration** - Secure API key management
- **Fallback Data** - Cached data when network is unavailable
- **Loading States** - Beautiful loading animations and skeleton screens

## 🚀 Live Demo

**Live Demo:** [https://rajaykumar12.github.io/WeatherApp](https://rajaykumar12.github.io/WeatherApp/)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 14+ and npm
- OpenWeatherMap API key ([Get free API key](https://openweathermap.org/api))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WeatherApp.git
   cd WeatherApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📱 PWA Installation

### On Mobile (Android/iOS)
1. Open the app in your mobile browser
2. Look for the "Install App" prompt
3. Tap "Install" or use browser menu → "Add to Home Screen"
4. The app will appear in your app drawer

### On Desktop
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Or use browser menu → "Install Weather App"

## 🏗️ Project Structure

```
WeatherApp/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── offline.html           # Offline fallback page
│   ├── favicon.ico            # App favicon
│   └── icons/                 # PWA icons (192x192, 512x512)
├── src/
│   ├── components/
│   │   ├── WeatherApp.js          # Main weather component
│   │   ├── WeatherApp.css         # Main styles
│   │   ├── SearchBox.js           # Intelligent search component
│   │   ├── SearchBox.css          # Search styles
│   │   ├── PWAInstall.js          # Install prompt
│   │   └── PWAInstall.css         # Install prompt styles
│   ├── App.js                 # Root component
│   └── index.js              # Entry point
├── .env.example              # Environment template
├── .env                      # Environment variables (create from example)
└── package.json             # Dependencies & scripts
```

## 🔧 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Bootstrap 5** - Responsive CSS framework
- **Framer Motion** - Advanced animation library
- **React Icons** - Comprehensive icon components
- **Axios** - HTTP client for API requests

### Search & Data
- **OpenWeatherMap Geocoding API** - City search and coordinates
- **OpenWeatherMap Current Weather API** - Real-time weather data
- **OpenWeatherMap 5-Day Forecast API** - Extended weather predictions
- **Debounced Search** - Optimized search performance
- **Smart Filtering** - Duplicate removal and result optimization

### PWA Features
- **Service Worker** - Advanced offline caching and background sync
- **Web App Manifest** - Installation metadata and app configuration
- **Responsive Design** - Mobile-first responsive approach
- **Offline Fallback** - Graceful offline experience

### APIs & Integration
- **Geolocation API** - User location detection
- **HTTPS Security** - Secure API communications
- **Environment Variables** - Secure configuration management

## 🔍 Search Features Detail

### Autocomplete System
- **Real-time Suggestions** - Shows cities as you type (minimum 2 characters)
- **Global Coverage** - Access to cities worldwide via OpenWeatherMap Geocoding
- **Smart Debouncing** - 300ms delay to optimize API calls
- **Keyboard Navigation**:
  - `↑/↓` Arrow keys to navigate suggestions
  - `Enter` to select highlighted suggestion
  - `Escape` to close suggestions
- **Click Selection** - Mouse/touch support for suggestion selection
- **Error Recovery** - Graceful handling of network issues

### Popular Cities
Updated curated list of major global cities:
- **New York** - USA's largest city
- **London** - European financial hub
- **Tokyo** - Asia's major metropolis
- **Sydney** - Australia's largest city
- **Dubai** - Middle East's major city
- **Mumbai** - India's financial capital

### Search Optimization
- **Duplicate Filtering** - Removes cities with identical coordinates
- **Result Limiting** - Shows top 5 most relevant suggestions
- **English Name Priority** - Displays English names when available
- **State/Country Info** - Shows location context for better identification

## 🌍 Browser Support

| Browser | PWA Support | Search Features | Weather Data |
|---------|-------------|-----------------|--------------|
| Chrome | ✅ Full PWA support | ✅ Complete | ✅ All features |
| Firefox | ✅ Full support | ✅ Complete | ✅ All features |
| Safari | ✅ iOS PWA support | ✅ Complete | ✅ All features |
| Edge | ✅ Full PWA support | ✅ Complete | ✅ All features |
| Samsung Internet | ✅ Android PWA | ✅ Complete | ✅ All features |

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App (irreversible) |

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Weather API Configuration
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```

**Important Notes:**
- Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
- The API key must be prefixed with `REACT_APP_` for React to access it
- Never commit your actual API key to version control
- The `.env` file is gitignored for security

## 🎨 Customization

### Themes
The app supports custom themes. Modify the CSS variables in `WeatherApp.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.25);
  --text-primary: #ffffff;
  --search-bg: rgba(255, 255, 255, 0.2);
  --suggestion-hover: rgba(255, 255, 255, 0.3);
}
```

### Search Configuration
Customize search behavior in `SearchBox.js`:

```javascript
// Minimum characters to trigger search
const MIN_SEARCH_LENGTH = 2;

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 300;

// Maximum number of suggestions
const MAX_SUGGESTIONS = 5;

// Popular cities list
const popularCities = ['New York', 'London', 'Tokyo', 'Sydney', 'Dubai', 'Mumbai'];
```

### Weather Display
Customize weather conditions and icons in `WeatherApp.js`:

```javascript
const getWeatherIcon = (condition) => {
  const icons = {
    'clear': WiDaySunny,
    'clouds': WiCloudy,
    'rain': WiRain,
    'snow': WiSnow,
    'thunderstorm': WiThunderstorm,
    // Add more conditions
  };
  return icons[condition] || WiDaySunny;
};
```

## 🐛 Troubleshooting

### Common Issues

**API Key Issues (401 Unauthorized)**
- Ensure your API key is correctly set in `.env` file
- Verify the key is prefixed with `REACT_APP_`
- Restart the development server after adding the key
- Check that your OpenWeatherMap API key is active

**Search Not Working**
- Check browser console for network errors
- Verify internet connection
- Ensure HTTPS is being used for API calls
- Check if OpenWeatherMap API is accessible

**PWA Installation Issues**
- Ensure the app is served over HTTPS (production)
- Check that manifest.json is properly configured
- Verify service worker is registered successfully
- Clear browser cache and try again

**Favicon Not Updating**
- Clear browser cache (Ctrl+Shift+R)
- Check that favicon files exist in public folder
- Verify manifest.json has correct icon paths
- Hard refresh the page

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React functional component patterns
- Use proper error handling for all API calls
- Implement proper loading states
- Ensure responsive design for all screen sizes
- Test PWA functionality across browsers
- Maintain consistent code formatting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - Comprehensive weather data and geocoding APIs
- **React Team** - Amazing React framework and ecosystem
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library with weather icons
- **Bootstrap Team** - Responsive CSS framework
- **PWA Community** - Progressive Web App best practices


**Project Link:** [https://rajaykumar12.github.io/WeatherApp/](https://rajaykumar12.github.io/WeatherApp/)

## 🔄 Recent Updates

### v2.0.0 - Enhanced Search & Reliability
- ✅ **Smart Autocomplete** - Real-time city suggestions with keyboard navigation
- ✅ **Global City Access** - Worldwide city database via OpenWeatherMap Geocoding
- ✅ **Popular Cities** - Curated list of major global destinations
- ✅ **Enhanced Error Handling** - Robust API error handling and recovery
- ✅ **HTTPS Security** - All API calls now use secure HTTPS connections
- ✅ **Search Optimization** - Debounced search with duplicate filtering
- ✅ **Better UX** - Loading states, keyboard navigation, and visual feedback
- ✅ **Environment Security** - Proper API key management and configuration

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p><strong>KNOWEA - Beautiful Weather, Beautiful Experience</strong></p>
</div>
