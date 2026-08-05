import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Wrench, DollarSign, ArrowRight } from 'lucide-react';
import { whyChooseUsData } from '../data/mockData';

export default function WhyChooseUs({ onNavigateAbout }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Shield': return <ShieldCheck className="w-5 h-5 text-[#F5A623]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#F5A623]" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#F5A623]" />;
      case 'Coins': return <DollarSign className="w-5 h-5 text-[#F5A623]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#F5A623]" />;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#0E0E0E] relative font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
            কেন আমাদের <span className="text-[#F5A623]">বেছে নেবেন?</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            আমরা মানসম্মত পণ্য ও সেবার মাধ্যমে গ্রাহকের আস্থা ও সন্তুষ্টি অর্জনে প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>

        {/* 4 Sleek Horizontal Cards Grid matching exact screenshot 1:1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyChooseUsData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#F5A623] text-black p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#F5A623]/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3.5"
            >
              {/* Dark Icon Circle on Left */}
              <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center shrink-0 shadow-md">
                {getIcon(card.icon)}
              </div>

              {/* Title & Description on Right */}
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold font-heading text-black truncate">
                  {card.title}
                </h3>
                <p className="text-black/85 text-[11px] sm:text-xs leading-snug font-semibold line-clamp-2">
                  {card.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Center Button matching exact screenshot */}
        <div className="text-center pt-8">
          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center justify-center bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs sm:text-sm px-8 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#F5A623]/20 hover:scale-[1.03] active:scale-95"
          >
            <span>আরও জানুন</span>
          </button>
        </div>

      </div>
    </section>
  );
}
