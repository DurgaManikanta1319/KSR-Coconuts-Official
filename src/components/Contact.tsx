'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    const whatsappText = `Hello KSR COCONUTS, I have a contact inquiry:
• *Name*: ${formData.name}
• *Phone*: ${formData.phone}
• *Email*: ${formData.email}
• *Subject*: ${formData.subject}
• *Message*: ${formData.message}`;

    const whatsappUrl = `https://wa.me/919989152333?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
      setFormState('success');
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
      setTimeout(() => setFormState('idle'), 5000); // clear success banner after 5s
    }, 1200);
  };

  const handleSocialClick = (platform: string) => {
    window.open(`https://${platform}.com/ksrcoconuts`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-bg-base/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-poppins text-text-base mt-4 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.contact.title}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 font-inter font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        <div className="flex flex-col gap-8">
          
          {/* Top Row: Direct Info and Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Direct Info (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold font-poppins text-white mb-8">
                  {t.contact.officeDetails}
                </h3>
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#0d2214] border border-[#1e482f] flex items-center justify-center text-[#81c784] flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-poppins">{t.contact.address}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm font-inter leading-relaxed mt-1">
                      {t.contact.addressVal}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a href="tel:9989152333" className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0d2214] border border-[#1e482f] flex items-center justify-center text-[#81c784] flex-shrink-0 mt-1 group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-poppins">{t.contact.phone}</h4>
                    <p className="text-neutral-400 text-sm font-inter font-bold group-hover:text-[#81c784] transition-colors mt-1">
                      +91 99891 52333
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:ksrcoconuts@gmail.com" className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0d2214] border border-[#1e482f] flex items-center justify-center text-[#81c784] flex-shrink-0 mt-1 group-hover:scale-105 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-poppins">{t.contact.email}</h4>
                    <p className="text-neutral-400 text-sm font-inter group-hover:text-[#81c784] transition-colors mt-1">
                      ksrcoconuts@gmail.com
                    </p>
                  </div>
                </a>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#0d2214] border border-[#1e482f] flex items-center justify-center text-[#81c784] flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-poppins">{t.contact.hours}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm font-inter mt-1 leading-relaxed">
                      {t.contact.hoursVal}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-12 pt-6 border-t border-[#1b3f27]">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  {t.contact.followUs}
                </div>
                <div className="flex space-x-3.5">
                  <button onClick={() => handleSocialClick('facebook')} className="w-11 h-11 rounded-xl bg-[#0e2216] border border-[#1b3f27] hover:bg-[#1b3f27] text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer" title="Facebook">
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </button>
                  <button onClick={() => handleSocialClick('instagram')} className="w-11 h-11 rounded-xl bg-[#0e2216] border border-[#1b3f27] hover:bg-[#1b3f27] text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer" title="Instagram">
                    <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </button>
                  <button onClick={() => handleSocialClick('youtube')} className="w-11 h-11 rounded-xl bg-[#0e2216] border border-[#1b3f27] hover:bg-[#1b3f27] text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer" title="YouTube">
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-.997-1.078-1.785-2.093-2.057C19.57 3.545 12 3.545 12 3.545s-7.57 0-9.405.561C1.58 4.378.774 5.166.502 6.163.003 7.993 0 12 0 12s.003 4.007.502 5.837c.272.997 1.078 1.785 2.093 2.057 1.835.561 9.405.561 9.405.561s7.57 0 9.405-.561c1.015-.272 1.821-1.06 2.093-2.057.499-1.83.502-5.837.502-5.837s-.003-4.007-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </button>
                  <button onClick={() => handleSocialClick('linkedin')} className="w-11 h-11 rounded-xl bg-[#0e2216] border border-[#1b3f27] hover:bg-[#1b3f27] text-neutral-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer" title="LinkedIn">
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (Spans 7 cols) */}
            <div className="lg:col-span-7 bg-[#08130c]/90 border border-[#1b3f27] p-8 sm:p-10 rounded-[32px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold font-poppins text-white mb-6">
                  {t.contact.form.title}
                </h3>

                {/* Success Notification Banner */}
                <AnimatePresence>
                  {formState === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4.5 rounded-2xl flex items-start space-x-3 text-sm font-semibold"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{t.contact.form.success}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.form.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#4caf50] text-neutral-200 placeholder-neutral-500 font-semibold"
                  />
                </div>

                {/* Grid (Email & Phone) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.form.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#4caf50] text-neutral-200 placeholder-neutral-500 font-semibold"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder={t.contact.form.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#4caf50] text-neutral-200 placeholder-neutral-500 font-semibold"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#4caf50] text-neutral-200 font-semibold appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238aa091' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                      backgroundPosition: 'right 16px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="General Enquiry" className="bg-[#08130c] text-neutral-200">
                      {t.contact.form.subjects.general}
                    </option>
                    <option value="Wholesale Sourcing" className="bg-[#08130c] text-neutral-200">
                      {t.contact.form.subjects.wholesale}
                    </option>
                    <option value="Retail Sourcing" className="bg-[#08130c] text-neutral-200">
                      {t.contact.form.subjects.retail}
                    </option>
                    <option value="Partnership Opportunities" className="bg-[#08130c] text-neutral-200">
                      {t.contact.form.subjects.partnership}
                    </option>
                    <option value="Other Inquiry" className="bg-[#08130c] text-neutral-200">
                      {t.contact.form.subjects.other}
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder={t.contact.form.msg}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#4caf50] text-neutral-200 placeholder-neutral-500 font-semibold resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl bg-[#2e7d32] hover:bg-[#388e3c] text-white font-bold font-poppins transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 border border-white/10 shadow-lg cursor-pointer"
                >
                  {formState === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.contact.form.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>{t.contact.form.send}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Row: Google Map (Spans Full Width) */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-primary-light/10 aspect-video md:aspect-[21/9] lg:aspect-auto lg:h-80 w-full group">
            <iframe
              title="KSR Coconuts Ethakota Farm Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.0253522799508!2d81.8310044!3d16.7255868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37c1246bac38ad%3A0x604ecb98554ca965!2sKSR%20COCONUTS%20(BONDALA%20SRINU)!5e0!3m2!1sen!2sin!4v1719409890212!5m2!1sen!2sin"
              className="w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-180"
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-primary/0 transition-colors" />
            {/* Open Map CTA */}
            <a
              href="https://maps.app.goo.gl/kFFCFVPATfhbxrt36"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-primary backdrop-blur-md text-[10px] text-white font-bold flex items-center space-x-1.5 shadow-lg transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
