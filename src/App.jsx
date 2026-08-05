import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import ProductGrid from './components/ProductGrid';
import ServiceBanner from './components/ServiceBanner';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import StatsBar from './components/StatsBar';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ClientProjects from './components/ClientProjects';
import TeamSection from './components/TeamSection';

// Pages
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import BrandsPage from './pages/BrandsPage';
import ContactPage from './pages/ContactPage';

// Admin
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';

// Modals
import ProductDetailModal from './components/Modals/ProductDetailModal';
import InquiryModal from './components/Modals/InquiryModal';

// Context
import { DataProvider, useData } from './context/DataContext';

// Floating Actions
import { Phone, MessageSquare } from 'lucide-react';

function MainApp() {
  const { companyDetails, isAdminLoggedIn } = useData();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');

  const handleOpenContact = (subject = '') => {
    setInquirySubject(subject);
    setInquiryModalOpen(true);
  };

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin Tab is Active
  if (activeTab === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onBackToSite={() => handleNavigate('home')} />;
    }
    return <AdminDashboard onExitAdmin={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-bengali">
      {/* Top Thin Contact Bar */}
      <TopBar onOpenAdmin={() => handleNavigate('admin')} />

      {/* Main Sticky Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenContact={() => handleOpenContact('সাধারণ ইনকোয়ারি')} 
        onOpenAdmin={() => handleNavigate('admin')}
      />

      {/* Main Dynamic Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero 
              onNavigateProducts={() => handleNavigate('products')} 
              onNavigateServices={() => handleNavigate('services')} 
            />
            <FeatureSection />
            <ProductGrid 
              onSelectProduct={(product) => setSelectedProduct(product)}
              onOpenContact={(title) => handleOpenContact(`জেনারেটর ইনকোয়ারি: ${title}`)}
              onNavigateProducts={() => handleNavigate('products')}
            />
            <ServiceBanner 
              onOpenServiceBooking={() => handleOpenContact('জেনারেটর সার্ভিসিং বুকিং')} 
            />
            <WhyChooseUs 
              onNavigateAbout={() => handleNavigate('about')} 
            />
            <ClientProjects 
              onOpenContact={(subj) => handleOpenContact(subj)} 
            />
            <TeamSection />
            <Testimonials 
              onNavigateAbout={() => handleNavigate('about')} 
            />
            <StatsBar />
            <Newsletter />
          </>
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenContact={() => handleOpenContact('আমাদের সম্পর্কে তথ্য')} />
        )}

        {activeTab === 'products' && (
          <ProductsPage 
            onSelectProduct={(product) => setSelectedProduct(product)}
            onOpenContact={(title) => handleOpenContact(`জেনারেটর ইনকোয়ারি: ${title}`)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage 
            onOpenServiceBooking={(serviceName) => handleOpenContact(`সার্ভিস অনুরোধ: ${serviceName}`)}
          />
        )}

        {activeTab === 'brands' && (
          <BrandsPage 
            onNavigateProducts={() => handleNavigate('products')} 
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Main Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${companyDetails.whatsapp}?text=${encodeURIComponent('হ্যালো, মেসার্স শামীম মেশিনারিজ থেকে জেনারেটর সংক্রান্ত ইনকোয়ারির জন্য নক দিচ্ছি।')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200 group relative"
          aria-label="WhatsApp Us"
        >
          <MessageSquare size={24} />
          <span className="absolute right-14 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            হোয়াটসঅ্যাপ করুন
          </span>
        </a>

        {/* Quick Phone Call Floating Button */}
        <a
          href={`tel:${companyDetails.phone}`}
          className="w-13 h-13 rounded-full bg-[#F5A623] hover:bg-[#FFB627] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200 group relative"
          aria-label="Call Us"
        >
          <Phone size={22} />
          <span className="absolute right-14 bg-black/90 text-[#F5A623] text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            সরাসরি কল দিন: {companyDetails.phone}
          </span>
        </a>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrderInquiry={(productTitle) => handleOpenContact(`ইনকোয়ারি: ${productTitle}`)}
        />
      )}

      {/* General Inquiry / Booking Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialSubject={inquirySubject}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
