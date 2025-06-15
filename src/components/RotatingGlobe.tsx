
import React from 'react';
import { motion } from 'framer-motion';

const RotatingGlobe = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Main globe container */}
      <motion.div
        className="relative w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Globe wireframe structure */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
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
          <circle cx="128" cy="128" r="100" fill="none" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6" />
          <circle cx="128" cy="128" r="80" fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" opacity="0.4" />
          <circle cx="128" cy="128" r="60" fill="none" stroke="url(#lineGradient)" strokeWidth="0.6" opacity="0.3" />
          
          {/* Meridian lines */}
          <ellipse cx="128" cy="128" rx="100" ry="40" fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="128" cy="128" rx="100" ry="20" fill="none" stroke="url(#lineGradient)" strokeWidth="0.6" opacity="0.4" />
          <ellipse cx="128" cy="128" rx="40" ry="100" fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="128" cy="128" rx="20" ry="100" fill="none" stroke="url(#lineGradient)" strokeWidth="0.6" opacity="0.4" />
          
          {/* Diagonal wireframe lines */}
          <ellipse cx="128" cy="128" rx="85" ry="85" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" opacity="0.3" transform="rotate(45 128 128)" />
          <ellipse cx="128" cy="128" rx="70" ry="70" fill="none" stroke="url(#lineGradient)" strokeWidth="0.4" opacity="0.2" transform="rotate(-45 128 128)" />
          
          {/* Network nodes */}
          <circle cx="80" cy="70" r="3" fill="url(#nodeGradient)" />
          <circle cx="180" cy="90" r="2.5" fill="url(#nodeGradient)" />
          <circle cx="60" cy="150" r="3.5" fill="url(#nodeGradient)" />
          <circle cx="200" cy="170" r="2" fill="url(#nodeGradient)" />
          <circle cx="140" cy="60" r="2.5" fill="url(#nodeGradient)" />
          <circle cx="90" cy="200" r="3" fill="url(#nodeGradient)" />
          <circle cx="190" cy="130" r="2.5" fill="url(#nodeGradient)" />
          <circle cx="70" cy="110" r="2" fill="url(#nodeGradient)" />
          <circle cx="160" cy="190" r="3" fill="url(#nodeGradient)" />
          <circle cx="110" cy="80" r="2.5" fill="url(#nodeGradient)" />
          <circle cx="170" cy="150" r="2" fill="url(#nodeGradient)" />
          <circle cx="50" cy="180" r="2.5" fill="url(#nodeGradient)" />
          
          {/* Connection lines between nodes */}
          <path d="M 80 70 Q 128 90 180 90" stroke="url(#lineGradient)" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 60 150 Q 100 120 140 60" stroke="url(#lineGradient)" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M 200 170 Q 150 150 90 200" stroke="url(#lineGradient)" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 190 130 Q 130 100 70 110" stroke="url(#lineGradient)" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M 160 190 Q 135 140 110 80" stroke="url(#lineGradient)" strokeWidth="0.9" fill="none" opacity="0.6" />
          <path d="M 170 150 Q 110 165 50 180" stroke="url(#lineGradient)" strokeWidth="0.7" fill="none" opacity="0.4" />
          <path d="M 140 60 Q 165 105 190 130" stroke="url(#lineGradient)" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M 80 70 Q 75 90 70 110" stroke="url(#lineGradient)" strokeWidth="0.6" fill="none" opacity="0.4" />
          
          {/* Additional geometric connections */}
          <polygon points="80,70 110,80 140,60" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" opacity="0.3" />
          <polygon points="160,190 170,150 200,170" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" opacity="0.3" />
        </svg>
        
        {/* Pulsing nodes animation */}
        <motion.div
          className="absolute top-16 left-16 w-2 h-2 bg-white rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-20 right-12 w-1.5 h-1.5 bg-white rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-16 left-12 w-2.5 h-2.5 bg-white rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-12 right-8 w-1.5 h-1.5 bg-white rounded-full"
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
        />
      </motion.div>
      
      {/* Orbiting particles */}
      <motion.div
        className="absolute w-1 h-1 bg-primary rounded-full"
        style={{
          top: '20%',
          left: '80%',
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
        className="absolute w-1.5 h-1.5 bg-primary/70 rounded-full"
        style={{
          bottom: '25%',
          left: '15%',
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
      
      {/* DIGITAL DESIGN text */}
      <div className="absolute inset-x-0 bottom-4 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-yellow-400 font-black text-lg tracking-wider"
          style={{ textShadow: '0 0 10px rgba(250, 204, 21, 0.5)' }}
        >
          DIGITAL DESIGN
        </motion.h3>
      </div>
    </div>
  );
};

export default RotatingGlobe;
