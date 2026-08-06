import React, { useState } from 'react';
import { Save, CheckCircle2, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function StatsAdmin() {
  const { stats, updateStats } = useData();
  const [formData, setFormData] = useState(stats);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatChange = (index, field, value) => {
    const updated = [...formData];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStats(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 font-bengali">
      <div className="bg-[#141414] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
        <div>
          <h2 className="text-xl font-extrabold text-white font-heading">পরিসংখ্যান ও অর্জন কাউন্টারসমূহ</h2>
          <p className="text-xs text-gray-400 mt-1">ওয়েবসাইটের হোম পেজে প্রদর্শিত অভিজ্ঞতা, বিক্রিত জেনারেটর সংখ্যা ও কাস্টমার সংখ্যা আপডেট করুন</p>
        </div>

        {savedSuccess && (
          <div className="bg-[#F5A623]/20 border border-[#F5A623] text-[#F5A623] px-5 py-3 rounded-2xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 size={16} />
            <span>পরিসংখ্যান তথ্য সফলভাবে সেভ করা হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formData.map((stat, index) => (
              <div key={index} className="bg-[#0E0E0E] border border-white/10 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5A623]">কাউন্টার #{index + 1}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{stat.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">সংখ্যার মান (Value)</label>
                    <input
                      type="text"
                      required
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full bg-[#141414] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">সাফিক্স (Suffix)</label>
                    <input
                      type="text"
                      placeholder="যেমন: +, %"
                      value={stat.suffix}
                      onChange={(e) => handleStatChange(index, 'suffix', e.target.value)}
                      className="w-full bg-[#141414] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">কাউন্টার লেবেল / নাম</label>
                  <input
                    type="text"
                    required
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              className="btn-glass-gold font-bold text-xs px-8 py-3 rounded-full flex items-center gap-2 shadow-lg"
            >
              <Save size={16} />
              <span>কাউন্টার তথ্য সেভ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
