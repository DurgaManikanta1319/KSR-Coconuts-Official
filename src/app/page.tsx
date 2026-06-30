'use client';

import React, { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { LeavesBackground } from '@/components/LeavesBackground';
import { Hero } from '@/components/Hero';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Products } from '@/components/Products';
import { Wholesale } from '@/components/Wholesale';
import { AboutUs } from '@/components/AboutUs';
import { Stats } from '@/components/Stats';
import { Delivery } from '@/components/Delivery';
import { Gallery } from '@/components/Gallery';
import { Reviews } from '@/components/Reviews';
import { FounderJourney } from '@/components/FounderJourney';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import dynamic from 'next/dynamic';
import { FloatingActions } from '@/components/FloatingActions';
import { AnnouncementModal } from '@/components/AnnouncementModal';
import { LaunchCountdown, shouldShowLaunch } from '@/components/LaunchCountdown';

const CustomCursor = dynamic(
  () => import('@/components/CustomCursor').then((mod) => mod.CustomCursor),
  { ssr: false }
);

export default function Home() {
  const [showLaunch, setShowLaunch] = useState<boolean | null>(null); // null = not determined yet
  const [isLoading, setIsLoading] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Determine on mount (client-side only) whether to show the launch countdown
  useEffect(() => {
    setShowLaunch(shouldShowLaunch());
  }, []);

  // Still determining — render nothing to avoid flash
  if (showLaunch === null) return null;

  // Show the launch countdown page
  if (showLaunch) {
    return (
      <LaunchCountdown
        onEnter={() => setShowLaunch(false)}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
          {/* Custom interactive mouse cursor */}
          <CustomCursor />

          {/* Announcement Modal Popup */}
          <AnnouncementModal isOpen={showAnnouncement} onClose={() => setShowAnnouncement(false)} />

          {/* Transparent Glass Sticky Navbar */}
          <Navbar />

          {/* Floating Leaves Parallax overlay across the site */}
          <LeavesBackground />

          <main className="flex-grow">
            {/* 100vh Hero Banner with Floating Coconut & Counters */}
            <Hero />

            {/* Why Choose Us features list */}
            <WhyChooseUs />

            {/* Premium Products & Checkout Grid */}
            <Products />

            {/* B2B Wholesale Banner */}
            <Wholesale />

            {/* About Us Farm Story, Timeline & Map */}
            <AboutUs />

            {/* Animated scroll stats Counters banner */}
            <Stats />

            {/* Delivery Rate Calculator & Delta map */}
            <Delivery />

            {/* Pinterest Masonry Lightroom Gallery */}
            <Gallery />

            {/* Google reviews slider */}
            <Reviews />

            {/* Founder's Journey / Director Feedback Section */}
            <FounderJourney />

            {/* Accordion FAQ Panel */}
            <FAQ />

            {/* Form & details Contact section */}
            <Contact />
          </main>

          {/* Large Premium Footer */}
          <Footer />

          {/* Bottom right floating controls (WhatsApp, Call, Top) */}
          <FloatingActions />
        </div>
      )}
    </>
  );
}

