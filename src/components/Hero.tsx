'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PremiumCanvasBackground } from './PremiumCanvasBackground';
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Sprout,
  Sparkles,
  Award,
  Truck,
  Layers,
  Coins,
  Leaf,
  Globe,
  ShoppingCart,
  Users
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language } = useApp();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0.4]);

  const { generateWhatsAppMessage } = require('@/utils/whatsapp');
  const whatsappUrl = generateWhatsAppMessage('hero', 'Order Now');

  const badgeItems = [
    { icon: Sprout, title: language === 'en' ? 'Farm Fresh' : 'తోట నుండి నేరుగా', subtitle: language === 'en' ? 'Direct from farms' : 'తాజా పంట' },
    { icon: Sparkles, title: language === 'en' ? 'Hand Picked' : 'చేతితో ఎంచుకున్నవి', subtitle: language === 'en' ? 'Carefully selected' : 'అత్యుత్తమ నాణ్యత' },
    { icon: Award, title: language === 'en' ? 'Premium Quality' : 'ఉత్తమ నాణ్యత', subtitle: language === 'en' ? 'Best quality assured' : '100% గ్యారంటీ' },
    { icon: Truck, title: language === 'en' ? 'Same Day' : 'ఒకే రోజు డెలివరీ', subtitle: language === 'en' ? 'Fast & reliable' : 'నమ్మకమైన రవాణా' },
    { icon: Layers, title: language === 'en' ? 'Wholesale' : 'హోల్‌సేల్ సరఫరా', subtitle: language === 'en' ? 'Bulk orders welcome' : 'భారీ స్టాక్' },
    { icon: Coins, title: language === 'en' ? 'Best Prices' : 'అందుబాటు ధరలు', subtitle: language === 'en' ? 'Affordable pricing' : 'సరసమైన ధర' },
    { icon: Leaf, title: language === 'en' ? 'Organic' : 'సేంద్రీయం', subtitle: language === 'en' ? 'Chemical Free' : 'రసాయనాలు లేనివి' },
    { icon: Globe, title: language === 'en' ? 'Export Quality' : 'ఎగుమతి నాణ్యత', subtitle: language === 'en' ? 'International Specs' : 'అంతర్జాతీయ ప్రమాణాలు' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAFCF8] dark:bg-[#07130A] transition-colors duration-500"
    >
      {/* Premium Canvas Background with tropical particles and constellations */}
      <PremiumCanvasBackground />

      {/* Background Image / Parallax Layer (Subtle blend) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay dark:mix-blend-normal opacity-[0.28] dark:opacity-[0.48] pointer-events-none"
        style={{
         backgroundImage: "url('/farm_orchard_new.webp')",
          y: yBg,
        }}
      />

      {/* Luxury Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFCF8]/60 to-[#FAFCF8] dark:via-[#07130A]/70 dark:to-[#07130A] pointer-events-none z-1 transition-colors duration-500" />

      {/* Floating Animated Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 z-1">
        <motion.div
          className="absolute top-10 left-[-20%] w-[500px] h-[200px] bg-gradient-to-r from-transparent via-primary/5 dark:via-white/10 to-transparent blur-3xl"
          animate={{ x: '140vw' }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/3 left-[-30%] w-[600px] h-[250px] bg-gradient-to-r from-transparent via-primary/5 dark:via-white/15 to-transparent blur-3xl"
          animate={{ x: '150vw' }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear', delay: 10 }}
        />
      </div>

      {/* Main Content Row */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-12 flex-grow flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content Side */}
        <motion.div
          className="flex-1 text-center lg:text-left text-white"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Natural Badge */}
          <motion.div
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-xs font-semibold uppercase tracking-wider mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ShieldCheck className="w-4 h-4 text-primary-light" />
            <span>{language === 'en' ? '100% NATURAL & ORGANIC' : '100% సహజమైనవి & సేంద్రీయం'}</span>
          </motion.div>

          {/* Heading with color-split KSR and COCONUTS plus Leaf icon */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-poppins tracking-tight leading-none mb-4 flex items-center justify-center lg:justify-start flex-wrap">
            <span className="text-white mr-3">KSR</span>
            <span className="text-primary flex items-center">
              COCONUTS
              <motion.span
                className="inline-flex items-center ml-2.5"
                animate={{ rotate: [25, 40, 25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="w-8 h-8 md:w-12 md:h-12 text-primary fill-current" />
              </motion.span>
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-poppins text-primary mb-6">
            {t.hero.subtitle}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-inter font-light max-w-xl mb-6 leading-relaxed mx-auto lg:mx-0">
            {language === 'en' 
              ? 'Experience the premium taste of naturally grown coconuts harvested directly from our farms in the heart of East Godavari.'
              : 'తూర్పు గోదావరి నడిబొడ్డున ఉన్న మా తోటలలో సహజంగా పండించిన ప్రీమియం కొబ్బరికాయల స్వచ్ఛమైన రుచిని అనుభవించండి.'}
          </p>

          {/* Location details row */}
          <div className="flex items-center space-x-2 text-neutral-300 dark:text-neutral-400 mb-8 justify-center lg:justify-start">
            <MapPin className="w-4.5 h-4.5 text-primary flex-shrink-0" />
            <span className="text-sm font-semibold font-poppins">Ethakota, East Godavari, Andhra Pradesh</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full btn-luxury-primary shine-sweep text-sm font-bold border border-white/10"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t.hero.btnOrder}</span>
            </a>

            <a
              href="#wholesale"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full btn-luxury-glass text-sm font-bold"
            >
              <Users className="w-4 h-4" />
              <span>{t.hero.btnWholesale}</span>
            </a>

            <a
              href="tel:9989152333"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full btn-luxury-glass text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>{t.hero.btnCall}</span>
            </a>
          </div>
        </motion.div>

        {/* Right Content Side (Floating Photo Frame + Sticker Badge) */}
        <motion.div
          className="flex-1 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Glow circle behind coconut */}
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-primary/20 rounded-full blur-[85px] pointer-events-none z-0" />

          {/* Photo Frame Container matching Screenshot 5 */}
          <motion.div 
            className="relative p-3 bg-[#0a1c10] border border-primary/25 rounded-3xl shadow-2xl max-w-[260px] sm:max-w-[340px] md:max-w-[380px] z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/fresh_tender_coconut.png"
              alt="KSR Coconuts Fresh Tender Coconut"
              className="w-full h-auto rounded-2xl object-cover"
            />
            
            {/* 100% Natural Sticker Badge Overlay */}
            <motion.div 
              className="absolute top-6 right-[-16px] w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary border-4 border-[#06120a] flex flex-col items-center justify-center text-white shadow-2xl z-20"
              animate={{ rotate: [6, 12, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5 fill-current" />
              <span className="text-[10px] sm:text-xs font-bold leading-none">100%</span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider leading-none mt-1">NATURAL</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Badges Strip horizontally scrolling on mobile and grid on desktop */}
      <div className="w-full relative z-20 bg-black/45 backdrop-blur-md border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory w-full">
            {badgeItems.map((badge, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[150px] sm:w-[165px] lg:w-auto snap-center glass-panel bg-card-bg/40 border border-card-border/60 hover:border-primary/45 p-4.5 rounded-2xl flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1 cursor-default"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3.5 bg-primary/10 text-primary dark:text-primary-light">
                  <badge.icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold font-poppins text-text-base mb-1 tracking-wide leading-tight">
                  {badge.title}
                </h4>
                <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-inter font-light">
                  {badge.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
