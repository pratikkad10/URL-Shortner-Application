import React from 'react';
import { timeAgo } from '../../../utils/format';

const ActivityItem = ({ activity, isLast }) => {
    // Map backend data to UI format
    let typeText, text, icon, colorClass;
    
    if (activity.type === 'click') {
        typeText = 'New click';
        // A simple heuristic for location if ipAddress exists, else just "on"
        text = activity.ipAddress ? `from ${activity.ipAddress} on` : 'on';
        icon = 'mouse';
        colorClass = 'bg-surface-container text-on-surface-variant';
    } else {
        typeText = 'Link created:';
        text = '';
        icon = 'add_link';
        colorClass = 'bg-primary-container/20 text-primary';
    }

    return (
        <div className="flex gap-4 relative">
            {!isLast && <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-surface-container"></div>}
            <div className={`w-8 h-8 rounded-full shrink-0 border-2 border-surface-container-lowest flex items-center justify-center z-10 ${colorClass}`}>
                <span className="material-symbols-outlined text-[16px]">{icon}</span>
            </div>
            <div>
                <p className="text-body-sm font-body-sm text-on-surface">
                    <span className="font-medium">{typeText}</span> {text} <span className="text-primary font-mono-sm">lsnp.co/{activity.shortUrl}</span>
                </p>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">{timeAgo(activity.timestamp)}</p>
            </div>
        </div>
    );
};

const ActivityFeed = ({ activities = [] }) => {
    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[400px] lg:h-auto">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Recent Activity</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">history</span>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {activities.length === 0 ? (
                    <div className="text-center text-on-surface-variant py-8">No recent activity</div>
                ) : (
                    activities.map((activity, idx) => (
                        <ActivityItem
                            key={idx}
                            activity={activity}
                            isLast={idx === activities.length - 1}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
