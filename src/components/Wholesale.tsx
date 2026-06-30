'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { CheckCircle2, UserPlus, FileText, ArrowRight } from 'lucide-react';

import { generateWhatsAppMessage } from '@/utils/whatsapp';

export const Wholesale: React.FC = () => {
  const { t } = useApp();

  const handleWholesaleCTA = (action: string) => {
    const url = generateWhatsAppMessage('wholesale', action);
    window.open(url, '_blank');
  };

  return (
    <section id="wholesale" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFCF8] dark:bg-[#07130A] transition-colors duration-400">
      <div className="max-w-7xl mx-auto bg-white dark:bg-[#0F1F14] border border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl transition-colors duration-400">
        
        {/* Soft decorative glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
          
          {/* Left Text Content */}
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              {t.wholesale.badge}
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold font-poppins mt-6 mb-6 leading-tight text-neutral-900 dark:text-white tracking-tight">
              {t.wholesale.title}
            </h2>
            
            <p className="text-base sm:text-lg text-neutral-600 dark:text-[#a3b899] font-inter font-light mb-8 max-w-xl leading-relaxed">
              {t.wholesale.subtitle}
            </p>

            {/* Target Markets List */}
            <h3 className="text-xs font-extrabold font-poppins uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-6">
              {t.wholesale.suitableTitle}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10 max-w-2xl">
              {t.wholesale.suitableItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-neutral-800 dark:text-white/90 font-inter font-medium leading-normal">{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => handleWholesaleCTA("become a registered dealer")}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white text-white dark:text-[#0c1610] dark:hover:bg-neutral-100 font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.wholesale.btnDealer}</span>
              </button>

              <button
                onClick={() => handleWholesaleCTA("request a bulk price quote")}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 dark:bg-[#1b2f21]/30 dark:border-emerald-900/30 dark:text-primary-light dark:hover:bg-[#1b2f21]/60 font-bold transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.wholesale.btnQuote}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Basket Image */}
          <motion.div
            className="flex-1 flex justify-center items-center w-full lg:w-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[4/3] md:aspect-square w-full max-w-[500px] border border-emerald-950/20 shadow-2xl">
              <motion.img
                src="/wholesale_basket_new.png"
                alt="KSR Coconuts Wholesale Basket"
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
