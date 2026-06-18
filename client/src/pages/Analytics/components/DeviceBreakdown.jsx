import React from 'react';

const DeviceBreakdown = () => {
    return (
        <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-6">Device Breakdown</h3>
            <div className="flex-1 flex flex-col justify-center items-center relative">
                
                {/* CSS Donut Chart Visualization */}
                <div className="w-40 h-40 rounded-full relative mb-6 flex items-center justify-center" style={{ background: "conic-gradient(var(--color-primary) 0% 65%, var(--color-secondary-container) 65% 90%, var(--color-surface-variant) 90% 100%)" }}>
                    <div className="w-28 h-28 bg-surface-container-lowest rounded-full absolute"></div>
                    <div className="relative z-10 text-center">
                        <span className="block text-headline-sm font-headline-sm text-on-surface">65%</span>
                        <span className="block text-label-sm font-label-sm text-on-surface-variant">Mobile</span>
                    </div>
                </div>
                
                {/* Legend */}
                <div className="w-full space-y-3 mt-auto">
                    <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-on-surface">Mobile</span>
                        </div>
                        <span className="font-medium">80,984</span>
                    </div>
                    <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                            <span className="text-on-surface">Desktop</span>
                        </div>
                        <span className="font-medium">31,148</span>
                    </div>
                    <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                            <span className="text-on-surface">Tablet</span>
                        </div>
                        <span className="font-medium">12,460</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceBreakdown;
