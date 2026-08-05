import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-12 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#141414] border-2 border-[#F5A623] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xl sm:text-3xl font-extrabold text-white font-heading">
                নিয়মিত আপডেট পেতে <span className="text-[#F5A623]">আমাদের সাথে থাকুন</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                নতুন পণ্য, অফার ও সার্ভিসের আপডেট পেতে নিউজলেটার সাবস্ক্রাইব করুন।
              </p>
            </div>

            {/* Right Input Form */}
            <div className="lg:col-span-5">
              {submitted ? (
                <div className="bg-[#F5A623]/20 border border-[#F5A623] text-[#F5A623] px-5 py-3.5 rounded-full flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 size={18} />
                  <span>ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল দিন"
                    className="w-full bg-[#0E0E0E] border border-white/20 text-white placeholder-gray-400 px-5 py-3.5 rounded-full text-sm focus:outline-none focus:border-[#F5A623] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto whitespace-nowrap bg-[#F5A623] hover:bg-[#FFB627] text-black font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-md shadow-[#F5A623]/20 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>সাবস্ক্রাইব</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
