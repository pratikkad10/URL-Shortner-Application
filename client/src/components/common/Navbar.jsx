import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import TierBadge from '../ui/TierBadge';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();
    const [isDark, setIsDark] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Sync state with the class set by the inline script in index.html
        setIsMobileMenuOpen(false); // close menu on load
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-surface/80 backdrop-blur-md docked full-width top-0 z-50 border-b border-outline-variant flat no shadows relative">
            <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-16">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-headline-md font-headline-md font-bold text-primary hover:opacity-80 transition-opacity">
                        LinkSnap
                    </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-1 md:gap-2 text-on-surface-variant">
                        <IconButton
                            icon={isDark ? "light_mode" : "dark_mode"}
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                        />
                        <div className="hidden md:block">
                            <IconButton icon="notifications" />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <TierBadge tier={user.tier} />
                                <Link to="/dashboard"><Button variant="primary" size="sm">Dashboard</Button></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><Button variant="ghost" className="text-on-surface">Log in</Button></Link>
                                <Link to="/register"><Button variant="primary" size="sm">Sign up</Button></Link>
                            </>
                        )}
                    </div>
                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <IconButton icon={isMobileMenuOpen ? "close" : "menu"} onClick={toggleMobileMenu} aria-label="Toggle mobile menu" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-outline-variant shadow-lg flex flex-col p-6 gap-4 z-40">
                    {user ? (
                        <>
                            <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
                                <span className="text-body-md text-on-surface font-medium">{user.name || user.email}</span>
                                <TierBadge tier={user.tier} />
                            </div>
                            <Link to="/dashboard" onClick={toggleMobileMenu}><Button variant="primary" className="w-full justify-center">Go to Dashboard</Button></Link>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link to="/login" onClick={toggleMobileMenu}><Button variant="outline" className="w-full justify-center">Log in</Button></Link>
                            <Link to="/register" onClick={toggleMobileMenu}><Button variant="primary" className="w-full justify-center">Sign up</Button></Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
