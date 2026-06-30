'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp, MapPin } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { generateWhatsAppMessage } = require('@/utils/whatsapp');
  const whatsappUrl = generateWhatsAppMessage('hero', 'Order Now');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="p-3.5 rounded-full bg-white dark:bg-neutral-900 border border-primary-light/20 text-primary hover:text-white hover:bg-primary shadow-xl cursor-pointer transition-all duration-300"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Direct Call Button */}
      <motion.a
        href="tel:9989152333"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-3.5 rounded-full bg-primary-light text-neutral-900 hover:bg-primary hover:text-white shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300"
        title="Call KSR Coconuts"
      >
        <Phone className="w-5 h-5" />
      </motion.a>

      {/* Floating Location Pin */}
      <motion.a
        href="https://maps.app.goo.gl/kFFCFVPATfhbxrt36"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300"
        title="View Farm on Google Maps"
      >
        <MapPin className="w-5 h-5" />
      </motion.a>

      {/* Floating WhatsApp with pulsing dot */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center relative cursor-pointer transition-all duration-300"
        title="Order via WhatsApp"
      >
        {/* Pulsing indicator */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        <MessageCircle className="w-5 h-5" />
      </motion.a>
    </div>
  );
};
