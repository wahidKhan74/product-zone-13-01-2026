import { createContext, useContext, useState } from "react";

// 1. create context
export const ThemeContext = createContext();

// 2. create provider
export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={theme==="dark"? "dark": ""}>
            {children}
        </div>
    </ThemeContext.Provider>
  );
};

// 3. export cutom hook
export const useTheme = () => useContext(ThemeContext);
