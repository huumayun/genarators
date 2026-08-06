import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight } from 'lucide-react';

export default function ServiceBanner({ onOpenServiceBooking }) {
  return (
    <section className="py-12 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl min-h-[320px] sm:min-h-[380px] flex items-center">

          {/* Background Technician Repair Image */}
          <div
            className="absolute inset-0 bg-cover bg-right sm:bg-center z-0"
            style={{
              backgroundImage: `url('/images/technician.png')`
            }}
          />

          {/* Dark Gradient Overlay for perfect text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent sm:to-black/30 z-10" />

          {/* Content Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-5 smooth-gpu"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-semibold">
              <Wrench size={14} />
              <span>ইমার্জেন্সি ও রুটিন সার্ভিসিং</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
              প্রফেশনাল সার্ভিস <br />
              <span className="text-[#F5A623]">আপনার জেনারেটরের জন্য</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              আমাদের দক্ষ টেকনিশিয়ান টিম দিচ্ছে জেনারেটরের নিয়মিত সার্ভিস, মেরামত ও রক্ষণাবেক্ষণ সেবা। নিশ্চিত করুন আপনার জেনারেটরের দীর্ঘস্থায়ী পারফরম্যান্স।
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenServiceBooking}
                className="btn-glass-gold font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:scale-[1.03] active:scale-95 flex items-center gap-2"
              >
                <span>সার্ভিস বুক করুন</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
