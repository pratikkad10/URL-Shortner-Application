import React from 'react';
import Button from '../../../components/ui/Button';

const apiKeysData = [
    {
        name: 'Production Key',
        key: 'ls_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        status: 'Active',
        statusClass: 'bg-secondary-container text-on-secondary-container'
    },
    {
        name: 'Development Key',
        key: 'ls_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        status: 'Active',
        statusClass: 'bg-surface-variant text-on-surface-variant'
    }
];

const ApiSection = () => {
    return (
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6" id="api">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-headline-sm font-headline-sm text-on-surface">API Keys</h2>
                <Button className="px-4 py-2 text-label-sm font-label-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Generate New Key
                </Button>
            </div>
            
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-6">
                Use these keys to authenticate your API requests. Keep them secret.
            </p>
            
            <div className="space-y-4">
                {apiKeysData.map((apiKey, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-outline-variant rounded-lg bg-background group hover:bg-surface-container-low transition-colors">
                        <div className="mb-3 md:mb-0">
                            <div className="text-label-md font-label-md text-on-surface flex items-center gap-2">
                                {apiKey.name}
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${apiKey.statusClass}`}>
                                    {apiKey.status}
                                </span>
                            </div>
                            <div className="text-mono-sm font-mono-sm text-on-surface-variant mt-1">
                                {apiKey.key}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-on-surface-variant hover:text-primary rounded-md hover:bg-surface-container transition-colors outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1" title="Copy">
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                            </button>
                            <button className="p-2 text-on-surface-variant hover:text-error rounded-md hover:bg-error-container/20 transition-colors outline-none focus:ring-2 focus:ring-error focus:ring-offset-1" title="Revoke">
                                <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ApiSection;
