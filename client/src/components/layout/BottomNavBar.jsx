import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavItem = ({ label, icon, path }) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    const baseClasses = "flex flex-col items-center justify-center w-full h-full transition-colors";
    const textClasses = isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface";
    const iconWrapperClasses = "w-16 h-8 flex items-center justify-center mb-1 rounded-full " + (isActive ? "bg-primary-container" : "");
    const iconClasses = `material-symbols-outlined ${isActive ? "fill-icon text-on-primary-container" : ""}`;
    const fontClasses = `text-[10px] font-label-sm ${isActive ? "text-on-surface font-medium" : ""}`;

    return (
        <Link className={`${baseClasses} ${textClasses}`} to={path}>
            <div className={iconWrapperClasses}>
                <span className={iconClasses}>{icon}</span>
            </div>
            <span className={fontClasses}>{label}</span>
        </Link>
    );
};

const BottomNavBar = () => {
    const navLinks = [
        { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { label: 'Links', icon: 'link', path: '/links' },
        { label: 'Analytics', icon: 'bar_chart', path: '/analytics' },
        { label: 'Settings', icon: 'settings', path: '/settings' }
    ];

    return (
        <nav className="md:hidden w-full h-16 bg-surface-container-lowest border-t border-outline-variant fixed bottom-0 left-0 z-50 flex justify-around items-center px-2">
            {navLinks.map((link, idx) => (
                <MobileNavItem key={idx} {...link} />
            ))}
        </nav>
    );
};

export default BottomNavBar;
