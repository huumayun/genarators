import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Cog, Zap, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ServicesPage({ onOpenServiceBooking }) {
  const { services, companyDetails } = useData();
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-7 h-7 text-[#F5A623]" />;
      case 'Cog': return <Cog className="w-7 h-7 text-[#F5A623]" />;
      case 'Zap': return <Zap className="w-7 h-7 text-[#F5A623]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-[#F5A623]" />;
      default: return <Wrench className="w-7 h-7 text-[#F5A623]" />;
    }
  };

  return (
    <div className="py-12 bg-black/30 backdrop-blur-sm min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 text-xs font-semibold">
            <Wrench size={14} />
            <span>প্রফেশনাল টেকনিশিয়ান সাপোর্ট</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            আমাদের <span className="text-[#F5A623]">সার্ভিস সমূহ</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            মেসার্স শামীম মেশিনারিজ জেনারেটরের সকল ধরণের টেকনিক্যাল সমস্যার সমাধান এবং নিয়মিত রক্ষণাবেক্ষণ সেবা দিয়ে থাকে।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
              className="bg-[#141414] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5 flex flex-col justify-between hover:border-[#F5A623]/40 transition-colors shadow-xl group smooth-gpu"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0E0E0E] border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#F5A623] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#F5A623] font-medium">প্রফেশনাল সার্ভিস</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.details}
                </p>

                <div className="space-y-2 pt-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                      <CheckCircle2 size={15} className="text-[#F5A623] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => onOpenServiceBooking(service.title)}
                  className="w-full btn-glass-gold font-bold text-sm py-3 rounded-full transition-all text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <PhoneCall size={16} />
                  <span>সার্ভিস বুক করুন</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Support Banner */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-[#F5A623]/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <h3 className="text-2xl font-bold text-white font-heading">
            জরুরি জেনারেটর মেরামত প্রয়োজন?
          </h3>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            আমাদের টেকনিশিয়ান টিম ঢাকার যেকোনো স্থানে দ্রুত সময়ে পৌঁছাতে প্রস্তুত। অবিলম্বে ফোন করুন:
          </p>
          <a
            href={`tel:${companyDetails.phone}`}
            className="inline-flex items-center gap-2 btn-glass-gold font-extrabold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <PhoneCall size={18} />
            <span>কল দিন: {companyDetails.phone}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
