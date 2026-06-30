'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* =============================================================
   LAUNCH TARGET — 2026-07-01 10:00:00 IST (UTC+5:30)
   Change this date to control when the countdown ends.
============================================================= */
const LAUNCH_DATE = new Date('2026-07-01T10:00:00+05:30');
const LS_KEY = 'ksr_visit_count'; // Tracks number of page loads

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LaunchCountdownProps {
  onEnter: () => void;
}

function getCountdown(): CountdownValues {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

/* ─── Flip Number Box ───────────────────────────────────── */
function FlipBox({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => { setFlipping(false); setPrev(value); }, 480);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: 'clamp(62px,13vw,98px)', height: 'clamp(62px,13vw,92px)' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(7,20,14,0.85)',
            border: '1px solid rgba(46,213,115,0.28)',
            borderRadius: 14,
            fontSize: 'clamp(1.5rem,4.5vw,2.6rem)',
            fontWeight: 900,
            color: '#ffffff',
            boxShadow: '0 0 28px rgba(46,213,115,0.42), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            fontFamily: "'Arial Rounded MT Bold','Arial Rounded MT','Nunito','Century Gothic',Arial,sans-serif",
            letterSpacing: '0.02em',
            animation: flipping ? 'ksr-flip 0.48s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {display}
        </div>
      </div>
      <span style={{
        fontSize: 'clamp(0.52rem,1.4vw,0.68rem)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.38)',
        fontFamily: "'Arial Rounded MT Bold','Arial Rounded MT','Nunito',Arial,sans-serif",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Notify Modal ──────────────────────────────────────── */
function NotifyModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  function submit() {
    if (!email || !email.includes('@')) { setError(true); return; }
    setDone(true);
    setTimeout(onClose, 2200);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        style={{
          background: 'rgba(6,16,10,0.97)',
          border: '1px solid rgba(46,213,115,0.3)',
          borderRadius: 24,
          padding: '36px 32px',
          maxWidth: 400,
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(46,213,115,0.2), 0 40px 80px rgba(0,0,0,0.75)',
          fontFamily: "'Arial Rounded MT Bold','Arial Rounded MT','Nunito',Arial,sans-serif",
        }}
      >
        {done ? (
          <div>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎉</div>
            <h3 style={{ color: '#2ED573', fontSize: '1.15rem', letterSpacing: '0.1em', marginBottom: 8 }}>
              You're on the list!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
              We'll notify you the moment KSR Coconuts™ launches.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ color: '#2ED573', fontSize: '1.15rem', letterSpacing: '0.1em', marginBottom: 8 }}>
              🔔 Get Notified
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginBottom: 20 }}>
              Enter your email and we'll alert you the moment we launch.
            </p>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(false); }}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '11px 15px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${error ? 'rgba(255,80,80,0.6)' : 'rgba(46,213,115,0.25)'}`,
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: '0.84rem',
                outline: 'none',
                marginBottom: 12,
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={submit}
              style={{
                width: '100%', padding: '12px',
                borderRadius: 50, border: 'none',
                background: 'linear-gradient(135deg, #1FAF5B, #2ED573)',
                color: '#000', fontFamily: 'inherit', fontWeight: 900,
                letterSpacing: '0.1em', fontSize: '0.84rem',
                cursor: 'pointer', transition: 'transform 0.2s',
              }}
            >
              Notify Me at Launch
            </button>
            <br />
            <button
              onClick={onClose}
              style={{
                marginTop: 10, background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.28)', fontFamily: 'inherit',
                fontSize: '0.66rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              No thanks
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── SVG Corner Accent ─────────────────────────────────── */
function CornerSVG() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ position: 'absolute' }}>
      <path d="M2 32L2 2L32 2" stroke="#2ED573" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 18L2 2L18 2" stroke="#FFD700" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
      <circle cx="2" cy="2" r="3" fill="#2ED573" opacity="0.8" />
      <circle cx="2" cy="2" r="1.5" fill="#FFD700" />
    </svg>
  );
}

/* ─── Main Component ────────────────────────────────────── */
export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({ onEnter }) => {
  const [cd, setCd] = useState<CountdownValues>(getCountdown());
  const [showNotify, setShowNotify] = useState(false);
  const [launched, setLaunched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  /* — Countdown Tick — */
  useEffect(() => {
    const id = setInterval(() => {
      const next = getCountdown();
      setCd(next);
      const allZero = !next.days && !next.hours && !next.minutes && !next.seconds;
      if (allZero) {
        clearInterval(id);
        setLaunched(true);
        startConfetti();
        setTimeout(onEnter, 3500);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [onEnter]);

  /* — Particle Canvas — */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    let animId: number;

    const COLS = ['#1FAF5B', '#2ED573', '#5CFF9D', '#FFD700'];
    const LD = 130, MD = 160;

    class Particle {
      x!: number; y!: number; vx!: number; vy!: number;
      r!: number; color!: string; a!: number; gs!: number;
      ph!: number; sp!: number;
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 2.2 + 0.8;
        this.color = COLS[Math.floor(Math.random() * COLS.length)];
        this.a = Math.random() * 0.5 + 0.25;
        this.gs = Math.random() * 8 + 3;
        this.ph = Math.random() * Math.PI * 2;
        this.sp = Math.random() * 0.008 + 0.003;
      }
      update() {
        this.ph += this.sp;
        this.x += this.vx + Math.sin(this.ph) * 0.22;
        this.y += this.vy + Math.cos(this.ph * 0.7) * 0.22;
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const d = Math.hypot(dx, dy);
        if (d < MD) { const f = (MD - d) / MD; this.x += (dx / d) * f * 1.8; this.y += (dy / d) * f * 1.8; }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.a;
        ctx.shadowColor = this.color; ctx.shadowBlur = this.gs;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.fill();
        ctx.restore();
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const N = window.innerWidth < 600 ? 44 : 88;
    const particles = Array.from({ length: N }, () => new Particle());

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => {
      mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });

    function loop() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw mesh links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LD) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(46,213,115,${(1 - d / LD) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  /* — Confetti — */
  const startConfetti = useCallback(() => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;
    const COLS = ['#2ED573', '#FFD700', '#5CFF9D', '#FF6B35', '#FF3CAC', '#fff'];
    const ps = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 4, h: Math.random() * 6 + 3,
      vx: (Math.random() - 0.5) * 3, vy: Math.random() * 3 + 1.5,
      ang: Math.random() * Math.PI * 2, va: (Math.random() - 0.5) * 0.15,
      col: COLS[Math.floor(Math.random() * COLS.length)], a: 1,
    }));
    let fr = 0;
    function loop() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.ang += p.va;
        if (fr > 90) p.a -= 0.008;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.a);
        ctx.translate(p.x, p.y); ctx.rotate(p.ang);
        ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      fr++;
      if (fr < 200) requestAnimationFrame(loop); else canvas.style.display = 'none';
    }
    loop();
  }, []);

  const handleEnter = () => {
    onEnter();
  };

  return (
    <>
      {/* Inject flip keyframe globally once */}
      <style>{`
        @keyframes ksr-flip {
          0%   { transform: rotateX(0deg);   opacity: 1; }
          45%  { transform: rotateX(-90deg); opacity: 0; }
          55%  { transform: rotateX(90deg);  opacity: 0; }
          100% { transform: rotateX(0deg);   opacity: 1; }
        }
        @keyframes ksr-logo-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes ksr-glow-pulse {
          0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
          50%      { transform: translate(-50%,-50%) scale(1.25); opacity: 1;   }
        }
        @keyframes ksr-shim {
          to { background-position: 200% center; }
        }
      `}</style>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Confetti canvas */}
      <canvas
        ref={confettiRef}
        style={{ position: 'fixed', inset: 0, zIndex: 99, pointerEvents: 'none', display: 'none' }}
      />

      {/* Main overlay */}
      <motion.div
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16,
          background: 'linear-gradient(135deg, #040804 0%, #070D07 50%, #040B05 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Card */}
        <motion.div
          initial={{ scale: 0.88, y: 22, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 22, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 760,
            background: 'rgba(6,15,10,0.72)',
            border: '1px solid rgba(46,213,115,0.18)',
            borderRadius: 32,
            padding: 'clamp(32px,5vw,52px) clamp(20px,5vw,48px) clamp(28px,4vw,44px)',
            backdropFilter: 'blur(28px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
            boxShadow: '0 0 60px rgba(46,213,115,0.12), 0 2px 0 rgba(255,255,255,0.04) inset, 0 60px 120px rgba(0,0,0,0.85)',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: "'Arial Rounded MT Bold','Arial Rounded MT','Nunito','Century Gothic',Arial,sans-serif",
          }}
        >
          {/* SVG Corner Accents */}
          <div style={{ position: 'absolute', top: 0, left: 0 }}><CornerSVG /></div>
          <div style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}><CornerSVG /></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}><CornerSVG /></div>
          <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)' }}><CornerSVG /></div>

          {/* Logo */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 180, height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(46,213,115,0.35) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animation: 'ksr-glow-pulse 5s ease-in-out infinite',
              zIndex: 0,
            }} />
            <img
              src="/logo.jpg"
              alt="KSR Coconuts"
              style={{
                position: 'relative', zIndex: 1,
                width: 'clamp(80px,15vw,110px)',
                height: 'clamp(80px,15vw,110px)',
                borderRadius: '50%',
                objectFit: 'contain',
                background: '#fff', padding: 6,
                border: '2px solid rgba(46,213,115,0.45)',
                boxShadow: '0 0 0 6px rgba(46,213,115,0.1), 0 12px 48px rgba(0,0,0,0.6), 0 0 40px rgba(46,213,115,0.35)',
                animation: 'ksr-logo-float 5s ease-in-out infinite',
              }}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>

          {/* Brand name */}
          <div style={{
            fontSize: 'clamp(1.4rem,3.8vw,2.2rem)',
            fontWeight: 900,
            letterSpacing: '0.22em',
            color: '#2ED573',
            textShadow: '0 0 40px rgba(46,213,115,0.5)',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            KSR COCONUTS™
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 'clamp(1.5rem,4.2vw,2.6rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '0.04em',
            margin: '14px 0 6px',
          }}>
            <span style={{
              background: 'linear-gradient(90deg, #FFD700 0%, #FFE55C 40%, #FFD700 80%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'ksr-shim 3s linear infinite',
            }}>
              BIG THINGS
            </span>
            <br />
            ARE COMING.
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: 'clamp(0.68rem,1.8vw,0.88rem)',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.42)',
            textTransform: 'uppercase',
            marginBottom: 26,
            lineHeight: 1.8,
          }}>
            Premium Tender Coconuts<br />
            <span style={{ color: '#2ED573' }}>•</span>{' '}
            Freshness{' '}
            <span style={{ color: '#2ED573' }}>•</span>{' '}
            Quality{' '}
            <span style={{ color: '#2ED573' }}>•</span>{' '}
            Tradition{' '}
            <span style={{ color: '#2ED573' }}>•</span>
          </p>

          {/* Launch date */}
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
            Official Launch Date
          </div>
          <div style={{
            fontSize: 'clamp(1rem,2.8vw,1.4rem)',
            letterSpacing: '0.3em',
            color: '#FFD700',
            fontWeight: 900,
            marginBottom: 30,
            textShadow: '0 0 20px rgba(255,215,0,0.4)',
          }}>
            01 &bull; 07 &bull; 2026
          </div>

          {/* Countdown boxes */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 'clamp(8px,2vw,20px)',
            marginBottom: 34, flexWrap: 'nowrap',
          }}>
            <FlipBox value={cd.days}    label="Days" />
            <FlipBox value={cd.hours}   label="Hours" />
            <FlipBox value={cd.minutes} label="Minutes" />
            <FlipBox value={cd.seconds} label="Seconds" />
          </div>

          {/* Divider */}
          <div style={{
            width: '100%', height: 1, marginBottom: 26,
            background: 'linear-gradient(90deg, transparent 0%, rgba(46,213,115,0.3) 30%, rgba(255,215,0,0.3) 50%, rgba(46,213,115,0.3) 70%, transparent 100%)',
          }} />

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
            <button
              onClick={handleEnter}
              style={{
                padding: '13px 30px', borderRadius: 50, border: 'none',
                background: 'linear-gradient(135deg, #1FAF5B, #2ED573)',
                color: '#000', fontFamily: 'inherit', fontWeight: 900,
                fontSize: 'clamp(0.7rem,1.8vw,0.86rem)', letterSpacing: '0.14em',
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 0 22px rgba(46,213,115,0.42), 0 4px 16px rgba(0,0,0,0.4)',
                transition: 'transform 0.25s, box-shadow 0.25s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.04)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 38px rgba(46,213,115,0.65), 0 8px 24px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = '';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 22px rgba(46,213,115,0.42), 0 4px 16px rgba(0,0,0,0.4)';
              }}
            >
              ⚡ Enter Website
            </button>

            <button
              onClick={() => setShowNotify(true)}
              style={{
                padding: '13px 30px', borderRadius: 50,
                background: 'transparent', color: '#FFD700',
                border: '1.5px solid rgba(255,215,0,0.38)',
                fontFamily: 'inherit', fontWeight: 900,
                fontSize: 'clamp(0.7rem,1.8vw,0.86rem)', letterSpacing: '0.14em',
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 0 15px rgba(255,215,0,0.1)',
                transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.transform = 'translateY(-3px) scale(1.04)';
                b.style.boxShadow = '0 0 30px rgba(255,215,0,0.35)';
                b.style.borderColor = '#FFD700';
                b.style.background = 'rgba(255,215,0,0.06)';
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.transform = '';
                b.style.boxShadow = '0 0 15px rgba(255,215,0,0.1)';
                b.style.borderColor = 'rgba(255,215,0,0.38)';
                b.style.background = 'transparent';
              }}
            >
              🔔 Notify Me
            </button>
          </div>

          <button
            onClick={handleEnter}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.22)',
              fontFamily: 'inherit', fontSize: '0.66rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'color 0.3s', display: 'block', margin: '0 auto',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.22)'; }}
          >
            Skip Intro
          </button>

          {/* Footer */}
          <div style={{
            marginTop: 20, paddingTop: 14,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            fontSize: '0.66rem', letterSpacing: '0.17em',
            color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase',
          }}>
            <span style={{ color: '#2ED573' }}>KSR Coconuts™</span>
            &nbsp;—&nbsp; Freshness Beyond Expectations™
          </div>
        </motion.div>
      </motion.div>

      {/* Notify Modal */}
      <AnimatePresence>
        {showNotify && <NotifyModal onClose={() => setShowNotify(false)} />}
      </AnimatePresence>
    </>
  );
};

/* =============================================================
   HOOK — shouldShowLaunch()
   Returns true on every 2nd page load (visit count is even: 2, 4, 6...)
   as long as the launch date has NOT yet been reached.
   Visit counter is incremented on every call, so:
     Visit 1 → go to site
     Visit 2 → show launch countdown
     Visit 3 → go to site
     Visit 4 → show launch countdown
     ... and so on indefinitely.
============================================================= */
export function shouldShowLaunch(): boolean {
  if (typeof window === 'undefined') return false;

  // Launch date already passed — never show the countdown
  if (Date.now() >= LAUNCH_DATE.getTime()) return false;

  // Increment visit counter
  const raw   = localStorage.getItem(LS_KEY);
  const count = raw ? parseInt(raw, 10) + 1 : 1;
  localStorage.setItem(LS_KEY, String(count));

  // Show on every even-numbered visit: 2nd, 4th, 6th...
  return count % 2 === 0;
}
