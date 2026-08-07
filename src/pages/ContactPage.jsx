import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContactPage() {
  const { companyDetails, addInquiry } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      phone: formData.phone,
      serviceType: formData.subject || 'সাধারণ যোগাযোগ',
      message: formData.message
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div className="py-12 bg-[#0E0E0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            যোগাযোগ <span className="text-[#F5A623]">করুন</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            জেনারেটর কেনাবেচা, বুকিং বা সার্ভিসিং সম্পর্কে যেকোনো জিজ্ঞাসায় আমাদের সাথে কথা বলুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-4">

            {/* Phone Card */}
            <div className="bg-[#141414] border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:border-[#F5A623]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-xs text-gray-400 font-semibold">সরাসরি ফোন দিন</h4>
                <a href={`tel:${companyDetails.phone}`} className="text-lg font-bold text-white hover:text-[#F5A623] transition-colors">
                  {companyDetails.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href={`https://wa.me/${companyDetails.whatsapp}?text=${encodeURIComponent('হ্যালো মেসার্স শামীম মেশিনারিজ, আমি জেনারেটর সম্পর্কে তথ্য জানতে চাই।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-5 rounded-2xl flex items-center justify-between transition-all shadow-lg"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={24} />
                <div>
                  <h4 className="text-sm font-bold">হোয়াটসঅ্যাপে চ্যাট করুন</h4>
                  <p className="text-xs text-emerald-100">ইনস্ট্যান্ট তথ্য ও ছবি পেতে মেসেজ পাঠান</p>
                </div>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Open Chat</span>
            </a>

            {/* Email Card */}
            <div className="bg-[#141414] border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:border-[#F5A623]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-xs text-gray-400 font-semibold">ইমেইল পাঠান</h4>
                <a href={`mailto:${companyDetails.email}`} className="text-sm font-bold text-white hover:text-[#F5A623] transition-colors">
                  {companyDetails.email}
                </a>
              </div>
            </div>

            {/* Location & Hours */}
            <div className="bg-[#141414] border border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#F5A623] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs text-gray-400 font-semibold">আমাদের শোরুমের ঠিকানা</h4>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {companyDetails.addressDetails}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <Clock size={18} className="text-[#F5A623] shrink-0" />
                <div className="text-xs text-gray-300">
                  <span className="font-semibold text-white">খোলা থাকার সময়: </span>
                  {companyDetails.hours}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#141414] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold text-white font-heading mb-6">
              মেসেজ পাঠান
            </h3>

            {submitted ? (
              <div className="bg-[#F5A623]/15 border border-[#F5A623] text-[#F5A623] p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 size={36} className="mx-auto" />
                <h4 className="text-lg font-bold">ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।</h4>
                <p className="text-xs text-gray-300">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="নাম লিখুন"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">ফোন নম্বর *</label>
                    <input
                      type="tel"
                      required
                      placeholder="ফোন নম্বর লিখুন"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">ইমেইল (ঐচ্ছিক)</label>
                    <input
                      type="email"
                      placeholder="ইমেইল এড্রেস"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">বিষয়</label>
                    <input
                      type="text"
                      placeholder="যেমন: ৩-কেভিএ জেনারেটর প্রাইজ"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">আপনার মেসেজ *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার মেসেজ বা ইনকোয়ারি এখানে লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-glass-gold font-bold text-sm py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>মেসেজ পাঠান</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Google Maps Embed Location */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#141414] border border-white/10 p-4 rounded-2xl">
            <div>
              <h4 className="text-sm font-bold text-white font-heading">মেসার্স শামীম মেশিনারিজ — গুগল ম্যাপস লোকেশন</h4>
              <p className="text-xs text-gray-400 mt-0.5">গুগল ম্যাপে শোরুমের লাইভ লোকেশন দেখে সহজে চলে আসুন</p>
            </div>
            <a
              href="https://maps.app.goo.gl/kyA95jS1Q5xJprGs7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-[#F5A623]/20 shrink-0"
            >
              <MapPin size={15} />
              <span>গুগল ম্যাপসে খুলুন</span>
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-96 bg-[#141414] relative">
            <iframe
              title="মেসার্স শামীম মেশিনারিজ - Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.51888495066!2d89.39463197593259!3d24.726565078018324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc53355819d235%3A0x88e132a8479a795c!2z4Kau4KeH4Ka44Ka-4Kaw4KeN4Ka4IOCmtuCmvuCmruCmv-CmriDgpq7gp4fgprbgpr_gpqjgpr7gprDgpr_gppw!5e0!3m2!1sen!2sbd!4v1712345678901!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
