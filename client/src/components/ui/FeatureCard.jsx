import React from 'react';

const FeatureCard = ({ 
    title, 
    description, 
    icon, 
    iconBg = 'bg-primary-fixed', 
    iconColor = 'text-on-primary-fixed-variant', 
    large = false,
    children 
}) => {
    if (large) {
        return (
            <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant shadow-sm hover:shadow-md transition-shadow bento-item-large flex flex-col md:flex-row gap-8 items-center overflow-hidden">
                <div className="flex-1 space-y-4 min-w-[280px]">
                    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center ${iconColor} mb-4`}>
                        <span className="material-symbols-outlined" data-weight="fill">{icon}</span>
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface">{title}</h3>
                    <p className="text-body-md font-body-md text-on-surface-variant">
                        {description}
                    </p>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center ${iconColor} mb-4`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">{title}</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant grow">
                {description}
            </p>
            {children}
        </div>
    );
};

export default FeatureCard;
