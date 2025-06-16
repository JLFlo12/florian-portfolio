
import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-center w-10 h-10">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          {/* F stylisé avec des formes géométriques */}
          {/* Barre verticale principale */}
          <rect
            x="8"
            y="8"
            width="3"
            height="24"
            fill="currentColor"
          />
          
          {/* Barre horizontale du haut - forme trapézoïdale */}
          <path
            d="M11 8 L28 8 L26 12 L11 12 Z"
            fill="currentColor"
          />
          
          {/* Barre horizontale du milieu - plus courte et décalée */}
          <path
            d="M11 18 L22 18 L20 22 L11 22 Z"
            fill="currentColor"
          />
          
          {/* Détails géométriques pour le style atypique */}
          {/* Petit triangle décoratif */}
          <path
            d="M28 8 L32 12 L28 12 Z"
            fill="currentColor"
            opacity="0.7"
          />
          
          {/* Point décoratif */}
          <circle
            cx="24"
            cy="20"
            r="1.5"
            fill="currentColor"
            opacity="0.8"
          />
          
          {/* Ligne fine décorative */}
          <line
            x1="8"
            y1="32"
            x2="16"
            y2="32"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>
      <div className="text-xl font-bold text-foreground">
        Florian
      </div>
    </motion.div>
  );
};

export default Logo;
