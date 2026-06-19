import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ClicksChart = ({ data = [], totalClicks = 0 }) => {
    // Format dates for display
    const chartData = data.map(item => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

    return (
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 z-10">
                <div>
                    <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Total Clicks</h3>
                    <div className="text-display-lg font-display-lg text-on-surface mt-1">{totalClicks.toLocaleString()}</div>
                </div>
            </div>
            
            <div className="flex-1 w-full min-h-[240px] relative z-10 overflow-hidden">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.5} />
                            <XAxis 
                                dataKey="displayDate" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'var(--color-on-surface-variant)', fontSize: 12 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'var(--color-on-surface-variant)', fontSize: 12 }} 
                                dx={-10}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'var(--color-surface-container-high)', 
                                    borderColor: 'var(--color-outline-variant)',
                                    borderRadius: '8px',
                                    color: 'var(--color-on-surface)'
                                }}
                                itemStyle={{ color: 'var(--color-primary)' }}
                            />
                            <Area type="monotone" dataKey="clicks" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-on-surface-variant">
                        No click data available for this time period.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClicksChart;
