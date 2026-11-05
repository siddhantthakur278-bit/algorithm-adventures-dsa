import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- BYTE: Hero Student ---
export const ByteAvatar: React.FC<{
  mood?: 'happy' | 'thinking' | 'victory' | 'shocked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'happy', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [-2, 2, -2, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Blue Aura Glow */}
        <circle cx="50" cy="50" r="46" fill="#38B6FF" fillOpacity="0.2" />

        {/* Head Base */}
        <circle cx="50" cy="50" r="38" fill="#FFDE59" stroke="#000" strokeWidth="4" />

        {/* Hair / Cap */}
        <path
          d="M 20 45 Q 50 15 80 45 Q 65 30 50 35 Q 35 30 20 45 Z"
          fill="#38B6FF"
          stroke="#000"
          strokeWidth="3.5"
        />

        {/* Headphones Band */}
        <path
          d="M 18 52 A 34 34 0 0 1 82 52"
          fill="none"
          stroke="#FF914D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Ear Cups */}
        <rect x="12" y="44" width="10" height="20" rx="5" fill="#FF5757" stroke="#000" strokeWidth="3" />
        <rect x="78" y="44" width="10" height="20" rx="5" fill="#FF5757" stroke="#000" strokeWidth="3" />

        {/* Eyes based on mood */}
        {mood === 'happy' && (
          <>
            <circle cx="38" cy="52" r="5" fill="#000" />
            <circle cx="62" cy="52" r="5" fill="#000" />
            <circle cx="40" cy="50" r="1.5" fill="#FFF" />
            <circle cx="64" cy="50" r="1.5" fill="#FFF" />
            {/* Smile */}
            <path d="M 38 64 Q 50 76 62 64" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}

        {mood === 'victory' && (
          <>
            {/* Starry Eyes */}
            <path d="M 38 48 L 40 54 L 46 54 L 41 57 L 43 62 L 38 58 L 33 62 L 35 57 L 30 54 L 36 54 Z" fill="#FF914D" />
            <path d="M 62 48 L 64 54 L 70 54 L 65 57 L 67 62 L 62 58 L 57 62 L 59 57 L 54 54 L 60 54 Z" fill="#FF914D" />
            {/* Big Open Smile */}
            <path d="M 36 62 Q 50 82 64 62 Z" fill="#FF5757" stroke="#000" strokeWidth="3" />
          </>
        )}

        {mood === 'thinking' && (
          <>
            <circle cx="38" cy="48" r="5" fill="#000" />
            <circle cx="62" cy="48" r="5" fill="#000" />
            <path d="M 33 42 L 43 45" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 57 45 L 67 42" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            {/* Puzzled mouth */}
            <ellipse cx="50" cy="66" rx="6" ry="4" fill="#000" />
          </>
        )}

        {mood === 'shocked' && (
          <>
            <circle cx="38" cy="50" r="7" fill="#FFF" stroke="#000" strokeWidth="2.5" />
            <circle cx="62" cy="50" r="7" fill="#FFF" stroke="#000" strokeWidth="2.5" />
            <circle cx="38" cy="50" r="2.5" fill="#000" />
            <circle cx="62" cy="50" r="2.5" fill="#000" />
            <ellipse cx="50" cy="70" rx="8" ry="10" fill="#FF5757" stroke="#000" strokeWidth="3" />
          </>
        )}

        {/* Cheeks */}
        <circle cx="28" cy="60" r="4" fill="#FF914D" opacity="0.6" />
        <circle cx="72" cy="60" r="4" fill="#FF914D" opacity="0.6" />
      </svg>
    </motion.div>
  );
};

// --- PROFESSOR: Master DSA Teacher ---
export const ProfessorAvatar: React.FC<{
  mood?: 'wise' | 'teaching' | 'proud';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'wise', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Glow */}
        <circle cx="50" cy="50" r="46" fill="#8C52FF" fillOpacity="0.2" />

        {/* Head */}
        <circle cx="50" cy="50" r="38" fill="#FCE7C8" stroke="#000" strokeWidth="4" />

        {/* White Hair Tufts */}
        <path d="M 12 45 Q 8 30 22 25 Q 16 40 22 55 Z" fill="#E2E8F0" stroke="#000" strokeWidth="3" />
        <path d="M 88 45 Q 92 30 78 25 Q 84 40 78 55 Z" fill="#E2E8F0" stroke="#000" strokeWidth="3" />
        <path d="M 26 22 Q 50 10 74 22 Z" fill="#E2E8F0" stroke="#000" strokeWidth="3" />

        {/* Big Round Glasses */}
        <circle cx="36" cy="48" r="12" fill="#FFFFFF" fillOpacity="0.8" stroke="#000" strokeWidth="3.5" />
        <circle cx="64" cy="48" r="12" fill="#FFFFFF" fillOpacity="0.8" stroke="#000" strokeWidth="3.5" />
        <line x1="48" y1="48" x2="52" y2="48" stroke="#000" strokeWidth="3.5" />

        {/* Eyes behind glasses */}
        <circle cx="36" cy="48" r="4" fill="#000" />
        <circle cx="64" cy="48" r="4" fill="#000" />
        <circle cx="38" cy="46" r="1.5" fill="#FFF" />
        <circle cx="66" cy="46" r="1.5" fill="#FFF" />

        {/* Bushy Eyebrows */}
        <path d="M 26 34 Q 36 30 46 36" stroke="#4A5568" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 54 36 Q 64 30 74 34" stroke="#4A5568" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* White Mustache */}
        <path
          d="M 32 64 Q 50 68 50 60 Q 50 68 68 64 Q 50 78 32 64 Z"
          fill="#FFFFFF"
          stroke="#000"
          strokeWidth="3"
        />

        {/* Bowtie / Collar */}
        <polygon points="50,88 38,98 62,98" fill="#FF5757" stroke="#000" strokeWidth="2.5" />
        <polygon points="50,90 42,94 58,94" fill="#FFDE59" />
      </svg>
    </motion.div>
  );
};

// --- BUGSY: The Sneaky Villain Bug ---
export const BugsyAvatar: React.FC<{
  mood?: 'sneaky' | 'laughing' | 'defeated';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'sneaky', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={
        mood === 'defeated'
          ? { rotate: [0, -10, 10, -5, 5, 0], opacity: 0.7 }
          : { y: [0, -4, 0] }
      }
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Toxic Green Glow */}
        <circle cx="50" cy="50" r="46" fill="#7ED957" fillOpacity="0.25" />

        {/* Antennae */}
        <motion.path
          d="M 38 28 Q 24 10 16 16"
          fill="none"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: [-2, 3, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="16" cy="16" r="4" fill="#FF5757" stroke="#000" strokeWidth="2" />

        <motion.path
          d="M 62 28 Q 76 10 84 16"
          fill="none"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: [2, -3, 2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="84" cy="16" r="4" fill="#FF5757" stroke="#000" strokeWidth="2" />

        {/* Bug Shell / Body */}
        <ellipse cx="50" cy="56" rx="36" ry="34" fill="#7ED957" stroke="#000" strokeWidth="4" />

        {/* Bug Shell Spots */}
        <circle cx="32" cy="70" r="6" fill="#489b25" />
        <circle cx="68" cy="70" r="6" fill="#489b25" />
        <circle cx="50" cy="78" r="5" fill="#489b25" />

        {/* Eyes */}
        {mood !== 'defeated' ? (
          <>
            {/* Sneaky Slanted Eyes */}
            <path d="M 28 42 Q 40 40 44 48 Q 38 56 28 48 Z" fill="#FFDE59" stroke="#000" strokeWidth="3" />
            <circle cx="36" cy="48" r="3" fill="#FF5757" />
            <path d="M 72 42 Q 60 40 56 48 Q 62 56 72 48 Z" fill="#FFDE59" stroke="#000" strokeWidth="3" />
            <circle cx="64" cy="48" r="3" fill="#FF5757" />

            {/* Sneaky Grin with Sharp Fang */}
            <path
              d="M 34 60 Q 50 72 66 60 Q 50 68 34 60 Z"
              fill="#222"
              stroke="#000"
              strokeWidth="3"
            />
            {/* Fang */}
            <polygon points="44,62 48,68 50,62" fill="#FFF" />
          </>
        ) : (
          <>
            {/* Dizzy X Eyes */}
            <line x1="28" y1="42" x2="42" y2="54" stroke="#FF5757" strokeWidth="4" strokeLinecap="round" />
            <line x1="42" y1="42" x2="28" y2="54" stroke="#FF5757" strokeWidth="4" strokeLinecap="round" />
            <line x1="58" y1="42" x2="72" y2="54" stroke="#FF5757" strokeWidth="4" strokeLinecap="round" />
            <line x1="72" y1="42" x2="58" y2="54" stroke="#FF5757" strokeWidth="4" strokeLinecap="round" />
            {/* Wavy Defeated Mouth */}
            <path d="M 36 68 Q 42 62 50 68 Q 58 74 64 68" fill="none" stroke="#000" strokeWidth="3.5" />
          </>
        )}
      </svg>
    </motion.div>
  );
};

// --- PROFESSOR TUPLE: Relational Database Academic Master ---
export const ProfTupleAvatar: React.FC<{
  mood?: 'wise' | 'teaching' | 'puzzled';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'wise', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Golden Academic Glow */}
        <circle cx="50" cy="50" r="46" fill="#FFB703" fillOpacity="0.25" />

        {/* Head */}
        <circle cx="50" cy="50" r="38" fill="#FDE2B8" stroke="#000" strokeWidth="4" />

        {/* Bald top shine */}
        <ellipse cx="50" cy="22" rx="14" ry="4" fill="#FFFFFF" fillOpacity="0.6" />

        {/* Side White Academic Hair */}
        <path d="M 14 50 Q 10 32 20 28 Q 16 46 22 60 Z" fill="#E2E8F0" stroke="#000" strokeWidth="3" />
        <path d="M 86 50 Q 90 32 80 28 Q 84 46 78 60 Z" fill="#E2E8F0" stroke="#000" strokeWidth="3" />

        {/* Thick Round Glasses */}
        <circle cx="36" cy="46" r="13" fill="#FFFFFF" fillOpacity="0.85" stroke="#000" strokeWidth="3.5" />
        <circle cx="64" cy="46" r="13" fill="#FFFFFF" fillOpacity="0.85" stroke="#000" strokeWidth="3.5" />
        <line x1="49" y1="46" x2="51" y2="46" stroke="#000" strokeWidth="3.5" />

        {/* Eyes inside glasses */}
        <circle cx="36" cy="46" r="4" fill="#000" />
        <circle cx="64" cy="46" r="4" fill="#000" />
        <circle cx="38" cy="44" r="1.5" fill="#FFF" />
        <circle cx="66" cy="44" r="1.5" fill="#FFF" />

        {/* Bushy Brows */}
        <path d="M 24 32 Q 36 28 46 34" stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 54 34 Q 64 28 76 32" stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Big White Walrus Mustache */}
        <path
          d="M 28 62 Q 50 67 50 58 Q 50 67 72 62 Q 50 78 28 62 Z"
          fill="#FFFFFF"
          stroke="#000"
          strokeWidth="3.5"
        />

        {/* Bowtie */}
        <polygon points="50,86 36,96 64,96" fill="#023E8A" stroke="#000" strokeWidth="2.5" />
        <polygon points="50,88 42,92 58,92" fill="#FFDE59" />
      </svg>
    </motion.div>
  );
};

// --- SAM: Inquisitive Student in Red Cap ---
export const SamAvatar: React.FC<{
  mood?: 'curious' | 'happy' | 'thinking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'curious', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Orange Warm Glow */}
        <circle cx="50" cy="50" r="46" fill="#FF5757" fillOpacity="0.2" />

        {/* Head */}
        <circle cx="50" cy="52" r="36" fill="#FBC4AB" stroke="#000" strokeWidth="4" />

        {/* Red Baseball Cap Dome */}
        <path
          d="M 18 46 Q 50 14 82 46 Z"
          fill="#E63946"
          stroke="#000"
          strokeWidth="4"
        />
        {/* Cap Visor / Brim (sideways style) */}
        <path
          d="M 16 46 Q 50 48 88 40 L 92 48 Q 50 56 14 48 Z"
          fill="#D90429"
          stroke="#000"
          strokeWidth="3.5"
        />
        {/* Cap Button on top */}
        <circle cx="50" cy="22" r="3.5" fill="#FFDE59" stroke="#000" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="36" cy="58" r="5" fill="#000" />
        <circle cx="64" cy="58" r="5" fill="#000" />
        <circle cx="38" cy="56" r="1.8" fill="#FFF" />
        <circle cx="66" cy="56" r="1.8" fill="#FFF" />

        {/* Smile / Curious mouth */}
        {mood === 'curious' ? (
          <ellipse cx="50" cy="72" rx="4" ry="5" fill="#000" />
        ) : (
          <path d="M 38 70 Q 50 80 62 70" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        )}

        {/* Rosy Cheeks */}
        <circle cx="28" cy="65" r="4" fill="#FF7B00" opacity="0.45" />
        <circle cx="72" cy="65" r="4" fill="#FF7B00" opacity="0.45" />
      </svg>
    </motion.div>
  );
};

// --- NULLY: The Ghost of NULL ---
export const NullyAvatar: React.FC<{
  mood?: 'floating' | 'mysterious' | 'spooky';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'floating', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -8, 0], opacity: [0.88, 1, 0.88] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [-3, 3, -3, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Spectral Lavender / Purple Glow */}
        <circle cx="50" cy="50" r="46" fill="#C77DFF" fillOpacity="0.25" />

        {/* Floating Ghost Sheet Body */}
        <path
          d="M 22 52 C 22 24, 78 24, 78 52 C 78 74, 82 85, 74 85 C 68 85, 65 77, 60 85 C 55 91, 45 91, 40 85 C 35 77, 32 85, 26 85 C 18 85, 22 74, 22 52 Z"
          fill="#EDE9FE"
          stroke="#000"
          strokeWidth="4"
        />

        {/* Ghost Inner Head Shadow */}
        <ellipse cx="50" cy="42" rx="20" ry="14" fill="#DDD6FE" fillOpacity="0.4" />

        {/* Big Ghost Eyes */}
        <ellipse cx="40" cy="46" rx="5" ry="7" fill="#1E1B4B" stroke="#000" strokeWidth="2" />
        <ellipse cx="60" cy="46" rx="5" ry="7" fill="#1E1B4B" stroke="#000" strokeWidth="2" />
        <circle cx="42" cy="44" r="2" fill="#FFFFFF" />
        <circle cx="62" cy="44" r="2" fill="#FFFFFF" />

        {/* Spooky / Surprised "O" Mouth */}
        <ellipse cx="50" cy="62" rx="4" ry="6" fill="#1E1B4B" stroke="#000" strokeWidth="1.5" />

        {/* Floating Sparkles around ghost */}
        <circle cx="16" cy="36" r="2" fill="#C77DFF" />
        <circle cx="84" cy="38" r="2.5" fill="#E0AAFF" />
        <circle cx="20" cy="70" r="1.5" fill="#C77DFF" />
      </svg>
    </motion.div>
  );
};

// --- PRI: The Prism-Bot (Teacher) ---
export const PriAvatar: React.FC<{
  mood?: 'teaching' | 'wise' | 'excited';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'teaching', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
        {/* Teal Prism Aura Glow */}
        <polygon points="50,15 15,82 85,82" fill="#06B6D4" fillOpacity="0.25" />

        {/* Animated Rainbow Dispersion Rays from right facet */}
        <motion.line
          x1="68"
          y1="52"
          x2="98"
          y2="38"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [94, 102, 94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.line
          x1="68"
          y1="56"
          x2="98"
          y2="46"
          stroke="#F97316"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [94, 102, 94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        />
        <motion.line
          x1="68"
          y1="60"
          x2="98"
          y2="54"
          stroke="#EAB308"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [94, 102, 94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.line
          x1="68"
          y1="64"
          x2="98"
          y2="62"
          stroke="#22C55E"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [94, 102, 94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        <motion.line
          x1="68"
          y1="68"
          x2="98"
          y2="70"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [94, 102, 94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.line
          x1="68"
          y1="72"
          x2="98"
          y2="78"
          stroke="#A855F7"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [94, 102, 94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Main Triangular Prism Body */}
        <polygon
          points="50,18 16,80 84,80"
          fill="#14B8A6"
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 3D Prism Left Facet highlight */}
        <polygon
          points="50,18 16,80 50,80"
          fill="#2DD4BF"
          fillOpacity="0.6"
        />

        {/* Big Expressive Robot Eyes */}
        <circle cx="40" cy="54" r="6.5" fill="#FFF" stroke="#000" strokeWidth="2" />
        <circle cx="60" cy="54" r="6.5" fill="#FFF" stroke="#000" strokeWidth="2" />
        <circle cx="41" cy="54" r="3" fill="#0F172A" />
        <circle cx="61" cy="54" r="3" fill="#0F172A" />
        <circle cx="42.5" cy="52.5" r="1.2" fill="#FFF" />
        <circle cx="62.5" cy="52.5" r="1.2" fill="#FFF" />

        {/* Cheerful Robot Mouth */}
        <path d="M 43 66 Q 50 72 57 66" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// --- NOVA: The Buddy Student ---
export const NovaAvatar: React.FC<{
  mood?: 'curious' | 'happy' | 'determined';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'curious', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3.5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [-2, 2, -2, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Soft Warm Glow */}
        <circle cx="50" cy="50" r="46" fill="#FB923C" fillOpacity="0.2" />

        {/* Shirt Collar / Shoulders */}
        <path d="M 28 85 Q 50 78 72 85 L 75 96 L 25 96 Z" fill="#EA580C" stroke="#000" strokeWidth="3" />

        {/* Face Base */}
        <circle cx="50" cy="50" r="32" fill="#FED7AA" stroke="#000" strokeWidth="3.5" />

        {/* Brown Hair */}
        <path
          d="M 22 46 C 20 25, 80 25, 78 46 C 72 32, 60 30, 50 34 C 40 30, 28 32, 22 46 Z"
          fill="#78350F"
          stroke="#000"
          strokeWidth="3"
        />

        {/* Blue Headband */}
        <path
          d="M 20 48 A 32 32 0 0 1 80 48"
          fill="none"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Blue Headphones Ear Cups */}
        <rect x="14" y="42" width="10" height="18" rx="4" fill="#3B82F6" stroke="#000" strokeWidth="2.5" />
        <rect x="76" y="42" width="10" height="18" rx="4" fill="#3B82F6" stroke="#000" strokeWidth="2.5" />

        {/* Friendly Round Eyes */}
        <circle cx="40" cy="52" r="4.5" fill="#1E293B" />
        <circle cx="60" cy="52" r="4.5" fill="#1E293B" />
        <circle cx="41.5" cy="50.5" r="1.5" fill="#FFF" />
        <circle cx="61.5" cy="50.5" r="1.5" fill="#FFF" />

        {/* Smile */}
        <path d="M 42 63 Q 50 71 58 63" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

        {/* Rosy Cheeks */}
        <ellipse cx="32" cy="58" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
        <ellipse cx="68" cy="58" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
      </svg>
    </motion.div>
  );
};

// --- BUG: The Trap Setter Villain ---
export const BugAvatar: React.FC<{
  mood?: 'sneaky' | 'laughing' | 'shocked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'sneaky', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ rotate: [-2.5, 2.5, -2.5], y: [0, -2, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.15, rotate: [-8, 8, -4, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Red Villain Glow */}
        <circle cx="50" cy="52" r="44" fill="#EF4444" fillOpacity="0.25" />

        {/* Antennae */}
        <path d="M 40 28 Q 30 14 22 18" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <circle cx="21" cy="18" r="3" fill="#EF4444" stroke="#000" strokeWidth="2" />
        <path d="M 60 28 Q 70 14 78 18" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <circle cx="79" cy="18" r="3" fill="#EF4444" stroke="#000" strokeWidth="2" />

        {/* Six Bug Legs */}
        <line x1="20" y1="44" x2="6" y2="40" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="18" y1="56" x2="5" y2="58" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="68" x2="8" y2="76" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        <line x1="80" y1="44" x2="94" y2="40" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="82" y1="56" x2="95" y2="58" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="68" x2="92" y2="76" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        {/* Round Red Body */}
        <circle cx="50" cy="54" r="32" fill="#EF4444" stroke="#000" strokeWidth="4" />

        {/* Bug Spots */}
        <circle cx="34" cy="42" r="3" fill="#7F1D1D" />
        <circle cx="66" cy="42" r="3" fill="#7F1D1D" />
        <circle cx="35" cy="68" r="3" fill="#7F1D1D" />
        <circle cx="65" cy="68" r="3" fill="#7F1D1D" />
        <circle cx="50" cy="74" r="3" fill="#7F1D1D" />

        {/* Mischievous Eyes */}
        <circle cx="38" cy="52" r="7.5" fill="#FFF" stroke="#000" strokeWidth="2" />
        <circle cx="62" cy="52" r="7.5" fill="#FFF" stroke="#000" strokeWidth="2" />
        <circle cx="39" cy="53" r="3.5" fill="#000" />
        <circle cx="61" cy="53" r="3.5" fill="#000" />

        {/* Sneaky Crooked Grin */}
        <path d="M 39 64 Q 50 72 61 62" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// --- PROFESSOR PIVOT: The Linear Algebra Sage ---
export const ProfPivotAvatar: React.FC<{
  mood?: 'wise' | 'teaching' | 'shocked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'wise', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Amber Halo Glow */}
        <circle cx="50" cy="50" r="46" fill="#FBBF24" fillOpacity="0.2" />

        {/* White Hair Curls */}
        <circle cx="24" cy="52" r="10" fill="#E2E8F0" stroke="#000" strokeWidth="3" />
        <circle cx="76" cy="52" r="10" fill="#E2E8F0" stroke="#000" strokeWidth="3" />

        {/* Face */}
        <circle cx="50" cy="52" r="34" fill="#FDE68A" stroke="#000" strokeWidth="4" />

        {/* Mortarboard Cap */}
        <polygon points="50,14 84,26 50,38 16,26" fill="#1E293B" stroke="#000" strokeWidth="3.5" />
        <rect x="36" y="27" width="28" height="9" rx="3" fill="#0F172A" stroke="#000" strokeWidth="2.5" />
        <circle cx="50" cy="26" r="3" fill="#FBBF24" />
        <path d="M 50 26 Q 74 30 78 42" fill="none" stroke="#FBBF24" strokeWidth="2" />

        {/* Large Round Professor Glasses */}
        <circle cx="37" cy="52" r="9" fill="#FFF" fillOpacity="0.8" stroke="#000" strokeWidth="3" />
        <circle cx="63" cy="52" r="9" fill="#FFF" fillOpacity="0.8" stroke="#000" strokeWidth="3" />
        <line x1="46" y1="52" x2="54" y2="52" stroke="#000" strokeWidth="3" />

        {/* Eyes Behind Glasses */}
        <circle cx="37" cy="52" r="3.5" fill="#000" />
        <circle cx="63" cy="52" r="3.5" fill="#000" />
        <circle cx="39" cy="50" r="1" fill="#FFF" />
        <circle cx="65" cy="50" r="1" fill="#FFF" />

        {/* Gray Mustache */}
        <path d="M 36 65 Q 50 63 64 65 Q 50 71 36 65 Z" fill="#CBD5E1" stroke="#000" strokeWidth="2.5" />

        {/* Bowtie */}
        <polygon points="42,80 58,80 50,85" fill="#38BDF8" stroke="#000" strokeWidth="2" />
        <polygon points="42,90 58,90 50,85" fill="#38BDF8" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="85" r="2.5" fill="#0284C7" />
      </svg>
    </motion.div>
  );
};

// --- VEE: The Curious Linear Algebra Student ---
export const VeeAvatar: React.FC<{
  mood?: 'curious' | 'shocked' | 'happy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'curious', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3.5, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [-3, 3, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Orange Glow */}
        <circle cx="50" cy="50" r="46" fill="#FB923C" fillOpacity="0.2" />

        {/* Orange Shirt Collar */}
        <path d="M 30 84 L 70 84 L 64 96 L 36 96 Z" fill="#FB923C" stroke="#000" strokeWidth="3" />

        {/* Head */}
        <circle cx="50" cy="50" r="32" fill="#FED7AA" stroke="#000" strokeWidth="4" />

        {/* Black Student Cap */}
        <polygon points="50,18 80,28 50,38 20,28" fill="#18181B" stroke="#000" strokeWidth="3.5" />
        <rect x="36" y="28" width="28" height="8" rx="2" fill="#09090B" stroke="#000" strokeWidth="2.5" />

        {/* Wide Expressive Comic Eyes */}
        <circle cx="38" cy="50" r="9" fill="#FFF" stroke="#000" strokeWidth="3" />
        <circle cx="62" cy="50" r="9" fill="#FFF" stroke="#000" strokeWidth="3" />
        <circle cx="38" cy="50" r="4" fill="#000" />
        <circle cx="62" cy="50" r="4" fill="#000" />
        <circle cx="40" cy="48" r="1.5" fill="#FFF" />
        <circle cx="64" cy="48" r="1.5" fill="#FFF" />

        {/* Curious 'O' Mouth */}
        <ellipse cx="50" cy="67" rx="4.5" ry="5.5" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
      </svg>
    </motion.div>
  );
};

// --- GAUSS-BOT: The Robot Pivot Eliminator ---
export const GaussBotAvatar: React.FC<{
  mood?: 'active' | 'beep' | 'laser';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'active', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.15, rotate: [0, -4, 4, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Cyan Aura */}
        <circle cx="50" cy="50" r="46" fill="#06B6D4" fillOpacity="0.2" />

        {/* Antenna with Glowing Red Bulb */}
        <line x1="50" y1="28" x2="50" y2="10" stroke="#000" strokeWidth="4" />
        <circle cx="50" cy="10" r="6" fill="#EF4444" stroke="#000" strokeWidth="2.5" />

        {/* Retro Square Robot Head */}
        <rect x="20" y="28" width="60" height="52" rx="10" fill="#94A3B8" stroke="#000" strokeWidth="4" />

        {/* Turquoise Eye Screens */}
        <rect x="30" y="38" width="16" height="16" rx="3" fill="#22D3EE" stroke="#000" strokeWidth="2.5" />
        <rect x="54" y="38" width="16" height="16" rx="3" fill="#22D3EE" stroke="#000" strokeWidth="2.5" />
        <rect x="34" y="42" width="8" height="8" rx="1" fill="#000" />
        <rect x="58" y="42" width="8" height="8" rx="1" fill="#000" />

        {/* Speaker Grille Mouth */}
        <rect x="36" y="60" width="28" height="8" rx="2" fill="#334155" stroke="#000" strokeWidth="2" />
        <line x1="42" y1="60" x2="42" y2="68" stroke="#000" strokeWidth="2" />
        <line x1="50" y1="60" x2="50" y2="68" stroke="#000" strokeWidth="2" />
        <line x1="58" y1="60" x2="58" y2="68" stroke="#000" strokeWidth="2" />

        {/* Status Indicator LED dots */}
        <circle cx="34" cy="74" r="2.5" fill="#FBBF24" stroke="#000" strokeWidth="1" />
        <circle cx="50" cy="74" r="2.5" fill="#10B981" stroke="#000" strokeWidth="1" />
        <circle cx="66" cy="74" r="2.5" fill="#EF4444" stroke="#000" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

// --- SID: The Determined 2nd Year Student ---
export const SidAvatar: React.FC<{
  mood?: 'curious' | 'shocked' | 'happy' | 'thinking' | 'surprised';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'curious', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [-2, 2, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Glow */}
        <circle cx="50" cy="50" r="46" fill="#F59E0B" fillOpacity="0.2" />

        {/* Shirt Collar (Red) */}
        <path d="M 28 85 L 72 85 L 66 98 L 34 98 Z" fill="#EF4444" stroke="#000" strokeWidth="3" />

        {/* Head */}
        <circle cx="50" cy="50" r="34" fill="#FDBA74" stroke="#000" strokeWidth="4" />

        {/* Hair - Dark brown bowl cut with comic bangs */}
        <path
          d="M 20 44 Q 50 16 80 44 Q 75 24 50 20 Q 25 24 20 44 Z"
          fill="#3E2723"
          stroke="#000"
          strokeWidth="3.5"
        />

        {/* Big Round Glasses Frames */}
        <circle cx="36" cy="52" r="13" fill="#FFF" fillOpacity="0.85" stroke="#000" strokeWidth="3.5" />
        <circle cx="64" cy="52" r="13" fill="#FFF" fillOpacity="0.85" stroke="#000" strokeWidth="3.5" />
        <line x1="49" y1="52" x2="51" y2="52" stroke="#000" strokeWidth="3.5" />

        {/* Pupils */}
        <circle cx="36" cy="52" r="5" fill="#000" />
        <circle cx="64" cy="52" r="5" fill="#000" />
        <circle cx="38" cy="50" r="1.8" fill="#FFF" />
        <circle cx="66" cy="50" r="1.8" fill="#FFF" />

        {/* Eyebrows */}
        <path d="M 26 36 Q 36 33 44 38" stroke="#3E2723" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 56 38 Q 64 33 74 36" stroke="#3E2723" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Mouth based on mood */}
        {mood === 'curious' && (
          <ellipse cx="50" cy="71" rx="4.5" ry="5.5" fill="#B91C1C" stroke="#000" strokeWidth="2.5" />
        )}
        {mood === 'shocked' && (
          <ellipse cx="50" cy="72" rx="7" ry="8" fill="#7F1D1D" stroke="#000" strokeWidth="3" />
        )}
        {mood === 'happy' && (
          <path d="M 38 68 Q 50 78 62 68" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        )}
        {mood === 'thinking' && (
          <line x1="42" y1="71" x2="58" y2="69" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        )}
      </svg>
    </motion.div>
  );
};

// --- PROFESSOR PY: The Wise Snake Guide ---
export const ProfPyAvatar: React.FC<{
  mood?: 'wise' | 'teaching' | 'happy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ mood = 'wise', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3.5, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: [-3, 3, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Emerald Aura Glow */}
        <circle cx="50" cy="50" r="46" fill="#10B981" fillOpacity="0.2" />

        {/* Coiled Snake Body Tail */}
        <path
          d="M 50 82 Q 78 86 68 96 Q 50 98 32 94 Q 24 88 40 82"
          fill="#10B981"
          stroke="#000"
          strokeWidth="3.5"
        />

        {/* Snake Neck & Head */}
        <path
          d="M 38 82 Q 35 60 42 45 Q 50 32 62 38 Q 72 44 65 65 Q 60 78 50 82"
          fill="#34D399"
          stroke="#000"
          strokeWidth="4"
        />

        {/* Black Academic Graduation Cap (Mortarboard) */}
        <polygon points="52,14 80,24 52,34 24,24" fill="#0F172A" stroke="#000" strokeWidth="3.5" />
        <rect x="42" y="24" width="20" height="7" rx="1.5" fill="#020617" stroke="#000" strokeWidth="2" />
        {/* Golden Tassel */}
        <line x1="52" y1="24" x2="68" y2="30" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="68" cy="30" r="2" fill="#F59E0B" />

        {/* Big Round Academic Glasses */}
        <circle cx="44" cy="46" r="9" fill="#FFF" fillOpacity="0.9" stroke="#000" strokeWidth="3" />
        <circle cx="62" cy="48" r="9" fill="#FFF" fillOpacity="0.9" stroke="#000" strokeWidth="3" />
        <line x1="53" y1="47" x2="55" y2="47" stroke="#000" strokeWidth="3" />

        {/* Pupils */}
        <circle cx="44" cy="46" r="3.5" fill="#000" />
        <circle cx="62" cy="48" r="3.5" fill="#000" />
        <circle cx="45.5" cy="45" r="1.2" fill="#FFF" />
        <circle cx="63.5" cy="47" r="1.2" fill="#FFF" />

        {/* Cute Snake Smile with Red Forked Tongue */}
        <path d="M 46 58 Q 54 64 60 58" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M 53 61 L 53 68 L 50 72 M 53 68 L 56 72" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
};

export const ProfessorPyAvatar = ProfPyAvatar;

// --- BUGGY: The Myth Monster ---
export const BuggyAvatar: React.FC<{
  mood?: 'sneaky' | 'grumpy' | 'defeated' | 'angry' | 'mischievous';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isHit?: boolean;
}> = ({ mood = 'sneaky', size = 'md', className = '', isHit = false }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <motion.div
      className={`relative inline-block select-none ${sizeMap[size]} ${className}`}
      animate={{ y: [0, -3, 0], rotate: [0, -2, 2, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.15, rotate: [-4, 4, 0] }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Red Glow */}
        <circle cx="50" cy="50" r="46" fill="#EF4444" fillOpacity="0.2" />

        {/* 6 Little Bug Legs */}
        <path d="M 24 45 Q 12 40 10 50" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 22 55 Q 10 55 8 64" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 26 65 Q 14 70 12 78" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 76 45 Q 88 40 90 50" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 78 55 Q 90 55 92 64" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 74 65 Q 86 70 88 78" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Antennae */}
        <path d="M 42 30 Q 34 16 30 18" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="29" cy="18" r="3.5" fill="#000" />
        <path d="M 58 30 Q 66 16 70 18" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="71" cy="18" r="3.5" fill="#000" />

        {/* Round Red Bug Body */}
        <circle cx="50" cy="54" r="28" fill="#EF4444" stroke="#000" strokeWidth="4" />

        {/* Spots */}
        <circle cx="34" cy="44" r="3.5" fill="#991B1B" />
        <circle cx="66" cy="44" r="3.5" fill="#991B1B" />
        <circle cx="50" cy="72" r="4" fill="#991B1B" />

        {/* Big Expressive Comic Eyes */}
        <circle cx="40" cy="50" r="7.5" fill="#FFF" stroke="#000" strokeWidth="2.5" />
        <circle cx="60" cy="50" r="7.5" fill="#FFF" stroke="#000" strokeWidth="2.5" />
        <circle cx="41" cy="50" r="3.5" fill="#000" />
        <circle cx="59" cy="50" r="3.5" fill="#000" />
        <circle cx="42" cy="48" r="1.2" fill="#FFF" />
        <circle cx="60" cy="48" r="1.2" fill="#FFF" />

        {/* Grumpy Zigzag Mouth */}
        <path d="M 40 64 L 45 61 L 50 64 L 55 61 L 60 64" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// --- Comic Speech Bubble ---
export const ComicBubble: React.FC<{
  speaker: 'byte' | 'professor' | 'bugsy' | 'tuple' | 'sam' | 'nully' | 'pri' | 'nova' | 'bug' | 'pivot' | 'vee' | 'gaussbot' | 'sid' | 'profpy' | 'prof_py' | 'buggy';
  text: string;
  subtext?: string;
  className?: string;
}> = ({ speaker, text, subtext, className = '' }) => {
  const normSpeaker = (speaker === 'prof_py' ? 'profpy' : speaker) as 'byte' | 'professor' | 'bugsy' | 'tuple' | 'sam' | 'nully' | 'pri' | 'nova' | 'bug' | 'pivot' | 'vee' | 'gaussbot' | 'sid' | 'profpy' | 'buggy';
  const speakerConfig = {
    sid: {
      name: 'SID (THE LEARNER)',
      nameColor: 'text-[#F59E0B]',
      borderColor: 'border-[#F59E0B]',
      bgColor: 'bg-[#261706]',
      avatar: <SidAvatar size="sm" mood="curious" />,
    },
    profpy: {
      name: 'PROFESSOR PY',
      nameColor: 'text-[#10B981]',
      borderColor: 'border-[#10B981]',
      bgColor: 'bg-[#062618]',
      avatar: <ProfPyAvatar size="sm" mood="wise" />,
    },
    buggy: {
      name: 'BUGGY (THE MYTH MONSTER)',
      nameColor: 'text-[#EF4444]',
      borderColor: 'border-[#EF4444]',
      bgColor: 'bg-[#2b0c10]',
      avatar: <BuggyAvatar size="sm" mood="sneaky" />,
    },
    byte: {
      name: 'BYTE',
      nameColor: 'text-[#38B6FF]',
      borderColor: 'border-[#38B6FF]',
      bgColor: 'bg-[#0f1d2e]',
      avatar: <ByteAvatar size="sm" mood="happy" />,
    },
    professor: {
      name: 'PROFESSOR',
      nameColor: 'text-[#FFDE59]',
      borderColor: 'border-[#FFDE59]',
      bgColor: 'bg-[#211d10]',
      avatar: <ProfessorAvatar size="sm" mood="wise" />,
    },
    bugsy: {
      name: 'BUGSY',
      nameColor: 'text-[#7ED957]',
      borderColor: 'border-[#7ED957]',
      bgColor: 'bg-[#122312]',
      avatar: <BugsyAvatar size="sm" mood="sneaky" />,
    },
    tuple: {
      name: 'PROF. TUPLE',
      nameColor: 'text-[#FFB703]',
      borderColor: 'border-[#FFB703]',
      bgColor: 'bg-[#241906]',
      avatar: <ProfTupleAvatar size="sm" mood="wise" />,
    },
    sam: {
      name: 'SAM',
      nameColor: 'text-[#FF5757]',
      borderColor: 'border-[#FF5757]',
      bgColor: 'bg-[#291215]',
      avatar: <SamAvatar size="sm" mood="curious" />,
    },
    nully: {
      name: 'NULLY (THE GHOST)',
      nameColor: 'text-[#C77DFF]',
      borderColor: 'border-[#C77DFF]',
      bgColor: 'bg-[#1e152e]',
      avatar: <NullyAvatar size="sm" mood="floating" />,
    },
    pri: {
      name: 'PRI (THE PRISM-BOT)',
      nameColor: 'text-[#06B6D4]',
      borderColor: 'border-[#06B6D4]',
      bgColor: 'bg-[#08222b]',
      avatar: <PriAvatar size="sm" mood="teaching" />,
    },
    nova: {
      name: 'NOVA (BUDDY)',
      nameColor: 'text-[#FB923C]',
      borderColor: 'border-[#FB923C]',
      bgColor: 'bg-[#261609]',
      avatar: <NovaAvatar size="sm" mood="curious" />,
    },
    bug: {
      name: 'BUG (TRAP SETTER)',
      nameColor: 'text-[#EF4444]',
      borderColor: 'border-[#EF4444]',
      bgColor: 'bg-[#2b0e11]',
      avatar: <BugAvatar size="sm" mood="sneaky" />,
    },
    pivot: {
      name: 'PROF. PIVOT',
      nameColor: 'text-[#FBBF24]',
      borderColor: 'border-[#FBBF24]',
      bgColor: 'bg-[#261f0a]',
      avatar: <ProfPivotAvatar size="sm" mood="wise" />,
    },
    vee: {
      name: 'VEE',
      nameColor: 'text-[#FB923C]',
      borderColor: 'border-[#FB923C]',
      bgColor: 'bg-[#2b1708]',
      avatar: <VeeAvatar size="sm" mood="curious" />,
    },
    gaussbot: {
      name: 'GAUSS-BOT',
      nameColor: 'text-[#06B6D4]',
      borderColor: 'border-[#06B6D4]',
      bgColor: 'bg-[#081e28]',
      avatar: <GaussBotAvatar size="sm" mood="active" />,
    },
  };

  const cfg = speakerConfig[normSpeaker];
  const [speaking, setSpeaking] = useState<boolean>(false);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);

    // Character voice personalization
    if (speaker === 'sid') {
      u.pitch = 1.35;
      u.rate = 1.05;
    } else if (speaker === 'profpy' || (speaker as string) === 'prof_py' || speaker === 'professor' || speaker === 'tuple') {
      u.pitch = 0.82;
      u.rate = 0.95;
    } else if (speaker === 'buggy' || speaker === 'bug' || speaker === 'bugsy') {
      u.pitch = 1.6;
      u.rate = 1.2;
    } else {
      u.pitch = 1.1;
      u.rate = 1.0;
    }

    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(u);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      whileHover={{ y: -2 }}
      className={`relative p-3.5 rounded-xl border-2 ${cfg.borderColor} ${cfg.bgColor} shadow-comic-sm hover-comic-lift ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">{cfg.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bangers uppercase tracking-wider font-bold ${cfg.nameColor}`}>
                {cfg.name}
              </span>
              {subtext && <span className="text-[10px] text-gray-400">({subtext})</span>}
            </div>

            {/* Voiceover Speech Button */}
            <button
              onClick={speak}
              title={speaking ? 'Stop speech' : 'Play character voiceover'}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 cursor-pointer transition ${
                speaking
                  ? 'bg-[#FBBF24] text-black font-bold animate-pulse'
                  : 'text-slate-400 hover:text-white bg-black/40 hover:bg-black/70'
              }`}
            >
              <span>{speaking ? '🔊 Speaking...' : '🔈 Voice'}</span>
            </button>
          </div>
          <p className="text-sm font-medium text-gray-200 leading-snug">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};
