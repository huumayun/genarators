import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wrench, Globe, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function StatsBar() {
  const { stats } = useData();
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6 text-[#F5A623]" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#F5A623]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#F5A623]" />;
      case 'Clock': return <Clock className="w-6 h-6 text-[#F5A623]" />;
      default: return <Users className="w-6 h-6 text-[#F5A623]" />;
    }
  };

  // Convert numbers to Bengali digits
  const toBengaliNumber = (num) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
  };

  return (
    <section className="py-12 bg-black/40 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center p-4 bg-[#141414] border border-white/5 rounded-2xl smooth-gpu"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center mb-3">
                {getIcon(stat.icon)}
              </div>

              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5A623] font-heading tracking-tight">
                {toBengaliNumber(stat.value)}{stat.suffix}
              </div>

              <div className="text-gray-300 text-xs sm:text-sm font-medium mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
