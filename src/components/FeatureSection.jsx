import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Right Image (Kipor Generator on Yellow Studio Circle Base) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center relative smooth-gpu"
          >
            {/* Yellow Background Ellipse Platform matching design screenshot */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute inset-4 bg-[#F5A623] rounded-full opacity-90 blur-sm transform scale-y-75 -z-10 shadow-2xl shadow-[#F5A623]/40" />

              <img
                src="/images/kipor-6500.png"
                alt="Kipor KDE 6500E Portable Generator"
                className="w-full h-auto object-contain max-h-80 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-10"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
