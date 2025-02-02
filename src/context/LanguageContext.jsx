import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Retrieve the language from localStorage if available
    return localStorage.getItem("selectedLanguage") || null;
  });

  useEffect(() => {
    // Save the selected language to localStorage whenever it changes
    if (selectedLanguage) {
      localStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
