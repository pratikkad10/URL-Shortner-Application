import React from 'react';

const PlatformIcon = ({ platform = 'web' }) => {
    if (platform === 'youtube') {
        return (
            <div className="w-6 h-6 bg-[#FFEBE6] text-[#FF5630] rounded flex items-center justify-center shrink-0 font-bold text-[10px]">
                yt
            </div>
        );
    }
    
    const iconName = platform === 'article' ? 'article' : 'language';
    
    return (
        <div className="w-6 h-6 bg-surface-container-high rounded flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">{iconName}</span>
        </div>
    );
};

export default PlatformIcon;
