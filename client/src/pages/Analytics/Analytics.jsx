import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClicksChart from './components/ClicksChart';
import DeviceBreakdown from './components/DeviceBreakdown';
import TopCountries from './components/TopCountries';
import TopReferrers from './components/TopReferrers';
import { analyticsService } from '../../services/analyticsService';
import { getShortUrlBase } from '../../utils/format';

const Analytics = () => {
    const { shortUrl } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const domain = getShortUrlBase();

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!shortUrl) {
                // Handle global analytics or redirect
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                // Fetch default 30 days
                const result = await analyticsService.getLinkAnalytics(shortUrl, 30);
                if (result.success) {
                    setData(result.data);
                } else {
                    setError('Failed to fetch analytics');
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Error fetching analytics');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [shortUrl]);

    if (isLoading) {
        return (
            <div className="p-4 md:p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-on-surface-variant">Loading analytics...</div>
            </div>
        );
    }

    if (error || (!data && shortUrl)) {
        return (
            <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-error mb-4">{error || 'No data found'}</div>
                <Link to="/links" className="text-primary hover:underline">Return to Links</Link>
            </div>
        );
    }

    if (!shortUrl) {
        return (
            <div className="p-4 md:p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-on-surface-variant">Please select a link from the <Link to="/links" className="text-primary hover:underline">Links page</Link> to view its analytics.</div>
            </div>
        );
    }

    const { urlInfo, totalClicks, clicksOverTime, deviceBreakdown, topCountries, topReferrers } = data;

    return (
        <div className="p-4 md:p-8 max-w-container-max mx-auto w-full flex-1 flex flex-col">
            {/* Context & Hero */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <Link to="/links" className="inline-flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant hover:text-primary transition-colors mb-2">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Link Management
                    </Link>
                    <h2 className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg text-on-surface flex items-center gap-2 md:gap-3 break-all">
                        <span className="text-primary material-symbols-outlined text-[24px] md:text-[32px] shrink-0">link</span>
                        {domain}/{urlInfo.shortUrl}
                    </h2>
                    <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                        Created on {new Date(urlInfo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <ClicksChart data={clicksOverTime} totalClicks={totalClicks} />
                <DeviceBreakdown data={deviceBreakdown} />
                <TopCountries data={topCountries} />
                <TopReferrers data={topReferrers} />
            </div>
        </div>
    );
};

export default Analytics;
