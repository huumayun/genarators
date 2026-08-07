import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Wrench, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ServicesAdmin() {
  const { services, addService, updateService, deleteService } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    icon: 'Wrench',
    details: '',
    features: ['']
  });

  const handleStartAdd = () => {
    setFormData({
      title: '',
      icon: 'Wrench',
      details: '',
      features: ['']
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleStartEdit = (service) => {
    setFormData({
      title: service.title || '',
      icon: service.icon || 'Wrench',
      details: service.details || '',
      features: service.features ? [...service.features] : ['']
    });
    setEditingId(service.id);
    setIsAdding(false);
  };

  const handleFeatureChange = (index, val) => {
    const newFeats = [...formData.features];
    newFeats[index] = val;
    setFormData({ ...formData, features: newFeats });
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleRemoveFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedFeatures = formData.features.filter(f => f.trim() !== '');

    if (isAdding) {
      addService({ ...formData, features: cleanedFeatures });
      setIsAdding(false);
    } else if (editingId) {
      updateService(editingId, { ...formData, features: cleanedFeatures });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6 font-bengali">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141414] border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">সার্ভিস ও মেরামত সেবাসমূহ ব্যবস্থাপনা</h2>
          <p className="text-xs text-gray-400 mt-1">ওয়েবসাইটে প্রদর্শিত সার্ভিসসমূহের শিরোনাম, বিবরণ ও কাস্টম ফিচার এডিট করুন</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-5 py-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20"
          >
            <Plus size={18} />
            <span>নতুন সার্ভিস যোগ করুন</span>
          </button>
        )}
      </div>

      {/* Form Area */}
      {(isAdding || editingId) && (
        <div className="bg-[#141414] border-2 border-[#F5A623]/40 p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-white font-heading">
              {isAdding ? 'নতুন সার্ভিস যোগ করুন' : 'সার্ভিস এডিট করুন'}
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
                <label className="block text-xs font-semibold text-gray-300 mb-1">সার্ভিসের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: জেনারেটর ওভারহোলিং সার্ভিস"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">আইকন ধরন</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="Wrench">Wrench (মেরামত)</option>
                  <option value="Cog">Cog (পার্টস/ইঞ্জিন)</option>
                  <option value="Zap">Zap (ইলেকট্রিক্যাল)</option>
                  <option value="ShieldCheck">ShieldCheck (ওয়ারেন্টি)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">সার্ভিসের বিবরণ *</label>
              <textarea
                rows={3}
                required
                placeholder="সার্ভিস সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            {/* Features List */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-gray-300">সার্ভিসের সুবিধা / বৈশিষ্ট্যসমূহ</label>
              {formData.features.map((feat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`ফিচার ${index + 1}`}
                    value={feat}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="p-2.5 text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-[#F5A623] hover:underline font-semibold pt-1 flex items-center gap-1"
              >
                <Plus size={16} />
                <span>আরও একটি সুবিধা যোগ করুন</span>
              </button>
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

      {/* Services List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-[#141414] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4 shadow-lg flex flex-col justify-between hover:border-[#F5A623]/30 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">{service.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(service)}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
                    title="এডিট করুন"
                  >
                    <Edit2 size={16} className="text-[#F5A623]" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`আপনি কি "${service.title}" সার্ভিসটি মুছে ফেলতে চান?`)) {
                        deleteService(service.id);
                      }
                    }}
                    className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-colors"
                    title="ডিলিট করুন"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">{service.details}</p>

              {service.features && service.features.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle2 size={14} className="text-[#F5A623] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
