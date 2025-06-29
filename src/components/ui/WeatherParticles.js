import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './WeatherParticles.css';

const WeatherParticles = ({ weatherCondition, darkMode }) => {
  const particles = useMemo(() => {
    if (!weatherCondition) return [];

    const condition = weatherCondition.toLowerCase();
    let particleCount = 0;
    let particleType = 'none';

    // Determine particle type and count based on weather condition
    if (condition.includes('rain') || condition.includes('drizzle')) {
      particleCount = condition.includes('heavy') ? 80 : 50;
      particleType = 'rain';
    } else if (condition.includes('snow')) {
      particleCount = condition.includes('heavy') ? 60 : 40;
      particleType = 'snow';
    } else if (condition.includes('thunderstorm')) {
      particleCount = 70;
      particleType = 'thunderstorm';
    } else if (condition.includes('mist') || condition.includes('fog')) {
      particleCount = 30;
      particleType = 'mist';
    } else if (condition.includes('cloud')) {
      particleCount = 20;
      particleType = 'clouds';
    }

    if (particleCount === 0) return [];

    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3,
      type: particleType
    }));
  }, [weatherCondition]);

  const renderParticles = () => {
    return particles.map((particle) => {
      switch (particle.type) {
        case 'rain':
          return (
            <motion.div
              key={particle.id}
              className="weather-particle rain-drop"
              style={{
                left: `${particle.x}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${0.5 + particle.speed * 0.5}s`,
                opacity: particle.opacity,
                background: darkMode 
                  ? `linear-gradient(to bottom, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.9))`
                  : `linear-gradient(to bottom, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.9))`,
                width: `${particle.size * 0.5}px`,
                height: `${particle.size * 8}px`
              }}
              initial={{ y: -20 }}
              animate={{ 
                y: '100vh',
                x: [0, -10, 0, 10, 0]
              }}
              transition={{
                duration: 1 + particle.speed,
                repeat: Infinity,
                ease: 'linear',
                delay: particle.delay
              }}
            />
          );

        case 'snow':
          return (
            <motion.div
              key={particle.id}
              className="weather-particle snowflake"
              style={{
                left: `${particle.x}%`,
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                opacity: particle.opacity,
                background: darkMode 
                  ? 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.7))'
                  : 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(248, 250, 252, 0.8))',
                borderRadius: '50%',
                boxShadow: darkMode 
                  ? '0 0 6px rgba(255, 255, 255, 0.3)' 
                  : '0 0 8px rgba(255, 255, 255, 0.5)'
              }}
              initial={{ y: -20 }}
              animate={{ 
                y: '100vh',
                x: [0, 20, -10, 15, -5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + particle.speed,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay
              }}
            />
          );

        case 'thunderstorm':
          return (
            <React.Fragment key={particle.id}>
              {/* Rain particles for thunderstorm */}
              <motion.div
                className="weather-particle rain-drop"
                style={{
                  left: `${particle.x}%`,
                  background: darkMode 
                    ? `linear-gradient(to bottom, rgba(99, 102, 241, 0.8), rgba(67, 56, 202, 0.9))`
                    : `linear-gradient(to bottom, rgba(129, 140, 248, 0.8), rgba(99, 102, 241, 0.9))`,
                  width: `${particle.size * 0.7}px`,
                  height: `${particle.size * 10}px`,
                  opacity: particle.opacity
                }}
                initial={{ y: -20 }}
                animate={{ 
                  y: '100vh',
                  x: [0, -15, 5, -10, 0]
                }}
                transition={{
                  duration: 0.3 + particle.speed * 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: particle.delay
                }}
              />
              
              {/* Lightning effect (occasional) */}
              {particle.id % 20 === 0 && (
                <motion.div
                  className="lightning-flash"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: darkMode 
                      ? 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 5 + Math.random() * 10,
                    delay: particle.delay
                  }}
                />
              )}
            </React.Fragment>
          );

        case 'mist':
          return (
            <motion.div
              key={particle.id}
              className="weather-particle mist-particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * 20}px`,
                height: `${particle.size * 10}px`,
                opacity: particle.opacity * 0.3,
                background: darkMode 
                  ? `radial-gradient(ellipse, rgba(148, 163, 184, 0.3), transparent)`
                  : `radial-gradient(ellipse, rgba(255, 255, 255, 0.4), transparent)`,
                borderRadius: '50%',
                filter: 'blur(2px)'
              }}
              animate={{
                x: [0, 30, -20, 40, 0],
                opacity: [particle.opacity * 0.3, particle.opacity * 0.6, particle.opacity * 0.3]
              }}
              transition={{
                duration: 8 + particle.speed * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay
              }}
            />
          );

        case 'clouds':
          return (
            <motion.div
              key={particle.id}
              className="weather-particle cloud-particle"
              style={{
                left: `${particle.x}%`,
                top: `${10 + (particle.y * 0.3)}%`,
                width: `${particle.size * 25}px`,
                height: `${particle.size * 15}px`,
                opacity: particle.opacity * 0.4,
                background: darkMode 
                  ? `radial-gradient(ellipse, rgba(100, 116, 139, 0.4), rgba(71, 85, 105, 0.2))`
                  : `radial-gradient(ellipse, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.3))`,
                borderRadius: '50px',
                filter: 'blur(1px)'
              }}
              animate={{
                x: [-10, 100, -10],
              }}
              transition={{
                duration: 20 + particle.speed * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: particle.delay
              }}
            />
          );

        default:
          return null;
      }
    });
  };

  if (particles.length === 0) return null;

  return (
    <div className="weather-particles-container">
      {renderParticles()}
      
      {/* Add some atmospheric effects */}
      {weatherCondition?.toLowerCase().includes('rain') && (
        <div 
          className="rain-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode 
              ? 'linear-gradient(to bottom, rgba(30, 41, 59, 0.1), rgba(15, 23, 42, 0.2))'
              : 'linear-gradient(to bottom, rgba(100, 116, 139, 0.1), rgba(71, 85, 105, 0.15))',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
      
      {weatherCondition?.toLowerCase().includes('snow') && (
        <div 
          className="snow-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode 
              ? 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.1))'
              : 'linear-gradient(to bottom, rgba(219, 234, 254, 0.1), rgba(191, 219, 254, 0.2))',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};

export default WeatherParticles;
