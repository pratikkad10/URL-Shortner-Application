import React from 'react';

const ClicksChart = () => {
    return (
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 z-10">
                <div>
                    <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Total Clicks</h3>
                    <div className="text-display-lg font-display-lg text-on-surface mt-1">124,592</div>
                    <div className="flex items-center gap-1 text-secondary mt-2 text-label-sm font-label-sm">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        +14.2% vs last period
                    </div>
                </div>
            </div>
            
            {/* Placeholder for Chart */}
            <div className="flex-1 w-full min-h-[240px] bg-surface/50 rounded-lg border border-outline-variant/50 flex items-center justify-center relative z-10 overflow-hidden">
                {/* Abstract Line Chart Visualization */}
                <div className="absolute bottom-0 left-0 w-full h-[60%] flex items-end px-4 opacity-70">
                    <svg className="w-full h-full stroke-primary fill-primary/10" preserveAspectRatio="none" viewBox="0 0 100 40">
                        <path d="M0 40 L0 30 L10 25 L20 35 L30 20 L40 28 L50 15 L60 22 L70 5 L80 18 L90 8 L100 12 L100 40 Z"></path>
                        <path d="M0 30 L10 25 L20 35 L30 20 L40 28 L50 15 L60 22 L70 5 L80 18 L90 8 L100 12" fill="none" strokeWidth="0.5"></path>
                    </svg>
                </div>
                
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-4">
                    <div className="w-full border-t border-dashed border-outline"></div>
                    <div className="w-full border-t border-dashed border-outline"></div>
                    <div className="w-full border-t border-dashed border-outline"></div>
                    <div className="w-full border-t border-dashed border-outline"></div>
                </div>
            </div>
        </div>
    );
};

export default ClicksChart;
