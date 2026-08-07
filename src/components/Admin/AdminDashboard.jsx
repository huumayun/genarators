import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  Building2, 
  Settings, 
  Inbox, 
  LogOut, 
  Globe, 
  Wrench,
  Star,
  Award,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

import ProductsAdmin from './ProductsAdmin';
import TeamAdmin from './TeamAdmin';
import ProjectsAdmin from './ProjectsAdmin';
import SettingsAdmin from './SettingsAdmin';
import InquiriesAdmin from './InquiriesAdmin';
import ServicesAdmin from './ServicesAdmin';
import BrandsAdmin from './BrandsAdmin';
import ReviewsAdmin from './ReviewsAdmin';
import StatsAdmin from './StatsAdmin';
import { useData } from '../../context/DataContext';

export default function AdminDashboard({ onExitAdmin }) {
  const { logoutAdmin, products, services, brands, testimonials, corporateClients, ownerAndTeam, inquiries, companyDetails } = useData();
  const [activeTab, setActiveTab] = useState('products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'products', label: 'জেনারেটর ক্যাটালগ', icon: Package, count: products.length },
    { id: 'services', label: 'সার্ভিসসমূহ', icon: Wrench, count: services.length },
    { id: 'brands', label: 'ব্র্যান্ডসমূহ', icon: Globe, count: brands.length },
    { id: 'reviews', label: 'গ্রাহক রিভিউ', icon: Star, count: testimonials.length },
    { id: 'projects', label: 'কর্পোরেট ক্লায়েন্ট প্রজেক্ট', icon: Building2, count: corporateClients.length },
    { id: 'team', label: 'স্বত্বাধিকারী ও টিম সদস্য', icon: Users, count: ownerAndTeam.team.length + 1 },
    { id: 'stats', label: 'পরিসংখ্যান ও অর্জন', icon: Award },
    { id: 'inquiries', label: 'কাস্টমার ইনকোয়ারি', icon: Inbox, count: inquiries.length, badge: inquiries.length > 0 },
    { id: 'settings', label: 'শপ কন্টাক্ট সেটিংস', icon: Settings },
  ];

  const activeNavItem = navItems.find(item => item.id === activeTab);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false); // Automatically hide mobile menu after tapping a section!
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-bengali">
      
      {/* Top Compact Admin Header */}
      <header className="bg-[#141414] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">
          
          {/* Shop Title & Current Section Badge */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#F5A623] text-black font-extrabold flex items-center justify-center font-heading text-base shrink-0 shadow-md shadow-[#F5A623]/20">
              S
            </div>
            <div className="truncate">
              <h1 className="text-xs sm:text-base font-extrabold text-white font-heading tracking-tight truncate">
                {companyDetails.name}
              </h1>
              {activeNavItem && (
                <p className="text-[10px] text-[#F5A623] font-bold truncate flex items-center gap-1">
                  <span>কন্ট্রোল:</span>
                  <span className="bg-[#F5A623]/15 px-1.5 py-0.2 rounded border border-[#F5A623]/30">
                    {activeNavItem.label}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Desktop Right Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold px-4 py-2 rounded-full border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Globe size={14} className="text-[#F5A623]" />
              <span>ওয়েবসাইটে যান</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 text-xs font-bold px-4 py-2 rounded-full border border-rose-500/30 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>লগআউট</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                mobileMenuOpen
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[#F5A623] text-black border-[#F5A623] shadow-md shadow-[#F5A623]/20'
              }`}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              <span>{mobileMenuOpen ? 'বন্ধ করুন' : 'এডমিন মেনু'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Panel (Shows when mobileMenuOpen is true) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#141414] border-b border-white/10 px-4 py-4 space-y-2 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
            <div className="text-[11px] font-bold text-[#F5A623] uppercase tracking-wider px-2 pb-1 border-b border-white/10 flex items-center justify-between">
              <span>এডমিন মেনু সিলেক্ট করুন</span>
              <span className="text-gray-400 font-normal">ট্যাপ করলে মেনু হাইড হবে</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 pt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#F5A623] text-black font-extrabold shadow-md shadow-[#F5A623]/20'
                        : 'bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-black' : 'text-[#F5A623]'} />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.count !== undefined && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                            isActive
                              ? 'bg-black text-[#F5A623]'
                              : item.badge
                              ? 'bg-[#F5A623] text-black'
                              : 'bg-white/10 text-gray-300'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                      <ChevronRight size={14} className={isActive ? 'text-black' : 'text-gray-500'} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer Actions (Logout & Website Link tucked inside Menu) */}
            <div className="pt-3 mt-3 border-t border-white/10 grid grid-cols-2 gap-2">
              <button
                onClick={onExitAdmin}
                className="w-full bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold py-2.5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Globe size={14} className="text-[#F5A623]" />
                <span>ওয়েবসাইটে যান</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="w-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 text-xs font-bold py-2.5 rounded-xl border border-rose-500/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut size={14} />
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Admin Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Desktop Left Navigation Sidebar (>=lg screens) */}
        <aside className="hidden lg:block lg:col-span-3 bg-[#141414] border border-white/10 rounded-3xl p-4 space-y-2 sticky top-20">
          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            এডমিন মেনু (A-Z)
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#F5A623] text-black font-extrabold shadow-md shadow-[#F5A623]/20'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-black text-[#F5A623]'
                        : item.badge
                        ? 'bg-[#F5A623] text-black'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Active Admin Tab Content */}
        <main className="w-full lg:col-span-9 space-y-6 min-w-0">
          {activeTab === 'products' && <ProductsAdmin />}
          {activeTab === 'services' && <ServicesAdmin />}
          {activeTab === 'brands' && <BrandsAdmin />}
          {activeTab === 'reviews' && <ReviewsAdmin />}
          {activeTab === 'projects' && <ProjectsAdmin />}
          {activeTab === 'team' && <TeamAdmin />}
          {activeTab === 'stats' && <StatsAdmin />}
          {activeTab === 'inquiries' && <InquiriesAdmin />}
          {activeTab === 'settings' && <SettingsAdmin />}
        </main>

      </div>
    </div>
  );
}
