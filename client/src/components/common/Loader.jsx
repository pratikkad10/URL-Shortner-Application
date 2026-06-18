import React from 'react';

const Loader = ({ size = 'md', fullScreen = false, className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-[3px]',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4'
    };

    const spinner = (
        <div
            className={`inline-block rounded-full border-outline-variant/30 border-t-primary animate-spin ${sizeClasses[size]} ${className}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-surface/60 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    {spinner}
                    <div className="text-on-surface-variant font-label-md animate-pulse">Loading...</div>
                </div>
            </div>
        );
    }

    return spinner;
};

export default Loader;
