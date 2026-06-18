import React from 'react';
import Button from '../../../components/ui/Button';

const DateRangeSelector = () => {
    return (
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-1 shadow-sm">
            <Button variant="ghost" size="none" className="px-3 py-1.5 text-on-surface hover:bg-surface-container rounded font-normal hover:text-on-surface">
                7D
            </Button>
            <Button size="none" className="px-3 py-1.5 bg-primary-container hover:bg-primary-container/90 text-on-primary-container rounded shadow-sm">
                30D
            </Button>
            <Button variant="ghost" size="none" className="px-3 py-1.5 text-on-surface hover:bg-surface-container rounded font-normal hover:text-on-surface">
                90D
            </Button>
            <div className="h-4 w-px bg-outline-variant mx-1"></div>
            <Button variant="ghost" size="none" className="px-3 py-1.5 text-on-surface hover:bg-surface-container rounded font-normal hover:text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                Custom
            </Button>
        </div>
    );
};

export default DateRangeSelector;
