import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Youtube, Code2, X, Send, Copy, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useData } from '../context/DataContext';

export default function Footer({ onNavigate }) {
  const { companyDetails } = useData();
  const [showDevModal, setShowDevModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('huumayunahmed@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#F5A623] text-[#1A1A1A] pt-12 pb-6 font-bengali relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-black/15">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-black font-heading tracking-tight">
                {companyDetails.name}
              </h3>
              <p className="text-xs font-semibold text-black/80">
                {companyDetails.tagline}
              </p>
            </div>

            <p className="text-xs text-black/75 leading-relaxed">
              নতুন ও পুরাতন জেনারেটর বিক্রয়, সার্ভিস ও মেরামত আমরা আপনার বিশ্বস্ত পার্টনার।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={companyDetails.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/90 text-[#F5A623] flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={companyDetails.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/90 text-[#F5A623] flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={16} />
              </a>
              <a
                href={`https://wa.me/${companyDetails.whatsapp}?text=${encodeURIComponent('হ্যালো, মেসার্স শামীম মেশিনারিজ থেকে জেনারেটর ইনকোয়ারির জন্য নক দিচ্ছি।')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-md"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-black font-heading uppercase tracking-wider">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:underline text-black/85">
                  হোম
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:underline text-black/85">
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:underline text-black/85">
                  পণ্যসমূহ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:underline text-black/85">
                  সার্ভিস সমূহ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:underline text-black/85">
                  যোগাযোগ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-black font-heading uppercase tracking-wider">
              পণ্যসমূহ
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:underline text-black/85">
                  پاکستان জেনারেটর
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:underline text-black/85">
                  কামিন্স জেনারেটর
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:underline text-black/85">
                  কিপর জেনারেটর
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brands')} className="hover:underline text-black/85">
                  অন্যান্য ব্র্যান্ড
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-black font-heading uppercase tracking-wider">
              সার্ভিস সমূহ
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:underline text-black/85">
                  সার্ভিস ও মেরামত
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:underline text-black/85">
                  রক্ষণাবেক্ষণ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:underline text-black/85">
                  স্পেয়ার পার্টস
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:underline text-black/85">
                  ইনস্টলেশন
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-black font-heading uppercase tracking-wider">
              যোগাযোগ
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-black shrink-0" />
                <a href={`tel:${companyDetails.phone}`} className="hover:underline">{companyDetails.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-black shrink-0" />
                <a href={`mailto:${companyDetails.email}`} className="hover:underline">{companyDetails.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-black shrink-0 mt-0.5" />
                <span>{companyDetails.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Developer Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold text-black/80">
          <div>
            © {new Date().getFullYear()} {companyDetails.name}। সর্বস্বত্ব সংরক্ষিত।
          </div>

          {/* Developer Contact Marketing Link */}
          <div className="flex items-center gap-3 bg-black/10 px-3.5 py-1.5 rounded-full border border-black/15">
            <Code2 size={13} className="text-black" />
            <span>ডেভেলপড বাই:</span>
            <button
              onClick={() => setShowDevModal(true)}
              className="font-extrabold text-black hover:text-white transition-colors underline flex items-center gap-1"
            >
              <span>Humayun Ahmed</span>
            </button>
          </div>
        </div>

      </div>

      {/* Developer Contact Modal */}
      <AnimatePresence>
        {showDevModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#141414] text-white border border-[#F5A623]/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDevModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/15 border border-[#F5A623]/40 text-[#F5A623] flex items-center justify-center font-bold text-lg">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-heading text-white">
                    Humayun Ahmed
                  </h3>
                  <p className="text-xs text-[#F5A623] font-semibold">
                    Full-Stack Web & App Developer
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-gray-300 leading-relaxed bg-[#0E0E0E] p-3.5 rounded-xl border border-white/10">
                আপনার ব্যবসাকে ডিজিটাল করতে রেসপন্সিভ ওয়েবসাইট, ওয়েব অ্যাপ বা সফটওয়্যার ডেভলপমেন্ট সেবার জন্য যোগাযোগ করুন।
              </p>

              {/* Contact Buttons */}
              <div className="space-y-3 pt-1">
                {/* Email Action */}
                <div className="bg-[#0E0E0E] p-3 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail size={16} className="text-[#F5A623] shrink-0" />
                    <span className="text-xs font-semibold text-gray-200 truncate">
                      huumayunahmed@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-gray-300 transition-colors flex items-center gap-1"
                      title="কপি করুন"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <a
                      href="mailto:huumayunahmed@gmail.com"
                      className="px-2.5 py-1 bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>ইমেইল</span>
                      <Send size={12} />
                    </a>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <a
                  href="https://wa.me/8801768802953?text=Hello%20Humayun%20Ahmed,%20I%20saw%20your%20website%20work%20and%20want%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <WhatsAppIcon size={18} />
                  <span>হোয়াটসঅ্যাপে মেসেজ পাঠান (01768802953)</span>
                </a>
              </div>

              {/* Close Footer Note */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowDevModal(false)}
                  className="text-xs text-gray-400 hover:text-white underline font-medium"
                >
                  বন্ধ করুন
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
