import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout , isLoggedIn } = useAuth();
    const {theme, toggleTheme} = useTheme();
    const { language, changeLanguage, t } = useLanguage();
    const cart = useSelector((state) => state.cart);


    const linkCass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200";

    return (
        //  < !--Navigation Bar-- >
        <nav  className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40"
            style={
                {
                    backgroundColor : theme ==="dark" ? "#111" : "#eee",
                    color: theme==="dark" ? "#fff" : "#000"
                }
            }
        
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* logo  */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <i className="fas fa-store text-2xl text-blue-600 mr-2"></i>
                            <span className="text-xl font-bold text-gray-800">{t.welcome}</span>
                        </div>
                    </div>

                    {/* desktop menu  */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to="/" className="{linkCass}">
                            <i className="fas fa-home mr-1"></i>{t.home}
                        </NavLink>
                         <NavLink to="/dashboard" className="{linkCass}">
                            <i className="fas fa-home mr-1"></i>{t.dashboard}
                        </NavLink>
                         <NavLink to="/profile" className="{linkCass}">
                            <i className="fas fa-user mr-1"></i>{t.profile}
                        </NavLink>
                         <NavLink to="/about" className="{linkCass}">
                            <i className="fas fa-info-circle mr-1"></i>{t.about}
                        </NavLink>
                         <NavLink to="/contact" className="{linkCass}">
                            <i className="fas fa-envelope mr-1"></i>{t.contact}
                        </NavLink>
                        <NavLink to="/products" className="{linkCass}">
                            <i className="fas fa-boxes mr-1"></i>{t.products}
                        </NavLink>
                        
                        {!isLoggedIn && (
                            <>
                            <NavLink to="/login" className="{linkCass}">
                                <i className="fas fa-user mr-1"></i>Login
                            </NavLink>
                            <NavLink to="/register" className="{linkCass}">
                                <i className="fas fa-user mr-1"></i>Register
                            </NavLink>
                            </>
                        )}

                         {isLoggedIn && (
                            <NavLink onClick={() => logout()} className="{linkCass}">
                                <i className="fas fa-user mr-1"></i>Logout
                            </NavLink>
                         )}
                         { cart && cart.items && (
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            <i className="fas fa-chart-line mr-1"></i>
                            <NavLink to="/cart" className="{linkCass}">
                                  <span id="productCount">{cart?.items?.length}</span> {t.products}
                            </NavLink>
                        </div>
                         )}

                         <button onClick={toggleTheme}>
                            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                        </button>

                        <select value={language} 
                        onChange={(e) => changeLanguage(e.target.value)} 
                        className="border border-gray-300 rounded-md px-2 py-1">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                    </div>

                    {/* <!-- Mobile Menu --> */}
                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isMobileMenuOpen ? "✕" : "☰"}
                    </button>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 mt-2 w-full absolute bg-white left-0 top-16 shadow-lg">
                            <a
                                href="#products"
                                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fas fa-boxes mr-2"></i>
                                Products
                            </a>

                            <a
                                href="#add-product"
                                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Add Product
                            </a>
                        </div>
                    )}
                </div >
            </div>
        </nav >
    )
}