import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Generator part hotspots — position as % of image width/height
const hotspots = [
  {
    id: 'recoil',
    label: 'রিকয়েল স্টার্টার',
    labelEn: 'Recoil Starter',
    x: 18,   // % from left
    y: 52,   // % from top
    side: 'right'
  },
  {
    id: 'engine',
    label: 'ডিজেল ইঞ্জিন',
    labelEn: 'Diesel Engine',
    x: 42,
    y: 58,
    side: 'right'
  },
  {
    id: 'tank',
    label: 'জ্বালানি ট্যাংক',
    labelEn: 'Fuel Tank',
    x: 50,
    y: 18,
    side: 'right'
  },
  {
    id: 'panel',
    label: 'কন্ট্রোল প্যানেল',
    labelEn: 'Control Panel',
    x: 78,
    y: 45,
    side: 'left'
  },
  {
    id: 'avr',
    label: 'এভিআর (AVR)',
    labelEn: 'Voltage Regulator',
    x: 65,
    y: 62,
    side: 'left'
  },
  {
    id: 'frame',
    label: 'স্টিল ফ্রেম',
    labelEn: 'Steel Frame',
    x: 30,
    y: 80,
    side: 'right'
  },
  {
    id: 'outlet',
    label: 'পাওয়ার আউটলেট',
    labelEn: 'Power Outlet',
    x: 85,
    y: 55,
    side: 'left'
  },
];

function GeneratorHotspots() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full max-w-lg select-none">
      {/* Generator Image */}
      <img
        src="/images/kipor-6500.png"
        alt="Kipor KDE 6500E Generator — ইন্টারেক্টিভ পার্ট গাইড"
        className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] z-10 pointer-events-none"
        draggable={false}
      />

      {/* Hotspot Markers */}
      {hotspots.map((spot) => {
        const isActive = activeHotspot === spot.id;
        return (
          <div
            key={spot.id}
            className="absolute z-20"
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActiveHotspot(spot.id)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            {/* Pulsing dot */}
            <div className="relative cursor-crosshair">
              {/* Outer pulse ring */}
              <span
                className={`absolute inset-0 rounded-full bg-[#F5A623] transition-all duration-300 ${
                  isActive ? 'scale-[2.5] opacity-0' : 'scale-[1.8] opacity-30 animate-ping'
                }`}
                style={{ width: 12, height: 12, top: 0, left: 0 }}
              />
              {/* Inner dot */}
              <span
                className={`relative block rounded-full border-2 transition-all duration-200 ${
                  isActive
                    ? 'w-4 h-4 bg-white border-white scale-125 shadow-lg shadow-white/30'
                    : 'w-3 h-3 bg-[#F5A623] border-[#F5A623]'
                }`}
              />
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 5 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute z-30 whitespace-nowrap pointer-events-none ${
                    spot.side === 'left'
                      ? 'right-5 top-1/2 -translate-y-1/2'
                      : 'left-5 top-1/2 -translate-y-1/2'
                  }`}
                >
                  <div className="bg-[#0E0E0E] border border-[#F5A623] rounded-xl px-3 py-2 shadow-2xl shadow-[#F5A623]/20">
                    <p className="text-[#F5A623] font-extrabold text-xs font-heading leading-tight">
                      {spot.label}
                    </p>
                    <p className="text-gray-400 text-[10px] font-medium mt-0.5">
                      {spot.labelEn}
                    </p>
                  </div>
                  {/* Arrow */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 ${
                      spot.side === 'left'
                        ? 'right-[-6px] border-l-[6px] border-l-[#F5A623] border-y-[5px] border-y-transparent'
                        : 'left-[-6px] border-r-[6px] border-r-[#F5A623] border-y-[5px] border-y-transparent'
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center text-[10px] text-gray-500 mt-2 font-bengali"
      >
        ✦ জেনারেটরের যেকোনো অংশে হোভার করুন
      </motion.p>
    </div>
  );
}

export default function FeatureSection() {
  const checkItems = [
    "নতুন ও পুরাতন জেনারেটর বিক্রয়",
    "সার্ভিস, মেরামত ও রক্ষণাবেক্ষণ",
    "দেশি-বিদেশি সকল ব্র্যান্ডের জেনারেটর",
    "অরিজিনাল পার্টস ও দক্ষ টেকনিশিয়ান"
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0E0E0E] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text & Checkmarks */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 space-y-6 smooth-gpu"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
              শক্তিশালী জেনারেটর, <br />
              <span className="text-[#F5A623]">নিশ্চিন্ত বিদ্যুৎ সমাধান</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              আমরা দিচ্ছি উন্নত মানের নতুন ও পুরাতন জেনারেটর, প্রফেশনাল সার্ভিস ও সাশ্রয়ী মূল্যে সেরা সেবার নিশ্চয়তা। বাসা, অফিস, কারখানা, হাসপাতালসহ সব ধরনের প্রয়োজনের জন্য আমরা আছি আপনার পাশে।
            </p>

            <div className="space-y-3.5 pt-2">
              {checkItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 smooth-gpu"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center text-black font-bold">
                    <CheckCircle2 size={16} className="text-black" />
                  </div>
                  <span className="text-gray-200 text-base font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Interactive Generator */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 flex justify-center smooth-gpu"
          >
            <GeneratorHotspots />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
