'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, MapPin, Send, QrCode } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.products, href: '#products' },
    { name: t.nav.wholesale, href: '#wholesale' },
    { name: t.nav.delivery, href: '#delivery' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.reviews, href: '#reviews' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const productRanges = [
    t.products.items.tender.title,
    t.products.items.mature.title,
    t.products.items.water.title,
    t.products.items.dry.title,
    t.products.items.oil.title,
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Decorative vector ring */}
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Brand details (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="relative w-9 h-9 flex items-center justify-center bg-white rounded-full p-0.5 shadow-md border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.jpg"
                  alt="KSR Coconuts Logo"
                  className="w-full h-full object-contain rounded-full select-none"
                  draggable={false}
                />
              </div>
              <span className="font-poppins text-lg font-bold tracking-wider text-white group-hover:text-primary-light transition-colors duration-300">
                KSR COCONUTS
              </span>
            </a>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-500">
              <a href="tel:9989152333" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 99891 52333</span>
              </a>
              <a href="mailto:ksrcoconuts@gmail.com" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>ksrcoconuts@gmail.com</span>
              </a>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Ethakota, East Godavari, AP, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (Spans 2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-poppins mb-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products range (Spans 2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-poppins mb-6">
              {t.footer.productsTitle}
            </h4>
            <ul className="space-y-3.5 text-xs">
              {productRanges.map((title, idx) => (
                <li key={idx}>
                  <a href="#products" className="hover:text-primary transition-colors">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & QR Code (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest font-poppins mb-4">
                {t.footer.newsletter}
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={t.footer.newsletterPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white shadow-md transition-all flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <div className="text-[10px] text-emerald-500 font-semibold mt-2">
                  Subscribed successfully! Thank you.
                </div>
              )}
            </div>

            {/* QR Code and verified program */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="bg-white p-1 rounded-xl flex-shrink-0">
                {/* SVG vector mockup QR code */}
                <svg className="w-12 h-12 text-black" viewBox="0 0 100 100" fill="none">
                  {/* Outer border/anchor points */}
                  <rect x="10" y="10" width="25" height="25" stroke="currentColor" strokeWidth="6" />
                  <rect x="17" y="17" width="11" height="11" fill="currentColor" />
                  <rect x="65" y="10" width="25" height="25" stroke="currentColor" strokeWidth="6" />
                  <rect x="72" y="17" width="11" height="11" fill="currentColor" />
                  <rect x="10" y="65" width="25" height="25" stroke="currentColor" strokeWidth="6" />
                  <rect x="17" y="72" width="11" height="11" fill="currentColor" />
                  {/* Random pixels */}
                  <rect x="45" y="15" width="8" height="8" fill="currentColor" />
                  <rect x="55" y="25" width="8" height="8" fill="currentColor" />
                  <rect x="40" y="45" width="8" height="8" fill="currentColor" />
                  <rect x="50" y="55" width="8" height="8" fill="currentColor" />
                  <rect x="65" y="45" width="8" height="8" fill="currentColor" />
                  <rect x="75" y="65" width="8" height="8" fill="currentColor" />
                  <rect x="45" y="75" width="8" height="8" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider font-poppins flex items-center space-x-1">
                  <QrCode className="w-3.5 h-3.5 text-primary-light" />
                  <span>Trace Batch Origin</span>
                </div>
                <p className="text-[9px] text-neutral-500 font-inter mt-1 leading-normal">
                  Scan to trace soil certificates, exact harvest dates, and logistics temperature logs.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & payments */}
        <div className="pt-8 border-t border-[#1b3f27]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="font-medium tracking-wide">
            © {new Date().getFullYear()} KSR COCONUTS. {t.footer.rights}
          </div>

          {/* Payment channels badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-poppins">
              Accepted Payments:
            </span>
            <div className="flex items-center space-x-2 bg-neutral-900/60 border border-white/5 px-3 py-1 rounded-full text-[9px] font-bold text-neutral-300 font-poppins shadow-sm">
              <svg className="h-2.5 w-auto text-neutral-200 fill-current" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.8 0L6 7.6H4.2L2.5 1.6C2.4 1.1 2.2 0.9 1.7 0.6C1.2 0.3 0.4 0.1 0 0H3.1C3.5 0 3.8 0.3 3.9 0.7L4.9 5.8L6.8 0H8.8ZM12.7 5.1C12.7 3.3 10.3 3.2 10.3 2.3C10.3 2 10.6 1.7 11.2 1.6C11.5 1.6 12.3 1.5 12.8 1.8L13.1 0.3C12.6 0.1 11.9 0 11 0C9.3 0 8.1 0.9 8.1 2.2C8.1 4.1 10.6 4.2 10.6 5.1C10.6 5.4 10.3 5.7 9.7 5.8C9.2 5.8 8.4 5.6 7.9 5.3L7.6 6.8C8.1 7.1 9 7.3 9.8 7.3C11.7 7.3 12.7 6.4 12.7 5.1ZM17 7.6L18.6 0H16.9L15.3 7.6H17ZM24 0.2C23.6 0 23.1 0 22.7 0C21.4 0 20.5 0.7 20.5 2C20.5 3.3 21.6 3.4 21.6 4.3C21.6 4.6 21.3 4.9 20.7 4.9C20.1 4.9 19.3 4.6 18.9 4.3L18.6 5.8C19.1 6.1 20 6.3 20.8 6.3C22.1 6.3 23 5.6 23 4.3C23 3 21.9 2.9 21.9 2C21.9 1.7 22.2 1.4 22.8 1.4C23.2 1.4 23.8 1.5 24.2 1.7L24 0.2Z" />
              </svg>
            </div>
            <div className="bg-neutral-900/60 border border-white/5 px-3 py-1 rounded-full text-[9px] font-bold text-neutral-300 font-poppins shadow-sm">
              RUPAY
            </div>
            <div className="bg-neutral-900/60 border border-white/5 px-3 py-1 rounded-full text-[9px] font-bold text-neutral-300 font-poppins shadow-sm">
              GPAY
            </div>
            <div className="bg-neutral-900/60 border border-white/5 px-3 py-1 rounded-full text-[9px] font-bold text-neutral-300 font-poppins shadow-sm">
              PHONEPE
            </div>
            <div className="flex items-center space-x-1.5 bg-neutral-900/60 border border-[#1b3f27]/40 px-3 py-1 rounded-full text-[9px] font-bold text-[#81c784] font-poppins shadow-sm">
              <svg className="h-2.5 w-auto fill-current" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.2 0.2H10.1L8.1 7.2C7.8 8.1 7.4 8.7 6.9 9.1C6.4 9.5 5.8 9.7 4.9 9.7H2.8L3.7 6.7H5.2C5.6 6.7 5.9 6.6 6.1 6.3C6.3 6.0 6.4 5.6 6.5 5.1L8.2 0.2ZM14.1 0.2C14.7 0.2 15.2 0.3 15.6 0.6C16.0 0.9 16.2 1.2 16.3 1.7C16.4 2.1 16.3 2.6 16.1 3.1C15.8 4.0 15.4 4.7 14.8 5.3C14.2 5.9 13.5 6.2 12.7 6.2H10.7L9.3 11H7.2L10.7 0.2H14.1ZM13.4 3.7C13.6 3.7 13.8 3.6 13.9 3.5C14.0 3.3 14.1 3.1 14.2 2.8C14.3 2.5 14.2 2.3 14.1 2.1C14.0 2.0 13.8 1.9 13.5 1.9H12.3L11.8 3.7H13.4ZM18.2 0.2H20.3L17.2 11H15.1L18.2 0.2Z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
