import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const COLORS = ['var(--color-primary)', 'var(--color-secondary-container)', 'var(--color-tertiary-container)', 'var(--color-surface-variant)'];

const DeviceBreakdown = ({ data = [] }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">Device Breakdown</h3>
            <div className="flex-1 flex flex-col justify-center items-center relative">
                {data.length > 0 ? (
                    <>
                        <div className="w-full h-48 relative mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'var(--color-surface-container-high)', 
                                            borderColor: 'var(--color-outline-variant)',
                                            borderRadius: '8px',
                                            color: 'var(--color-on-surface)'
                                        }}
                                        itemStyle={{ color: 'var(--color-primary)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <span className="block text-headline-sm font-headline-sm text-on-surface">
                                        {data[0] ? Math.round((data[0].value / total) * 100) : 0}%
                                    </span>
                                    <span className="block text-label-sm font-label-sm text-on-surface-variant max-w-[80px] truncate mx-auto">
                                        {data[0] ? data[0].name : ''}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="w-full space-y-3 mt-auto">
                            {data.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-body-sm font-body-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span className="text-on-surface truncate max-w-[120px] capitalize">{item.name}</span>
                                    </div>
                                    <span className="font-medium">{item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-on-surface-variant pb-8">
                        No device data available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceBreakdown;
