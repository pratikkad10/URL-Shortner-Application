import React from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../ui/Input';
import IconButton from '../ui/IconButton';

const getPageTitle = (pathname) => {
    switch (pathname) {
        case '/dashboard':
            return 'Overview';
        case '/links':
            return 'Manage Links';
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
                <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant cursor-pointer">
                    <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvurcKC6O6woBnwFKm8vTgdfjo82-02Nn1y8ZS6_sMDa4Zc8OxxXvSDFsocSG574iL6jzYX94ZlA3H8UyvYj61u5lqaJpufsmocpVuvlMFWydspGLeMMWlMy9nBHaM_73TDdMgzyZt6qiHzI_4klwggj3yHoy8KNFHx7TEQcfvcRcdJngQZeetropbYUKdFrAUlkxYgdann3ALeJq6u9jcumX3jb7UyWJ1C9USyYEAfTUbn4o1lTg-lFve5gTYUI0X-DFMpVcnoG0" />
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
