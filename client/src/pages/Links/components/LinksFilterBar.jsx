import React from 'react';
import Button from '../../../components/ui/Button';

const LinksFilterBar = () => {
    const filterButtonClasses = "!text-on-surface !border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low !h-10 !px-4 gap-2 shadow-none font-medium";

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
                {/* Bulk Actions Dropdown */}
                <div className="relative group">
                    <Button variant="outline" className={filterButtonClasses}>
                        Bulk Actions
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    </Button>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                        <ul className="py-1">
                            <li><Button variant="dropdownItem">Delete Selected</Button></li>
                            <li><Button variant="dropdownItem">Change Expiration</Button></li>
                            <li><Button variant="dropdownItem">Add Tags</Button></li>
                        </ul>
                    </div>
                </div>

                {/* Status Filter Dropdown */}
                <div className="relative group">
                    <Button variant="outline" className={filterButtonClasses}>
                        Status: All
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    </Button>
                    <div className="absolute left-0 mt-2 w-40 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                        <ul className="py-1">
                            <li><Button variant="dropdownItem" className="font-medium">Status: All</Button></li>
                            <li><Button variant="dropdownItem">Active</Button></li>
                            <li><Button variant="dropdownItem">Expired</Button></li>
                        </ul>
                    </div>
                </div>
                
                <Button variant="outline" className={filterButtonClasses}>
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    Date Range
                </Button>
                
                <Button variant="outline" className={filterButtonClasses}>
                    <span className="material-symbols-outlined text-[18px]">label</span>
                    Tags
                </Button>
            </div>
            
            <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <span>Showing 1-10 of 245 links</span>
            </div>
        </div>
    );
};

export default LinksFilterBar;
