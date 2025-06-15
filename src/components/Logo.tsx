
import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      className="flex items-center justify-center w-10 h-10"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Console/Gaming device outline */}
        <rect
          x="4"
          y="12"
          width="32"
          height="20"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Screen */}
        <rect
          x="16"
          y="16"
          width="8"
          height="6"
          rx="1"
          fill="currentColor"
          opacity="0.8"
        />
        
        {/* Left controls - D-pad */}
        <circle
          cx="10"
          cy="20"
          r="1.5"
          fill="currentColor"
          opacity="0.6"
        />
        <rect
          x="9"
          y="18"
          width="2"
          height="4"
          fill="currentColor"
          opacity="0.6"
        />
        <rect
          x="8"
          y="19"
          width="4"
          height="2"
          fill="currentColor"
          opacity="0.6"
        />
        
        {/* Right controls - Action buttons */}
        <circle
          cx="29"
          cy="18"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="31"
          cy="20"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="29"
          cy="22"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="27"
          cy="20"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
        
        {/* Code brackets for dev aspect */}
        <path
          d="M6 8 L4 10 L6 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M34 8 L36 10 L34 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
};

export default Logo;
