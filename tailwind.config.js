/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        weather: {
          blue: '#74b9ff',
          'blue-dark': '#0984e3',
          purple: '#6c5ce7',
          dark: '#1a1d29',
          'dark-light': '#2d3748',
          'dark-card': '#374151',
        },
        // Dark mode palette - Blue/Indigo theme
        darkPalette: {
          primary: '#1e1b4b', // Deep indigo
          secondary: '#312e81', // Medium indigo
          tertiary: '#3730a3', // Purple-indigo
          accent: '#6366f1', // Bright indigo
          blend1: '#1e3a8a', // Dark blue for gradient start
          blend2: '#3730a3', // Indigo for gradient end
          card: '#1e1b4b', // Card background
          text: '#e0e7ff', // Light indigo text
          textSecondary: '#c7d2fe', // Secondary indigo text
          highlight: '#818cf8', // Indigo accent
          glass: 'rgba(99, 102, 241, 0.1)', // Glass effect
        },
        // Light mode palette (second image)  
        lightPalette: {
          primary: '#4a3267', // Deep purple
          secondary: '#de638a', // Pink
          tertiary: '#f7b9c4', // Light pink
          quaternary: '#f3d9e5', // Very light pink
          accent: '#c8bade', // Light purple
          text: '#2d1b3d', // Dark purple text
          textSecondary: '#6b4c7a', // Medium purple text
          background: '#fef7f7', // Very light background
        }
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          }
        }
      })
    }
  ],
}
