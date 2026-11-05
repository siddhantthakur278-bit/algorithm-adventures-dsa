import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourse } from '../../context/CourseContext';

export const ActionBurst: React.FC = () => {
  const { actionBurst } = useCourse();

  if (!actionBurst) return null;

  const typeStyles = {
    pow: {
      starFill: '#F43F5E',
      starStroke: '#000000',
      textColor: 'text-[#FBBF24]',
      glowColor: 'rgba(244, 63, 94, 0.75)',
    },
    zap: {
      starFill: '#06B6D4',
      starStroke: '#000000',
      textColor: 'text-white',
      glowColor: 'rgba(6, 182, 212, 0.75)',
    },
    boom: {
      starFill: '#FB923C',
      starStroke: '#000000',
      textColor: 'text-[#FBBF24]',
      glowColor: 'rgba(251, 146, 60, 0.75)',
    },
    star: {
      starFill: '#FBBF24',
      starStroke: '#000000',
      textColor: 'text-black font-extrabold',
      glowColor: 'rgba(251, 191, 36, 0.85)',
    },
  };

  const style = typeStyles[actionBurst.type || 'pow'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
          animate={{
            scale: [0.2, 1.25, 1],
            rotate: [-15, 6, -2],
            opacity: 1,
            y: [30, -10, 0],
          }}
          exit={{ scale: 0.6, opacity: 0, y: -40, rotate: 10 }}
          transition={{
            duration: 0.45,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Comic Starburst SVG Background */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
            style={{ filter: `drop-shadow(0 0 24px ${style.glowColor})` }}
          >
            <svg viewBox="0 0 220 220" className="w-56 h-56 sm:w-72 sm:h-72">
              <polygon
                points="110,5 128,55 178,25 160,78 215,75 178,115 218,145 165,160 180,212 130,185 110,215 90,185 40,212 55,160 2,145 42,115 5,75 60,78 42,25 92,55"
                fill={style.starFill}
                stroke={style.starStroke}
                strokeWidth="6"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Action Word */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <span
              className={`font-bangers text-4xl sm:text-6xl tracking-widest ${style.textColor} drop-shadow-[4px_4px_0px_#000000]`}
              style={{
                textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 5px 5px 0 #000',
              }}
            >
              {actionBurst.text}
            </span>

            {actionBurst.subtext && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-1 px-3 py-1 bg-black/90 text-white font-bangers text-sm sm:text-base rounded-full border-2 border-white shadow-comic-sm tracking-wide"
              >
                {actionBurst.subtext}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};