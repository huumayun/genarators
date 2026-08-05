import React from 'react';
import { Phone, MapPin, Facebook, Youtube, Share2, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TopBar({ onOpenAdmin }) {
  const { companyDetails } = useData();

  return (
    <div className="bg-black text-gray-300 text-xs py-2 border-b border-white/10 font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Contact Items */}
        <div className="flex items-center gap-6">
          <a 
            href={`tel:${companyDetails.phone}`} 
            className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors"
          >
            <Phone size={13} className="text-[#F5A623]" />
            <span>{companyDetails.phone}</span>
          </a>

          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[#F5A623]" />
            <span>{companyDetails.location}</span>
          </div>
        </div>

        {/* Right Social & Admin Quick Button */}
        <div className="flex items-center gap-4 text-gray-400">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-[#F5A623] hover:text-[#FFB627] font-semibold text-[11px] bg-white/5 hover:bg-white/10 px-2.5 py-0.5 rounded-full border border-[#F5A623]/30 transition-all"
            title="এডমিন প্যানেল (Admin Panel)"
          >
            <ShieldCheck size={12} />
            <span>এডমিন প্যানেল</span>
          </button>

          <a href="#" className="hover:text-[#F5A623] transition-colors" aria-label="Facebook">
            <Facebook size={14} />
          </a>
          <a href="#" className="hover:text-[#F5A623] transition-colors" aria-label="Youtube">
            <Youtube size={14} />
          </a>
          <a href="#" className="hover:text-[#F5A623] transition-colors" aria-label="Share">
            <Share2 size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
