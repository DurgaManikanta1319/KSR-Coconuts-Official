'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Phone, MessageCircle, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll navbar state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.products, href: '#products' },
    { name: t.nav.wholesale, href: '#wholesale' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  const { generateWhatsAppMessage } = require('@/utils/whatsapp');
  const whatsappUrl = generateWhatsAppMessage('hero', 'Order Now');

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#00C853] via-[#4ADE80] to-[#A7F45D] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Live Coconut Price Ticker Bar */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-[#07130A] text-[#4ADE80] text-[9px] uppercase tracking-widest font-black flex items-center border-b border-emerald-950/20 overflow-hidden z-45">
        <div className="animate-marquee">
         <span className="mx-4">🥥 FARM FRESH COCONUTS • DIRECT FROM ETHAKOTA FARMS</span>
<span className="mx-4">🌴 WHOLESALE & BULK ORDERS AVAILABLE ACROSS INDIA</span>
<span className="mx-4">🚚 FAST DELIVERY • PREMIUM QUALITY • BEST MARKET RATES</span>
<span className="mx-4">💧 100% NATURAL COCONUT WATER • FRESH DAILY HARVEST</span>
<span className="mx-4">📦 BULK SUPPLY FOR RETAILERS • EXPORTERS • DISTRIBUTORS</span>
          {/* Loop duplicates */}
         <span className="mx-4">🥥 FARM FRESH COCONUTS • DIRECT FROM ETHAKOTA FARMS</span>
<span className="mx-4">🌴 WHOLESALE & BULK ORDERS AVAILABLE ACROSS INDIA</span>
<span className="mx-4">🚚 FAST DELIVERY • PREMIUM QUALITY • BEST MARKET RATES</span>
<span className="mx-4">💧 100% NATURAL COCONUT WATER • FRESH DAILY HARVEST</span>
<span className="mx-4">📦 BULK SUPPLY FOR RETAILERS • EXPORTERS • DISTRIBUTORS</span>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-350 ${
          isScrolled
            ? 'glass-nav py-3 shadow-lg top-0'
            : 'bg-transparent py-5 border-b border-transparent top-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center bg-white rounded-full p-0.5 shadow-md border border-primary/20 transition-transform duration-300 animate-leaf-wiggle group-hover:scale-[1.03]">
              <img
                src="/logo.jpg"
                alt="KSR Coconuts Logo"
                className="w-full h-full object-contain rounded-full select-none"
                draggable={false}
              />
            </div>
            <span className="font-poppins text-lg font-bold tracking-wider text-primary group-hover:text-primary-light transition-colors duration-300">
              KSR COCONUTS
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-2 lg:space-x-3 xl:space-x-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-full text-xs xl:text-sm font-semibold tracking-wide text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Utilities (Language, Theme, CTA) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switch */}
            <button
              onClick={handleLanguageToggle}
              className="p-2.5 rounded-full hover:bg-primary/10 text-neutral-600 dark:text-neutral-300 hover:text-primary flex items-center space-x-1 text-xs font-bold uppercase transition-colors cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'తెలుగు' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-primary/10 text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Phone Button */}
            <a
              href="tel:9989152333"
              className="p-2.5 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer"
              title={t.nav.call}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-500 hover:to-emerald-600 text-white text-xs xl:text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.whatsapp}</span>
            </a>
          </div>

          {/* Mobile Hamburguer & Config Menu */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={handleLanguageToggle}
              className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-primary flex items-center space-x-1 text-xs font-bold uppercase"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'తె' : 'EN'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-primary"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-full text-neutral-700 dark:text-neutral-200 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-[64px] left-0 right-0 z-30 lg:hidden glass-panel border-b shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-primary/10 hover:text-primary dark:hover:text-primary-light transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-primary-light/10 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:9989152333"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.nav.call}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white text-sm font-semibold hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.nav.whatsapp}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
