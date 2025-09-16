import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onLoadComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-gradient-to-br from-primary-red to-primary-dark-red flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Main star animation */}
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <motion.path
              d="M100,10 L120,70 L180,70 L135,110 L155,170 L100,130 L45,170 L65,110 L20,70 L80,70 Z"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M100,10 L120,70 L180,70 L135,110 L155,170 L100,130 L45,170 L65,110 L20,70 L80,70 Z"
              fill="#FFD700"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Orbiting dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-gold rounded-full"
            style={{
              originX: '0px',
              originY: '0px',
            }}
            animate={{
              rotate: 360,
              x: [0, Math.cos((i * 72 * Math.PI) / 180) * 80],
              y: [0, Math.sin((i * 72 * Math.PI) / 180) * 80],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Loading text */}
        <motion.div 
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl font-serif whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Đang tải bảo tàng
          </motion.span>
          <motion.span
            className="inline-block ml-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>

        {/* Progress bar */}
        <motion.div 
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-primary-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
