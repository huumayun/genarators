import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { useData } from '../../context/DataContext';

export default function ReviewsAdmin() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    quote: '',
    rating: 5,
    image: ''
  });

  const handleStartAdd = () => {
    setFormData({
      name: '',
      title: '',
      location: '',
      quote: '',
      rating: 5,
      image: ''
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleStartEdit = (review) => {
    setFormData({
      name: review.name || '',
      title: review.title || '',
      location: review.location || '',
      quote: review.quote || '',
      rating: review.rating || 5,
      image: review.image || ''
    });
    setEditingId(review.id);
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = formData.image.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=F5A623&color=000&bold=true`;

    if (isAdding) {
      addTestimonial({ ...formData, image: finalImage });
      setIsAdding(false);
    } else if (editingId) {
      updateTestimonial(editingId, { ...formData, image: finalImage });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6 font-bengali">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#141414] border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">গ্রাহক রিভিউ ও টেস্টিকমোনিয়াল ব্যবস্থাপনা</h2>
          <p className="text-xs text-gray-400 mt-1">ওয়েবসাইটে কাস্টমারদের রিভিউ নিয়ন্ত্রণ করুন বা কাস্টমারকে সরাসরি রিভিউ দেওয়ার লিংক পাঠান</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Send Review Link via WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`সম্মানিত কাস্টমার, মেসার্স শামীম মেশিনারিজ থেকে সেবা নেওয়ার জন্য ধন্যবাদ! আমাদের সার্ভিস বা জেনারেটর সম্পর্কে আপনার মতামত বা রিভিউ দিতে এই লিংকে ক্লিক করুন: ${window.location.origin}/review`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <WhatsAppIcon size={16} />
            <span>WhatsApp-এ রিভিউ লিংক পাঠান</span>
          </a>

          {/* Copy Link Button */}
          <button
            onClick={() => {
              const link = `${window.location.origin}/review`;
              navigator.clipboard.writeText(link);
              alert(`কাস্টমার রিভিউ জমা দেওয়ার লিংক কপি হয়েছে:\n${link}`);
            }}
            className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-1.5 border border-white/15 transition-all"
          >
            <span>লিংক কপি করুন (/review)</span>
          </button>

          {!isAdding && !editingId && (
            <button
              onClick={handleStartAdd}
              className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-5 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20"
            >
              <Plus size={18} />
              <span>নতুন রিভিউ</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Area */}
      {(isAdding || editingId) && (
        <div className="bg-[#141414] border-2 border-[#F5A623]/40 p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-white font-heading">
              {isAdding ? 'নতুন রিভিউ যোগ করুন' : 'রিভিউ এডিট করুন'}
            </h3>
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">গ্রাহকের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ইঞ্জিনিয়ার আব্দুর রহমান"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">পদবী / পরিচয়</label>
                <input
                  type="text"
                  placeholder="যেমন: প্রজেক্ট ম্যানেজার, এসিআই লিমিটেড"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">অবস্থান / জেলা</label>
                <input
                  type="text"
                  placeholder="যেমন: ঢাকা"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">রেটিং (১-৫)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                >
                  <option value={5}>৫ স্টার (মাষ্টার)</option>
                  <option value={4}>৪ স্টার</option>
                  <option value={3}>৩ স্টার</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ছবি URL (ঐচ্ছিক)</label>
              <input
                type="text"
                placeholder="ছবি লিঙ্ক দিন..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">রিভিউ বক্তব্য *</label>
              <textarea
                rows={3}
                required
                placeholder="গ্রাহকের মন্তব্য বা রিভিউ টেক্সট লিখুন..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-7 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-[#F5A623]/20"
              >
                <Save size={16} />
                <span>সেভ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {testimonials.map((review) => (
          <div key={review.id} className="bg-[#141414] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4 shadow-lg flex flex-col justify-between hover:border-[#F5A623]/30 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(review)}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
                    title="এডিট করুন"
                  >
                    <Edit2 size={16} className="text-[#F5A623]" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`আপনি কি "${review.name}" এর রিভিউটি মুছে ফেলতে চান?`)) {
                        deleteTestimonial(review.id);
                      }
                    }}
                    className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors"
                    title="ডিলিট করুন"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 italic leading-relaxed">"{review.quote}"</p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#F5A623]"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=F5A623&color=000&bold=true`;
                  }}
                />
                <div>
                  <h4 className="text-xs font-bold text-white font-heading">{review.name}</h4>
                  <p className="text-[11px] text-gray-400">{review.title}, {review.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
