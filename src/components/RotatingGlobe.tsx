
import React from 'react';
import { motion } from 'framer-motion';

const RotatingGlobe = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Main globe container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Globe outline */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30"></div>
        
        {/* Meridian lines */}
        <div className="absolute inset-0 rounded-full border border-primary/20 transform rotate-45"></div>
        <div className="absolute inset-0 rounded-full border border-primary/20 transform -rotate-45"></div>
        
        {/* Latitude lines */}
        <div className="absolute top-1/4 left-0 right-0 h-0 border-t border-primary/20 transform rotate-12"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0 border-t border-primary/30"></div>
        <div className="absolute bottom-1/4 left-0 right-0 h-0 border-t border-primary/20 transform -rotate-12"></div>
        
        {/* Network nodes */}
        <div className="absolute top-16 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-24 right-16 w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-16 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-16 right-20 w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-8 w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-8 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Network connection lines */}
          <path d="M 80 64 Q 160 100 240 104" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.8" />
          <path d="M 96 256 Q 160 200 272 256" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 64 240 Q 120 160 32 160" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M 272 96 Q 200 140 288 160" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </motion.div>
      
      {/* Orbiting elements */}
      <motion.div
        className="absolute w-6 h-6 border border-primary/40 rounded-full"
        style={{
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-1 h-1 bg-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
      
      <motion.div
        className="absolute w-8 h-8 border border-primary/30 rounded-full"
        style={{
          bottom: '15%',
          right: '20%',
          transform: 'translate(50%, 50%)'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-1.5 h-1.5 bg-primary/70 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
    </div>
  );
};

export default RotatingGlobe;
