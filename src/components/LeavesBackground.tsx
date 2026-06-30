'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Leaf {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotateStart: number;
}

export const LeavesBackground: React.FC = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Generate leaves only on client side to prevent server-client mismatches
    const generatedLeaves = Array.from({ length: 15 }).map((_, index) => ({
      id: index,
      x: Math.random() * 100, // percentage from left
      size: Math.random() * 25 + 15, // size in px
      delay: Math.random() * 8, // seconds delay
      duration: Math.random() * 15 + 12, // seconds duration
      rotateStart: Math.random() * 360,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          className="absolute text-primary-light/15 dark:text-primary/10 fill-current"
          style={{
            left: `${leaf.x}%`,
            width: leaf.size,
            height: leaf.size,
            top: '-50px',
          }}
          viewBox="0 0 24 24"
          initial={{ y: -50, x: 0, rotate: leaf.rotateStart, opacity: 0 }}
          animate={{
            y: '105vh',
            x: [0, 50, -50, 0], // sway path
            rotate: leaf.rotateStart + 360,
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Detailed leaf path */}
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C8.14,18.87 9.62,18.07 11.08,17.24L12.33,18L13.71,17.2C15.5,15.3 17.5,13.06 18.7,10.29C19.12,9.3 19.5,8.19 20,7C20,7 21,3 22,2C21,3 17,4 17,4C15.81,4.5 14.7,4.88 13.71,5.3C10.94,6.5 8.7,8.5 6.8,10.29L6,11.67L6.76,12.92C5.93,14.38 5.13,15.86 4.3,17.34L2,18.29L2.66,20.18C7.83,18.1 14,16 16,7L17,8Z" />
        </motion.svg>
      ))}
    </div>
  );
};
