import React from 'react';

const Input = React.forwardRef(({ className = '', containerClassName = '', icon, size = 'md', ...props }, ref) => {
    const sizeStyles = {
        sm: "py-2 text-body-sm font-body-sm",
        md: "py-3 text-body-md font-body-md",
        lg: "py-4 text-body-lg font-body-lg"
    };

    return (
        <div className={`flex items-center grow ${containerClassName}`}>
            {icon && (
                <div className="pl-4 text-on-surface-variant flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
            )}
            <input 
                ref={ref}
                className={`grow bg-transparent border-none focus:ring-0 px-4 text-on-surface placeholder-outline focus:outline-none ${sizeStyles[size]} ${className}`}
                {...props}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
