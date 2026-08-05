import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

export default function ProductGrid({ onSelectProduct, onOpenContact, onNavigateProducts }) {
  const { products } = useData();
  // Take top 3 generator products for home grid
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-[#0E0E0E] relative font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Dark Container Box (#141414 background) */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          
          {/* Section Heading matching exact screenshot text & color */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
              আমাদের সেরা <span className="text-[#F5A623]">জেনারেটর সমূহ</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              দেশি-বিদেশি বিভিন্ন ব্র্যান্ডের নির্ভরযোগ্য জেনারেটর দেখুন এবং আপনার চাহিদা অনুযায়ী বেছে নিন সেরা সমাধান।
            </p>
          </div>

          {/* 3-Column Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-[#181818] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#F5A623]/40 transition-all duration-300 group shadow-lg"
              >
                {/* Product Image Frame: Clean Studio Photo matching screenshot 1:1 */}
                <div className="rounded-2xl mb-5 flex items-center justify-center h-48 sm:h-52 overflow-hidden shadow-lg border border-white/10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1 mb-6">
                  <h3 className="text-xl font-extrabold text-white font-heading">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

                {/* 2 Buttons Row matching exact screenshot */}
                <div className="grid grid-cols-2 gap-3 pt-2 mt-auto">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs py-2.5 px-3 rounded-full transition-all text-center flex items-center justify-center shadow-md active:scale-95"
                  >
                    <span>বিস্তারিত দেখুন</span>
                  </button>

                  <button
                    onClick={() => onOpenContact(product.title)}
                    className="bg-transparent hover:bg-[#F5A623]/10 text-white font-semibold text-xs py-2.5 px-3 rounded-full border border-[#F5A623] transition-all text-center flex items-center justify-center active:scale-95"
                  >
                    <span>যোগাযোগ করুন</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Center Button matching exact screenshot */}
          <div className="text-center pt-10">
            <button
              onClick={onNavigateProducts}
              className="inline-flex items-center justify-center bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm sm:text-base px-10 py-3.5 rounded-full transition-all duration-200 shadow-xl shadow-[#F5A623]/20 hover:scale-[1.03] active:scale-95"
            >
              <span>সব জেনারেটর দেখুন</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
