import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Phone } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { companyDetails } from '../../data/mockData';

export default function ProductDetailModal({ product, onClose, onOrderInquiry }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md smooth-gpu"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="relative w-full max-w-3xl bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col smooth-gpu"
          >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1A1A1A]">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">{product.title}</h3>
            <p className="text-xs text-[#F5A623]">{product.brand} | {product.capacity}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Image Box: 100% Edge-to-Edge Full Cover (No White or Black Borders) */}
            <div className="rounded-2xl h-64 sm:h-72 overflow-hidden border border-white/10 relative shadow-md bg-[#181818]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/perkins-gen.png";
                }}
              />
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <span className="inline-block bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 px-3 py-1 rounded-full text-xs font-semibold">
                স্টকে আছে
              </span>

              <p className="text-gray-300 text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 space-y-1.5 text-xs text-gray-300">
                <p><strong className="text-white">ক্যাপাসিটি:</strong> {product.capacity}</p>
                <p><strong className="text-white">মূল্য:</strong> <span className="text-[#F5A623] font-bold">{product.priceRange}</span></p>
                <p><strong className="text-white">উপলব্ধতা:</strong> নতুন ও পুরাতন মডেল</p>
              </div>
            </div>

          </div>

          {/* Specifications Table */}
          {product.specs && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white font-heading">টেকনিক্যাল স্পেসিফিকেশন</h4>
              <div className="bg-[#0E0E0E] rounded-xl border border-white/10 divide-y divide-white/10 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-3">
                    <span className="text-gray-400 font-medium">{key}</span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features List */}
          {product.features && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white font-heading">বিশেষ বৈশিষ্ট্যসমূহ</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#1A1A1A] p-3 rounded-lg border border-white/5">
                    <Check size={14} className="text-[#F5A623] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#1A1A1A] flex flex-col sm:flex-row gap-3 justify-end">
          <a
            href={`https://wa.me/${companyDetails.whatsapp}?text=${encodeURIComponent(`হ্যালো, আমি ${product.title} সম্পর্কে বিস্তারিত জানতে চাই।`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <WhatsAppIcon size={18} />
            <span>হোয়াটসঅ্যাপ ইনকোয়ারি</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOrderInquiry(product.title);
            }}
            className="flex-1 sm:flex-initial btn-glass-gold font-bold text-xs sm:text-sm py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Phone size={16} />
            <span>কল দিন / ইনকোয়ারি করুন</span>
          </button>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
