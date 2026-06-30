'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Compass, Leaf, Heart, Award, MapPin, Eye, Activity } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'story' | 'values'>('story');
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const hotspots = [
    { id: 'north', top: '25%', left: '45%', title: 'North Orchard', trees: '1,800 Trees', soil: 'Alluvial (pH 6.5)' },
    { id: 'river', top: '55%', left: '70%', title: 'Godavari Basin Zone', trees: '1,500 Trees', soil: 'Rich River Clay' },
    { id: 'nursery', top: '70%', left: '30%', title: 'Organic Sapling Nursery', trees: '1,200 Saplings', soil: 'Coco-Peat & Compost' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Roots
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-poppins text-text-base mt-4 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.about.title}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 font-inter font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Columns - Interactive Tabs Content */}
          <div className="flex-1 w-full">
            {/* Tabs Buttons */}
            <div className="flex space-x-4 mb-8 border-b border-primary-light/10 pb-4">
              <button
                onClick={() => setActiveTab('story')}
                className={`text-lg font-bold font-poppins pb-2 transition-all relative ${
                  activeTab === 'story'
                    ? 'text-primary'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                }`}
              >
                Our Legacy & History
                {activeTab === 'story' && (
                  <motion.div
                    className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTabLine"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`text-lg font-bold font-poppins pb-2 transition-all relative ${
                  activeTab === 'values'
                    ? 'text-primary'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                }`}
              >
                Our Values & farmers
                {activeTab === 'values' && (
                  <motion.div
                    className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTabLine"
                  />
                )}
              </button>
            </div>

            {/* Tab Panels */}
            <AnimatePresence mode="wait">
              {activeTab === 'story' ? (
                <motion.div
                  key="story-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold font-poppins text-text-base mb-3">The Farm Story</h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-inter font-light leading-relaxed">
                      Founded by the KSR family, our orchards are located in the heart of Ethakota, surrounded by the mineral-rich waters of the Godavari River. The local soil yields coconuts that are exceptionally sweet, heavy with pure water, and rich in natural nutrients. Over the past 25 years, we have grown from a small family grove to a regional wholesale powerhouse.
                    </p>
                  </div>

                  {/* Owner timeline */}
                  <div className="border-l-2 border-primary/20 pl-6 space-y-8 relative">
                    {t.about.timeline.map((item, index) => (
                      <div key={index} className="relative">
                        {/* Bullet Circle */}
                        <div className="absolute left-[-31px] top-1.5 w-4.5 h-4.5 rounded-full bg-primary border-4 border-bg-base" />
                        
                        <div className="text-xs font-bold text-primary font-poppins">{item.year}</div>
                        <h4 className="text-base font-bold text-text-base font-poppins mt-0.5">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-inter font-light mt-1.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="values-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Mission / Vision Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-3xl">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Compass className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold font-poppins text-text-base mb-2">{t.about.mission}</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-inter font-light leading-relaxed">
                        {t.about.missionText}
                      </p>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Eye className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold font-poppins text-text-base mb-2">{t.about.vision}</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-inter font-light leading-relaxed">
                        {t.about.visionText}
                      </p>
                    </div>
                  </div>

                  {/* Organic & Farmer Support */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold font-poppins text-text-base mb-1">{t.about.farmersSupport}</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-inter font-light leading-relaxed">
                          {t.about.farmersSupportText}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold font-poppins text-text-base mb-1">100% Organic Quality Assurance</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-inter font-light leading-relaxed">
                          We implement zero-chemical growth cycles. Our compost consists entirely of natural leaf matter, coconut husks, and organic dairy manure, yielding mineral-dense coconuts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold font-poppins text-text-base mb-1">Agricultural Certifications</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-inter font-light leading-relaxed">
                          Our sorting stations and storage warehouses are certified for quality, packing speed, and hygiene standards, making us a top exporter in Andhra Pradesh.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Columns - Interactive Farm Map & Coordinates */}
          <div className="flex-1 w-full lg:max-w-md xl:max-w-lg">
            <h3 className="text-lg font-bold font-poppins text-text-base mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Interactive Farm Map (Ethakota)</span>
            </h3>
            
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-primary-light/10 group aspect-video sm:aspect-square">
              {/* Drone Photo */}
              <img
                src="/farm_orchard.png"
                alt="KSR Coconuts Farm Plantation Drone Map"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Map Coordinates overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[10px] font-mono text-white flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>16.8122° N, 81.8906° E</span>
              </div>

              {/* Hotspot pins */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="absolute cursor-help"
                  style={{ top: spot.top, left: spot.left }}
                  onMouseEnter={() => setHoveredHotspot(spot.id)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  {/* Pulse Dot */}
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border border-white" />
                  </div>

                  {/* Hotspot details card */}
                  <AnimatePresence>
                    {hoveredHotspot === spot.id && (
                      <motion.div
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-48 bg-neutral-950/95 text-white p-3.5 rounded-xl shadow-2xl z-30 border border-white/10 text-xs flex flex-col gap-1 backdrop-blur-md"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-bold font-poppins text-primary-light text-left">{spot.title}</div>
                        <div className="text-[10px] text-neutral-300 font-inter text-left">Capacity: {spot.trees}</div>
                        <div className="text-[10px] text-neutral-400 font-inter text-left">Soil: {spot.soil}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Farm parameters status bar */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="glass-panel p-3.5 rounded-2xl text-center">
                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-inter uppercase">Drip Irrigation</div>
                <div className="text-sm font-bold text-primary font-poppins mt-0.5 flex items-center justify-center space-x-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>100% Active</span>
                </div>
              </div>
              <div className="glass-panel p-3.5 rounded-2xl text-center">
                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-inter uppercase">Avg Tree Age</div>
                <div className="text-sm font-bold text-primary font-poppins mt-0.5">14 Years</div>
              </div>
              <div className="glass-panel p-3.5 rounded-2xl text-center">
                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-inter uppercase">Fertilizer</div>
                <div className="text-sm font-bold text-primary font-poppins mt-0.5">100% Organic</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

