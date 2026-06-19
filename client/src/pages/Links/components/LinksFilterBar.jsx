import React from 'react';
import Button from '../../../components/ui/Button';

const LinksFilterBar = ({ page, limit, totalItems }) => {
    const filterButtonClasses = "!text-on-surface !border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low !h-10 !px-4 gap-2 shadow-none font-medium";

    const startItem = totalItems > 0 ? (page - 1) * limit + 1 : 0;
    const endItem = Math.min(page * limit, totalItems);

    return (
        <div className="flex justify-end items-center mb-6">
            <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <span>Showing {startItem}-{endItem} of {totalItems} links</span>
            </div>
        </div>
    );
};

export default LinksFilterBar;
