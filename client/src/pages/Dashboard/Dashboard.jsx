import React from 'react';
import StatCard from './components/StatCard';
import RecentLinksTable from './components/RecentLinksTable';
import ActivityFeed from './components/ActivityFeed';
import Button from '../../components/ui/Button';

const Dashboard = () => {
    return (
        <div className="flex-1 p-4 md:p-8 overflow-y-auto max-w-container-max mx-auto w-full">
            {/* Welcome Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-headline-lg font-headline-lg text-on-surface">Welcome back, Alex!</h1>
                    <p className="text-body-md font-body-md text-on-surface-variant mt-1">Here's what's happening with your links today.</p>
                </div>
                <Button className="md:hidden w-full sm:w-auto h-10 gap-2 px-4">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create New Link
                </Button>
            </div>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Links" 
                    value="1,248" 
                    icon="link" 
                    colorClass="bg-primary-container/20 text-primary" 
                    trendText="+12% from last month" 
                    trendIcon="trending_up" 
                    trendColorClass="text-secondary" 
                />
                <StatCard 
                    title="Total Clicks" 
                    value="84.2K" 
                    icon="ads_click" 
                    colorClass="bg-secondary-container/20 text-on-secondary-container" 
                    trendText="+24% from last month" 
                    trendIcon="trending_up" 
                    trendColorClass="text-secondary" 
                />
                <StatCard 
                    title="Active Links" 
                    value="892" 
                    icon="bolt" 
                    colorClass="bg-tertiary-fixed/50 text-on-tertiary-fixed" 
                    trendText="Stable" 
                    trendIcon="horizontal_rule" 
                    trendColorClass="text-on-surface-variant" 
                />
                <StatCard 
                    title="Avg. Conversion" 
                    value="4.8%" 
                    icon="percent" 
                    colorClass="bg-error-container/50 text-on-error-container" 
                    trendText="-1.2% from last month" 
                    trendIcon="trending_down" 
                    trendColorClass="text-error" 
                />
            </div>

            {/* Main Layout Grid (Tables & Activity) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RecentLinksTable />
                <ActivityFeed />
            </div>
        </div>
    );
};

export default Dashboard;
