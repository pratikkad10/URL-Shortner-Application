import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import TopNavBar from '../components/layout/TopNavBar';
import SideNavBar from '../components/layout/SideNavBar';
import BottomNavBar from '../components/layout/BottomNavBar';
import DashboardHeader from '../components/layout/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const DashboardLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col md:flex-row">
            <TopNavBar />
            <SideNavBar />
            
            <main className="flex-1 md:ml-[240px] flex flex-col min-h-screen pb-20 md:pb-0">
                <DashboardHeader />
                <Outlet />
            </main>
            
            <BottomNavBar />
        </div>
    );
};

export default DashboardLayout;