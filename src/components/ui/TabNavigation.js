import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Clock, Calendar, Wind } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'current', label: 'Current', icon: Sun },
    { key: 'hourly', label: 'Hourly', icon: Clock },
    { key: 'daily', label: '5-Day', icon: Calendar },
    { key: 'air', label: 'Air Quality', icon: Wind }
  ];

  return (
    <motion.div 
      className="flex justify-center gap-1 mb-8 p-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 flex-shrink-0 mx-2 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {tabs.map((tab, index) => {
        const IconComponent = tab.icon;
        return (
          <motion.button
            key={tab.key}
            className={`
              relative flex items-center gap-2.5 py-3 px-5 md:px-6 rounded-xl
              cursor-pointer transition-all duration-300 text-sm md:text-base font-medium
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
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default TabNavigation;
