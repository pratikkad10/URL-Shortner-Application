import React from 'react';

const Status = () => {
    return (
        <div className="max-w-4xl mx-auto py-16 px-6">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-display-md font-bold text-on-surface">System Status</h1>
                <span className="bg-success-container/20 text-success px-4 py-1.5 rounded-full text-label-md font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    All Systems Operational
                </span>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                <div className="p-6 border-b border-outline-variant">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-on-surface">API Routing</span>
                        <span className="text-success font-medium">Operational</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                        <div className="bg-success h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <div className="p-6 border-b border-outline-variant">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-on-surface">Link Redirection Services</span>
                        <span className="text-success font-medium">Operational</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                        <div className="bg-success h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-on-surface">Analytics Engine</span>
                        <span className="text-success font-medium">Operational</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                        <div className="bg-success h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Status;
