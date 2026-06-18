import React from 'react';

const IconButton = ({ icon, className = '', ...props }) => {
    return (
        <button 
            className={`p-2 rounded-full flex items-center justify-center transition-colors hover:bg-surface-container text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            {...props}
        >
            <span className="material-symbols-outlined">{icon}</span>
        </button>
    );
};

export default IconButton;
