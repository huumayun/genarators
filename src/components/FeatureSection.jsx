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

// Generator parts with HUD callout line coordinates (% of box width/height)
const callouts = [
  {
    id: 'tank',
    label: 'জ্বালানি ট্যাংক',
    labelEn: 'Fuel Tank',
    dotX: 52,
    dotY: 18,
    badgeX: 52,
    badgeY: 2,
    linePath: 'M 52 18 L 52 7 L 62 7',
    badgeAlign: 'left',
    badgePos: 'left-[62%] top-[-8px]',
  },
  {
    id: 'recoil',
    label: 'রিকয়েল স্টার্টার',
    labelEn: 'Recoil Starter',
    dotX: 20,
    dotY: 52,
    linePath: 'M 20 52 L 4 52',
    badgePos: 'right-[98%] top-[45%]',
    badgeAlign: 'right',
  },
  {
    id: 'engine',
    label: 'ডিজেল ইঞ্জিন',
    labelEn: 'Diesel Engine',
    dotX: 42,
    dotY: 58,
    linePath: 'M 42 58 L 42 85 L 28 85',
    badgePos: 'right-[74%] bottom-[-18px]',
    badgeAlign: 'right',
  },
  {
    id: 'panel',
    label: 'কন্ট্রোল প্যানেল',
    labelEn: 'Control Panel',
    dotX: 78,
    dotY: 42,
    linePath: 'M 78 42 L 96 42',
    badgePos: 'left-[98%] top-[35%]',
    badgeAlign: 'left',
  },
  {
    id: 'outlet',
    label: 'পাওয়ার আউটলেট',
    labelEn: 'Power Outlet',
    dotX: 84,
    dotY: 56,
    linePath: 'M 84 56 L 96 68',
    badgePos: 'left-[98%] top-[62%]',
    badgeAlign: 'left',
  },
  {
    id: 'avr',
    label: 'এভিআর (AVR)',
    labelEn: 'Voltage Regulator',
    dotX: 66,
    dotY: 64,
    linePath: 'M 66 64 L 66 88 L 78 88',
    badgePos: 'left-[78%] bottom-[-22px]',
    badgeAlign: 'left',
  },
  {
    id: 'frame',
    label: 'হেভি স্টিল ফ্রেম',
    labelEn: 'Heavy Duty Frame',
    dotX: 28,
    dotY: 78,
    linePath: 'M 28 78 L 10 78 L 10 90',
    badgePos: 'left-[0%] bottom-[-26px]',
    badgeAlign: 'left',
  },
];

function GeneratorHotspots() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full max-w-xl py-6 px-4 sm:px-12 select-none">
      {/* Outer Wrapper for Callout positioning */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">

        {/* SVG Connecting Callout Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFC857" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {callouts.map((item) => {
            const isActive = activeHotspot === item.id;
            return (
              <g key={item.id}>
                {/* Background Leader Line */}
                <path
                  d={item.linePath}
                  fill="none"
                  stroke={isActive ? '#F5A623' : '#F5A623'}
                  strokeWidth={isActive ? '0.8' : '0.4'}
                  strokeDasharray={isActive ? 'none' : '1.5 1.5'}
                  opacity={isActive ? 1 : 0.6}
                  filter={isActive ? 'url(#glowEffect)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Animated Light Pulse on Line */}
                {isActive && (
                  <path
                    d={item.linePath}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                    strokeDasharray="2 6"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Generator Main Image */}
        <img
          src="/images/kipor-6500.png"
          alt="Kipor KDE 6500E Generator — ইন্টারেক্টিভ পার্টস"
          className="w-full h-auto max-h-80 sm:max-h-96 object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] z-10 pointer-events-none"
          draggable={false}
        />

        {/* Callout Hotspot Dots & HUD Badges */}
        {callouts.map((spot, idx) => {
          const isActive = activeHotspot === spot.id;
          return (
            <React.Fragment key={spot.id}>
              {/* Dot on Generator Part */}
              <div
                className="absolute z-30 cursor-pointer group"
                style={{
                  left: `${spot.dotX}%`,
                  top: `${spot.dotY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
              >
                <div className="relative flex items-center justify-center">
                  {/* Ping Animation Ring */}
                  <motion.span
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.3 }}
                    className="absolute w-4 h-4 rounded-full bg-[#F5A623]"
                  />
                  {/* Inner Solid Dot */}
                  <span
                    className={`relative block rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'w-4 h-4 bg-white border-[#F5A623] scale-125 shadow-[0_0_12px_#F5A623]'
                        : 'w-3 h-3 bg-[#F5A623] border-black shadow-md'
                    }`}
                  />
                </div>
              </div>

              {/* Connected Callout Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                className={`absolute z-30 cursor-pointer whitespace-nowrap ${spot.badgePos}`}
              >
                <div
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1A1305] border-[#F5A623] shadow-[0_0_20px_rgba(245,166,35,0.4)] scale-105'
                      : 'bg-[#0E0E0E]/90 border-white/15 hover:border-[#F5A623]/60 shadow-lg hover:bg-[#141414]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? 'bg-[#F5A623] animate-ping' : 'bg-[#F5A623]'
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[11px] sm:text-xs font-extrabold font-heading transition-colors ${
                        isActive ? 'text-[#F5A623]' : 'text-white'
                      }`}
                    >
                      {spot.label}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold tracking-wide">
                      {spot.labelEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}

      </div>

      {/* Bottom Hint */}
      <div className="text-center mt-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414] border border-white/10 text-[11px] text-gray-300 font-bengali">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
          <span>যেকোনো পার্টস হোভার বা টাচ করে বিস্তারিত জানুন</span>
        </span>
      </div>
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
    <section className="py-16 lg:py-24 bg-[#0E0E0E] relative border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Text & Checkmarks */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-6 space-y-6 smooth-gpu"
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

          {/* Right — Tech Callout HUD Interactive Generator */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-6 flex justify-center smooth-gpu overflow-visible"
          >
            <GeneratorHotspots />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
