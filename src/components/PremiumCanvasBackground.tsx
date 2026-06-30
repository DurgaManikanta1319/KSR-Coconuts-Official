'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSpeed: number;
  color: string;
  depth: number; // 0.5 to 1.5 (affects parallax, speed, scale, blur)
  type: 'dot' | 'firefly' | 'leaf' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
  phase: number;
  pulseSpeed: number;
}

export const PremiumCanvasBackground: React.FC = () => {
  const { theme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Luxury Brand Color Palette
  const darkPalette = ['#00C853', '#4ADE80', '#A7F45D', '#FFFFFF', '#66bb6a', '#81c784'];
  const lightPalette = ['#00C853', '#2E7D32', '#1B5E20', '#FFFFFF', '#43A047', '#81C784'];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setDimensions({ width, height });
        if (canvasRef.current) {
          canvasRef.current.width = width;
          canvasRef.current.height = height;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 110;
    const particles: Particle[] = [];

    const palette = theme === 'dark' ? darkPalette : lightPalette;

    // Initialize particles (mixture of leaves, fireflies, sparkles, and constellation dots)
    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: 'dot' | 'firefly' | 'leaf' | 'sparkle' = 'dot';
      
      if (rand > 0.85) {
        type = 'leaf';
      } else if (rand > 0.55) {
        type = 'firefly';
      } else if (rand > 0.40) {
        type = 'sparkle';
      }

      const depth = 0.5 + Math.random() * 1.0;
      let size = 2;
      let color = palette[Math.floor(Math.random() * palette.length)];

      if (type === 'leaf') {
        size = 8 + Math.random() * 14;
        color = theme === 'dark' ? '#4ADE80' : '#2E7D32';
      } else if (type === 'firefly') {
        size = 2.5 + Math.random() * 3.5;
        // Fireflies are soft glowing green or warm white
        color = Math.random() > 0.4 ? '#4ADE80' : '#FFFFFF';
      } else if (type === 'sparkle') {
        size = 1 + Math.random() * 2;
        color = '#A7F45D';
      } else {
        size = 1.5 + Math.random() * 2.5;
      }

      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: type === 'leaf' ? -0.2 - Math.random() * 0.3 : (Math.random() - 0.5) * 0.35,
        vy: type === 'firefly' ? -0.15 - Math.random() * 0.25 : (Math.random() - 0.5) * 0.35,
        size,
        baseSpeed: 0.3 + Math.random() * 0.45,
        color,
        depth,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    let animationId: number;

    // Draw sunlight beams coming from top-right corner
    const drawLightRays = () => {
      const numRays = 4;
      const time = Date.now() * 0.0003;
      
      for (let i = 0; i < numRays; i++) {
        const angle = 0.65 + Math.sin(time + i * 1.8) * 0.05;
        const rayGrad = ctx.createLinearGradient(
          dimensions.width, 0,
          dimensions.width - Math.cos(angle) * dimensions.height * 1.5,
          Math.sin(angle) * dimensions.height * 1.5
        );
        
        rayGrad.addColorStop(0, 'rgba(167, 244, 93, 0.07)');
        rayGrad.addColorStop(0.5, 'rgba(74, 222, 128, 0.03)');
        rayGrad.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.moveTo(dimensions.width, 0);
        ctx.lineTo(
          dimensions.width - Math.cos(angle - 0.04) * dimensions.height * 2.5,
          Math.sin(angle - 0.04) * dimensions.height * 2.5
        );
        ctx.lineTo(
          dimensions.width - Math.cos(angle + 0.04) * dimensions.height * 2.5,
          Math.sin(angle + 0.04) * dimensions.height * 2.5
        );
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
    };

    // Draw cinematic farm mist overlay (organic fog)
    const drawMist = () => {
      const time = Date.now() * 0.0001;
      const mistGrad = ctx.createRadialGradient(
        dimensions.width * 0.25 + Math.sin(time) * 120,
        dimensions.height * 0.85 + Math.cos(time) * 80,
        50,
        dimensions.width * 0.25 + Math.sin(time) * 120,
        dimensions.height * 0.85 + Math.cos(time) * 80,
        dimensions.width * 0.45
      );
      
      const mistOpacity = theme === 'dark' ? 0.08 : 0.04;
      mistGrad.addColorStop(0, `rgba(13, 27, 18, ${mistOpacity})`);
      mistGrad.addColorStop(0.5, `rgba(7, 19, 10, ${mistOpacity * 0.5})`);
      mistGrad.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(
        dimensions.width * 0.25 + Math.sin(time) * 120,
        dimensions.height * 0.85 + Math.cos(time) * 80,
        dimensions.width * 0.45, 0, Math.PI * 2
      );
      ctx.fillStyle = mistGrad;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Draw light rays & mist
      drawLightRays();
      drawMist();

      const connectionDist = 130;
      const repulsionRadius = 140;
      const repulsionStrength = 2.8;

      // 2. Draw lines between dots for a premium digital network structure
      ctx.lineWidth = 0.65;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          if (p1.type === 'dot' && p2.type === 'dot') {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              const alpha = (1 - dist / connectionDist) * 0.12 * Math.min(p1.depth, p2.depth);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = theme === 'dark' 
                ? `rgba(74, 222, 128, ${alpha})`
                : `rgba(46, 125, 50, ${alpha})`;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Update & Draw Particles
      particles.forEach((p) => {
        p.phase += p.pulseSpeed;

        // Apply constant organic drift / wind force
        if (p.type === 'leaf') {
          // Drifting leaves fall down & left
          p.x += p.vx * p.baseSpeed * p.depth;
          p.y += (0.15 + Math.sin(p.phase) * 0.08) * p.baseSpeed * p.depth;
        } else if (p.type === 'firefly') {
          // Fireflies float slowly upwards
          p.x += Math.sin(p.phase) * 0.15 * p.baseSpeed * p.depth;
          p.y += p.vy * p.baseSpeed * p.depth;
        } else {
          // Sparkles and dots drift randomly
          p.x += p.vx * p.baseSpeed * p.depth;
          p.y += p.vy * p.baseSpeed * p.depth;
        }

        p.rotation += p.rotationSpeed;

        // Mouse Parallax & Repulsion
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius) {
            const force = (repulsionRadius - dist) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            const push = force * repulsionStrength * (p.depth * 0.8 + 0.2);
            p.x += Math.cos(angle) * push;
            p.y += Math.sin(angle) * push;
          }
        }

        // Wrap around boundaries
        if (p.x < -30) p.x = dimensions.width + 30;
        if (p.x > dimensions.width + 30) p.x = -30;
        if (p.y < -30) p.y = dimensions.height + 30;
        if (p.y > dimensions.height + 30) p.y = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const drawSize = p.size * p.depth;
        let opacity = Math.min(1, p.depth * 0.65);

        if (p.type === 'firefly') {
          // Soft glowing green/white fireflies pulsing opacity
          const currentAlpha = opacity * (0.4 + Math.sin(p.phase) * 0.4);
          ctx.globalAlpha = currentAlpha;
          
          // Shadow glow
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12 * p.depth;
          
          // Draw firefly gradient
          const radGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, drawSize);
          radGrad.addColorStop(0, '#FFFFFF');
          radGrad.addColorStop(0.3, p.color);
          radGrad.addColorStop(1, 'transparent');
          
          ctx.beginPath();
          ctx.arc(0, 0, drawSize * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = radGrad;
          ctx.fill();
        } 
        else if (p.type === 'leaf') {
          // Drifting leaves with smooth sways and soft depth-blur (translucency)
          ctx.globalAlpha = opacity * 0.45;
          ctx.fillStyle = p.color;
          
          // Draw a soft stylized curved organic leaf shape
          ctx.beginPath();
          ctx.moveTo(-drawSize, 0);
          ctx.quadraticCurveTo(0, -drawSize * 0.45, drawSize, 0);
          ctx.quadraticCurveTo(0, drawSize * 0.45, -drawSize, 0);
          ctx.closePath();
          ctx.fill();

          // Leaf vein
          ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.1)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-drawSize, 0);
          ctx.lineTo(drawSize, 0);
          ctx.stroke();
        } 
        else if (p.type === 'sparkle') {
          // Floating twinkling sparkles
          const currentAlpha = opacity * (0.2 + Math.abs(Math.sin(p.phase * 1.5)) * 0.6);
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.color;
          
          // Draw 4-point star/sparkle
          ctx.beginPath();
          ctx.moveTo(0, -drawSize);
          ctx.lineTo(drawSize * 0.25, -drawSize * 0.25);
          ctx.lineTo(drawSize, 0);
          ctx.lineTo(drawSize * 0.25, drawSize * 0.25);
          ctx.lineTo(0, drawSize);
          ctx.lineTo(-drawSize * 0.25, drawSize * 0.25);
          ctx.lineTo(-drawSize, 0);
          ctx.lineTo(-drawSize * 0.25, -drawSize * 0.25);
          ctx.closePath();
          ctx.fill();
        } 
        else {
          // Standard constellation network node
          ctx.globalAlpha = opacity * 0.85;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, drawSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, theme]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 transition-colors duration-500 bg-[#FAFCF8] dark:bg-[#07130A]"
    >
      {/* Background radial vignettes */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-100 dark:opacity-0" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(250, 252, 248, 0.2) 0%, rgba(244, 249, 242, 0.4) 50%, rgba(235, 245, 231, 0.6) 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-0 dark:opacity-100" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0D1B12 0%, #07130A 70%, #030804 100%)',
        }}
      />

      {/* Moving luxury glow blobs sways */}
      <div className="absolute top-[15%] left-[20%] w-[380px] h-[380px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/8 blur-[120px] pointer-events-none animate-blob-sway-1" />
      <div className="absolute bottom-[20%] right-[15%] w-[480px] h-[480px] rounded-full bg-emerald-600/5 dark:bg-emerald-700/8 blur-[130px] pointer-events-none animate-blob-sway-2" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto block cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Animated palm leaf shadows sways */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-1">
        {/* Left top shadow sways */}
        <motion.div
          className="absolute top-[-5%] left-[-10%] w-[400px] sm:w-[600px] h-auto pointer-events-none text-emerald-950/[0.04] dark:text-[#040e06]/40 fill-current blur-[6px] sm:blur-[12px]"
          animate={{
            rotate: [-2, 3, -2],
            y: [-10, 15, -10],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ originX: 0.1, originY: 0.1 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,0 C20,15 35,32 55,42 C45,46 32,48 20,49 C25,56 32,64 42,70 C30,71 18,70 8,68 C12,77 18,87 25,95 C12,94 3,89 0,85 L0,0 Z" />
          </svg>
        </motion.div>

        {/* Right top shadow sways */}
        <motion.div
          className="absolute top-[-8%] right-[-12%] w-[450px] sm:w-[650px] h-auto pointer-events-none text-emerald-950/[0.03] dark:text-[#040e06]/35 fill-current blur-[8px] sm:blur-[15px]"
          animate={{
            rotate: [2, -3, 2],
            y: [5, -15, 5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{ originX: 0.9, originY: 0.1 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform scale-x-[-1]">
            <path d="M10,0 C20,15 35,32 55,42 C45,46 32,48 20,49 C25,56 32,64 42,70 C30,71 18,70 8,68 C12,77 18,87 25,95 C12,94 3,89 0,85 L0,0 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-2 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(250,252,248,0.08)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)] transition-colors duration-500" />
    </div>
  );
};
