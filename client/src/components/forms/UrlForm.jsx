import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const UrlForm = () => {
    return (
        <div className="w-full max-w-2xl mx-auto glass-panel p-2 rounded-xl flex items-center shadow-lg focus-ring bg-surface-container-lowest">
            <Input 
                aria-label="URL to shorten" 
                icon="link"
                placeholder="Paste your long URL here..." 
                type="url" 
            />
            <Button size="lg" className="shrink-0">
                Shorten Now
            </Button>
        </div>
    );
};

export default UrlForm;
