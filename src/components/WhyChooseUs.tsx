'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import {
  Sprout,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Layers,
  Leaf,
  Globe
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useApp();

  const features = [
    {
      icon: Sprout,
      title: language === 'en' ? 'Farm Fresh' : 'తోట నుండి నేరుగా',
      desc: language === 'en' 
        ? 'Harvested and dispatched within hours for peak freshness and natural flavor.'
        : 'తాజాదనం మరియు సహజ రుచి కోసం కోత కోసిన కొద్ది గంటలలోనే పంపిణీ చేయబడును.',
      colorClass: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
    {
      icon: Sparkles,
      title: language === 'en' ? 'Hand Picked' : 'చేతితో ఎంచుకున్నవి',
      desc: language === 'en'
        ? 'Every coconut is individually inspected by experts for optimal size, water content, and weight.'
        : 'సరైన పరిమాణం, నీరు మరియు బరువు కోసం నిపుణులచే ప్రతి కొబ్బరికాయ విడివిడిగా పరిశీలించబడుతుంది.',
      colorClass: 'bg-teal-500/10 text-teal-500 dark:bg-teal-500/20 dark:text-teal-400',
    },
    {
      icon: ShieldCheck,
      title: language === 'en' ? 'Chemical Free' : 'రసాయనాలు లేనివి',
      desc: language === 'en'
        ? '100% organic growth without artificial ripening or harmful preservatives.'
        : 'కృత్రిమ పద్ధతులు లేదా రసాయనాలు లేకుండా 100% సహజ పద్ధతులలో పండించబడినవి.',
      colorClass: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400',
    },
    {
      icon: Truck,
      title: language === 'en' ? 'Same Day Delivery' : 'ఒకే రోజు డెలివరీ',
      desc: language === 'en'
        ? 'Swift shipping options to Rajahmundry, Kakinada, and nearby local areas.'
        : 'రాజమండ్రి, కాకినాడ మరియు చుట్టుపక్కల ప్రాంతాలకు వేగవంతమైన రవాణా సదుపాయం.',
      colorClass: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400',
    },
    {
      icon: Award,
      title: language === 'en' ? 'Premium Quality' : 'ఉత్తమ నాణ్యత',
      desc: language === 'en'
        ? 'Thick shells, sweet water, and delicious meat, representing the legendary Godavari soil.'
        : 'గోదావరి సారవంతమైన నేలల విశిష్టతను చాటే మందపాటి పెంకు, తియ్యని నీరు మరియు మృదువైన కొబ్బరి.',
      colorClass: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400',
    },
    {
      icon: Layers,
      title: language === 'en' ? 'Wholesale Supply' : 'హోల్‌సేల్ సరఫరా',
      desc: language === 'en'
        ? 'Unmatched pricing and capacity for temples, hotels, vendors, and export houses.'
        : 'దేవాలయాలు, హోటళ్ళు, వ్యాపారులు మరియు ఎగుమతిదారుల కోసం పోటీ ధరలు మరియు భారీ సామర్థ్యం.',
      colorClass: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400',
    },
    {
      icon: Leaf,
      title: language === 'en' ? 'Organic Farming' : 'సేంద్రీయ వ్యవసాయం',
      desc: language === 'en'
        ? 'Cultivated using traditional agricultural methodologies that preserve ecological balance.'
        : 'పర్యావరణ సమతుల్యతను కాపాడే సాంప్రదాయ సేంద్రీయ వ్యవసాయ పద్ధతులలో సాగు చేయబడినవి.',
      colorClass: 'bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400',
    },
    {
      icon: Globe,
      title: language === 'en' ? 'Export Quality' : 'ఎగుమతి నాణ్యత',
      desc: language === 'en'
        ? 'Meets international standards for packing, preservation, and durability.'
        : 'ప్యాకింగ్, నిల్వ మరియు మన్నిక కోసం అంతర్జాతీయ ప్రమాణాలకు అనుగుణంగా తయారు చేయబడినవి.',
      colorClass: 'bg-sky-500/10 text-sky-500 dark:bg-sky-500/20 dark:text-sky-400',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden bg-bg-base">
      {/* Decorative leaf watermarks */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Purity & Integrity
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-poppins text-text-base mt-4 mb-6 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {language === 'en' ? 'Why Choose Us' : 'మమ్మల్ని ఎందుకు ఎంచుకోవాలి'}
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <motion.p
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-inter font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {language === 'en'
              ? 'We maintain the highest standards from harvest to delivery, ensuring you receive only the finest coconuts.'
              : 'కోత నుండి డెలివరీ వరకు మేము అత్యున్నత ప్రమాణాలను పాటిస్తాము, తద్వారా మీరు ఉత్తమమైన కొబ్బరికాయలను పొందుతారు.'}
          </motion.p>
        </div>

        {/* Feature Cards Grid (4 Columns on Desktop) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                }}
                className="glow-card glass-panel rounded-3xl p-6.5 flex flex-col justify-between h-[270px] cursor-default border border-card-border"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${feat.colorClass}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-text-base mb-3 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-inter font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="w-full h-0.5 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full mt-4" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
