import React from 'react';

const TopReferrers = ({ data = [] }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="col-span-1 md:col-span-12 lg:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 pb-4 border-b border-outline-variant/50">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Top Referrers</h3>
            </div>
            <div className="overflow-x-auto flex-1">
                {data.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-bright border-b border-outline-variant/50">
                                <th className="px-6 py-3 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Source</th>
                                <th className="px-6 py-3 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Clicks</th>
                                <th className="px-6 py-3 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">% of Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/30 text-body-sm font-body-sm">
                            {data.map((referrer, index) => {
                                const initial = referrer.name ? referrer.name.charAt(0).toLowerCase() : 'd';
                                const percentage = total > 0 ? Math.round((referrer.value / total) * 100) : 0;
                                return (
                                    <tr key={index} className="hover:bg-surface-variant/30 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-xs font-medium uppercase text-primary">
                                                {initial}
                                            </div>
                                            <span className="font-medium text-on-surface truncate max-w-[200px]">{referrer.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono-sm">{referrer.value.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-on-surface-variant">{percentage}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex items-center justify-center h-full min-h-[200px] text-on-surface-variant">
                        No referrer data available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopReferrers;
