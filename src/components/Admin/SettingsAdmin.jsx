import React, { useState } from 'react';
import { Save, CheckCircle2, Phone, Mail, MapPin, Clock, KeyRound, RotateCcw } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function SettingsAdmin() {
  const { companyDetails, updateCompanyDetails, loginAdmin, updateAdminPin, resetToDefaults, forceSyncAllToFirestore } = useData();
  const [formData, setFormData] = useState(companyDetails);
  const [pinData, setPinData] = useState({ currentPin: '', newPin: '' });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);
  const [pinError, setPinError] = useState('');
  const [firebaseSyncing, setFirebaseSyncing] = useState(false);
  const [firebaseSyncMsg, setFirebaseSyncMsg] = useState('');

  const handleFirebaseSync = async () => {
    setFirebaseSyncing(true);
    setFirebaseSyncMsg('');
    const success = await forceSyncAllToFirestore();
    setFirebaseSyncing(false);
    if (success) {
      setFirebaseSyncMsg('ফায়ারবেস ডাটাবেসে সকল তথ্য ও ক্যাটালগ সফলভাবে সিঙ্ক করা হয়েছে!');
    } else {
      setFirebaseSyncMsg('ফায়ারবেস সিঙ্ক সম্পন্ন হয়েছে। অনুগ্রহ করে ফায়ারবেস কনসোলে সিকিউরিটি রুলস (Rules) চেক করুন।');
    }
    setTimeout(() => setFirebaseSyncMsg(''), 6000);
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateCompanyDetails(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleSavePin = async (e) => {
    e.preventDefault();
    const isCurrentValid = await loginAdmin(pinData.currentPin);
    if (!isCurrentValid) {
      setPinError('বর্তমান পিনটি সঠিক নয়!');
      return;
    }
    if (pinData.newPin.length < 4) {
      setPinError('নতুন পিনটি কমপক্ষে ৪ অক্ষরের হতে হবে!');
      return;
    }
    await updateAdminPin(pinData.newPin);
    setPinSuccess(true);
    setPinError('');
    setPinData({ currentPin: '', newPin: '' });
    setTimeout(() => setPinSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 font-bengali">

      {/* Firebase Live Database Sync Box */}
      <div className="bg-[#141414] border-2 border-[#F5A623]/40 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F5A623] animate-pulse" />
              <span>ফায়ারবেস ক্লাউড ডাটাবেস (Firebase Cloud Database Sync)</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              ওয়েবসাইটের সকল ক্যাটালগ, প্রোডাক্ট, সার্ভিস ও কন্টেন্ট এক ক্লিকে আপনার Cloud Firestore-এ সিঙ্ক করুন
            </p>
          </div>

          <button
            onClick={handleFirebaseSync}
            disabled={firebaseSyncing}
            className="btn-glass-gold font-bold text-xs px-6 py-3 rounded-full shrink-0 flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RotateCcw size={16} className={firebaseSyncing ? "animate-spin" : ""} />
            <span>{firebaseSyncing ? 'আপলোড হচ্ছে...' : 'ফায়ারবেস ডাটাবেসে সকল ডাটা আপলোড করুন'}</span>
          </button>
        </div>

        {firebaseSyncMsg && (
          <div className="bg-[#F5A623]/20 border border-[#F5A623] text-[#F5A623] px-4 py-2.5 rounded-xl text-xs font-semibold">
            {firebaseSyncMsg}
          </div>
        )}
      </div>
      
      {/* Company Contact Details Editor */}
      <div className="bg-[#141414] border border-white/10 p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-xl">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">শপ কন্টাক্ট ও ওয়েবসাইট সেটিংস</h3>
          <p className="text-xs text-gray-400">ওয়েবসাইটের ফোন নম্বর, হোয়াটসঅ্যাপ, ঠিকানা ও হেডলাইন আপডেট করুন</p>
        </div>

        {savedSuccess && (
          <div className="bg-[#F5A623]/20 border border-[#F5A623] text-[#F5A623] px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 size={16} />
            <span>ওয়েবসাইট সেটিংস ও ফোন নম্বর সফলভাবে সেভ করা হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleSaveCompany} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">প্রতিষ্ঠানের নাম *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ট্যাগলাইন / সাব-টাইটেল</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">অফিসিয়াল ফোন নম্বর (ডিসপ্লে হবে) *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোড সহ) *</label>
              <input
                type="text"
                required
                placeholder="যেমন: 8801712345678"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ইমেইল এড্রেস</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">খোলা থাকার সময়</label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          {/* Social Links (Facebook & YouTube) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ফেসবুক পেজ লিঙ্ক (Facebook Page URL)</label>
              <input
                type="text"
                placeholder="যেমন: https://facebook.com/yourpage"
                value={formData.facebook || ''}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ইউটিউব চ্যানেল লিঙ্ক (YouTube Channel URL)</label>
              <input
                type="text"
                placeholder="যেমন: https://youtube.com/@yourchannel"
                value={formData.youtube || ''}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">শোরুমের সম্পূর্ণ ঠিকানা</label>
            <input
              type="text"
              value={formData.addressDetails}
              onChange={(e) => setFormData({ ...formData, addressDetails: e.target.value })}
              className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">হিরো সেকশন সংক্ষিপ্ত বিবরণ</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F5A623]/20 active:scale-95"
          >
            <Save size={18} />
            <span>সেটিংস সেভ করুন</span>
          </button>
        </form>
      </div>

      {/* Admin Passcode Update */}
      <div className="bg-[#141414] border border-white/10 p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 shadow-xl">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white font-heading">এডমিন পিন / পাসওয়ার্ড পরিবর্তন</h3>
          <p className="text-xs text-gray-400">কন্ট্রোল প্যানেলের লগইন পিন পরিবর্তন করুন</p>
        </div>

        {pinSuccess && (
          <div className="bg-[#F5A623]/20 border border-[#F5A623] text-[#F5A623] px-4 py-2.5 rounded-xl text-xs font-semibold">
            এডমিন পাসওয়ার্ড পরিবর্তন সম্পন্ন হয়েছে!
          </div>
        )}

        {pinError && (
          <div className="bg-rose-500/20 border border-rose-500 text-rose-400 px-4 py-2.5 rounded-xl text-xs font-semibold">
            {pinError}
          </div>
        )}

        <form onSubmit={handleSavePin} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">বর্তমান পিন</label>
            <input
              type="password"
              required
              placeholder="বর্তমান পিন"
              value={pinData.currentPin}
              onChange={(e) => setPinData({ ...pinData, currentPin: e.target.value })}
              className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">নতুন পিন</label>
            <input
              type="password"
              required
              placeholder="নতুন পিন"
              value={pinData.newPin}
              onChange={(e) => setPinData({ ...pinData, newPin: e.target.value })}
              className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-6 rounded-xl border border-white/15 transition-all"
          >
            পিন আপডেট করুন
          </button>
        </form>
      </div>

      {/* Reset to Factory Defaults */}
      <div className="bg-rose-500/10 border border-rose-500/20 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-rose-400 font-heading">ডিফল্ট ডাটা রিসেট</h4>
          <p className="text-xs text-gray-400">সকল কাস্টম এডিট করা ডাটা মুছে দিয়ে ওয়েবসাইটের মূল ফ্যাক্টরি ডাটায় ফিরে যান</p>
        </div>

        <button
          onClick={() => {
            if (confirm('আপনি কি নিশ্চিত যে সকল পরিবর্তন মুছে ফেলে মূল ডাটায় ফিরে যেতে চান?')) {
              resetToDefaults();
              alert('সকল ডাটা মূল ডাটায় রিসেট করা হয়েছে!');
            }
          }}
          className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-1.5 shrink-0 transition-colors"
        >
          <RotateCcw size={16} />
          <span>রিসেট অল ডাটা</span>
        </button>
      </div>

    </div>
  );
}
