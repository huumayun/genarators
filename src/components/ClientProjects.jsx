import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Factory, Cross, ShoppingBag, Store, Cpu, MapPin, Zap, CheckCircle2, PhoneCall } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ClientProjects({ onOpenContact }) {
  const { corporateClients } = useData();
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[#F5A623]" />;
      case 'Factory': return <Factory className="w-6 h-6 text-[#F5A623]" />;
      case 'Cross': return <Cross className="w-6 h-6 text-[#F5A623]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#F5A623]" />;
      case 'Store': return <Store className="w-6 h-6 text-[#F5A623]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#F5A623]" />;
      default: return <Building2 className="w-6 h-6 text-[#F5A623]" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0E0E0E] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 text-xs font-semibold">
            <Building2 size={14} />
            <span>কর্পোরেট ক্লায়েন্ট ও প্রজেক্ট পোর্টফোলিও</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            যেসকল বড় বড় প্রতিষ্ঠানে <span className="text-[#F5A623]">আমরা জেনারেটর দিয়েছি</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            বাংলাদেশের শীর্ষস্থানীয় ইন্ডাস্ট্রিয়াল গ্রুপ, হাসপাতাল, গার্মেন্টস ও কমার্শিয়াল মেগা প্রজেক্টে আমাদের জেনারেটর সফলভাবে সার্ভিস দিচ্ছে।
          </p>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corporateClients.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-[#F5A623]/50 transition-all duration-300 shadow-xl group hover:shadow-[#F5A623]/10"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {getIcon(project.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/30 px-3 py-1 rounded-full">
                    {project.tag}
                  </span>
                </div>

                {/* Company Name & Industry */}
                <div>
                  <h3 className="text-lg font-extrabold text-white font-heading group-hover:text-[#F5A623] transition-colors">
                    {project.clientName}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {project.industry}
                  </p>
                </div>

                {/* Generator Details Box */}
                <div className="bg-[#0E0E0E] p-3.5 rounded-xl border border-white/5 space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-gray-200">
                    <Zap size={14} className="text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400">সরবরাহকৃত মডেল: </span>
                      <span className="font-semibold text-white">{project.generatorSupplied}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-200">
                    <MapPin size={14} className="text-[#F5A623] shrink-0" />
                    <div>
                      <span className="text-gray-400">অবস্থান: </span>
                      <span className="font-medium text-gray-300">{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 size={14} />
                  <span>সফলভাবে ইনস্টলকৃত</span>
                </span>
                <span className="text-gray-500 font-medium">
                  {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center bg-[#141414] border border-[#F5A623]/30 p-8 rounded-3xl space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
            আপনার প্রতিষ্ঠান বা প্রজেক্টের জন্য জেনারেটর প্রয়োজন?
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            হেভি ডিউটি ইন্ডাস্ট্রিয়াল জেনারেটর, সাউন্ডপ্রুফ ক্যানোপি এবং পার্সোনালাইজড কোটেশনের জন্য আমাদের বিশেষজ্ঞদের সাথে কথা বলুন।
          </p>
          <button
            onClick={() => onOpenContact('ইন্ডাস্ট্রিয়াল জেনারেটর কোটেশন')}
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#F5A623]/25 active:scale-95"
          >
            <PhoneCall size={18} />
            <span>প্রজেক্টের জন্য কোটেশন নিন</span>
          </button>
        </div>

      </div>
    </section>
  );
}
