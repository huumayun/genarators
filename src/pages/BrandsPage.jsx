import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { brandsData } from '../data/mockData';

export default function BrandsPage({ onNavigateProducts }) {
  return (
    <div className="py-12 bg-[#0E0E0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 text-xs font-semibold">
            <Globe size={14} />
            <span>আন্তর্জাতিক ব্র্যান্ডসমূহ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            আমাদের সমাদৃত <span className="text-[#F5A623]">ব্র্যান্ডসমূহ</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            আমরা ক্যাটারপিলার, কামিন্স, পারকিন্স ও কিপর সহ বিশ্বের শীর্ষস্থানীয় জেনারেটর উৎপাদনকারী ব্র্যান্ডের নতুন ও পুরাতন মডেল সরবরাহ করি।
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandsData.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#F5A623]/40 transition-all shadow-xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0E0E0E] border border-white/10 flex items-center justify-center font-extrabold text-[#F5A623] text-xl font-heading shadow-inner group-hover:scale-105 transition-transform">
                {brand.logo}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#F5A623] transition-colors">
                  {brand.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  {brand.desc}
                </p>
              </div>

              <button
                onClick={onNavigateProducts}
                className="inline-flex items-center gap-1.5 text-xs text-[#F5A623] font-semibold hover:underline pt-2"
              >
                <span>এই ব্র্যান্ডের মডেলসমূহ দেখুন</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
