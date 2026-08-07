import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu } from 'lucide-react';

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Generator parts with precise, non-overlapping HUD callout line coordinates (% of box width/height)
const callouts = [
  {
    id: 'tank',
    code: '01',
    label: 'জ্বালানি ট্যাংক',
    labelEn: 'Fuel Tank',
    dotX: 52,
    dotY: 18,
    linePath: 'M 52 18 L 52 5 L 68 5',
    badgePos: 'left-[66%] top-[-16px]',
  },
  {
    id: 'recoil',
    code: '02',
    label: 'রিকয়েল স্টার্টার',
    labelEn: 'Recoil Starter',
    dotX: 20,
    dotY: 52,
    linePath: 'M 20 52 L -4 52',
    badgePos: 'right-[102%] top-[42%]',
  },
  {
    id: 'frame',
    code: '03',
    label: 'হেভি স্টিল ফ্রেম',
    labelEn: 'Heavy Duty Frame',
    dotX: 28,
    dotY: 78,
    linePath: 'M 28 78 L -4 78',
    badgePos: 'right-[102%] top-[72%]',
  },
  {
    id: 'engine',
    code: '04',
    label: 'ডিজেল ইঞ্জিন',
    labelEn: 'Diesel Engine',
    dotX: 42,
    dotY: 58,
    linePath: 'M 42 58 L 42 94 L 22 94',
    badgePos: 'right-[78%] bottom-[-42px]',
  },
  {
    id: 'panel',
    code: '05',
    label: 'কন্ট্রোল প্যানেল',
    labelEn: 'Control Panel',
    dotX: 78,
    dotY: 42,
    linePath: 'M 78 42 L 104 42',
    badgePos: 'left-[102%] top-[34%]',
  },
  {
    id: 'outlet',
    code: '06',
    label: 'পাওয়ার আউটলেট',
    labelEn: 'Power Outlet',
    dotX: 84,
    dotY: 56,
    linePath: 'M 84 56 L 104 56',
    badgePos: 'left-[102%] top-[58%]',
  },
  {
    id: 'avr',
    code: '07',
    label: 'এভিআর (AVR)',
    labelEn: 'Voltage Regulator',
    dotX: 66,
    dotY: 64,
    linePath: 'M 66 64 L 66 94 L 78 94',
    badgePos: 'left-[78%] bottom-[-42px]',
  },
];

function GeneratorHotspots() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full max-w-xl py-10 px-6 sm:px-14 select-none">
      {/* Outer Wrapper for Callout positioning */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center mb-8">

        {/* SVG Connecting Callout Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFC857" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {callouts.map((item) => {
            const isActive = activeHotspot === item.id;
            return (
              <g key={item.id}>
                {/* Outer Glow Stroke */}
                <path
                  d={item.linePath}
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth={isActive ? '1.2' : '0.6'}
                  strokeDasharray={isActive ? 'none' : '1.5 1.5'}
                  opacity={isActive ? 1 : 0.65}
                  filter={isActive ? 'url(#glowEffect)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Active Pulsing White Stroke */}
                {isActive && (
                  <path
                    d={item.linePath}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeDasharray="2 4"
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
          alt="Kipor KDE 6500E Generator — প্রিমিয়াম ইন্টারেক্টিভ পার্টস"
          className="w-full h-auto max-h-80 sm:max-h-96 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] z-10 pointer-events-none"
          draggable={false}
        />

        {/* Callout Hotspot Dots & HUD Badges */}
        {callouts.map((spot, idx) => {
          const isActive = activeHotspot === spot.id;
          return (
            <React.Fragment key={spot.id}>
              {/* Hotspot Pulsing Target Dot on Generator */}
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
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: idx * 0.25 }}
                    className="absolute w-5 h-5 rounded-full bg-[#F5A623]"
                  />
                  {/* Inner Solid Dot */}
                  <span
                    className={`relative block rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'w-4 h-4 bg-white border-[#F5A623] scale-125 shadow-[0_0_15px_#F5A623]'
                        : 'w-3 h-3 bg-[#F5A623] border-black shadow-md group-hover:scale-125'
                    }`}
                  />
                </div>
              </div>

              {/* Ultra-Premium HUD Callout Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                className={`absolute z-30 cursor-pointer whitespace-nowrap ${spot.badgePos}`}
              >
                <div
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border transition-all duration-300 flex items-center gap-2.5 shadow-2xl ${
                    isActive
                      ? 'bg-[#1C1405] border-[#F5A623] shadow-[0_0_22px_rgba(245,166,35,0.45)] scale-105 -translate-y-0.5'
                      : 'bg-[#121212]/95 border-white/15 hover:border-[#F5A623]/70 hover:bg-[#1A1A1A]'
                  }`}
                >
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                      isActive
                        ? 'bg-[#F5A623] text-black font-extrabold'
                        : 'bg-white/10 text-[#F5A623]'
                    }`}
                  >
                    {spot.code}
                  </span>

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
      <div className="text-center pt-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-[#F5A623]/30 text-xs text-gray-200 font-bengali shadow-md">
          <Cpu size={14} className="text-[#F5A623] animate-pulse" />
          <span>পার্টসের বিস্তারিত দেখতে যেকোনো ব্যাজে হোভার বা ক্লিক করুন</span>
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
    <section className="py-16 lg:py-24 bg-[#0E0E0E] relative border-b border-white/5">
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

          {/* Right — Ultra Premium Tech Callout HUD Interactive Generator */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-6 flex justify-center smooth-gpu py-4"
          >
            <GeneratorHotspots />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
