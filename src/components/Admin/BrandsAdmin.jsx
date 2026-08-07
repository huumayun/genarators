import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function BrandsAdmin() {
  const { brands, addBrand, updateBrand, deleteBrand } = useData();
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    desc: ''
  });

  const handleStartAdd = () => {
    setFormData({ name: '', logo: '', desc: '' });
    setIsAdding(true);
    setEditingIndex(null);
  };

  const handleStartEdit = (brand, index) => {
    setFormData({
      name: brand.name || '',
      logo: brand.logo || '',
      desc: brand.desc || ''
    });
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding) {
      addBrand(formData);
      setIsAdding(false);
    } else if (editingIndex !== null) {
      updateBrand(editingIndex, formData);
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-6 font-bengali">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141414] border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">আন্তর্জাতিক ব্র্যান্ডসমূহ ব্যবস্থাপনা</h2>
          <p className="text-xs text-gray-400 mt-1">ওয়েবসাইটে প্রদর্শিত জেনারেটর ব্র্যান্ডের নাম ও বিবরণ আপডেট করুন</p>
        </div>
        {!isAdding && editingIndex === null && (
          <button
            onClick={handleStartAdd}
            className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-5 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20"
          >
            <Plus size={18} />
            <span>নতুন ব্র্যান্ড যোগ করুন</span>
          </button>
        )}
      </div>

      {/* Form Area */}
      {(isAdding || editingIndex !== null) && (
        <div className="bg-[#141414] border-2 border-[#F5A623]/40 p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-white font-heading">
              {isAdding ? 'নতুন ব্র্যান্ড যোগ করুন' : 'ব্র্যান্ড এডিট করুন'}
            </h3>
            <button
              onClick={() => { setIsAdding(false); setEditingIndex(null); }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">ব্র্যান্ডের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Caterpillar (CAT)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">লোগো সংক্ষিপ্ত নাম (যেমন: CAT, CUMMINS)</label>
                <input
                  type="text"
                  placeholder="যেমন: CAT"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ব্র্যান্ডের বিবরণ *</label>
              <textarea
                rows={3}
                required
                placeholder="ব্র্যান্ড সম্পর্কে বিস্তারিত বিবরণ লিখুন..."
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => { setIsAdding(false); setEditingIndex(null); }}
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

      {/* Brands List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {brands.map((brand, index) => (
          <div key={index} className="bg-[#141414] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4 shadow-lg flex flex-col justify-between hover:border-[#F5A623]/30 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-center font-extrabold text-[#F5A623] text-sm font-heading shadow-inner">
                  {brand.logo || brand.name.substring(0, 3)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(brand, index)}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
                    title="এডিট করুন"
                  >
                    <Edit2 size={16} className="text-[#F5A623]" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`আপনি কি "${brand.name}" ব্র্যান্ডটি মুছে ফেলতে চান?`)) {
                        deleteBrand(index);
                      }
                    }}
                    className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors"
                    title="ডিলিট করুন"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-heading">{brand.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{brand.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
