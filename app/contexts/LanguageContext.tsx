import React, { createContext, ReactNode, useContext, useState } from 'react';

type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Home
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    portalName: "Nepal Public Transparency Portal",
    activeProjects: "Active Projects",
    totalBudget: "Total Budget",
    openTenders: "Open Tenders",
    completionRate: "Completion Rate",
    quickActions: "Quick Actions",
    recentActivity: "Recent Activity",
    viewAll: "View All",
    todaysInsight: "Today's Insight",
    budgetUtilization: "Budget Utilization",
    viewDetails: "View Details",

    // Shortcuts
    budgetTracker: "Budget Tracker",
    monitorSpending: "Monitor government spending",
    projects: "Projects",
    trackProgress: "Track infrastructure progress",
    tenders: "Tenders",
    govProcurement: "Government procurement",
    settings: "Settings",
    appPreferences: "App preferences",
    configure: "Configure",

    // Settings
    darkMode: "Dark Mode",
    darkModeDesc: "Switch between light and dark themes",
    notifications: "Notifications",
    notificationsDesc: "Manage notification preferences",
    language: "Language",
    languageDesc: "Change app language",
    privacy: "Privacy",
    privacyDesc: "Privacy and security settings",
    about: "About",
    aboutDesc: "App version and information",
    customizeExp: "Customize your app experience",

    // Budget
    budget: "Budget",
    fiscalYear: "Fiscal Year 2025 - Public Transparency Portal",
    searchBudget: "Search budget items and projects...",
    totalAllocated: "Total Allocated",
    spent: "Spent",
    committed: "Committed",
    available: "Available",
    pending: "Pending",
    overview: "Overview",
    departments: "Departments",

    // Common
    total: "Total",
  },
  ne: {
    // Home
    goodMorning: "शुभ प्रभात",
    goodAfternoon: "शुभ दिउँसो",
    goodEvening: "शुभ साँझ",
    portalName: "नेपाल सार्वजनिक पारदर्शिता पोर्टल",
    activeProjects: "सक्रिय परियोजनाहरू",
    totalBudget: "कुल बजेट",
    openTenders: "खुला टेन्डरहरू",
    completionRate: "पूर्णता दर",
    quickActions: "द्रुत कार्यहरू",
    recentActivity: "हालको गतिविधि",
    viewAll: "सबै हेर्नुहोस्",
    todaysInsight: "आजको अन्तरदृष्टि",
    budgetUtilization: "बजेट उपयोग",
    viewDetails: "विवरण हेर्नुहोस्",

    // Shortcuts
    budgetTracker: "बजेट ट्र्याकर",
    monitorSpending: "सरकारी खर्च अनुगमन गर्नुहोस्",
    projects: "परियोजनाहरू",
    trackProgress: "पूर्वाधार प्रगति ट्र्याक गर्नुहोस्",
    tenders: "टेन्डरहरू",
    govProcurement: "सरकारी खरिद",
    settings: "सेटिङहरू",
    appPreferences: "एप प्राथमिकताहरू",
    configure: "कन्फिगर गर्नुहोस्",

    // Settings
    darkMode: "डार्क मोड",
    darkModeDesc: "हल्का र अँध्यारो थिमहरू बीच स्विच गर्नुहोस्",
    notifications: "सूचनाहरू",
    notificationsDesc: "सूचना प्राथमिकताहरू व्यवस्थापन गर्नुहोस्",
    language: "भाषा",
    languageDesc: "एप भाषा परिवर्तन गर्नुहोस्",
    privacy: "गोपनीयता",
    privacyDesc: "गोपनीयता र सुरक्षा सेटिङहरू",
    about: "बारेमा",
    aboutDesc: "एप संस्करण र जानकारी",
    customizeExp: "आफ्नो एप अनुभव अनुकूलन गर्नुहोस्",

    // Budget
    budget: "बजेट",
    fiscalYear: "आर्थिक वर्ष २०२५ - सार्वजनिक पारदर्शिता पोर्टल",
    searchBudget: "बजेट वस्तुहरू र परियोजनाहरू खोज्नुहोस्...",
    totalAllocated: "कुल विनियोजित",
    spent: "खर्च भएको",
    committed: "प्रतिबद्ध",
    available: "उपलब्ध",
    pending: "बाँकी",
    overview: "सारांश",
    departments: "विभागहरू",

    // Common
    total: "कुल",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
