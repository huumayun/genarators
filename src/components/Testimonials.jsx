import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Testimonials({ onWriteReview }) {
  const { testimonials } = useData();
  return (
    <section className="py-12 lg:py-16 bg-black/40 backdrop-blur-sm relative border-b border-white/5 font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            আমাদের গ্রাহকরা <span className="text-[#F5A623]">যা বলছেন</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            গ্রাহকদের সন্তুষ্টিই আমাদের সবচেয়ে বড় অর্জন।
          </p>
        </motion.div>

        {/* Compact Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {testimonials.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-[#141414] border border-white/10 p-4 sm:p-5 rounded-xl space-y-3.5 flex flex-col justify-between hover:border-[#F5A623]/40 transition-colors shadow-md smooth-gpu"
            >
              <div className="space-y-2.5">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic line-clamp-4">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Avatar + Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#F5A623] shadow-sm shrink-0"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=F5A623&color=000&bold=true`;
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white font-heading truncate">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {review.title}, {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center pt-8"
        >
          <button
            onClick={onWriteReview}
            className="inline-flex items-center gap-2 btn-glass-gold font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-md hover:scale-[1.03] active:scale-95"
          >
            <MessageSquare size={15} />
            <span>আপনার রিভিউ লিখুন</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
