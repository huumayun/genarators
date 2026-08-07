import React from 'react';
import { Mail, Trash2, Calendar, Phone, CheckCircle2, User } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function InquiriesAdmin() {
  const { inquiries, deleteInquiry, clearAllInquiries } = useData();

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-white/10 p-4 sm:p-5 rounded-2xl">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">কাস্টমার ইনকোয়ারি ও বুকিং বক্স</h3>
          <p className="text-xs text-gray-400">মোট মেসেজ / ইনকোয়ারি: {inquiries.length} টি</p>
        </div>

        {inquiries.length > 0 && (
          <button
            onClick={() => {
              if (confirm('আপনি কি সকল ইনকোয়ারি মুছে ফেলতে চান?')) {
                clearAllInquiries();
              }
            }}
            className="w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs px-4 py-2.5 rounded-xl sm:rounded-full border border-rose-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Trash2 size={14} />
            <span>সকল মেসেজ ক্লিয়ার করুন</span>
          </button>
        )}
      </div>

      {/* Inquiries List */}
      {inquiries.length === 0 ? (
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-3">
          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Mail size={28} />
          </div>
          <h4 className="text-lg font-bold text-white font-heading">কোনো নতুন ইনকোয়ারি নেই</h4>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            ওয়েবসাইটের কন্টাক্ট ও ইনকোয়ারি ফর্মের মাধ্যমে গ্রাহকরা মেসেজ পাঠালে এখানে দেখা যাবে।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((item) => (
            <div
              key={item.id}
              className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 hover:border-[#F5A623]/30 transition-all shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse shrink-0" />
                  <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                    <User size={16} className="text-[#F5A623]" />
                    <span>{item.name}</span>
                  </h4>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    <span>{item.timestamp}</span>
                  </span>
                  <button
                    onClick={() => deleteInquiry(item.id)}
                    className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="মেসেজটি ডিলিট করুন"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-[#F5A623]" />
                  <strong className="text-white">মোবাইল:</strong>
                  <a href={`tel:${item.phone}`} className="text-[#F5A623] hover:underline font-bold">
                    {item.phone}
                  </a>
                </p>

                {item.serviceType && (
                  <p>
                    <strong className="text-white">বিষয় / সার্ভিস:</strong>{' '}
                    <span className="text-white font-medium bg-white/10 px-2 py-0.5 rounded">
                      {item.serviceType}
                    </span>
                  </p>
                )}
              </div>

              {item.message && (
                <div className="bg-[#0E0E0E] p-3 rounded-xl border border-white/5 text-xs text-gray-300">
                  <p className="text-gray-400 font-semibold text-[11px] mb-1">মেসেজ কন্টেন্ট:</p>
                  <p className="leading-relaxed">{item.message}</p>
                </div>
              )}

              {/* Mobile Quick Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`tel:${item.phone}`}
                  className="flex-1 bg-[#F5A623]/10 hover:bg-[#F5A623]/20 border border-[#F5A623]/30 text-[#F5A623] font-bold text-xs py-2 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone size={14} />
                  <span>সরাসরি কল দিন</span>
                </a>
                <a
                  href={`https://wa.me/${(item.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs py-2 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>হোয়াটসঅ্যাপ মেসেজ</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
