import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Youtube, Code2, X, Send, Copy, Check, Sparkles, BadgeCheck, ChevronRight, Layers, Star, Github, Linkedin, Twitter, Globe } from 'lucide-react';
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

          {/* Column 5: Contact Info & Developer Link */}
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

              {/* Developer Contact Link under Column 5 */}
              <li className="pt-2 border-t border-black/15">
                <button
                  onClick={() => setShowDevModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-black bg-black/10 hover:bg-black hover:text-[#F5A623] px-3 py-1.5 rounded-lg border border-black/20 transition-all shadow-sm group"
                >
                  <Code2 size={13} className="group-hover:scale-110 transition-transform" />
                  <span>Developer Contact</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold text-black/80">
          <div>
            © {new Date().getFullYear()} {companyDetails.name}। সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">গোপনীয়তা নীতি</a>
            <span>|</span>
            <a href="#" className="hover:underline">শর্তাবলী</a>
          </div>
        </div>

      </div>

      {/* ULTRA PREMIUM DEVELOPER CARD MODAL (Pixel-Perfect Match) */}
      <AnimatePresence>
        {showDevModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#0D0E12] text-white rounded-[32px] p-6 sm:p-8 shadow-[0_0_60px_rgba(245,166,35,0.25)] border border-white/10 space-y-6 overflow-hidden smooth-gpu"
              style={{
                boxShadow: '0 0 50px rgba(245,166,35,0.3), inset 0 0 1px rgba(255,255,255,0.2)'
              }}
            >
              {/* Gold & Emerald Glowing Border Accents */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#F5A623]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 border-2 border-transparent rounded-[32px] pointer-events-none"
                   style={{
                     background: 'linear-gradient(135deg, rgba(245,166,35,0.6) 0%, transparent 40%, transparent 60%, rgba(16,185,129,0.5) 100%) border-box',
                     WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                     WebkitMaskComposite: 'xor',
                     maskComposite: 'exclude'
                   }}
              />

              {/* Close Button */}
              <button
                onClick={() => setShowDevModal(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-20 backdrop-blur-md"
              >
                <X size={18} />
              </button>

              {/* 1. Header Row */}
              <div className="flex items-start gap-4 relative z-10">
                {/* Gold Code Avatar Frame */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#09090B] border-2 border-[#F5A623] p-1 shadow-[0_0_25px_rgba(245,166,35,0.4)] shrink-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[#121214] rounded-xl flex items-center justify-center text-[#F5A623]">
                    <Code2 size={32} className="stroke-[2.5]" />
                  </div>
                </div>

                <div className="space-y-1.5 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight truncate">
                      Humayun Ahmed
                    </h3>
                    <BadgeCheck size={22} className="text-[#F5A623] fill-[#F5A623]/20 shrink-0" />
                  </div>

                  <p className="text-[11px] sm:text-xs font-mono font-bold text-[#F5A623] tracking-wider flex items-center gap-1.5">
                    <span>🚀</span>
                    <span>FULL-STACK WEB & APP DEVELOPER</span>
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-medium text-gray-300">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
                      <span>⚛️</span> React
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                      <span>🟩</span> Node.js
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                      <span>🟨</span> JavaScript
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 flex items-center gap-1">
                      <span>📘</span> TypeScript
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Quotation Banner */}
              <div className="relative z-10 bg-[#121318]/90 border border-white/10 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-inner">
                <span className="text-3xl text-[#F5A623] font-serif leading-none shrink-0 select-none">
                  “
                </span>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                  আপনার ব্যবসার জন্য আধুনিক রেসপন্সিভ ওয়েবসাইট, ওয়েব অ্যাপ বা যেকোনো সফটওয়্যার ডেভলপমেন্ট সেবার জন্য সরাসরি{' '}
                  <span className="text-[#F5A623] font-bold">যোগাযোগ করুন।</span>
                </p>
              </div>

              {/* 3. Email Box Row */}
              <div className="relative z-10 bg-[#121318]/90 border border-white/10 p-3 sm:p-3.5 rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 pl-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white truncate select-all">
                      huumayunahmed@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-1 sm:pt-0">
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-gray-200 transition-colors border border-white/10"
                    title="কপি করুন"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                  <a
                    href="mailto:huumayunahmed@gmail.com"
                    className="px-4 py-2.5 bg-gradient-to-r from-[#F5A623] to-[#E8950F] text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#F5A623]/30 hover:brightness-110 active:scale-95"
                  >
                    <Send size={14} />
                    <span>ইমেইল করুন</span>
                  </a>
                </div>
              </div>

              {/* 4. WhatsApp Full Banner Button */}
              <a
                href="https://wa.me/8801768802953?text=Hello%20Humayun%20Ahmed,%20I%20saw%20your%20website%20work%20and%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base py-3.5 px-5 rounded-2xl flex items-center justify-between gap-3 transition-all duration-300 shadow-xl shadow-emerald-900/40 border border-emerald-400/40 active:scale-95 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold leading-tight">হোয়াটসঅ্যাপে মেসেজ পাঠান</p>
                    <p className="text-[10px] text-emerald-100/90 font-medium">দ্রুত রিপ্লাই পাবেন ⚡</p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={18} />
                </div>
              </a>

              {/* 5. Experience Stats Grid */}
              <div className="relative z-10 grid grid-cols-3 gap-2 bg-[#121318]/90 border border-white/10 p-3 sm:p-4 rounded-2xl text-center">
                <div className="space-y-0.5 border-r border-white/10 pr-2">
                  <p className="text-sm sm:text-base font-extrabold text-[#F5A623] flex items-center justify-center gap-1">
                    <Code2 size={14} />
                    <span>5+</span>
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold truncate">
                    Years Experience
                  </p>
                </div>

                <div className="space-y-0.5 border-r border-white/10 px-2">
                  <p className="text-sm sm:text-base font-extrabold text-[#F5A623] flex items-center justify-center gap-1">
                    <Star size={14} className="fill-[#F5A623]" />
                    <span>50+</span>
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold truncate">
                    Happy Clients
                  </p>
                </div>

                <div className="space-y-0.5 pl-2">
                  <p className="text-sm sm:text-base font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                    <Layers size={14} />
                    <span>100+</span>
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold truncate">
                    Projects Done
                  </p>
                </div>
              </div>

              {/* 6. Social Links Row */}
              <div className="relative z-10 flex items-center justify-center gap-3 pt-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="mailto:huumayunahmed@gmail.com"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Portfolio"
                >
                  <Globe size={16} />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
