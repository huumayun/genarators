import { ShieldCheck, Award, Users, CheckCircle2, Building, Wrench } from 'lucide-react';
import { companyDetails } from '../data/mockData';
import TeamSection from '../components/TeamSection';

export default function AboutPage({ onOpenContact }) {
  return (
    <div className="py-12 bg-[#0E0E0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 text-xs font-semibold">
            <Building size={14} />
            <span>১৫+ বছরের বিশ্বস্ত অভিজ্ঞতা</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            আমাদের <span className="text-[#F5A623]">সম্পর্কে</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {companyDetails.name} — বাংলাদেশের অন্যতম বিশ্বস্ত জেনারেটর বিক্রয় ও সার্ভিসিং প্রতিষ্ঠান।
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              আমাদের যাত্রা ও অঙ্গীকার
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              দীর্ঘ ১৫ বছরেরও বেশি সময় ধরে আমরা ঢাকা ও সারা বাংলাদেশে বিভিন্ন শিল্প কারখানা, সরকারি ও বেসরকারি অফিস, হাসপাতাল এবং আবাসিক ভবনে উচ্চমানের জেনারেটর সরবরাহ ও সার্ভিসিং সেবা দিয়ে আসছি।
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              ক্যাটারপিলার (CAT), কামিন্স (Cummins), পারকিন্স (Perkins), কিপর (Kipor) সহ বিশ্বমানের ব্যান্ডের অরিজিনাল নতুন ও কন্ডিশনড জেনারেটর সুলভ মূল্যে নিশ্চিত করাই আমাদের মূল লক্ষ্য।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                <CheckCircle2 size={20} className="text-[#F5A623]" />
                <span className="text-sm font-semibold text-white">১০০% অরিজিনাল স্পেয়ার পার্টস</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                <CheckCircle2 size={20} className="text-[#F5A623]" />
                <span className="text-sm font-semibold text-white">২৪/৭ জরুরি টেকনিক্যাল সাপোর্ট</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                <CheckCircle2 size={20} className="text-[#F5A623]" />
                <span className="text-sm font-semibold text-white">অভিজ্ঞ মেকানিক্যাল ইঞ্জিনিয়ার</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                <CheckCircle2 size={20} className="text-[#F5A623]" />
                <span className="text-sm font-semibold text-white">সম্পূর্ণ ওয়ারেন্টি সুবিধা</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/technician.png"
                alt="Workshop Team"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-[#F5A623] text-sm font-bold">দক্ষ ইঞ্জিনিয়ার ও সার্ভিস টিম</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">আমাদের লক্ষ্য (Mission)</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              গ্রাহকদের নিরাপদ, সাশ্রয়ী এবং দীর্ঘস্থায়ী বিদ্যুৎ সমাধান প্রদান করা।
            </p>
          </div>

          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-xl flex items-center justify-center">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">আমাদের রূপকল্প (Vision)</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              বাংলাদেশের সেরা জেনারেটর সরবরাহকারী ও সার্ভিস ব্র্যান্ড হিসেবে প্রতিষ্ঠিত হওয়া।
            </p>
          </div>

          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">গ্রাহক সন্তুষ্টি (Values)</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              সততা, দায়িত্বশীলতা ও সার্বক্ষণিক বিশ্বস্ত সেবার মাধ্যমে কাস্টমার হ্যাপি রাখা।
            </p>
          </div>
        </div>

        {/* Founder & Team Section */}
        <TeamSection />

        {/* Call to Action */}
        <div className="text-center pt-6">
          <button
            onClick={onOpenContact}
            className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-bold text-base px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#F5A623]/25"
          >
            আমাদের সাথে যোগাযোগ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
