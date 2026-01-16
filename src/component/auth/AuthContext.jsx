import { createContext, useContext, useState } from "react";

// Create AuthContext for managing authentication state
const AuthContext = createContext(null);

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to log in a user
    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    // Function to log out a user
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    // Provide the auth state and functions to children components
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};