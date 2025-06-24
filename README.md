# 🌤️ KNOWEA - Beautiful Weather, Beautiful Experience

<div align="center">
  <h1>KNOWEA</h1>
  <h3>Beautiful Weather. Beautiful Experience.</h3>
  <p>A modern Progressive Web App for weather forecasting with offline support</p>
  
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/PWA-Enabled-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="PWA" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.4.7-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/OpenWeather-API-orange?style=for-the-badge&logo=weather&logoColor=white" alt="OpenWeather API" />
</div>

<div align="center">
  <h3>Experience weather like never before with KNOWEA's beautiful interface</h3>
  <p>Built with React, featuring glassmorphism UI design and mobile-first architecture</p>
</div>

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** - Beautiful gradient backgrounds with blur effects
- **KNOWEA Branding** - Custom logo and professional appearance
- **Mobile-First** - Responsive design optimized for all screen sizes
- **Smooth Animations** - Powered by Framer Motion for seamless transitions
- **Dynamic Weather Icons** - Beautiful icons that change with conditions

### 📱 **Progressive Web App**
- **Installable** - Add KNOWEA to home screen on any device
- **Offline Support** - Works without internet connection
- **Service Worker** - Caches resources for lightning-fast loading
- **App-like Experience** - Runs in standalone mode like a native app
- **Cross-Platform** - Works perfectly on iOS, Android, and Desktop

### 🌦️ **Weather Features**
- **Real-time Weather** - Current conditions for any city worldwide
- **5-Day Forecast** - Extended weather predictions
- **Hourly Forecast** - Next 24 hours detailed breakdown
- **Detailed Metrics** - Temperature, humidity, wind speed, and more
- **Smart Search** - Find weather for any location instantly
- **Automatic Updates** - Fresh data every time you open KNOWEA

## 🚀 Live Demo

**Experience KNOWEA:** [https://yourusername.github.io/WeatherApp](https://yourusername.github.io/WeatherApp)

### Screenshots

<div align="center">
  <img src="screenshots/mobile-home.png" alt="Mobile Home" width="300" />
  <img src="screenshots/desktop-view.png" alt="Desktop View" width="600" />
</div>

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
│   └── icons/                 # PWA icons
├── src/
│   ├── components/
│   │   ├── ModernWeatherApp.js    # Main weather component
│   │   ├── ModernWeatherApp.css   # Styles
│   │   ├── PWAInstall.js          # Install prompt
│   │   └── PWAInstall.css         # Install prompt styles
│   ├── App.js                 # Root component
│   └── index.js              # Entry point
├── .env.example              # Environment template
└── package.json             # Dependencies & scripts
```

## 🔧 Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **Bootstrap 5** - Responsive CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon components

### PWA Features
- **Service Worker** - Offline caching and background sync
- **Web App Manifest** - Installation and app metadata
- **Responsive Design** - Mobile-first approach

### APIs
- **OpenWeatherMap API** - Weather data provider
- **Geolocation API** - User location detection

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full PWA support |
| Firefox | ✅ Full support |
| Safari | ✅ iOS PWA support |
| Edge | ✅ Full PWA support |
| Samsung Internet | ✅ Android PWA support |

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App |

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

## 🎨 Customization

### Themes
The app supports custom themes. Modify the CSS variables in `ModernWeatherApp.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.25);
  --text-primary: #ffffff;
}
```

### Weather Conditions
Add custom weather conditions in `ModernWeatherApp.js`:

```javascript
const getWeatherIcon = (condition) => {
  const icons = {
    'clear': WiDaySunny,
    'clouds': WiCloudy,
    'rain': WiRain,
    // Add more conditions
  };
  return icons[condition] || WiDaySunny;
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - Weather data API
- **React Team** - Amazing React framework
- **Framer Motion** - Smooth animations
- **React Icons** - Beautiful icon library
- **Bootstrap Team** - Responsive CSS framework

## 📧 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

**Project Link:** [https://github.com/yourusername/WeatherApp](https://github.com/yourusername/WeatherApp)

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>