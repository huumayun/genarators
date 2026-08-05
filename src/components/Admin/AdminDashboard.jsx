import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  Building2, 
  Settings, 
  Inbox, 
  LogOut, 
  Globe, 
  ShieldAlert, 
  LayoutDashboard,
  PhoneCall
} from 'lucide-react';

import ProductsAdmin from './ProductsAdmin';
import TeamAdmin from './TeamAdmin';
import ProjectsAdmin from './ProjectsAdmin';
import SettingsAdmin from './SettingsAdmin';
import InquiriesAdmin from './InquiriesAdmin';
import { useData } from '../../context/DataContext';

export default function AdminDashboard({ onExitAdmin }) {
  const { logoutAdmin, products, corporateClients, ownerAndTeam, inquiries, companyDetails } = useData();
  const [activeTab, setActiveTab] = useState('products');

  const navItems = [
    { id: 'products', label: 'জেনারেটর ক্যাটালগ', icon: Package, count: products.length },
    { id: 'team', label: 'স্বত্বাধিকারী ও টিম সদস্য', icon: Users, count: ownerAndTeam.team.length + 1 },
    { id: 'projects', label: 'কর্পোরেট ক্লায়েন্ট প্রজেক্ট', icon: Building2, count: corporateClients.length },
    { id: 'inquiries', label: 'কাস্টমার ইনকোয়ারি', icon: Inbox, count: inquiries.length, badge: inquiries.length > 0 },
    { id: 'settings', label: 'শপ কন্টাক্ট সেটিংস', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-bengali">
      
      {/* Top Admin Header */}
      <header className="bg-[#141414] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5A623] text-black font-extrabold flex items-center justify-center font-heading text-lg">
              S
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-white font-heading tracking-tight">
                {companyDetails.name} — এডমিন প্যানেল
              </h1>
              <p className="text-[11px] text-[#F5A623] font-semibold">
                লাইভ কন্টেন্ট ও প্রোডাক্ট কন্ট্রোল সেন্টার
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold px-4 py-2 rounded-full border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Globe size={14} className="text-[#F5A623]" />
              <span className="hidden sm:inline">ওয়েবসাইটে ফিরে যান</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 text-xs font-bold px-4 py-2 rounded-full border border-rose-500/30 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-[#141414] border border-white/10 rounded-3xl p-4 space-y-2 sticky top-20">
          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            এডমিন মেনু
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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

        {/* Right Active Admin Tab Content */}
        <main className="lg:col-span-9 space-y-6">
          {activeTab === 'products' && <ProductsAdmin />}
          {activeTab === 'team' && <TeamAdmin />}
          {activeTab === 'projects' && <ProjectsAdmin />}
          {activeTab === 'inquiries' && <InquiriesAdmin />}
          {activeTab === 'settings' && <SettingsAdmin />}
        </main>

      </div>
    </div>
  );
}
