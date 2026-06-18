import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const NavItem = ({ label, icon, path }) => {
    const location = useLocation();
    const isActive = location.pathname === path;
    
    const baseClasses = "flex items-center gap-3 px-4 py-2 rounded-lg text-label-md font-label-md transition-all duration-200";
    const activeClasses = isActive 
        ? "bg-primary-container text-on-primary shadow-sm"
        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface";

    return (
        <Link className={`${baseClasses} ${activeClasses}`} to={path}>
            <span className="material-symbols-outlined">{icon}</span>
            {label}
        </Link>
    );
};

const SideNavBar = () => {
    const navigate = useNavigate();
    const mainLinks = [
        { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { label: 'Links', icon: 'link', path: '/links' },
        { label: 'Analytics', icon: 'bar_chart', path: '/analytics' },
        { label: 'Settings', icon: 'settings', path: '/settings' }
    ];

    const bottomLinks = [
        { label: 'Support', icon: 'help', path: '/support' },
        { label: 'Sign Out', icon: 'logout', path: '/login' }
    ];

    return (
        <aside className="hidden md:flex flex-col h-full py-6 px-4 space-y-2 bg-surface-container-lowest text-on-surface fixed left-0 top-0 w-[240px] border-r border-outline-variant z-40">
            <div className="mb-8 px-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">LS</div>
                <div>
                    <h1 className="text-headline-sm font-headline-sm font-bold text-on-surface">LinkSnap</h1>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Enterprise Plan</p>
                </div>
            </div>
            <Button className="w-full mb-6 gap-2" onClick={() => navigate('/links/create')}>
                <span className="material-symbols-outlined text-[20px]">add</span>
                Create New Link
            </Button>
            
            <nav className="flex-1 space-y-1">
                {mainLinks.map((link, idx) => (
                    <NavItem key={idx} {...link} />
                ))}
            </nav>
            
            <div className="mt-auto space-y-1 border-t border-outline-variant pt-4">
                {bottomLinks.map((link, idx) => (
                    <NavItem key={idx} {...link} />
                ))}
            </div>
        </aside>
    );
};

export default SideNavBar;
