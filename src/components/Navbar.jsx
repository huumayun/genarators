import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar({ activeTab, setActiveTab, onOpenContact, onOpenAdmin }) {
  const { companyDetails } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'products', label: 'পণ্যসমূহ' },
    { id: 'services', label: 'সার্ভিস সমূহ' },
    { id: 'brands', label: 'ব্র্যান্ডসমূহ' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-lg shadow-black/50 border-b border-white/10' : 'bg-[#0E0E0E]/90 border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="text-left group flex flex-col focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#F5A623] transition-colors font-heading">
            {companyDetails.name}
          </span>
          <span className="text-[11px] sm:text-xs text-[#F5A623] font-medium tracking-wide">
            {companyDetails.tagline}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-all relative rounded-md ${
                  isActive 
                    ? 'text-[#F5A623]' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#F5A623] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFB627] text-black font-semibold text-sm px-5 py-2.2 rounded-full transition-all duration-200 shadow-md shadow-[#F5A623]/20 hover:scale-[1.03] active:scale-95"
          >
            <PhoneCall size={15} />
            <span>যোগাযোগ করুন</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141414] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#F5A623] text-black font-bold py-3 rounded-full text-base shadow-lg shadow-[#F5A623]/20"
            >
              <PhoneCall size={18} />
              <span>যোগাযোগ করুন</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
