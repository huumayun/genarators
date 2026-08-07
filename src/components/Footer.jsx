import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube, Share2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Footer({ onNavigate }) {
  const { companyDetails } = useData();
  return (
    <footer className="bg-[#F5A623] text-[#1A1A1A] pt-12 pb-6 font-bengali">
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
                className="w-8 h-8 rounded-full bg-black/90 text-[#F5A623] flex items-center justify-center hover:bg-black transition-colors"
                aria-label="WhatsApp"
              >
                <Share2 size={16} />
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

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold text-black/80">
          <div>
            © 2024 {companyDetails.name}। সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">গোপনীয়তা নীতি</a>
            <span>|</span>
            <a href="#" className="hover:underline">শর্তাবলী</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
