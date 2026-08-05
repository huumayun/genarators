import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminLogin({ onBackToSite }) {
  const { loginAdmin } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center p-4 font-bengali">
      <div className="w-full max-w-md bg-[#141414] border border-[#F5A623]/30 rounded-3xl p-8 shadow-2xl space-y-6 relative">
        
        {/* Back to site button */}
        <button
          onClick={onBackToSite}
          className="absolute top-5 left-5 text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
        >
          <ArrowLeft size={14} />
          <span>ওয়েবসাইটে ফিরে যান</span>
        </button>

        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center mx-auto shadow-inner pt-2">
          <Lock size={32} />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-white font-heading">এডমিন প্যানেল লগইন</h2>
          <p className="text-xs text-gray-400">মেসার্স শামীম মেশিনারিজ কন্ট্রোল প্যানেল</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">এডমিন পাসওয়ার্ড / পিন</label>
            <div className="relative">
              <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                autoFocus
                placeholder="পাসওয়ার্ড দিন (Default: admin)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
              <AlertCircle size={16} />
              <span>ভুল পাসওয়ার্ড! সঠিক পিন দিন (Default: admin)</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm py-3 rounded-full transition-all shadow-lg shadow-[#F5A623]/25 active:scale-95"
          >
            লগইন করুন
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-gray-500">
          ডিফল্ট এডমিন পাসওয়ার্ড: <span className="text-[#F5A623] font-bold">admin</span> অথবা <span className="text-[#F5A623] font-bold">123456</span>
        </div>

      </div>
    </div>
  );
}
