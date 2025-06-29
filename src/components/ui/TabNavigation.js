import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Clock, Calendar, Wind } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'current', label: 'Current', shortLabel: 'Now', icon: Sun },
    { key: 'hourly', label: 'Hourly', shortLabel: 'Hours', icon: Clock },
    { key: 'daily', label: '5-Day', shortLabel: '5-Day', icon: Calendar },
    { key: 'air', label: 'Air Quality', shortLabel: 'Air', icon: Wind }
  ];

  return (
    <motion.div 
      className="flex justify-center mb-8 mx-2 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Mobile Layout: 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm sm:hidden bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 p-2">
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          return (
            <motion.button
              key={tab.key}
              className={`
                relative flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-xl
                cursor-pointer transition-all duration-300 text-xs font-medium min-h-[60px]
                ${activeTab === tab.key 
                  ? 'bg-white/20 dark:bg-white/15 text-white shadow-lg backdrop-blur-sm' 
                  : 'text-white/70 hover:bg-white/10 dark:hover:bg-white/8 hover:text-white'
                }
              `}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-center leading-tight">{tab.shortLabel}</span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Desktop Layout: Single Row */}
      <div className="hidden sm:flex justify-center gap-1 p-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 flex-shrink-0">
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          return (
            <motion.button
              key={tab.key}
              className={`
                relative flex items-center gap-2.5 py-3 px-5 md:px-6 rounded-xl
                cursor-pointer transition-all duration-300 text-sm md:text-base font-medium whitespace-nowrap
                ${activeTab === tab.key 
                  ? 'bg-white/20 dark:bg-white/15 text-white shadow-lg backdrop-blur-sm' 
                  : 'text-white/70 hover:bg-white/10 dark:hover:bg-white/8 hover:text-white'
                }
              `}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTabDesktop"
                  className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TabNavigation;
