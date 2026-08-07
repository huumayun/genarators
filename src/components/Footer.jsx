import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Youtube, Code2, X, Send, Copy, Check, Sparkles } from 'lucide-react';
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
                  পাকিস্তান জেনারেটর
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

          {/* Developer Contact Link */}
          <div className="flex items-center gap-2 bg-black/10 px-3.5 py-1 rounded-full border border-black/15">
            <Code2 size={13} className="text-black" />
            <span>ডেভেলপড বাই:</span>
            <button
              onClick={() => setShowDevModal(true)}
              className="font-extrabold text-black hover:text-white transition-colors underline"
            >
              Humayun Ahmed
            </button>
          </div>
        </div>

      </div>

      {/* Ultra Premium Glassmorphism Developer Contact Modal */}
      <AnimatePresence>
        {showDevModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#1E1E1E]/90 to-[#0A0A0A]/95 text-white border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,166,35,0.3)] backdrop-blur-2xl space-y-6 overflow-hidden smooth-gpu"
            >
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/15 rounded-full blur-3xl -z-0 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowDevModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors z-20 backdrop-blur-md"
              >
                <X size={16} />
              </button>

              {/* Developer Header */}
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#E8950F] p-0.5 shadow-lg shadow-[#F5A623]/30">
                  <div className="w-full h-full bg-[#141414] rounded-[14px] flex items-center justify-center text-[#F5A623]">
                    <Code2 size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-heading text-white tracking-wide">
                    Humayun Ahmed
                  </h3>
                  <p className="text-xs text-[#F5A623] font-semibold flex items-center gap-1.5 mt-0.5">
                    <Sparkles size={12} />
                    <span>Full-Stack Web & App Developer</span>
                  </p>
                </div>
              </div>

              {/* Intro Banner Box */}
              <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl space-y-1">
                <p className="text-xs text-gray-200 leading-relaxed font-medium">
                  আপনার ব্যবসার জন্য আধুনিক রেসপন্সিভ ওয়েবসাইট, ওয়েব অ্যাপ বা যেকোনো সফটওয়্যার ডেভলপমেন্ট সেবার জন্য সরাসরি যোগাযোগ করুন।
                </p>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 relative z-10 pt-1">
                {/* Email Box */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center justify-between gap-2 shadow-inner">
                  <div className="flex items-center gap-2.5 min-w-0 pl-1">
                    <Mail size={16} className="text-[#F5A623] shrink-0" />
                    <span className="text-xs font-semibold text-gray-100 truncate select-all">
                      huumayunahmed@gmail.com
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium text-gray-200 transition-colors flex items-center justify-center border border-white/10"
                      title="কপি করুন"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <a
                      href="mailto:huumayunahmed@gmail.com"
                      className="px-3 py-1.5 bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-[#F5A623]/25 active:scale-95"
                    >
                      <span>ইমেইল</span>
                      <Send size={12} />
                    </a>
                  </div>
                </div>

                {/* WhatsApp Button (Phone number hidden in label as requested) */}
                <a
                  href="https://wa.me/8801768802953?text=Hello%20Humayun%20Ahmed,%20I%20saw%20your%20website%20work%20and%20want%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl shadow-emerald-600/30 border border-emerald-400/30 active:scale-95 group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    <WhatsAppIcon size={20} />
                  </div>
                  <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
                </a>
              </div>

              {/* Close Footer Link */}
              <div className="text-center pt-1 relative z-10">
                <button
                  onClick={() => setShowDevModal(false)}
                  className="text-xs text-gray-400 hover:text-white transition-colors underline font-medium"
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
