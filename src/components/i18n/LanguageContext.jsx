import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('fbm_language');
    // Permitir ES, PT y EN, default ES
    if (savedLanguage && ['es', 'pt', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('es'); // Default español
      localStorage.setItem('fbm_language', 'es');
    }
  }, []);

  const changeLanguage = (lang) => {
    // Permitir ES, PT y EN
    if (['es', 'pt', 'en'].includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('fbm_language', lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // Si no se encontró traducción, mostrar placeholder solo en desarrollo
    if (value === undefined) {
      console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: ${key}`);
      return `[MISSING_${language.toUpperCase()}: ${key}]`;
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};