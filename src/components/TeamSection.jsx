import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Award, Phone, Mail, Wrench, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TeamSection() {
  const { ownerAndTeam } = useData();
  const { owner, team } = ownerAndTeam;

  return (
    <section className="py-16 lg:py-24 bg-[#0A0A0A] relative border-b border-white/5 font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 text-xs font-semibold">
            <UserCheck size={14} />
            <span>পরিচালনা পর্ষদ ও সার্ভিস টিম</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            আমাদের প্রতিষ্ঠাতা ও <span className="text-[#F5A623]">দক্ষ কর্মীবৃন্দ</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            অভিজ্ঞ মেকানিক্যাল ইঞ্জিনিয়ার ও নিবেদিতপ্রাণ সার্ভিস টিমের মাধ্যমে আমরা ১০০% কোয়ালিটি সেবা নিশ্চিত করি।
          </p>
        </div>

        {/* Founder & Owner Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] border-2 border-[#F5A623]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Owner Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[#F5A623] shadow-2xl"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name)}&background=F5A623&color=000&bold=true`;
                  }}
                />
                <span className="absolute bottom-1 right-2 bg-[#F5A623] text-black font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                  {owner.experience}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                  {owner.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#F5A623] mt-0.5">
                  {owner.title}
                </p>
                <p className="text-xs text-gray-400 font-medium mt-1">
                  {owner.role}
                </p>
              </div>
            </div>

            {/* Owner Quote & Details */}
            <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                <HeartHandshake size={14} />
                <span>প্রতিষ্ঠাতার বার্তা</span>
              </div>

              <blockquote className="text-gray-200 text-sm sm:text-base leading-relaxed italic border-l-2 border-[#F5A623] pl-4">
                "{owner.message}"
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-[#0E0E0E] p-3.5 rounded-xl border border-white/10">
                  <Phone size={18} className="text-[#F5A623]" />
                  <div>
                    <span className="text-[11px] text-gray-400 block">মোবাইল</span>
                    <a href={`tel:${owner.phone}`} className="text-xs font-bold text-white hover:text-[#F5A623]">
                      {owner.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#0E0E0E] p-3.5 rounded-xl border border-white/10">
                  <Mail size={18} className="text-[#F5A623]" />
                  <div>
                    <span className="text-[11px] text-gray-400 block">অফিসিয়াল ইমেইল</span>
                    <a href={`mailto:${owner.email}`} className="text-xs font-bold text-white hover:text-[#F5A623]">
                      {owner.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Employees & Team Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-white font-heading text-center sm:text-left">
            দক্ষ মেকানিক্যাল ও সার্ভিস টিমের সদস্যগণ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#141414] border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-[#F5A623]/40 transition-all shadow-lg group"
              >
                <div className="space-y-4 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#F5A623] shadow-md group-hover:scale-105 transition-transform"
                  />

                  <div>
                    <h4 className="text-base font-bold text-white font-heading group-hover:text-[#F5A623] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#F5A623] mt-0.5">
                      {member.designation}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                      অভিজ্ঞতা: {member.experience}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed bg-[#0E0E0E] p-2.5 rounded-lg border border-white/5">
                    {member.specialty}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 text-center">
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#F5A623] font-semibold hover:underline"
                  >
                    <Phone size={13} />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
