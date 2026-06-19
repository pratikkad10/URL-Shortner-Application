import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '../ui/IconButton';
import TierBadge from '../ui/TierBadge';
import { useAuth } from '../../context/AuthContext';

const TopNavBar = () => {
    const { user } = useAuth();
    return (
        <nav className="md:hidden w-full h-16 bg-surface-container-lowest/80 backdrop-blur-md text-on-surface border-b border-outline-variant docked full-width top-0 sticky z-50 flex justify-between items-center px-gutter mx-auto">
            <Link to="/" className="text-headline-md font-headline-md font-bold text-on-surface hover:opacity-80 transition-opacity">LinkSnap</Link>
            <div className="flex items-center gap-2">
                <IconButton icon="search" className="text-on-surface" />
                <div className="relative">
                    <IconButton icon="notifications" className="text-on-surface" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border border-surface pointer-events-none"></span>
                </div>
                <TierBadge tier={user?.tier} />
            </div>
        </nav>
    );
};

export default TopNavBar;
