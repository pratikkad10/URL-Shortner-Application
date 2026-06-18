import React from 'react';

const StatCard = ({ title, value, icon, colorClass, trendText, trendIcon, trendColorClass }) => {
    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-label-md font-label-md text-on-surface-variant">{title}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
            </div>
            <div className="text-headline-lg font-headline-lg text-on-surface">{value}</div>
            <div className={`flex items-center gap-1 mt-2 text-label-sm font-label-sm ${trendColorClass}`}>
                <span className="material-symbols-outlined text-[16px]">{trendIcon}</span>
                <span>{trendText}</span>
            </div>
        </div>
    );
};

export default StatCard;
