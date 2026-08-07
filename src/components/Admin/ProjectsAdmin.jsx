import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Building2, MapPin, Zap } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProjectsAdmin() {
  const { corporateClients, addCorporateClient, updateCorporateClient, deleteCorporateClient } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    clientName: '',
    industry: '',
    generatorSupplied: 'Cummins 500 KVA (সাউন্ডপ্রুফ)',
    location: 'ঢাকা, বাংলাদেশ',
    year: '২০২৪',
    tag: 'ইন্ডাস্ট্রিয়াল প্রজেক্ট'
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setEditingId(client.id);
    setFormData(client);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCorporateClient(editingId, formData);
    } else {
      addCorporateClient(formData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-white/10 p-4 sm:p-5 rounded-2xl">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">কর্পোরেট ক্লায়েন্ট ও মেগা প্রজেক্টসমূহ</h3>
          <p className="text-xs text-gray-400">মোট ক্লায়েন্ট প্রজেক্ট: {corporateClients.length} টি</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F5A623]/20"
        >
          <Plus size={18} />
          <span>নতুন ক্লায়েন্ট প্রজেক্ট যোগ করুন</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {corporateClients.map((client) => (
          <div
            key={client.id}
            className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-[#F5A623]/30 transition-all shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-2.5 py-0.5 rounded-full">
                  {client.tag}
                </span>
                <span className="text-xs text-gray-400 font-medium">{client.year}</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-heading">{client.clientName}</h4>
                <p className="text-xs text-gray-400 font-medium">{client.industry}</p>
              </div>

              <div className="bg-[#0E0E0E] p-3 rounded-xl border border-white/5 text-xs text-gray-300 space-y-1">
                <p><strong className="text-white">জেনারেটর:</strong> {client.generatorSupplied}</p>
                <p><strong className="text-white">অবস্থান:</strong> {client.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => handleOpenEdit(client)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2.5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit2 size={14} className="text-[#F5A623]" />
                <span>এডিট</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`আপনি কি "${client.clientName}" কে মুছে ফেলতে চান?`)) {
                    deleteCorporateClient(client.id);
                  }
                }}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2.5 rounded-xl border border-rose-500/20 transition-colors"
                title="মুছে ফেলুন"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#141414] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
            
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1A1A1A] shrink-0">
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                {editingId ? 'প্রজেক্ট তথ্য এডিট করুন' : 'নতুন প্রজেক্ট যুক্ত করুন'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">কোম্পানি / ক্লায়েন্টের নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: স্কয়ার ফার্মাসিউটিক্যালস লিঃ"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">ইন্ডাস্ট্রি / খাত *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: টেক্সটাইল ও গার্মেন্টস"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">সরবরাহকৃত জেনারেটর মডেল *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: CAT 1000 KVA সাউন্ডপ্রুফ"
                    value={formData.generatorSupplied}
                    onChange={(e) => setFormData({ ...formData, generatorSupplied: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">অবস্থান / জেলা *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: গাজীপুর, ঢাকা"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-white/10 bg-[#1A1A1A] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-5 py-2.5 rounded-full transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-6 py-2.5 rounded-full shadow-md shadow-[#F5A623]/20 transition-all"
                >
                  {editingId ? 'সেভ করুন' : 'যুক্ত করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
