import React from 'react';

const MockLinkVisual = () => {
    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-surface-container rounded-xl border border-outline-variant/50 overflow-hidden shadow-inner font-mono min-w-0">
            {/* Long URL */}
            <div className="w-full max-w-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 shadow-sm mb-3 transform -rotate-1 relative z-10 transition-transform hover:rotate-0 hover:scale-[1.02] duration-300">
                <div className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider mb-1 font-sans font-bold">Original URL</div>
                <div className="text-on-surface text-xs truncate w-full">https://yourcompany.com/campaign/summer-sale-2024?utm_source=twitter&utm_medium=social</div>
            </div>
            
            {/* Arrow */}
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md z-20 my-[-12px] border-4 border-surface-container">
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </div>
            
            {/* Short URL */}
            <div className="w-full max-w-sm bg-primary/10 border border-primary/20 rounded-lg p-3 shadow-sm mt-3 transform rotate-1 relative z-10 transition-transform hover:rotate-0 hover:scale-[1.02] duration-300">
                <div className="text-[10px] text-primary/80 uppercase tracking-wider mb-1 font-sans font-bold flex justify-between">
                    <span>Shortened Alias</span>
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-primary transition-colors">content_copy</span>
                </div>
                <div className="text-primary font-bold text-sm truncate w-full">linksn.ap/summer24</div>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>
    );
};

export default MockLinkVisual;
