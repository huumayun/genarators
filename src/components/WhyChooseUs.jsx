import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Wrench, DollarSign } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function WhyChooseUs({ onNavigateAbout }) {
  const { whyChooseUs } = useData();
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
    <section className="py-12 lg:py-16 bg-black/40 backdrop-blur-sm relative font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title - animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 space-y-2"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
            কেন আমাদের <span className="text-[#F5A623]">বেছে নেবেন?</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            আমরা মানসম্মত পণ্য ও সেবার মাধ্যমে গ্রাহকের আস্থা ও সন্তুষ্টি অর্জনে প্রতিশ্রুতিবদ্ধ।
          </p>
        </motion.div>

        {/* 4 Cards Grid — staggered slide-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyChooseUs.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              className="bg-[#F5A623] text-black p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#F5A623]/20 transition-shadow duration-300 flex items-center gap-3.5 smooth-gpu cursor-default"
            >
              {/* Dark Icon Circle */}
              <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center shrink-0 shadow-md">
                {getIcon(card.icon)}
              </div>

              {/* Title & Description */}
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

        {/* Bottom Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-center pt-8"
        >
          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center justify-center btn-glass-gold font-extrabold text-xs sm:text-sm px-8 py-2.5 rounded-full transition-all duration-200 shadow-md hover:scale-[1.03] active:scale-95"
          >
            <span>আরও জানুন</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
