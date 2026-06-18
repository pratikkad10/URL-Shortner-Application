import React from 'react';

const MockChart = () => {
    return (
        <div className="w-full h-full relative flex flex-col pt-4 pr-4 pb-2 pl-2 bg-surface-container rounded-lg border border-outline-variant/50 overflow-hidden shadow-inner">
            {/* Y Axis Labels */}
            <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between text-[10px] text-on-surface-variant/70 font-mono z-10">
                <span>1k</span>
                <span>500</span>
                <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="ml-8 flex-1 relative border-l border-b border-outline-variant/30">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-1">
                    <div className="border-t border-outline-variant/10 w-full"></div>
                    <div className="border-t border-outline-variant/10 w-full"></div>
                    <div className="border-t border-outline-variant/10 w-full"></div>
                </div>

                {/* SVG Line & Gradient */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary-container)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--color-primary-container)" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <polygon
                        points="0,100 0,80 15,75 30,80 45,55 60,65 75,35 85,45 100,10 100,100"
                        fill="url(#chartGradient)"
                    />
                    {/* Line */}
                    <polyline
                        points="0,80 15,75 30,80 45,55 60,65 75,35 85,45 100,10"
                        fill="none"
                        stroke="var(--color-primary-container)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* Data Point Highlighter */}
                    <circle
                        cx="100"
                        cy="10"
                        r="4"
                        fill="var(--color-surface-container)"
                        stroke="var(--color-primary-container)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                {/* Mock Interactive Tooltip */}
                <div className="absolute top-[0%] left-full translate-x-[-110%] bg-inverse-surface text-inverse-on-surface text-[10px] px-3 py-2 rounded-lg shadow-xl whitespace-nowrap flex flex-col gap-1 z-10 font-mono border border-inverse-surface/10">
                    <div className="text-inverse-on-surface/70 text-[9px] uppercase tracking-wider">Today, 10:00 AM</div>
                    <div className="flex items-center gap-2 font-bold text-xs">
                        <span className="w-2 h-2 rounded-full bg-secondary-fixed inline-block"></span>
                        1,204 clicks
                        <span className="text-emerald-400 font-normal ml-1 flex items-center text-[10px]">
                            <span className="material-symbols-outlined text-[12px]">trending_up</span> 24%
                        </span>
                    </div>
                </div>
            </div>

            {/* X Axis Labels */}
            <div className="ml-8 h-6 flex justify-between items-end text-[10px] text-on-surface-variant/70 font-mono px-1">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        </div>
    );
};

export default MockChart;
