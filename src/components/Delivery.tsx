'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, MessageSquare, Info, ChevronDown } from 'lucide-react';

interface ZoneOption {
  key: string;
  name: string;
  distance: string;
  baseFee: number;
  freeQty: number;
  timeRange: string;
  truckTime: string;
}

export const Delivery: React.FC = () => {
  const { t, language } = useApp();
  const [selectedZone, setSelectedZone] = useState<string>('local');
  const [quantity, setQuantity] = useState<number>(100);
  const [fee, setFee] = useState<string>('Free Delivery');
  const [time, setTime] = useState<string>('1-2 Hours');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const zones: ZoneOption[] = [
    {
      key: 'local',
      name: language === 'en' ? 'Local / Ethakota (within 5 km)' : 'ఈతకోట పరిసర ప్రాంతాలు (5 కి.మీ లోపు)',
      distance: 'approx. 3 km',
      baseFee: 20,
      freeQty: 50,
      timeRange: '1-2 Hours',
      truckTime: '1-2 Hours'
    },
    {
      key: 'rajahmundry',
      name: language === 'en' ? 'Rajahmundry' : 'రాజమండ్రి',
      distance: 'approx. 30 km',
      baseFee: 80,
      freeQty: 100,
      timeRange: '2-3 Hours',
      truckTime: '2-4 Hours'
    },
    {
      key: 'kakinada',
      name: language === 'en' ? 'Kakinada' : 'కాకినాడ',
      distance: 'approx. 45 km',
      baseFee: 120,
      freeQty: 150,
      timeRange: '3-4 Hours',
      truckTime: '3-5 Hours'
    },
    {
      key: 'amalapuram',
      name: language === 'en' ? 'Amalapuram' : 'అమలాపురం',
      distance: 'approx. 25 km',
      baseFee: 60,
      freeQty: 80,
      timeRange: '1-2 Hours',
      truckTime: '1-3 Hours'
    },
    {
      key: 'yanam',
      name: language === 'en' ? 'Yanam' : 'యానాం',
      distance: 'approx. 50 km',
      baseFee: 90,
      freeQty: 100,
      timeRange: '2-3 Hours',
      truckTime: '2-4 Hours'
    },
    {
      key: 'samalkot',
      name: language === 'en' ? 'Samalkot' : 'సామర్లకోట',
      distance: 'approx. 40 km',
      baseFee: 100,
      freeQty: 120,
      timeRange: '3-4 Hours',
      truckTime: '3-5 Hours'
    },
    {
      key: 'westGodavari',
      name: language === 'en' ? 'West Godavari Cities' : 'పశ్చిమ గోదావరి నగరాలు',
      distance: 'approx. 60 km',
      baseFee: 150,
      freeQty: 200,
      timeRange: 'Next Day',
      truckTime: 'Next Day'
    }
  ];

  const currentZone = zones.find(z => z.key === selectedZone) || zones[0];

  // Perform estimator calculation on input changes
  useEffect(() => {
    if (quantity < 10) {
      setFee(language === 'en' ? 'Min order 10 pcs' : 'కనీస ఆర్డర్ 10 పిసిలు');
      setTime('N/A');
      return;
    }

    if (quantity >= currentZone.freeQty) {
      setFee(language === 'en' ? 'Free Delivery' : 'ఉచిత డెలివరీ');
    } else {
      setFee(`₹${currentZone.baseFee}`);
    }

    setTime(currentZone.timeRange);
  }, [selectedZone, quantity, currentZone, language]);

  const handleBookOrder = () => {
    if (quantity < 10) return;

    const message = `Hello KSR COCONUTS, I would like to book a delivery:
• *Zone*: ${currentZone.name} (${currentZone.distance})
• *Quantity*: ${quantity} Coconuts
• *Est. Delivery Fee*: ${fee}
• *Est. Delivery Time*: ${time}

Please confirm today's prices and coordinate my dispatch.`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/919989152333?text=${encodedText}`, '_blank');
  };

  return (
    <section id="delivery" className="py-24 relative overflow-hidden bg-bg-base/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-text-base mb-4">
            {language === 'en' ? 'Fast Delivery Service' : 'వేగవంతమైన డెలివరీ సర్వీస్'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-base text-neutral-600 dark:text-neutral-400 font-inter font-light">
            {language === 'en' 
              ? 'We ship directly from our farms to your commercial center or home.' 
              : 'మా తోటల నుండి నేరుగా మీ వ్యాపార కేంద్రాలకు లేదా నివాసాలకు రవాణా చేస్తాము.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Truck Express Routing Card */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 rounded-3xl min-h-[380px]">
            <div>
              <h3 className="text-xl font-bold font-poppins text-text-base">
                Ethakota Express Routing
              </h3>
              <p className="text-xs text-neutral-400 font-inter mt-1.5 leading-relaxed">
                Active farm dispatches flowing throughout East and West Godavari districts.
              </p>
            </div>

            {/* Simulated route track with animated truck */}
            <div className="relative w-full h-28 my-8 bg-neutral-900/50 dark:bg-black/30 border border-primary-light/5 rounded-2xl flex items-center justify-between px-8 overflow-hidden">
              {/* Central dotted route line */}
              <div className="absolute left-8 right-8 h-0.5 border-t border-dashed border-primary-light/25 z-0" />
              
              {/* Start node (Ethakota) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5.5 h-5.5 rounded-full bg-amber-500 border-4 border-neutral-900 flex items-center justify-center shadow-lg" />
                <span className="text-[9px] font-bold text-amber-500 font-mono mt-1">Ethakota (Farm)</span>
              </div>

              {/* Dynamic Animated Truck */}
              <motion.div
                key={selectedZone}
                className="absolute z-20 flex flex-col items-center"
                initial={{ left: '20%' }}
                animate={{ left: '65%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Floating "Fresh Coconuts" badge */}
                <div className="bg-primary/95 text-white text-[8px] font-bold font-poppins px-2 py-0.5 rounded-md shadow-md mb-1.5 whitespace-nowrap animate-bounce">
                  Fresh Coconuts
                </div>
                <Truck className="w-6 h-6 text-primary-light" />
              </motion.div>

              {/* End node (Target Zone) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5.5 h-5.5 rounded-full bg-primary border-4 border-neutral-900 flex items-center justify-center shadow-lg animate-pulse" />
                <span className="text-[9px] font-bold text-primary font-mono mt-1 truncate max-w-[80px]">
                  {selectedZone === 'local' ? 'Local Area' : currentZone.name}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-primary-light/5 pt-5">
              <div className="flex items-center space-x-2 text-primary-light text-xs font-semibold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span>Truck En Route...</span>
              </div>
              <div className="text-xs text-neutral-400 font-inter">
                Estimated Delivery: <span className="font-bold text-text-base">{currentZone.truckTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Calculator Form */}
          <div className="lg:col-span-7 bg-[#08130c]/90 border border-[#1b3f27] p-8 sm:p-10 rounded-[32px] flex flex-col justify-between shadow-2xl relative">
            <div>
              <h3 className="text-2xl font-bold font-poppins text-white mb-8">
                Instant Order Estimator
              </h3>

              <div className="space-y-6">
                {/* Select Delivery Zone */}
                <div className="relative">
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">
                    {language === 'en' ? 'SELECT DELIVERY ZONE' : 'డెలివరీ జోన్‌ను ఎంచుకోండి'}
                  </label>
                  
                  {/* Custom Selector Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm text-neutral-200 focus:outline-none focus:border-primary flex items-center justify-between font-semibold cursor-pointer"
                  >
                    <span>
                      {currentZone.name} ({currentZone.distance})
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#81c784] transition-transform duration-350 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Custom Dropdown Menu Options */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        {/* Overlay to catch clicks outside */}
                        <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)} />
                        
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 right-0 mt-2 bg-[#08130c] border border-[#1b3f27] rounded-xl shadow-2xl z-35 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-transparent"
                        >
                          {zones.map((zone) => (
                            <button
                              key={zone.key}
                              type="button"
                              onClick={() => {
                                setSelectedZone(zone.key);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3.5 text-left text-sm flex items-center justify-between hover:bg-[#13301e]/55 transition-colors border-b border-primary-light/5 last:border-b-0 cursor-pointer ${
                                selectedZone === zone.key ? 'text-[#81c784] bg-[#13301e]/30' : 'text-neutral-300'
                              }`}
                            >
                              <span className="font-semibold">{zone.name}</span>
                              <span className={`text-xs font-semibold ${selectedZone === zone.key ? 'text-[#81c784]' : 'text-neutral-500'}`}>
                                {zone.distance}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Order Quantity Input */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">
                    {language === 'en' ? 'ORDER QUANTITY (PIECES)' : 'ఆర్డర్ పరిమాణం (ముక్కలు)'}
                  </label>
                  <input
                    type="number"
                    min={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-[#0c1e13]/85 border border-[#1b3f27] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary text-neutral-200 font-semibold"
                  />
                  <span className="block text-[10px] text-neutral-500 font-semibold mt-2.5">
                    {language === 'en' 
                      ? `*Min order 10 pieces. Orders ≥ ${currentZone.freeQty} qualify for free delivery locally.`
                      : `*కనీస ఆర్డర్ 10 ముక్కలు. స్థానికంగా ఉచిత డెలివరీ కోసం ఆర్డర్లు ≥ ${currentZone.freeQty} ఉండాలి.`}
                  </span>
                </div>

                {/* Est Fee & Est Time Readouts */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-[#07150c] border border-primary/20 rounded-2xl">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-inter">
                      {language === 'en' ? 'EST. DELIVERY FEE' : 'అంచనా డెలివరీ రుసుము'}
                    </div>
                    <div className="text-base sm:text-lg font-bold font-poppins text-[#81c784] mt-1">
                      {fee}
                    </div>
                  </div>

                  <div className="p-4 bg-[#07150c] border border-primary/20 rounded-2xl">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-inter">
                      {language === 'en' ? 'EST. DELIVERY TIME' : 'అంచనా డెలివరీ సమయం'}
                    </div>
                    <div className="text-base sm:text-lg font-bold font-poppins text-[#81c784] mt-1">
                      {time}
                    </div>
                  </div>
                </div>

                {/* Door Delivery Available Details banner */}
                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-[#0d2214] border border-[#1b3f27] text-xs text-neutral-400 mt-5">
                  <div className="text-2xl flex-shrink-0 mt-0.5">
                    🚪
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase tracking-wider text-[10px]">
                      {language === 'en' ? 'DOOR DELIVERY AVAILABLE' : 'డోర్ డెలివరీ అందుబాటులో ఉంది'}
                    </div>
                    <p className="mt-1 leading-relaxed font-inter font-light text-neutral-400">
                      {language === 'en'
                        ? 'Enjoy free, contactless door delivery directly to your home or shop within a 5 km radius of Ethakota.'
                        : 'ఈతకోట నుండి 5 కి.మీల పరిధిలో మీ ఇల్లు లేదా దుకాణానికి నేరుగా ఉచిత, కాంటాక్ట్‌లెస్ డోర్ డెలివరీని ఆస్వాదించండి.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book via WhatsApp Button */}
            <button
              onClick={handleBookOrder}
              disabled={quantity < 10}
              className="w-full mt-8 py-4 bg-[#2e7d32] hover:bg-[#388e3c] text-white font-bold font-poppins rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 border border-white/10 shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white text-white" />
              <span>
                {language === 'en' ? 'Book Order via WhatsApp' : 'వాట్సాప్ ద్వారా ఆర్డర్ చేయండి'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
