'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';

export const FounderJourney: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="founder-journey" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFCF8] dark:bg-[#07130A] transition-colors duration-400 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-emerald-900/5 dark:bg-emerald-950/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-emerald-900/5 dark:bg-emerald-950/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column - Founder Image with badge */}
          <motion.div
            className="w-full lg:w-5/12 flex justify-center lg:justify-start px-4 md:px-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-[340px]">
              {/* Premium Ambient Backlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-emerald-600/30 rounded-[2.5rem] blur-2xl opacity-60 dark:opacity-80 pointer-events-none -z-1" />
              
              {/* Main Image Frame with Gold-Emerald double border reflection */}
              <div className="rounded-[2.5rem] overflow-hidden aspect-[3/4] border-2 border-transparent bg-gradient-to-tr from-amber-500/30 via-emerald-500/20 to-emerald-500/40 p-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(4,14,7,0.6)] relative group">
                <div className="w-full h-full rounded-[2.4rem] overflow-hidden relative">
                  <img
                    src="/ksr_founder.png"
                    alt="KSR Coconuts Founder"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  
                  {/* Subtle Inner Spotlight / Warm Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/[0.06] via-transparent to-emerald-500/[0.08] mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text feedback details */}
          <motion.div
            className="w-full lg:w-7/12 text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Subtitle */}
            <span className="text-[#fab818] dark:text-[#fab818] text-xs font-bold tracking-[0.25em] uppercase font-poppins mb-3.5 block">
              {t.founderJourney.subtitle}
            </span>
            
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white font-poppins leading-tight tracking-tight mb-6">
              {t.founderJourney.title}
            </h2>

            {/* Description Text */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-emerald-100/80 font-inter font-light mb-6 leading-relaxed max-w-2xl">
              {t.founderJourney.text}
            </p>

            {/* Divider Highlight Line */}
            <span className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-poppins font-semibold tracking-wide mb-8 block">
              {t.founderJourney.highlight}
            </span>

            {/* Tags section matching screenshot styles */}
            <div className="flex flex-wrap gap-3">
              {t.founderJourney.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4.5 py-2.5 rounded-full border border-black/5 dark:border-emerald-900/40 bg-white dark:bg-[#102316]/20 text-neutral-800 dark:text-white text-xs sm:text-sm font-medium hover:bg-neutral-50 dark:hover:bg-[#102316]/50 transition-all duration-300 shadow-sm cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
