import { Film, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Check initial dark mode state
        setIsDarkMode(document.body.classList.contains('dark'));
    }, []);

    const handleTheme = () => {
        document.body.classList.toggle("dark");
        setIsDarkMode(!isDarkMode);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleLanguageDropdown = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navItems = [
        { path: "/", label: "Главная" },
        { path: "/popular", label: "Популярные" },
        { path: "/top-rated", label: "Топ рейтинг" },
        { path: "/upcoming", label: "Скоро" },
        { path: "/movies", label: "Все фильмы" },
    ];

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                <Film className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                                BILT <span className="text-red-500">TICK</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    isActive(item.path)
                                        ? "text-red-500"
                                        : "text-gray-700 dark:text-gray-300 hover:text-red-400"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Language Selector */}
                        <div className="relative hidden sm:block">
                            <button
                                onClick={toggleLanguageDropdown}
                                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            >
                                <span className="text-sm font-medium">🇷🇺</span>
                                <span className="text-sm font-medium">Ру</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 transition-colors duration-200">
                                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                                        🇷🇺 Ру
                                    </button>
                                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                                        🇺🇸 En
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={handleTheme}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Login Button */}
                        <button className="hidden sm:block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
                            Войти
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${
                                        isActive(item.path)
                                            ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-all duration-200">
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;