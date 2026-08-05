import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, PhoneCall } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProductsPage({ onSelectProduct, onOpenContact }) {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-[#0E0E0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            আমাদের জেনারেটর <span className="text-[#F5A623]">ক্যাটালগ</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            দেশি-বিদেশি সকল সেরা ব্রান্ডের সাউন্ডপ্রুফ ও পোর্টেবল জেনারেটর সংগ্রহ থেকে আপনার পছন্দের মডেলটি বেছে নিন।
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#141414] border border-white/10 p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="জেনারেটর খুঁজুন (যেমন: Cummins, Kipor)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0E0E0E] border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#F5A623] text-black shadow-md'
                  : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              সকল জেনারেটর
            </button>
            <button
              onClick={() => setSelectedCategory('soundproof')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'soundproof'
                  ? 'bg-[#F5A623] text-black shadow-md'
                  : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              সাউন্ডপ্রুফ ক্যানোপি
            </button>
            <button
              onClick={() => setSelectedCategory('portable')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'portable'
                  ? 'bg-[#F5A623] text-black shadow-md'
                  : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              পোর্টেবল জেনারেটর
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#F5A623]/40 transition-all duration-300 shadow-lg group"
            >
              {/* Product Image Frame */}
              <div className="bg-[#0E0E0E] border border-white/5 rounded-xl p-4 mb-5 flex items-center justify-center h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>

              {/* Title & Specs */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#F5A623] bg-[#F5A623]/10 px-2.5 py-0.5 rounded-full border border-[#F5A623]/20">
                    {product.brand}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {product.capacity}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#F5A623] transition-colors">
                  {product.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-6 mt-auto">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-bold text-xs py-2.5 px-3 rounded-full transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Eye size={14} />
                  <span>বিস্তারিত দেখুন</span>
                </button>

                <button
                  onClick={() => onOpenContact(product.title)}
                  className="bg-transparent hover:bg-white/10 text-white font-medium text-xs py-2.5 px-3 rounded-full border border-white/20 hover:border-white/50 transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <PhoneCall size={14} />
                  <span>যোগাযোগ করুন</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
