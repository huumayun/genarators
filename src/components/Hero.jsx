import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, Globe, ArrowRight } from 'lucide-react';
import { companyDetails } from '../data/mockData';

export default function Hero({ onNavigateProducts, onNavigateServices }) {
  return (
    <section className="relative overflow-hidden bg-[#0E0E0E] min-h-[480px] sm:min-h-[540px] flex items-center border-b border-white/10">
      
      {/* Background Banner Image matching exact design screenshot */}
      <div 
        className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: `url('/images/hero-bg-banner.png')`
        }}
      />

      {/* Dark Vignette Gradient Overlay for sharp text readability on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:to-black/20 z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-5 text-left"
          >
            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-heading">
              নতুন পুরাতন জেনারেটর <br />
              <span className="text-[#F5A623] block mt-1 drop-shadow-lg">
                কিনুন বিশ্বস্ত প্রতিষ্ঠান থেকে
              </span>
            </h1>

            {/* Main Paragraph */}
            <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {companyDetails.description}
            </p>

            {/* Feature Bullets */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs text-gray-200 shadow-sm">
                <span className="p-1 bg-[#F5A623] text-black rounded-full">
                  <Settings size={12} />
                </span>
                <span>নতুন ও পুরাতন জেনারেটর</span>
              </div>

              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs text-gray-200 shadow-sm">
                <span className="p-1 bg-[#F5A623] text-black rounded-full">
                  <Wrench size={12} />
                </span>
                <span>সার্ভিস ও মেরামত</span>
              </div>

              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-full text-xs text-gray-200 shadow-sm">
                <span className="p-1 bg-[#F5A623] text-black rounded-full">
                  <Globe size={12} />
                </span>
                <span>দেশি-বিদেশি ব্র্যান্ড</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onNavigateProducts}
                className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm sm:text-base px-7 py-3 rounded-full transition-all duration-200 shadow-xl shadow-[#F5A623]/30 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>জেনারেটর দেখুন</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onNavigateServices}
                className="bg-black/50 hover:bg-white/15 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-full border border-white/30 hover:border-white/60 backdrop-blur-sm transition-all duration-200 flex items-center justify-center"
              >
                সার্ভিস সম্পর্কে জানুন
              </button>
            </div>
          </motion.div>

          {/* Right Column spacer to let background banner CAT generator show cleanly */}
          <div className="hidden lg:block lg:col-span-5 min-h-[320px]" />

        </div>
      </div>
    </section>
  );
}
