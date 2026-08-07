import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import ReviewSubmissionPage from './pages/ReviewSubmissionPage';

// Admin
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';

// Modals
import ProductDetailModal from './components/Modals/ProductDetailModal';
import InquiryModal from './components/Modals/InquiryModal';

// Context
import { DataProvider, useData } from './context/DataContext';

// Icons & Floating Actions
import { Phone } from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';

function MainApp() {
  const { companyDetails, isAdminLoggedIn } = useData();

  // Check if current URL path is /admin
  const checkIsAdminPath = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    return path === '/admin' || path === '/admin/' || window.location.hash === '#admin';
  };

  // Check if current URL path is /review
  const checkIsReviewPath = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    return path === '/review' || path === '/review/' || path === '/write-review' || window.location.hash === '#review';
  };

  const getInitialTab = () => {
    if (checkIsAdminPath()) return 'admin';
    if (checkIsReviewPath()) return 'review';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');

  // Handle URL history & popstate for /admin and /review routes
  useEffect(() => {
    const handlePopState = () => {
      if (checkIsAdminPath()) {
        setActiveTab('admin');
      } else if (checkIsReviewPath()) {
        setActiveTab('review');
      } else {
        setActiveTab('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenContact = (subject = '') => {
    setInquirySubject(subject);
    setInquiryModalOpen(true);
  };

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'admin') {
      if (window.location.pathname.toLowerCase() !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
    } else if (tabId === 'review') {
      if (window.location.pathname.toLowerCase() !== '/review') {
        window.history.pushState({}, '', '/review');
      }
    } else {
      if (window.location.pathname.toLowerCase() === '/admin' || window.location.pathname.toLowerCase() === '/review') {
        window.history.pushState({}, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Review Submission Page is Active
  if (activeTab === 'review') {
    return <ReviewSubmissionPage onBackToSite={() => handleNavigate('home')} />;
  }

  // If Admin Tab is Active
  if (activeTab === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onBackToSite={() => handleNavigate('home')} />;
    }
    return <AdminDashboard onExitAdmin={() => handleNavigate('home')} />;
  }

  const pageVariants = {
    initial: { opacity: 0, scale: 0.96, y: 12 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: -8,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-bengali">
      {/* Top Thin Contact Bar */}
      <TopBar />

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenContact={() => handleOpenContact('সাধারণ ইনকোয়ারি')}
      />

      {/* Main Dynamic Page Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="smooth-gpu">
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
                onWriteReview={() => handleNavigate('review')}
              />
              <StatsBar />
              <Newsletter />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="smooth-gpu">
              <AboutPage onOpenContact={() => handleOpenContact('আমাদের সম্পর্কে তথ্য')} />
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div key="products" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="smooth-gpu">
              <ProductsPage
                onSelectProduct={(product) => setSelectedProduct(product)}
                onOpenContact={(title) => handleOpenContact(`জেনারেটর ইনকোয়ারি: ${title}`)}
              />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div key="services" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="smooth-gpu">
              <ServicesPage
                onOpenServiceBooking={(serviceName) => handleOpenContact(`সার্ভিস অনুরোধ: ${serviceName}`)}
              />
            </motion.div>
          )}

          {activeTab === 'brands' && (
            <motion.div key="brands" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="smooth-gpu">
              <BrandsPage
                onNavigateProducts={() => handleNavigate('products')}
              />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="smooth-gpu">
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Main Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${companyDetails.whatsapp}?text=${encodeURIComponent('হ্যালো, মেসার্স শামীম মেশিনারিজ থেকে জেনারেটর সংক্রান্ত ইনকোয়ারির জন্য নক দিচ্ছি।')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all smooth-gpu relative"
          aria-label="WhatsApp Us"
        >
          <WhatsAppIcon size={28} />
          <span className="absolute right-16 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            হোয়াটসঅ্যাপ করুন
          </span>
        </a>

        {/* Quick Phone Call Floating Button */}
        <a
          href={`tel:${companyDetails.phone}`}
          className="group w-12 h-12 rounded-full bg-[#F5A623] hover:bg-[#FFB627] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200 relative"
          aria-label="Call Us"
        >
          <Phone size={20} />
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
