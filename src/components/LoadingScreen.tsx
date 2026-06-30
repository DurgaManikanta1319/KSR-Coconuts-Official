'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { language } = useApp();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    interface ConfettiParticle {
      x: number;
      y: number;
      w: number;
      h: number;
      vx: number;
      vy: number;
      angle: number;
      rotationSpeed: number;
      color: string;
      shape: 'leaf' | 'sparkle' | 'circle';
      opacity: number;
      decay: number;
    }

    const particles: ConfettiParticle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 75; // subtle and elegant

    const colors = ['#00C853', '#4ADE80', '#A7F45D', '#FAB818', '#FFFFFF'];
    const shapes: ('leaf' | 'sparkle' | 'circle')[] = ['leaf', 'sparkle', 'circle'];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3.5 + Math.random() * 7;

      particles.push({
        x: centerX,
        y: centerY,
        w: 6 + Math.random() * 8,
        h: 3 + Math.random() * 5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
        decay: 0.016 + Math.random() * 0.012, // Fades out in ~1.5s
      });
    }

    let animId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14; // gentle gravity
        p.vx *= 0.96; // air resistance
        p.angle += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity > 0) {
          active = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity;

          // Soft Glow effect
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6 * p.opacity;

          if (p.shape === 'leaf') {
            // Leaf shape
            ctx.fillStyle = p.color === '#FAB818' ? '#4ADE80' : p.color;
            ctx.beginPath();
            ctx.moveTo(-p.w / 2, 0);
            ctx.quadraticCurveTo(0, -p.h, p.w / 2, 0);
            ctx.quadraticCurveTo(0, p.h, -p.w / 2, 0);
            ctx.closePath();
            ctx.fill();
          } else if (p.shape === 'sparkle') {
            // Gold sparkle star
            ctx.fillStyle = '#FAB818';
            const size = p.w * 0.65;
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.25, -size * 0.25);
            ctx.lineTo(size, 0);
            ctx.lineTo(size * 0.25, size * 0.25);
            ctx.lineTo(0, size);
            ctx.lineTo(-size * 0.25, size * 0.25);
            ctx.lineTo(-size, 0);
            ctx.lineTo(-size * 0.25, -size * 0.25);
            ctx.closePath();
            ctx.fill();
          } else {
            // Circle particle
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.w * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (active) {
        animId = requestAnimationFrame(update);
      }
    };

    update();
  };

  useEffect(() => {
    const duration = 2400; // 2.4 seconds total loading
    const intervalTime = 16;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          triggerConfetti();
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600); // Wait for fade-out animation
          }, 1500); // 1.5 seconds duration for elegant confetti
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG circle definitions for circular progress ring
  const radius = 100;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Localized dynamic status messages
  const getStatusMessage = (prog: number) => {
    if (language === 'te') {
      if (prog < 25) return 'తోటల నుండి తాజా కొబ్బరి బొండాల సేకరణ...';
      if (prog < 50) return 'నాణ్యత మరియు స్వచ్ఛత తనిఖీ...';
      if (prog < 75) return 'ప్రీమియం గ్రేడ్ల వర్గీకరణ...';
      if (prog < 90) return 'సరఫరా కోసం లారీల లోడింగ్ సిద్ధమవుతోంది...';
      return 'రవాణాకు అంతా సిద్ధంగా ఉంది!';
    } else {
      if (prog < 25) return 'Gathering fresh coconuts from orchards...';
      if (prog < 50) return 'Performing strict quality checks...';
      if (prog < 75) return 'Sorting into premium export grades...';
      if (prog < 90) return 'Preparing farm dispatches...';
      return 'Directly from farm to you!';
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#040b05] via-[#08150c] to-[#040b05] text-white overflow-hidden select-none"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Confetti Overlay Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />
          {/* Centered Graphic Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Glowing Backlight Ring */}
            <motion.div
              className="absolute w-52 h-52 rounded-full bg-primary/20 blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Slow Spinning Outer Dashed Ring (Premium Tech/Organic feel) */}
            <motion.div
              className="absolute w-60 h-60 md:w-76 md:h-76 border-2 border-dashed border-[#1b3f27]/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />

            {/* SVG Circular Progress Loader */}
            <svg
              className="absolute w-56 h-56 md:w-72 md:h-72 transform -rotate-90 z-10"
              viewBox="0 0 220 220"
            >
              {/* Back track circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Animated active progress circle */}
              <motion.circle
                cx="110"
                cy="110"
                r={radius}
                stroke="url(#loaderGradient)"
                strokeWidth={strokeWidth + 1}
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2e7d32" />
                  <stop offset="50%" stopColor="#66bb6a" />
                  <stop offset="100%" stopColor="#81c784" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centered Logo Container */}
            <motion.div
              className="absolute w-44 h-44 md:w-56 md:h-56 flex items-center justify-center bg-white rounded-full p-2.5 shadow-2xl border border-white/10 z-25 overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: [1, 1.03, 1], opacity: 1 }}
              transition={{
                scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 1 }
              }}
            >
              <img
                src="/logo.jpg"
                alt="KSR Coconuts Logo"
                className="w-full h-full object-contain rounded-full select-none"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Texts Section Positioned Comfortably Below */}
          <div className="flex flex-col items-center mt-8 text-center max-w-sm px-6 relative z-10">
            {/* Brand Title */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold tracking-[0.25em] font-poppins text-[#66BB6A]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            >
              𝑲𝑺𝑹 𝑪𝑶𝑪𝑶𝑵𝑼𝑻𝑺™
            </motion.h2>
            
            {/* Brand Subtitle */}
            <motion.p 
              className="mt-2 text-[9px] md:text-xs text-[#8aa091] font-poppins font-bold uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
             NATURE'S PURITY, DELIVERED FRESH™
            </motion.p>

            {/* Digital Percentage Display */}
            <motion.div
              className="mt-6 font-poppins text-4xl md:text-5xl font-extrabold text-white flex items-baseline justify-center gap-0.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>{Math.round(progress)}</span>
              <span className="text-lg md:text-xl font-medium text-[#8aa091]">%</span>
            </motion.div>

            {/* Dynamic Status Message */}
            <motion.p
              key={getStatusMessage(progress)}
              className="mt-4 text-xs sm:text-sm font-semibold tracking-wide text-neutral-400 font-inter min-h-[20px] transition-all duration-300"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {getStatusMessage(progress)}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
