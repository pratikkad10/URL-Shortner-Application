import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from './components/StatCard';
import RecentLinksTable from './components/RecentLinksTable';
import ActivityFeed from './components/ActivityFeed';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { analyticsService } from '../../services/analyticsService';
import { toast } from 'sonner';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await analyticsService.getDashboardStats();
                if (response.success) {
                    setStats(response.data);
                }
            } catch (error) {
                toast.error("Failed to load dashboard statistics");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Helper to format numbers (e.g. 1248 -> 1,248)
    const formatNumber = (num) => num?.toLocaleString() || '0';
    
    // Helper to format trend text
    const formatTrend = (growth, isInverse = false) => {
        if (growth === 0) return { text: "Stable", icon: "horizontal_rule", color: "text-on-surface-variant" };
        
        const isPositive = growth > 0;
        const isGood = isInverse ? !isPositive : isPositive;
        
        return {
            text: `${isPositive ? '+' : ''}${growth}% from last month`,
            icon: isPositive ? "trending_up" : "trending_down",
            color: isGood ? "text-secondary" : "text-error"
        };
    };

    return (
        <div className="flex-1 p-4 md:p-8 overflow-y-auto max-w-container-max mx-auto w-full">
            {/* Welcome Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg text-on-surface">
                        Welcome back, {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() : 'User'}!
                    </h1>
                    <p className="text-body-md font-body-md text-on-surface-variant mt-1">Here's what's happening with your links today.</p>
                </div>
                <Button className="md:hidden w-full sm:w-auto h-10 gap-2 px-4" onClick={() => navigate('/links/create')}>
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create New Link
                </Button>
            </div>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Links" 
                    value={isLoading ? "-" : formatNumber(stats?.totalLinks?.value)} 
                    icon="link" 
                    colorClass="bg-primary-container/20 text-primary" 
                    trendText={isLoading ? "..." : formatTrend(stats?.totalLinks?.growth).text} 
                    trendIcon={isLoading ? "horizontal_rule" : formatTrend(stats?.totalLinks?.growth).icon} 
                    trendColorClass={isLoading ? "text-on-surface-variant" : formatTrend(stats?.totalLinks?.growth).color} 
                />
                <StatCard 
                    title="Total Clicks" 
                    value={isLoading ? "-" : formatNumber(stats?.totalClicks?.value)} 
                    icon="ads_click" 
                    colorClass="bg-secondary-container/20 text-on-secondary-container" 
                    trendText={isLoading ? "..." : formatTrend(stats?.totalClicks?.growth).text} 
                    trendIcon={isLoading ? "horizontal_rule" : formatTrend(stats?.totalClicks?.growth).icon} 
                    trendColorClass={isLoading ? "text-on-surface-variant" : formatTrend(stats?.totalClicks?.growth).color} 
                />
                <StatCard 
                    title="Active Links" 
                    value={isLoading ? "-" : formatNumber(stats?.activeLinks?.value)} 
                    icon="bolt" 
                    colorClass="bg-tertiary-fixed/50 text-on-tertiary-fixed" 
                    trendText={isLoading ? "..." : formatTrend(stats?.activeLinks?.growth).text} 
                    trendIcon={isLoading ? "horizontal_rule" : formatTrend(stats?.activeLinks?.growth).icon} 
                    trendColorClass={isLoading ? "text-on-surface-variant" : formatTrend(stats?.activeLinks?.growth).color} 
                />
                <StatCard 
                    title="Avg. Conversion" 
                    value={isLoading ? "-" : `${stats?.avgConversion?.value || 0}%`} 
                    icon="percent" 
                    colorClass="bg-error-container/50 text-on-error-container" 
                    trendText={isLoading ? "..." : formatTrend(stats?.avgConversion?.growth).text} 
                    trendIcon={isLoading ? "horizontal_rule" : formatTrend(stats?.avgConversion?.growth).icon} 
                    trendColorClass={isLoading ? "text-on-surface-variant" : formatTrend(stats?.avgConversion?.growth).color} 
                />
            </div>

            {/* Main Layout Grid (Tables & Activity) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RecentLinksTable />
                <ActivityFeed activities={stats?.recentActivity || []} />
            </div>
        </div>
    );
};

export default Dashboard;
