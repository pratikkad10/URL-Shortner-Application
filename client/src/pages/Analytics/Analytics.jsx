import React from 'react';
import { Link } from 'react-router-dom';
import DateRangeSelector from './components/DateRangeSelector';
import ClicksChart from './components/ClicksChart';
import DeviceBreakdown from './components/DeviceBreakdown';
import TopCountries from './components/TopCountries';
import TopReferrers from './components/TopReferrers';

const Analytics = () => {
    return (
        <div className="p-4 md:p-8 max-w-container-max mx-auto w-full flex-1 flex flex-col">
            {/* Context & Hero */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <Link to="/links" className="inline-flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant hover:text-primary transition-colors mb-2">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Link Management
                    </Link>
                    <h2 className="text-headline-lg font-headline-lg text-on-surface flex items-center gap-3">
                        <span className="text-primary material-symbols-outlined text-[32px]">link</span>
                        linksn.ap/summer-promo-24
                    </h2>
                    <p className="text-body-md font-body-md text-on-surface-variant mt-1">Created on May 15, 2024</p>
                </div>
                
                {/* Date Range Selector */}
                <DateRangeSelector />
            </div>
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <ClicksChart />
                <DeviceBreakdown />
                <TopCountries />
                <TopReferrers />
            </div>
        </div>
    );
};

export default Analytics;
