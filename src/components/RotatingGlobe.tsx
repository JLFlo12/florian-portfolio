
import React from 'react';
import { motion } from 'framer-motion';

const RotatingGlobe = () => {
  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Main globe container - further enlarged */}
      <motion.div
        className="relative w-[450px] h-[450px]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Globe wireframe structure */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 450">
          <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Main globe outline - wireframe style */}
          <circle cx="225" cy="225" r="200" fill="none" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />
          <circle cx="225" cy="225" r="170" fill="none" stroke="url(#lineGradient)" strokeWidth="1.8" opacity="0.4" />
          <circle cx="225" cy="225" r="140" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.3" />
          
          {/* Meridian lines */}
          <ellipse cx="225" cy="225" rx="200" ry="85" fill="none" stroke="url(#lineGradient)" strokeWidth="1.8" opacity="0.5" />
          <ellipse cx="225" cy="225" rx="200" ry="45" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="225" cy="225" rx="85" ry="200" fill="none" stroke="url(#lineGradient)" strokeWidth="1.8" opacity="0.5" />
          <ellipse cx="225" cy="225" rx="45" ry="200" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.4" />
          
          {/* Diagonal wireframe lines */}
          <ellipse cx="225" cy="225" rx="170" ry="170" fill="none" stroke="url(#lineGradient)" strokeWidth="1.2" opacity="0.3" transform="rotate(45 225 225)" />
          <ellipse cx="225" cy="225" rx="140" ry="140" fill="none" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.2" transform="rotate(-45 225 225)" />
          
          {/* Network nodes - scaled up proportionally */}
          <circle cx="140" cy="125" r="6" fill="url(#nodeGradient)" />
          <circle cx="320" cy="165" r="5.5" fill="url(#nodeGradient)" />
          <circle cx="95" cy="280" r="7" fill="url(#nodeGradient)" />
          <circle cx="350" cy="320" r="5" fill="url(#nodeGradient)" />
          <circle cx="250" cy="95" r="5.5" fill="url(#nodeGradient)" />
          <circle cx="150" cy="375" r="6" fill="url(#nodeGradient)" />
          <circle cx="335" cy="235" r="5.5" fill="url(#nodeGradient)" />
          <circle cx="115" cy="195" r="5" fill="url(#nodeGradient)" />
          <circle cx="280" cy="350" r="6" fill="url(#nodeGradient)" />
          <circle cx="195" cy="140" r="5.5" fill="url(#nodeGradient)" />
          <circle cx="305" cy="280" r="5" fill="url(#nodeGradient)" />
          <circle cx="85" cy="335" r="5.5" fill="url(#nodeGradient)" />
          
          {/* Connection lines between nodes - scaled up proportionally */}
          <path d="M 140 125 Q 225 165 320 165" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 95 280 Q 172 187 250 95" stroke="url(#lineGradient)" strokeWidth="1.8" fill="none" opacity="0.5" />
          <path d="M 350 320 Q 250 280 150 375" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 335 235 Q 225 180 115 195" stroke="url(#lineGradient)" strokeWidth="1.8" fill="none" opacity="0.5" />
          <path d="M 280 350 Q 237 245 195 140" stroke="url(#lineGradient)" strokeWidth="1.9" fill="none" opacity="0.6" />
          <path d="M 305 280 Q 195 305 85 335" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M 250 95 Q 292 165 335 235" stroke="url(#lineGradient)" strokeWidth="1.8" fill="none" opacity="0.5" />
          <path d="M 140 125 Q 127 160 115 195" stroke="url(#lineGradient)" strokeWidth="1.2" fill="none" opacity="0.4" />
          
          {/* Additional geometric connections */}
          <polygon points="140,125 195,140 250,95" fill="none" stroke="url(#lineGradient)" strokeWidth="1.2" opacity="0.3" />
          <polygon points="280,350 305,280 350,320" fill="none" stroke="url(#lineGradient)" strokeWidth="1.2" opacity="0.3" />
        </svg>
        
        {/* Pulsing nodes animation - scaled up proportionally */}
        <motion.div
          className="absolute top-28 left-28 w-4 h-4 bg-white rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-32 right-24 w-3.5 h-3.5 bg-white rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-28 left-24 w-5 h-5 bg-white rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-24 right-20 w-3.5 h-3.5 bg-white rounded-full"
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
        />
      </motion.div>
      
      {/* Orbiting particles - scaled up proportionally */}
      <motion.div
        className="absolute w-2 h-2 bg-primary rounded-full"
        style={{
          top: '15%',
          left: '85%',
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.5, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity }
        }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 bg-primary/70 rounded-full"
        style={{
          bottom: '20%',
          left: '10%',
        }}
        animate={{ 
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 2.5, repeat: Infinity, delay: 1 }
        }}
      />
    </div>
  );
};

export default RotatingGlobe;
