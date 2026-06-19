import React from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../ui/Input';
import IconButton from '../ui/IconButton';
import TierBadge from '../ui/TierBadge';
import { useAuth } from '../../context/AuthContext';

const getPageTitle = (pathname) => {
    switch (pathname) {
        case '/dashboard':
            return 'Overview';
        case '/links':
            return 'Manage Links';
        case '/links/create':
            return 'Create New Link';
        case '/analytics':
            return 'Analytics';
        case '/settings':
            return 'Settings';
        default:
            return 'Overview';
    }
};

const DashboardHeader = () => {
    const location = useLocation();
    const title = getPageTitle(location.pathname);
    const { user } = useAuth();

    return (
        <header className="hidden md:flex justify-between items-center px-8 py-6 border-b border-outline-variant bg-surface-bright sticky top-0 z-30">
            <div>
                <h2 className="text-headline-md font-headline-md text-on-surface">{title}</h2>
            </div>
            <div className="flex items-center gap-6">
                <div className="w-64">
                    <Input
                        icon="search"
                        placeholder="Search links..."
                        type="text"
                        size="sm"
                        containerClassName="h-10 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 bg-surface transition-all"
                    />
                </div>
                <div className="relative">
                    <IconButton icon="notifications" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border border-surface pointer-events-none"></span>
                </div>
                <TierBadge tier={user?.tier} />
            </div>
        </header>
    );
};

export default DashboardHeader;
