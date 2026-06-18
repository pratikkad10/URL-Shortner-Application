import React from 'react';

const referrersData = [
    { initial: 't', name: 'Twitter (X)', clicks: '42,500', percentage: '34%' },
    { initial: 'd', name: 'Direct', clicks: '31,200', percentage: '25%' },
    { initial: 'l', name: 'LinkedIn', clicks: '18,400', percentage: '15%' },
    { initial: 'g', name: 'Google Search', clicks: '12,100', percentage: '10%' },
    { initial: 'f', name: 'Facebook', clicks: '8,500', percentage: '7%' },
];

const TopReferrers = () => {
    return (
        <div className="col-span-1 md:col-span-12 lg:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 pb-4 border-b border-outline-variant/50">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Top Referrers</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-bright border-b border-outline-variant/50">
                            <th className="px-6 py-3 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Source</th>
                            <th className="px-6 py-3 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Clicks</th>
                            <th className="px-6 py-3 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">% of Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/30 text-body-sm font-body-sm">
                        {referrersData.map((referrer, index) => (
                            <tr key={index} className="hover:bg-surface-variant/30 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-xs">{referrer.initial}</div>
                                    <span className="font-medium text-on-surface">{referrer.name}</span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono-sm">{referrer.clicks}</td>
                                <td className="px-6 py-4 text-right text-on-surface-variant">{referrer.percentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopReferrers;
