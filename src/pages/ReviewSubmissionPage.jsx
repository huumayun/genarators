import React, { useState } from 'react';
import { Star, Send, CheckCircle2, User, Mail, MapPin, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ReviewSubmissionPage({ onBackToSite }) {
  const { addTestimonial, companyDetails } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Generate avatar from email or name
  const getAvatarUrl = () => {
    if (image.trim()) return image.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || 'Customer';
    // Use Gravatar with UI-Avatars fallback
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=F5A623&color=000&bold=true&size=128`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    const finalAvatar = getAvatarUrl();

    addTestimonial({
      name: name.trim(),
      title: title.trim() || 'সম্মানিত গ্রাহক',
      location: location.trim() || 'বাংলাদেশ',
      rating: Number(rating),
      quote: quote.trim(),
      email: email.trim(),
      image: finalAvatar
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center justify-center p-4 font-bengali relative">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Review Card */}
      <div className="w-full max-w-xl bg-[#141414] border border-[#F5A623]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative z-10 my-8">
        
        {/* Back Button */}
        <button
          onClick={onBackToSite}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-all"
        >
          <ArrowLeft size={14} />
          <span>ওয়েবসাইটে ফিরে যান</span>
        </button>

        {submitted ? (
          <div className="text-center space-y-5 py-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white font-heading">
                ধন্যবাদ, {name}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                আপনার মূল্যবান রিভিউ ও রেটিং সাকসেসফুলি জমা হয়েছে। এটি <span className="text-[#F5A623] font-bold">{companyDetails.name}</span>-এর অফিশিয়াল ওয়েবসাইটে যুক্ত করা হয়েছে।
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onBackToSite}
                className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-7 py-3 rounded-full shadow-lg shadow-[#F5A623]/20 transition-all"
              >
                ওয়েবসাইট দেখুন
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setTitle('');
                  setLocation('');
                  setQuote('');
                  setImage('');
                }}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-3 rounded-full border border-white/15 transition-all"
              >
                আরেকটি রিভিউ লিখুন
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Form Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-3.5 py-1 rounded-full">
                <Sparkles size={14} />
                <span>গ্রাহক মতামত ফর্ম</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white font-heading">
                আপনার রিভিউ দিন
              </h1>
              <p className="text-xs text-gray-400 leading-relaxed">
                {companyDetails.name} থেকে সার্ভিস বা জেনারেটর কিনে কেমন লাগলো? আপনার অভিজ্ঞতা নিচে শেয়ার করুন।
              </p>
            </div>

            {/* Live Profile Preview Avatar */}
            <div className="bg-[#0E0E0E] p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-inner">
              <div className="w-14 h-14 rounded-full bg-[#141414] border-2 border-[#F5A623] overflow-hidden shrink-0 shadow-md">
                <img
                  src={getAvatarUrl()}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Customer')}&background=F5A623&color=000&bold=true`;
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white truncate font-heading">
                  {name.trim() || 'আপনার নাম'}
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  {title.trim() ? title : 'সম্মানিত কাস্টমার'} {location.trim() ? `, ${location}` : ''}
                </p>
                <p className="text-[10px] text-[#F5A623] font-semibold mt-0.5">
                  ✓ ইমেইল প্রোফাইল অনুযায়ী ছবি অটো-জেনারেট হবে
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">আপনার নাম *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ জহিরুল ইসলাম"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">আপনার ইমেইল এড্রেস *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="যেমন: customer@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">পদবী / ব্যবসা (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="যেমন: প্রজেক্ট ইঞ্জিনিয়ার"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">জেলা / এলাকা (ঐচ্ছিক)</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="যেমন: সাভার, ঢাকা"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>
              </div>

              {/* Star Rating Input */}
              <div className="bg-[#0E0E0E] p-3.5 rounded-2xl border border-white/10 space-y-1.5">
                <label className="block text-xs font-bold text-gray-300">রেটিং নির্বাচন করুন (১ - ৫ স্টার):</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform focus:outline-none"
                    >
                      <Star
                        size={26}
                        className={star <= rating ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-600"}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#F5A623] ml-2">({rating} স্টার)</span>
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">আপনার রিভিউ বক্তব্য / অভিজ্ঞতা *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="মেসার্স শামীম মেশিনারিজের প্রোডাক্ট মান, সার্ভিস ও টেকনিশিয়ানদের কাজের অভিজ্ঞতা লিখুন..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm py-3.5 rounded-full transition-all shadow-lg shadow-[#F5A623]/25 active:scale-95 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>রিভিউ জমা দিন</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
