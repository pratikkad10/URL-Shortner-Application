import React from 'react';

const Button = ({ children, className = '', variant = 'primary', size = 'md', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-label-md transition-colors whitespace-nowrap shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "bg-primary-container text-on-primary hover:bg-[#0353E9] focus:ring-primary-container",
        outline: "bg-transparent border border-outline text-primary hover:bg-surface-dim focus:ring-primary",
        ghost: "bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-dim shadow-none focus:ring-primary",
    };

    const sizes = {
        sm: "px-4 py-2 text-label-sm",
        md: "px-6 py-2.5 text-label-md",
        lg: "px-8 py-3 text-label-md",
    };

    const variantStyles = variants[variant] || variants.primary;
    const sizeStyles = sizes[size] || sizes.md;

    return (
        <button 
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
