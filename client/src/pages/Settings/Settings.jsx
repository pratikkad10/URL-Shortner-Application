import React from 'react';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';

const navItems = [
    { id: 'profile', label: 'Profile', active: true },
    { id: 'security', label: 'Security', active: false },
    { id: 'team', label: 'Team', active: false },
];

const Settings = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-container-max mx-auto w-full">
            <h1 className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg text-on-surface mb-8">Settings</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Navigation (Vertical Tabs) */}
                <aside className="w-full md:w-64 shrink-0">
                    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none">
                        {navItems.map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`shrink-0 md:flex-shrink-auto text-label-md font-label-md px-4 py-2 md:rounded-lg transition-colors ${item.active
                                        ? 'text-primary font-medium border-b-2 md:border-b-0 md:border-l-4 border-primary bg-surface-container-low md:bg-surface-container-low'
                                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-b-2 border-transparent md:border-none'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Settings Canvas */}
                <div className="flex-1 max-w-3xl space-y-8 pb-16">
                    <ProfileSection />
                    <SecuritySection />
                </div>
            </div>
        </div>
    );
};

export default Settings;
