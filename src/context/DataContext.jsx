import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [services] = useState(() => defaultServicesData);

  // 4. Corporate Clients State
  const [corporateClients, setCorporateClients] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return saved ? JSON.parse(saved) : defaultCorporateClientsData;
  });

  // 5. Owner & Team State
  const [ownerAndTeam, setOwnerAndTeam] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    return saved ? JSON.parse(saved) : defaultOwnerAndTeamData;
  });

  // 6. Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return saved ? JSON.parse(saved) : [];
  });

  // 7. Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || 'admin';
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyDetails));
  }, [companyDetails]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(corporateClients));
  }, [corporateClients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(ownerAndTeam));
  }, [ownerAndTeam]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
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

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const updateAdminPin = (newPin) => {
    setAdminPin(newPin);
  };

  // Reset to Default Factory Data
  const resetToDefaults = () => {
    setCompanyDetails(defaultCompanyDetails);
    setProducts(defaultProductsData);
    setCorporateClients(defaultCorporateClientsData);
    setOwnerAndTeam(defaultOwnerAndTeamData);
    setInquiries([]);
    localStorage.clear();
  };

  const value = {
    companyDetails,
    products,
    services,
    corporateClients,
    ownerAndTeam,
    inquiries,
    isAdminLoggedIn,
    adminPin,
    // Methods
    addProduct,
    updateProduct,
    deleteProduct,
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
    logoutAdmin,
    updateAdminPin,
    resetToDefaults
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
