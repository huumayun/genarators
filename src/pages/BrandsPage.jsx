import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function BrandsPage({ onNavigateProducts }) {
  const { brands } = useData();
  return (
    <div className="py-12 bg-black/30 backdrop-blur-sm min-h-screen">
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

        {/* Brands Compact Payment-Style Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              onClick={onNavigateProducts}
              className="bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 hover:border-[#F5A623]/60 p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#F5A623]/10 cursor-pointer group smooth-gpu"
            >
              {/* Brand Logo Box / Badge */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5A623] font-black text-xs sm:text-sm font-heading group-hover:scale-105 group-hover:bg-[#F5A623] group-hover:text-black transition-all shrink-0 shadow-inner">
                {brand.logo || brand.name.slice(0, 3).toUpperCase()}
              </div>

              {/* Brand Text & Origin Tag */}
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-white font-heading group-hover:text-[#F5A623] transition-colors truncate">
                  {brand.name}
                </h3>
                <p className="text-[10px] text-gray-400 truncate mt-0.5 font-medium">
                  {brand.desc || 'অরিজিনাল ব্র্যান্ড'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
