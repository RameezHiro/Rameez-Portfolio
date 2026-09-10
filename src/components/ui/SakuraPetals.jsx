import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const SakuraPetals = ({ count = 10, className }) => {
  const petals = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const rotation = Math.random() * 360;

    return (
      <motion.div
        key={i}
        className="absolute w-4 h-4 bg-sakura rounded-full opacity-70"
        style={{ left: `${left}%`, width: `${size}px`, height: `${size}px` }}
        initial={{ y: -50, rotate: rotation }}
        animate={{ y: '100vh', rotate: rotation + 360 }}
        transition={{
          delay,
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 0,
        }}
      />
    );
  });

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none overflow-hidden z-50',
        className
      )}
      aria-hidden="true"
    >
      {petals}
    </div>
  );
};

export default SakuraPetals;