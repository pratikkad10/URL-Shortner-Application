import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="text-headline-md font-headline-md font-bold text-primary inline-block mb-2 hover:opacity-80 transition-opacity">
                        LinkSnap
                    </Link>
                    <p className="text-body-md font-body-md text-on-surface-variant">Manage your links effortlessly</p>
                </div>
                
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
