import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProductGrid({ onSelectProduct, onOpenContact, onNavigateProducts }) {
  const { products } = useData();
  const N = products.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused || N === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, N, currentIndex]);

  const handleNext = () => {
    if (N === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % N);
  };

  const handlePrev = () => {
    if (N === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + N) % N);
  };

  // Get visible products seamlessly using modulo indexing (1 product on mobile phone view)
  const getVisibleProducts = () => {
    if (N === 0) return [];
    if (isMobile) {
      return [products[currentIndex % N]];
    }
    if (N <= 3) return products;
    return [
      products[currentIndex % N],
      products[(currentIndex + 1) % N],
      products[(currentIndex + 2) % N]
    ];
  };

  const visibleProducts = getVisibleProducts();

  // Touch Swipe Handlers for mobile phone finger swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 40) {
      handleNext(); // Swiped left -> Next
    } else if (diff < -40) {
      handlePrev(); // Swiped right -> Prev
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0E0E0E] relative font-bengali overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Outer Dark Glass Box Container */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden group/box">

          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-3.5 py-1 rounded-full mb-1">
              <Sparkles size={14} />
              <span>লাইভ জেনারেটর ক্যাটালগ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
              আমাদের সেরা <span className="text-[#F5A623]">জেনারেটর সমূহ</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              স্বয়ংক্রিয়ভাবে স্লাইড হতে থাকা সেরা জেনারেটরসমূহ। দুপাশের অ্যারো বাটনে চাপ দিয়ে বা টেনে টেনে স্লাইড করুন।
            </p>
          </div>

          {/* Relative Slider Box with Side Arrows */}
          <div className="relative sm:px-8 lg:px-10">

            {/* Floating Left Arrow Button */}
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/85 border border-[#F5A623]/60 text-[#F5A623] hover:bg-[#F5A623] hover:text-black flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md active:scale-90"
              title="আগের জেনারেটর"
            >
              <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
            </button>

            {/* Floating Right Arrow Button */}
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/85 border border-[#F5A623]/60 text-[#F5A623] hover:bg-[#F5A623] hover:text-black flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md active:scale-90"
              title="পরের জেনারেটর"
            >
              <ChevronRight size={24} className="sm:w-7 sm:h-7" />
            </button>

            {/* 3-Column Clean Grid Container - Zero Clipping / Zero Cutoff */}
            <div
              className="overflow-hidden w-full relative py-2 touch-pan-y"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                  {visibleProducts.map((product, idx) => (
                    <motion.div
                      key={`${product.id}-${idx}`}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className="bg-[#181818] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#F5A623]/50 transition-all duration-300 group shadow-xl smooth-gpu relative h-full"
                    >
                      {/* Brand Badge */}
                      <div className="absolute top-8 left-8 z-10">
                        <span className="text-[10px] font-extrabold text-black bg-[#F5A623] px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                          {product.brand}
                        </span>
                      </div>

                      {/* Image Frame */}
                      <div className="rounded-xl mb-5 h-48 sm:h-52 overflow-hidden shadow-md border border-white/10 relative bg-[#181818]">
                        <img
                          src={product.image}
                          alt={product.title}
                          draggable={false}
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.target.src = '/images/perkins-gen.png';
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-2 flex-1 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">ক্যাপাসিটি:</span>
                          <span className="text-xs font-bold text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded-full border border-[#F5A623]/20">
                            {product.capacity}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-[#F5A623] font-heading group-hover:text-white transition-colors leading-tight mt-1">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed font-normal line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2 mt-auto">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="btn-glass-gold font-bold text-xs py-2.5 px-3 rounded-full transition-all text-center flex items-center justify-center shadow-md active:scale-95"
                        >
                          <span>বিস্তারিত দেখুন</span>
                        </button>

                        <button
                          onClick={() => onOpenContact(product.title)}
                          className="btn-glass-dark font-medium text-xs py-2.5 px-3 rounded-full transition-all text-center flex items-center justify-center active:scale-95"
                        >
                          <span>যোগাযোগ করুন</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Interactive Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {products.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setDirection(dotIdx > currentIndex ? 1 : -1);
                  setCurrentIndex(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === dotIdx
                    ? 'w-8 bg-[#F5A623]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`প্রোডাক্ট ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Bottom See More Button */}
          <div className="text-center pt-8">
            <button
              onClick={onNavigateProducts}
              className="inline-flex items-center justify-center btn-glass-gold font-extrabold text-sm sm:text-base px-10 py-3.5 rounded-full transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
            >
              <span>সব জেনারেটর দেখুন</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
