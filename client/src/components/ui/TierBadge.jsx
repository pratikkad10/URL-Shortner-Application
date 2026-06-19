import React from 'react';

const TierBadge = ({ tier = 'free' }) => {
    const normalizedTier = tier?.toLowerCase() || 'free';
    
    let bgColor = 'bg-surface-variant';
    let textColor = 'text-on-surface-variant';
    let icon = 'account_circle';
    let borderColor = 'border-outline-variant';

    if (normalizedTier === 'pro') {
        bgColor = 'bg-primary-container';
        textColor = 'text-on-primary-container';
        icon = 'verified';
        borderColor = 'border-primary/20';
    } else if (normalizedTier === 'enterprise') {
        bgColor = 'bg-tertiary-container';
        textColor = 'text-on-tertiary-container';
        icon = 'apartment';
        borderColor = 'border-tertiary/20';
    }

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bgColor} ${textColor} text-label-sm font-label-sm font-medium border ${borderColor} cursor-pointer shadow-sm transition-all hover:opacity-80`}>
            <span className="material-symbols-outlined text-[16px]">{icon}</span>
            <span className="capitalize">{normalizedTier}</span>
        </div>
    );
};

export default TierBadge;
