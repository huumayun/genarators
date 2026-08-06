import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Phone } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function InquiryModal({ isOpen, onClose, initialSubject = "" }) {
  const { companyDetails, addInquiry } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: initialSubject || 'জেনারেটর ক্রয় ইনকোয়ারি',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, serviceType: initialSubject }));
    }
  }, [initialSubject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-lg bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl smooth-gpu"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1A1A1A]">
              <h3 className="text-lg font-bold text-white font-heading">যোগাযোগ ও ইনকোয়ারি ফর্ম</h3>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#F5A623]/20 border-2 border-[#F5A623] text-[#F5A623] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">ধন্যবাদ! বার্তাটি পাঠানো হয়েছে।</h4>
                  <p className="text-gray-300 text-sm">
                    মেসার্স শামীম মেশিনারিজের প্রতিনিধি খুব শীঘ্রই আপনার নম্বরে কল দিবে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">ফোন নম্বর *</label>
                    <input
                      type="tel"
                      required
                      placeholder="যেমন: 01700-000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">বিষয় / সার্ভিস টাইপ</label>
                    <input
                      type="text"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">মেসেজ / বিস্তারিত (ঐচ্ছিক)</label>
                    <textarea
                      rows={3}
                      placeholder="আপনার চাহিদা বা জেনারেটরের বিবরণ লিখুন..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <a
                      href={`tel:${companyDetails.phone}`}
                      className="flex items-center gap-1.5 text-xs text-[#F5A623] hover:underline"
                    >
                      <Phone size={14} />
                      <span>সরাসরি কল করুন: {companyDetails.phone}</span>
                    </a>

                    <button
                      type="submit"
                      className="btn-glass-gold font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-md active:scale-95"
                    >
                      <span>সাবমিট করুন</span>
                      <Send size={15} />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
