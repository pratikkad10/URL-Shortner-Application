import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import IconButton from '../ui/IconButton';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Sync state with the class set by the inline script in index.html
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

    return (
        <header className="bg-surface/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-outline-variant flat no shadows">
            <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-16">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-headline-md font-headline-md font-bold text-primary hover:opacity-80 transition-opacity">
                        LinkSnap
                    </Link>
                    {/* Search (Left) - Hidden on mobile for simplicity */}
                    <div className="hidden md:flex items-center text-on-surface-variant">
                        <Input 
                            icon="search" 
                            size="sm" 
                            placeholder="Search..." 
                            type="text" 
                            containerClassName="bg-surface-container-low rounded-full w-48 focus-within:ring-2 focus-within:ring-primary" 
                            className="pl-2" 
                        />
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1 text-label-md font-label-md hover:text-primary transition-colors duration-200 opacity-80">Features</Link>
                    <Link to="/pricing" className="text-on-surface-variant pb-1 text-label-md font-label-md hover:text-primary transition-colors duration-200">Pricing</Link>
                </nav>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                        <IconButton 
                            icon={isDark ? "light_mode" : "dark_mode"} 
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                        />
                        <IconButton icon="notifications" />
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login"><Button variant="ghost" className="text-on-surface">Log in</Button></Link>
                        <Link to="/register"><Button variant="primary" size="sm">Sign up</Button></Link>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <IconButton icon="menu" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
