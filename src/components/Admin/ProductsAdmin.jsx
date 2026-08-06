import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Package, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProductsAdmin() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: '',
    brand: '',
    category: 'soundproof',
    capacity: '',
    priceRange: 'আলোচনা সাপেক্ষ',
    description: '',
    image: '/images/perkins-gen.png',
    featuresText: 'কম জ্বালানি খরচ ও উচ্চ ক্ষমতা\nসাউন্ডপ্রুফ ক্যানোপি ডিজাইন\nঅরিজিনাল ইলেকট্রিক স্টার্টার',
    specsBrand: 'Perkins / Cummins',
    specsFuel: 'ডিজেল (Diesel)',
    specsNoise: '৬৫-৭০ dBA'
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title || '',
      brand: product.brand || '',
      category: product.category || 'soundproof',
      capacity: product.capacity || '',
      priceRange: product.priceRange || 'আলোচনা সাপেক্ষ',
      description: product.description || '',
      image: product.image || '/images/perkins-gen.png',
      featuresText: (product.features || []).join('\n'),
      specsBrand: product.specs?.['ব্র্যান্ড'] || product.brand || '',
      specsFuel: product.specs?.['ফুয়েল টাইপ'] || 'ডিজেল (Diesel)',
      specsNoise: product.specs?.['শব্দ মাত্রা'] || '৬৫-৭০ dBA'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFeatures = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      brand: formData.brand,
      category: formData.category,
      capacity: formData.capacity,
      priceRange: formData.priceRange,
      description: formData.description,
      image: formData.image,
      features: formattedFeatures,
      specs: {
        'ব্র্যান্ড': formData.specsBrand || formData.brand,
        'ক্যাপাসিটি': formData.capacity,
        'ফুয়েল টাইপ': formData.specsFuel,
        'শব্দ মাত্রা': formData.specsNoise
      }
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-white/10 p-5 rounded-2xl">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">জেনারেটর প্রোডাক্ট ক্যাটালগ</h3>
          <p className="text-xs text-gray-400">মোট প্রোডাক্ট: {products.length} টি</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F5A623]/20"
        >
          <Plus size={16} />
          <span>নতুন জেনারেটর যোগ করুন</span>
        </button>
      </div>

      {/* Products Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-[#F5A623]/30 transition-all shadow-lg"
          >
            <div className="space-y-3">
              <div className="rounded-xl h-44 overflow-hidden border border-white/10 shadow-md bg-[#181818]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/perkins-gen.png';
                  }}
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-2 py-0.5 rounded-full">
                  {product.brand}
                </span>
                <h4 className="text-base font-bold text-white font-heading mt-1">{product.title}</h4>
                <p className="text-xs text-gray-400 font-medium">ক্যাপাসিটি: {product.capacity}</p>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">{product.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => handleOpenEdit(product)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2 rounded-lg border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit2 size={14} className="text-[#F5A623]" />
                <span>এডিট</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`আপনি কি "${product.title}" মুছে ফেলতে চান?`)) {
                    deleteProduct(product.id);
                  }
                }}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2 rounded-lg border border-rose-500/20 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1A1A1A]">
              <h3 className="text-lg font-bold text-white font-heading">
                {editingId ? 'জেনারেটর তথ্য এডিট করুন' : 'নতুন জেনারেটর যুক্ত করুন'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">জেনারেটরের নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: কামিন্স ৭৫০ কেভিএ"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">ব্র্যান্ড *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: Cummins, Caterpillar, Perkins, Kipor"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">ক্যাপাসিটি (KVA) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: 50 KVA - 500 KVA"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">ক্যাটাগরি</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  >
                    <option value="soundproof">সাউন্ডপ্রুফ ক্যানোপি (Soundproof)</option>
                    <option value="portable">পোর্টেবল জেনারেটর (Portable)</option>
                  </select>
                </div>
              </div>

              {/* Image URL with Live Preview & Guideline */}
              <div className="space-y-2 bg-[#0E0E0E] p-4 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                    <ImageIcon size={16} className="text-[#F5A623]" />
                    <span>জেনারেটর ছবির লিঙ্ক / URL *</span>
                  </label>
                  <span className="text-[10px] text-[#F5A623] font-semibold">লাইভ প্রিভিউ</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    required
                    placeholder="ছবি লিঙ্ক দিন (যেমন: https://i.imgur.com/sample.png অথবা /images/perkins-gen.png)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 w-full bg-[#141414] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                  />

                  {/* Live Image Preview Frame */}
                  <div className="w-20 h-20 rounded-xl bg-[#141414] border border-[#F5A623]/30 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                    <img
                      src={formData.image || '/images/perkins-gen.png'}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain rounded-lg"
                      onError={(e) => {
                        e.target.src = '/images/perkins-gen.png';
                      }}
                    />
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                  <p className="font-bold text-[#F5A623]">📸 ছবি আপলোড করার গাইডলাইন:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-300">
                    <li>অনলাইন ইমেজের সরাসরি ডাইরেক্ট লিঙ্ক ব্যবহার করুন (যেমন: ImgBB, Imgur বা ওয়েবসাইট সার্ভার)।</li>
                    <li>ছবি অবশ্যই <code className="text-[#F5A623] bg-black/40 px-1 py-0.5 rounded">.jpg</code>, <code className="text-[#F5A623] bg-black/40 px-1 py-0.5 rounded">.png</code>, বা <code className="text-[#F5A623] bg-black/40 px-1 py-0.5 rounded">.webp</code> ফরম্যাটের হতে হবে।</li>
                    <li>ওয়েবসাইটের নিজস্ব লোকাল ছবি ব্যবহার করতে চাইলে: <code className="text-[#F5A623] bg-black/40 px-1 py-0.5 rounded">/images/cummins-gen.png</code> লিখুন।</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">সংক্ষিপ্ত বিবরণ *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="জেনারেটর সম্পর্কে বিবরণ লিখুন..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">বিশেষ বৈশিষ্ট্যসমূহ (প্রতি লাইনে একটি)</label>
                <textarea
                  rows={3}
                  placeholder="কম জ্বালানি খরচ&#10;সাউন্ডপ্রুফ ক্যানোপি&#10;অটো স্টার্টার"
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-5 py-2.5 rounded-full"
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-6 py-2.5 rounded-full shadow-md shadow-[#F5A623]/20"
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
