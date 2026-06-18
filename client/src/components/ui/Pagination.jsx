import React from 'react';

const Pagination = ({ 
    page, 
    setPage, 
    limit, 
    setLimit, 
    totalPages, 
    totalItems, 
    isLoading 
}) => {
    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalItems);

    return (
        <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between mt-auto">
            <div className="text-body-sm text-on-surface-variant hidden sm:block">
                Showing {totalItems > 0 ? startItem : 0}-{endItem} of {totalItems} items
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                    <button 
                        className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-full bg-surface-container-lowest text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low hover:text-on-surface transition-all"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || isLoading}
                        title="Previous page"
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    
                    {getPageNumbers().map((pageNum, idx) => {
                        if (pageNum === '...') {
                            return <span key={`ellipsis-${idx}`} className="px-1 text-on-surface-variant">...</span>;
                        }
                        
                        return (
                            <button 
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                disabled={isLoading}
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-label-sm font-label-sm transition-all ${
                                    page === pageNum 
                                        ? 'bg-primary text-on-primary font-bold shadow-md transform hover:scale-105' 
                                        : 'bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    
                    <button 
                        className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-full bg-surface-container-lowest text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low hover:text-on-surface transition-all"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages || isLoading || totalPages === 0}
                        title="Next page"
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
