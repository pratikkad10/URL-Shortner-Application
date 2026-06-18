import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/layout/TopNavBar';
import SideNavBar from '../components/layout/SideNavBar';
import BottomNavBar from '../components/layout/BottomNavBar';
import DashboardHeader from '../components/layout/DashboardHeader';

const DashboardLayout = () => {
    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col md:flex-row">
            <TopNavBar />
            <SideNavBar />
            
            <main className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
                <DashboardHeader />
                <Outlet />
            </main>
            
            <BottomNavBar />
        </div>
    );
};

export default DashboardLayout;