'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, useInView } from 'framer-motion';

const StatCounter: React.FC<{ end: number; suffix?: string; label: string }> = ({
  end,
  suffix = '',
  label,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2.5; // seconds
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, isInView]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-poppins text-primary dark:text-primary-light"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {count.toLocaleString()}
        {suffix}
      </motion.div>
      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-2 font-inter">
        {label}
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const { t } = useApp();

  return (
    <section className="py-20 relative overflow-hidden bg-bg-base/30 border-y border-primary-light/10">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary-dark/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter end={25} suffix="+" label={t.statsBanner.exp} />
          <StatCounter end={10000} suffix="+" label={t.statsBanner.happy} />
          <StatCounter end={500000} suffix="+" label={t.statsBanner.delivered} />
          <StatCounter end={100} suffix="%" label={t.statsBanner.quality} />
        </div>
      </div>
    </section>
  );
};
