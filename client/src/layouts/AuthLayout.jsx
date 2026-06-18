import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col antialiased">
            {/* Main Content Canvas */}
            <main className="grow flex items-center justify-center p-4 sm:p-6 w-full relative z-10">
                <div className="w-full max-w-[420px] bg-surface-container-lowest border border-surface-variant rounded-xl p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),0_2px_4px_-2px_rgb(0_0_0/0.05)] relative overflow-hidden">
                    {/* Decorative gradient accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary"></div>
                    <Outlet />
                </div>
            </main>

            {/* Minimal footer for transactional pages */}
            <footer className="w-full border-t border-outline-variant bg-surface-container-lowest py-4 px-6">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center">
                    <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 LinkSnap Inc.</p>
                    <div className="flex space-x-4">
                        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Help</Link>
                        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
