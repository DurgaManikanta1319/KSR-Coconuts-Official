'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Palmtree, Bell, Truck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ isOpen, onClose }) => {
  const { t } = useApp();

  const handleExplore = () => {
    onClose();
    // Smoothly scroll to the delivery section
    const deliverySection = document.getElementById('delivery');
    if (deliverySection) {
      setTimeout(() => {
        deliverySection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      {/* Background Overlay Click to Close */}
      <motion.div
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Dialog Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-[500px] bg-gradient-to-b from-[#0e2216] to-[#08130c] border border-[#1b3f27] rounded-[32px] p-8 sm:p-10 flex flex-col items-center shadow-2xl z-10 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1b3424]/80 text-[#8aa091] hover:text-white transition-colors border border-white/5 cursor-pointer"
          aria-label="Close Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Palm Tree Icon */}
        <div className="bg-[#13301e] border border-[#214f33] rounded-2xl p-4 text-[#81c784] mb-6 flex items-center justify-center shadow-inner">
          <Palmtree className="w-8 h-8" />
        </div>

        {/* Local Announcement Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#143320] border border-[#205133] text-[10px] font-bold text-[#4caf50] uppercase tracking-widest mb-5">
          <Bell className="w-3.5 h-3.5 fill-[#4caf50]" />
          <span>{t.announcement.badge}</span>
        </div>

        {/* Modal Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-poppins text-center mb-5">
          {t.announcement.title}
        </h2>

        {/* Descriptions */}
        <p className="text-sm sm:text-base font-semibold text-neutral-200 leading-relaxed font-inter text-center mb-3">
          {t.announcement.desc1}
        </p>
        
        <p className="text-xs text-[#8aa091] leading-relaxed font-inter text-center mb-8 max-w-[90%]">
          {t.announcement.desc2}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleExplore}
          className="w-full py-4 bg-[#2e7d32] hover:bg-[#388e3c] text-white font-bold font-poppins rounded-full flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg border border-white/10 shadow-[#2e7d32]/25 cursor-pointer"
        >
          <Truck className="w-5 h-5" />
          <span>{t.announcement.button}</span>
        </button>
      </motion.div>
    </div>
  );
};
