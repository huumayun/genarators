import React, { useState } from 'react';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminLogin({ onBackToSite }) {
  const { loginWithFirebase, loginAdmin } = useData();
  const [email, setEmail] = useState('admin@shamimmachinery.com');
  const [password, setPassword] = useState('shamim123456');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [usePinMode, setUsePinMode] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const handleFirebaseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    const result = await loginWithFirebase(email, password);
    setLoading(false);
    
    if (!result.success) {
      // Fallback: try pin check if password matches pin or fallback
      const pinSuccess = loginAdmin(password);
      if (!pinSuccess) {
        setErrorMsg(result.message || 'ইমেইল বা পাসওয়ার্ড সঠিক নয়!');
      }
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const pinSuccess = loginAdmin(pinInput);
    if (!pinSuccess) {
      setErrorMsg('ভুল পাসওয়ার্ড! সঠিক পিন দিন (Default: shamim123456)');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center p-4 font-bengali">
      <div className="w-full max-w-md bg-[#141414] border border-[#F5A623]/40 rounded-3xl p-8 shadow-2xl space-y-6 relative animate-fadeIn">
        
        {/* Back to site button */}
        <button
          onClick={onBackToSite}
          className="absolute top-5 left-5 text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>ওয়েবসাইটে ফিরে যান</span>
        </button>

        {/* Lock Icon Header */}
        <div className="w-16 h-16 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/40 text-[#F5A623] flex items-center justify-center mx-auto shadow-inner pt-1">
          <ShieldCheck size={34} />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight">এডমিন প্যানেল লগইন</h2>
          <p className="text-xs text-[#F5A623] font-semibold">
            {usePinMode ? 'পাসওয়ার্ড / পিন ব্যাকআপ মোড' : 'ফায়ারবেস ইমেইল ও পাসওয়ার্ড মডিউল'}
          </p>
        </div>

        {/* Firebase Email & Password Form */}
        {!usePinMode ? (
          <form onSubmit={handleFirebaseSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">এডমিন ইমেইল এড্রেস *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="admin@shamimmachinery.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">এডমিন পাসওয়ার্ড *</label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm py-3 rounded-full transition-all shadow-lg shadow-[#F5A623]/25 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'অথেন্টিকেশন চেক হচ্ছে...' : 'এডমিন লগইন করুন'}
            </button>
          </form>
        ) : (
          /* PIN Fallback Form */
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">এডমিন পিন / পাসওয়ার্ড (PIN Mode)</label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="পাসওয়ার্ড দিন (Default: shamim123456)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-sm py-3 rounded-full transition-all shadow-lg shadow-[#F5A623]/25 active:scale-95"
            >
              লগইন করুন (PIN Mode)
            </button>
          </form>
        )}

        {/* Credentials Info Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center text-xs space-y-1 font-sans">
          <p className="text-[#F5A623] font-bold font-bengali">🔑 এডমিন লগইন তথ্য (Admin Credentials):</p>
          <p className="text-gray-300">ইমেইল: <code className="text-white font-bold select-all bg-black/40 px-1.5 py-0.5 rounded">admin@shamimmachinery.com</code></p>
          <p className="text-gray-300">পাসওয়ার্ড: <code className="text-white font-bold select-all bg-black/40 px-1.5 py-0.5 rounded">shamim123456</code></p>
        </div>

        {/* Toggle Mode Button */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => {
              setUsePinMode(!usePinMode);
              setErrorMsg('');
            }}
            className="text-xs text-gray-400 hover:text-[#F5A623] transition-colors underline font-medium"
          >
            {usePinMode ? '← ফায়ারবেস ইমেইল ও পাসওয়ার্ড মোডে ফিরে যান' : 'পাসওয়ার্ড / পিন ব্যাকআপ মোড ব্যবহার করুন'}
          </button>
        </div>

      </div>
    </div>
  );
}
