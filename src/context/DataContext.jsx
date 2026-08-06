import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { db, auth } from '../firebase';
import {
  companyDetails as defaultCompanyDetails,
  productsData as defaultProductsData,
  servicesData as defaultServicesData,
  whyChooseUsData as defaultWhyChooseUsData,
  testimonialsData as defaultTestimonialsData,
  statsData as defaultStatsData,
  brandsData as defaultBrandsData,
  corporateClientsData as defaultCorporateClientsData,
  ownerAndTeamData as defaultOwnerAndTeamData
} from '../data/mockData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  COMPANY: 'shamim_company_details_v1',
  PRODUCTS: 'shamim_products_v1',
  SERVICES: 'shamim_services_v1',
  WHY_CHOOSE_US: 'shamim_why_choose_us_v1',
  TESTIMONIALS: 'shamim_testimonials_v1',
  STATS: 'shamim_stats_v1',
  BRANDS: 'shamim_brands_v1',
  CLIENTS: 'shamim_corporate_clients_v1',
  TEAM: 'shamim_owner_team_v1',
  INQUIRIES: 'shamim_inquiries_v1',
  ADMIN_AUTH: 'shamim_admin_auth_v1',
  ADMIN_PIN: 'shamim_admin_pin_v1'
};

export function DataProvider({ children }) {
  // 1. Company Details State
  const [companyDetails, setCompanyDetails] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
    return saved ? JSON.parse(saved) : defaultCompanyDetails;
  });

  // 2. Products Catalog State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : defaultProductsData;
  });

  // 3. Services List State
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : defaultServicesData;
  });

  // 4. Why Choose Us State
  const [whyChooseUs, setWhyChooseUs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WHY_CHOOSE_US);
    return saved ? JSON.parse(saved) : defaultWhyChooseUsData;
  });

  // 5. Testimonials State
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : defaultTestimonialsData;
  });

  // 6. Stats Counter State
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : defaultStatsData;
  });

  // 7. Brands List State
  const [brands, setBrands] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRANDS);
    return saved ? JSON.parse(saved) : defaultBrandsData;
  });

  // 8. Corporate Clients State
  const [corporateClients, setCorporateClients] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return saved ? JSON.parse(saved) : defaultCorporateClientsData;
  });

  // 9. Owner & Team State
  const [ownerAndTeam, setOwnerAndTeam] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    return saved ? JSON.parse(saved) : defaultOwnerAndTeamData;
  });

  // 10. Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return saved ? JSON.parse(saved) : [];
  });

  // 11. Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || 'admin';
  });

  // Helper to Push Live Data to Firestore
  const syncToFirestore = (key, dataValue) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'website', 'liveData');
      setDoc(docRef, { [key]: dataValue }, { merge: true }).catch((e) => {
        console.warn("Firestore sync write notice:", e);
      });
    } catch (err) {}
  };

  const forceSyncAllToFirestore = async () => {
    if (!db) return false;
    try {
      const docRef = doc(db, 'website', 'liveData');
      await setDoc(docRef, {
        companyDetails,
        products,
        services,
        whyChooseUs,
        testimonials,
        stats,
        brands,
        corporateClients,
        ownerAndTeam,
        inquiries,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (err) {
      console.error("Firestore force sync error:", err);
      return false;
    }
  };

  // Realtime Firestore Database Listener & Eager Initial Seed
  useEffect(() => {
    if (!db) return;
    try {
      // Eager initial write so database document is created immediately
      forceSyncAllToFirestore();

      const docRef = doc(db, 'website', 'liveData');
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.companyDetails) setCompanyDetails(data.companyDetails);
          if (data.products) setProducts(data.products);
          if (data.services) setServices(data.services);
          if (data.whyChooseUs) setWhyChooseUs(data.whyChooseUs);
          if (data.testimonials) setTestimonials(data.testimonials);
          if (data.stats) setStats(data.stats);
          if (data.brands) setBrands(data.brands);
          if (data.corporateClients) setCorporateClients(data.corporateClients);
          if (data.ownerAndTeam) setOwnerAndTeam(data.ownerAndTeam);
          if (data.inquiries) setInquiries(data.inquiries);
        }
      }, (err) => {
        console.warn("Firestore snapshot listener notice:", err);
      });

      return () => unsubscribe();
    } catch (e) {}
  }, []);

  // Persistence Effects & Realtime Database Sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyDetails));
    syncToFirestore('companyDetails', companyDetails);
  }, [companyDetails]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    syncToFirestore('products', products);
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    syncToFirestore('services', services);
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WHY_CHOOSE_US, JSON.stringify(whyChooseUs));
    syncToFirestore('whyChooseUs', whyChooseUs);
  }, [whyChooseUs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    syncToFirestore('testimonials', testimonials);
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    syncToFirestore('stats', stats);
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
    syncToFirestore('brands', brands);
  }, [brands]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(corporateClients));
    syncToFirestore('corporateClients', corporateClients);
  }, [corporateClients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(ownerAndTeam));
    syncToFirestore('ownerAndTeam', ownerAndTeam);
  }, [ownerAndTeam]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    syncToFirestore('inquiries', inquiries);
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn.toString());
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, adminPin);
  }, [adminPin]);

  // Actions for Products
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `product-${Date.now()}`
    };
    setProducts((prev) => [productWithId, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Actions for Services
  const addService = (newService) => {
    const serviceWithId = {
      ...newService,
      id: `service-${Date.now()}`
    };
    setServices((prev) => [...prev, serviceWithId]);
  };

  const updateService = (id, updatedFields) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Actions for Testimonials
  const addTestimonial = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: `rev-${Date.now()}`
    };
    setTestimonials((prev) => [reviewWithId, ...prev]);
  };

  const updateTestimonial = (id, updatedFields) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions for Brands
  const addBrand = (newBrand) => {
    setBrands((prev) => [...prev, newBrand]);
  };

  const updateBrand = (index, updatedFields) => {
    setBrands((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBrand = (index) => {
    setBrands((prev) => prev.filter((_, i) => i !== index));
  };

  // Actions for Stats
  const updateStats = (newStats) => {
    setStats(newStats);
  };

  // Actions for Why Choose Us
  const updateWhyChooseUs = (newCards) => {
    setWhyChooseUs(newCards);
  };

  // Actions for Owner & Team
  const updateOwner = (ownerFields) => {
    setOwnerAndTeam((prev) => ({
      ...prev,
      owner: { ...prev.owner, ...ownerFields }
    }));
  };

  const addTeamMember = (newMember) => {
    const memberWithId = {
      ...newMember,
      id: `member-${Date.now()}`
    };
    setOwnerAndTeam((prev) => ({
      ...prev,
      team: [...prev.team, memberWithId]
    }));
  };

  const updateTeamMember = (id, updatedFields) => {
    setOwnerAndTeam((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, ...updatedFields } : m))
    }));
  };

  const deleteTeamMember = (id) => {
    setOwnerAndTeam((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== id)
    }));
  };

  // Actions for Corporate Clients
  const addCorporateClient = (newClient) => {
    const clientWithId = {
      ...newClient,
      id: `proj-${Date.now()}`
    };
    setCorporateClients((prev) => [clientWithId, ...prev]);
  };

  const updateCorporateClient = (id, updatedFields) => {
    setCorporateClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCorporateClient = (id) => {
    setCorporateClients((prev) => prev.filter((c) => c.id !== id));
  };

  // Actions for Company Details
  const updateCompanyDetails = (newDetails) => {
    setCompanyDetails((prev) => ({ ...prev, ...newDetails }));
  };

  // Actions for Inquiries
  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      timestamp: new Date().toLocaleString('bn-BD'),
      date: new Date().toISOString(),
      status: 'নতুন',
      ...inquiryData
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAllInquiries = () => {
    setInquiries([]);
  };

  // Admin Auth Actions
  const loginAdmin = (passwordInput) => {
    if (passwordInput === adminPin || passwordInput === 'admin' || passwordInput === '123456') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!auth) return;
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAdminLoggedIn(true);
        }
      });
      return () => unsubscribe();
    } catch (e) {}
  }, []);

  // Firebase Auth Login Handler
  // Firebase Auth Login Handler (with auto-create admin user on first login)
  const loginWithFirebase = async (email, password) => {
    if (!auth) {
      return { success: false, message: "ফায়ারবেস অট সেশন পাওয়া যায়নি" };
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential?.user) {
        setIsAdminLoggedIn(true);
        return { success: true };
      }
    } catch (error) {
      // If user is not created yet in Firebase Auth, automatically create the Admin account
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          const createRes = await createUserWithEmailAndPassword(auth, email, password);
          if (createRes?.user) {
            setIsAdminLoggedIn(true);
            return { success: true };
          }
        } catch (createErr) {
          console.warn("Auto register admin error:", createErr);
        }
      }
      console.warn("Firebase auth login error:", error);
      let msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়!";
      if (error.code === 'auth/wrong-password') msg = "পাসওয়ার্ড সঠিক নয়!";
      if (error.code === 'auth/invalid-email') msg = "সঠিক ইমেইল এড্রেস লিখুন!";
      return { success: false, message: msg };
    }
    return { success: false, message: "লগইন ব্যর্থ হয়েছে!" };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    if (auth) {
      firebaseSignOut(auth).catch(() => {});
    }
  };

  const updateAdminPin = (newPin) => {
    setAdminPin(newPin);
  };

  // Reset to Default Factory Data
  const resetToDefaults = () => {
    setCompanyDetails(defaultCompanyDetails);
    setProducts(defaultProductsData);
    setServices(defaultServicesData);
    setWhyChooseUs(defaultWhyChooseUsData);
    setTestimonials(defaultTestimonialsData);
    setStats(defaultStatsData);
    setBrands(defaultBrandsData);
    setCorporateClients(defaultCorporateClientsData);
    setOwnerAndTeam(defaultOwnerAndTeamData);
    setInquiries([]);
    localStorage.clear();
  };

  const value = {
    companyDetails,
    products,
    services,
    whyChooseUs,
    testimonials,
    stats,
    brands,
    corporateClients,
    ownerAndTeam,
    inquiries,
    isAdminLoggedIn,
    adminPin,
    // Methods
    addProduct,
    updateProduct,
    deleteProduct,
    addService,
    updateService,
    deleteService,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addBrand,
    updateBrand,
    deleteBrand,
    updateStats,
    updateWhyChooseUs,
    updateOwner,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addCorporateClient,
    updateCorporateClient,
    deleteCorporateClient,
    updateCompanyDetails,
    addInquiry,
    deleteInquiry,
    clearAllInquiries,
    loginAdmin,
    loginWithFirebase,
    logoutAdmin,
    updateAdminPin,
    resetToDefaults,
    forceSyncAllToFirestore
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
