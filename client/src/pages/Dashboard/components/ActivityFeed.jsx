import React from 'react';

const ActivityItem = ({ type, text, highlight, time, icon, colorClass, isLast }) => {
    return (
        <div className="flex gap-4 relative">
            {!isLast && <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-surface-container"></div>}
            <div className={`w-8 h-8 rounded-full shrink-0 border-2 border-surface-container-lowest flex items-center justify-center z-10 ${colorClass}`}>
                <span className="material-symbols-outlined text-[16px]">{icon}</span>
            </div>
            <div>
                <p className="text-body-sm font-body-sm text-on-surface">
                    <span className="font-medium">{type}</span> {text} <span className="text-primary font-mono-sm">{highlight}</span>
                </p>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">{time}</p>
            </div>
        </div>
    );
};

const ActivityFeed = () => {
    const activities = [
        { type: 'New click', text: 'from United States on', highlight: 'lsnp.co/q9x2', time: '2 mins ago', icon: 'mouse', colorClass: 'bg-surface-container text-on-surface-variant' },
        { type: 'Link created:', text: '', highlight: 'lsnp.co/promo', time: '1 hour ago', icon: 'add_link', colorClass: 'bg-primary-container/20 text-primary' },
        { type: 'New click', text: 'from Germany on', highlight: 'lsnp.co/beta', time: '3 hours ago', icon: 'mouse', colorClass: 'bg-surface-container text-on-surface-variant' },
        { type: 'New click', text: 'from Japan on', highlight: 'lsnp.co/q9x2', time: '5 hours ago', icon: 'mouse', colorClass: 'bg-surface-container text-on-surface-variant' },
    ];

    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[400px] lg:h-auto">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Recent Activity</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">history</span>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {activities.map((activity, idx) => (
                    <ActivityItem
                        key={idx}
                        {...activity}
                        isLast={idx === activities.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;
