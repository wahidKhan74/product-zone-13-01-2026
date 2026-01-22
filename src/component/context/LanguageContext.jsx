import { createContext, useContext, useState } from "react";
// 1. create context
export const LanguageContext = createContext();

const transilations = {
  en: {
    welcome: "Product Zone",
    description: "New update is live. Check it out! Your online store for everything",
    home: "Home",
    dashboard: "Dashboard",
    profile: "Profile",
    about: "About",
    contact: "Contact",
    products: "Products",
    cart: "Cart",
  },
  es: {
    welcome: "Product Zone",
    description: "Nueva actualización en vivo. ¡Échale un vistazo! Tu tienda en línea para todo",
    home: "Inicio",
    dashboard: "Tablero",
    profile: "Perfil",
    about: "Acerca de",
    contact: "Contacto",
    products: "Productos",
    cart: "Carrito",
  },
  hi : {
    welcome: "प्रोडक्ट ज़ोन",
    description: "नया अपडेट लाइव है। इसे देखें! आपके लिए हर चीज़ की ऑनलाइन दुकान",
    home: "होम",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    about: "के बारे में",
    contact: "संपर्क करें",
    products: "उत्पाद",
    cart: "कार्ट",
  }
};

// 2. create provider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
  }

    return (
    <LanguageContext.Provider value={{ language, changeLanguage, t: transilations[language] }}>
        {children}
    </LanguageContext.Provider>
  );
}

// 3. export cutom hook
export const useLanguage = () => useContext(LanguageContext);