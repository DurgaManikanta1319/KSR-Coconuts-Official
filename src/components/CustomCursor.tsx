'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setEnabled(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setEnabled(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Add class to hide default cursor
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Safe check for .closest to prevent errors on non-element targets
      if (typeof target.closest === 'function') {
        const isInteractive = target.closest(
          'a, button, input, textarea, select, [role="button"], .cursor-pointer, label'
        );
        setIsHovered(!!isInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring with smooth CSS transition */}
      <div
        className="fixed top-0 left-0 pointer-events-none rounded-full border-2 border-emerald-500/80 z-[99999]"
        style={{
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0)',
          borderColor: isHovered ? 'rgba(52, 211, 153, 0.9)' : 'rgba(16, 185, 129, 0.8)',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isClicked ? 0.85 : 1})`,
          transition: 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
        }}
      />
      {/* Inner Dot with zero latency */}
      <div
        className="fixed top-0 left-0 pointer-events-none w-2 h-2 bg-emerald-600 rounded-full z-[99999]"
        style={{
          backgroundColor: isHovered ? '#047857' : '#059669',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isClicked ? 0.6 : isHovered ? 1.3 : 1})`,
          transition: 'transform 0.01s linear, background-color 0.2s ease',
        }}
      />
    </>
  );
}
