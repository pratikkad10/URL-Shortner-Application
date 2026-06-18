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
            
            <div className="flex items-center gap-4">
                <div className="text-body-sm text-on-surface-variant flex items-center gap-2">
                    Rows per page:
                    <select 
                        className="border border-outline-variant rounded bg-transparent text-body-sm font-medium focus:ring-1 focus:ring-primary p-1 cursor-pointer"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="flex items-center gap-1">
                    <button 
                        className="p-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface-variant disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || isLoading}
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    
                    {getPageNumbers().map((pageNum, idx) => {
                        if (pageNum === '...') {
                            return <span key={`ellipsis-${idx}`} className="px-2 text-on-surface-variant">...</span>;
                        }
                        
                        return (
                            <button 
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                disabled={isLoading}
                                className={`px-3 py-1 rounded text-label-sm font-label-sm transition-colors ${
                                    page === pageNum 
                                        ? 'bg-primary-container text-on-primary font-bold' 
                                        : 'hover:bg-surface-container text-on-surface-variant'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    
                    <button 
                        className="p-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface-variant disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages || isLoading || totalPages === 0}
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
