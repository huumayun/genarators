import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { testimonialsData } from '../data/mockData';

export default function Testimonials({ onNavigateAbout }) {
  return (
    <section className="py-16 lg:py-20 bg-[#0E0E0E] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            আমাদের গ্রাহকরা <span className="text-[#F5A623]">যা বলছেন</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            গ্রাহকদের সন্তুষ্টিই আমাদের সবচেয়ে বড় অর্জন।
          </p>
        </div>

        {/* 2 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonialsData.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#1A1A1A] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-5 flex flex-col justify-between hover:border-[#F5A623]/30 transition-all shadow-lg"
            >
              <div className="space-y-4">
                {/* 5 Yellow Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Avatar + Author Details */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F5A623] shadow-md shrink-0"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=F5A623&color=000&bold=true`;
                  }}
                />
                <div>
                  <h4 className="text-base font-bold text-white font-heading">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {review.title}, {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Center Button */}
        <div className="text-center pt-10">
          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFB627] text-black font-bold text-sm sm:text-base px-8 py-3 rounded-full transition-all duration-200 shadow-md shadow-[#F5A623]/20 hover:scale-[1.03] active:scale-95"
          >
            <MessageSquare size={16} />
            <span>আরও রিভিউ দেখুন</span>
          </button>
        </div>

      </div>
    </section>
  );
}
