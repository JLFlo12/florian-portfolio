
import React from 'react';
import { motion } from 'framer-motion';

const RotatingGlobe = () => {
  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Main globe container - enlarged */}
      <motion.div
        className="relative w-80 h-80"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Globe wireframe structure */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
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
          <circle cx="160" cy="160" r="140" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.6" />
          <circle cx="160" cy="160" r="120" fill="none" stroke="url(#lineGradient)" strokeWidth="1.2" opacity="0.4" />
          <circle cx="160" cy="160" r="100" fill="none" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.3" />
          
          {/* Meridian lines */}
          <ellipse cx="160" cy="160" rx="140" ry="60" fill="none" stroke="url(#lineGradient)" strokeWidth="1.2" opacity="0.5" />
          <ellipse cx="160" cy="160" rx="140" ry="30" fill="none" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          <ellipse cx="160" cy="160" rx="60" ry="140" fill="none" stroke="url(#lineGradient)" strokeWidth="1.2" opacity="0.5" />
          <ellipse cx="160" cy="160" rx="30" ry="140" fill="none" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          
          {/* Diagonal wireframe lines */}
          <ellipse cx="160" cy="160" rx="120" ry="120" fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" opacity="0.3" transform="rotate(45 160 160)" />
          <ellipse cx="160" cy="160" rx="100" ry="100" fill="none" stroke="url(#lineGradient)" strokeWidth="0.6" opacity="0.2" transform="rotate(-45 160 160)" />
          
          {/* Network nodes - scaled up */}
          <circle cx="100" cy="90" r="4" fill="url(#nodeGradient)" />
          <circle cx="230" cy="120" r="3.5" fill="url(#nodeGradient)" />
          <circle cx="70" cy="200" r="4.5" fill="url(#nodeGradient)" />
          <circle cx="250" cy="230" r="3" fill="url(#nodeGradient)" />
          <circle cx="180" cy="70" r="3.5" fill="url(#nodeGradient)" />
          <circle cx="110" cy="270" r="4" fill="url(#nodeGradient)" />
          <circle cx="240" cy="170" r="3.5" fill="url(#nodeGradient)" />
          <circle cx="80" cy="140" r="3" fill="url(#nodeGradient)" />
          <circle cx="200" cy="250" r="4" fill="url(#nodeGradient)" />
          <circle cx="140" cy="100" r="3.5" fill="url(#nodeGradient)" />
          <circle cx="220" cy="200" r="3" fill="url(#nodeGradient)" />
          <circle cx="60" cy="240" r="3.5" fill="url(#nodeGradient)" />
          
          {/* Connection lines between nodes - scaled up */}
          <path d="M 100 90 Q 160 120 230 120" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 70 200 Q 125 135 180 70" stroke="url(#lineGradient)" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M 250 230 Q 180 200 110 270" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 240 170 Q 160 130 80 140" stroke="url(#lineGradient)" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M 200 250 Q 170 175 140 100" stroke="url(#lineGradient)" strokeWidth="1.3" fill="none" opacity="0.6" />
          <path d="M 220 200 Q 140 220 60 240" stroke="url(#lineGradient)" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M 180 70 Q 210 120 240 170" stroke="url(#lineGradient)" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M 100 90 Q 90 115 80 140" stroke="url(#lineGradient)" strokeWidth="0.8" fill="none" opacity="0.4" />
          
          {/* Additional geometric connections */}
          <polygon points="100,90 140,100 180,70" fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" opacity="0.3" />
          <polygon points="200,250 220,200 250,230" fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" opacity="0.3" />
        </svg>
        
        {/* Pulsing nodes animation - scaled up */}
        <motion.div
          className="absolute top-20 left-20 w-3 h-3 bg-white rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-24 right-16 w-2.5 h-2.5 bg-white rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-20 left-16 w-3.5 h-3.5 bg-white rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-16 right-12 w-2.5 h-2.5 bg-white rounded-full"
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
        />
      </motion.div>
      
      {/* Orbiting particles - scaled up */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-primary rounded-full"
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
        className="absolute w-2 h-2 bg-primary/70 rounded-full"
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
