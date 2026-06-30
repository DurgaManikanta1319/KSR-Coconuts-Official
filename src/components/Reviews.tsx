'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { t } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || clientWidth;
      const scrollAmount = direction === 'left' ? -cardWidth - 24 : cardWidth + 24;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-bg-base/30">
      {/* Decorative grids */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-text-base mt-4 mb-1">
            {t.reviews.title}
          </h2>
          {/* Green underline divider */}
          <div className="w-12 h-1 bg-primary rounded mt-4 mb-6" />
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-inter font-light">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Google Rating Card */}
        <div className="max-w-2xl mx-auto mb-16 glass-panel p-6 sm:p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-black/5 dark:divide-white/10">
            {/* Left Column: Rating Score */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start pb-6 md:pb-0">
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-mono mb-2">
                {t.reviews.googleRatingCard.title}
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold font-poppins text-text-base">4.9</span>
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">/ 5.0</span>
              </div>
              <div className="flex text-amber-500 mt-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 stroke-none" />
                ))}
              </div>
            </div>

            {/* Right Column: Key Features */}
            <div className="md:col-span-7 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center space-x-3 text-text-base">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="text-sm font-semibold font-inter text-text-base">{t.reviews.googleRatingCard.feature1}</span>
              </div>
              <div className="flex items-center space-x-3 text-text-base">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="text-sm font-semibold font-inter text-text-base">{t.reviews.googleRatingCard.feature2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel/Grid */}
        <div className="relative px-4 sm:px-8">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-black/5 dark:border-white/5 glass-panel bg-white/70 dark:bg-black/40 text-emerald-600 dark:text-emerald-400 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg -translate-x-1/2"
            title="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Snap Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-none pb-4 w-full"
          >
            {t.reviews.items.map((item, idx) => (
              <motion.div
                key={idx}
                className="snap-center flex-shrink-0 w-full sm:w-[350px] lg:w-[calc(33.33%-1rem)] glass-panel p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Quote icon watermarked in top-right */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-500/10 rotate-180" />

                <div>
                  {/* Star Rating */}
                  <div className="flex text-amber-500 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 stroke-none" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-text-base font-inter italic font-light leading-relaxed mb-8">
                    "{item.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3.5 border-t border-black/5 dark:border-white/10 pt-5 mt-auto">
                  {/* Initial circle avatar */}
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold font-poppins flex items-center justify-center text-sm shadow-inner uppercase">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-poppins text-text-base flex items-center space-x-1">
                      <span>{item.name}</span>
                      <span title="Verified Customer"><ShieldCheck className="w-4 h-4 text-emerald-500" /></span>
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono block mt-0.5">
                      {item.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-black/5 dark:border-white/5 glass-panel bg-white/70 dark:bg-black/40 text-emerald-600 dark:text-emerald-400 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg translate-x-1/2"
            title="Next Reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
