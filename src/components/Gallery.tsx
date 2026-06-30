'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ZoomIn, Eye } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'harvesting' | 'packing' | 'loading' | 'events';
  src: string;
  description: string;
  aspect: string;
  style?: string; // CSS style overrides (filters for variety)
}

export const Gallery: React.FC = () => {
  const { t } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Climbing Orchard Palms",
      category: "harvesting",
      src: "/gallery/gallery1.jpg",
      description: "Skilled climbers harvesting fresh coconuts at 60ft height in Ethakota.",
      aspect: "aspect-[2/3]"
    },
    {
      id: 2,
      title: "Water Sorting & Quality Check",
      category: "packing",
      src: "/gallery/gallery2.png",
      description: "Coconuts sorted by water weight and size to ensure optimal fluid levels.",
      aspect: "aspect-[3/4]"
    },
    {
      id: 3,
      title: "Truck Dispatches",
      category: "loading",
      src: "/gallery/gallery3.png",
      description: "Loading fresh dispatches bound for local Godavari distribution centers.",
      aspect: "aspect-[5/4]"
    },
    {
      id: 4,
      title: "Grand Wedding Display",
      category: "events",
      src: "/gallery/gallery4.png",
      description: "Premium uniform size coconuts stacked beautifully for traditional ceremony.",
      aspect: "aspect-[3/2]"
    },
    {
      id: 5,
      title: "De-husking Raw Yield",
      category: "harvesting",
      src: "/gallery/gallery5.png",
      description: "Traditional manual de-husking by local experts to extract premium nuts.",
      aspect: "aspect-[3/2]"
    },
    {
      id: 6,
      title: "Cold Press Extraction",
      category: "packing",
      src: "/gallery/gallery6.png",
      description: "Fresh mature copra processed hygienically for 100% pure oil bottling.",
      aspect: "aspect-[16/9]"
    },
    
  ];

  const categories = [
    { key: 'all', name: t.gallery.categories.all },
    { key: 'harvesting', name: t.gallery.categories.harvesting },
    { key: 'packing', name: t.gallery.categories.packing },
    { key: 'loading', name: t.gallery.categories.loading },
    { key: 'events', name: t.gallery.categories.events },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const getBadgeStyles = (category: string) => {
    switch (category) {
      case 'harvesting':
        return 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30';
      case 'packing':
        return 'bg-green-950/60 text-green-400 border border-green-500/30';
      case 'loading':
        return 'bg-sky-950/60 text-sky-400 border border-sky-500/30';
      case 'events':
        return 'bg-amber-950/60 text-amber-400 border border-amber-500/30';
      default:
        return 'bg-neutral-950/60 text-neutral-400 border border-neutral-500/30';
    }
  };

  const getBadgeText = (category: string) => {
    switch (category) {
      case 'harvesting':
        return 'HARVEST';
      case 'packing':
        return 'PACKING';
      case 'loading':
        return 'LOADING';
      case 'events':
        return 'EVENTS';
      default:
        return category.toUpperCase();
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Visual Journey
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-poppins text-text-base mt-4 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.gallery.title}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 font-inter font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.gallery.subtitle}
          </motion.p>
        </div>

        {/* Categories Navigation Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-text-base'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid layout with perfect fit and animations */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-primary-light/5 bg-neutral-100 dark:bg-neutral-900 aspect-[4/5]"
                onClick={() => setSelectedImage(item)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Category Badge - permanently visible */}
                <div className={`absolute top-4 left-4 z-20 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm ${getBadgeStyles(item.category)}`}>
                  {getBadgeText(item.category)}
                </div>

                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Permanent Details overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-6 text-white z-10">
                  <h4 className="text-lg font-bold font-poppins text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-inter mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightroom Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />

            {/* Lightbox content */}
            <motion.div
              className="relative max-w-4xl w-full bg-neutral-950/80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 flex flex-col"
              layoutId={`gallery-item-${selectedImage.id}`}
              transition={{ duration: 0.35 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row items-stretch">
                {/* Image panel */}
                <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[480px]">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className={`max-h-[80vh] w-full object-contain ${selectedImage.style || ''}`}
                  />
                </div>

                {/* Metadata Details panel */}
                <div className="w-full md:w-80 p-6 sm:p-8 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-neutral-900/60 backdrop-blur-md">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-light font-mono">
                      {t.gallery.categories[selectedImage.category as keyof typeof t.gallery.categories]}
                    </span>
                    <h3 className="text-2xl font-bold font-poppins mt-2 mb-4">
                      {selectedImage.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-inter leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center space-x-1.5">
                      <Image className="w-3.5 h-3.5" />
                      <span>Resolution: 8K UHD</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Organic Grade A</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
