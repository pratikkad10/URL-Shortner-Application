import React from 'react';

const OAuthButton = ({ provider, iconSvg, className = '', ...props }) => {
    return (
        <button 
            type="button"
            className={`w-full inline-flex justify-center items-center py-2 px-4 border border-outline-variant rounded bg-surface-container-lowest font-label-md text-label-md text-on-surface hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors h-[40px] ${className}`}
            {...props}
        >
            {iconSvg}
            {provider}
        </button>
    );
};

export default OAuthButton;
