import React from 'react';

const Input = React.forwardRef(({ label, id, className = '', containerClassName = '', icon, size = 'md', ...props }, ref) => {
    const sizeStyles = {
        sm: "py-2 text-body-sm font-body-sm",
        md: "py-3 text-body-md font-body-md",
        lg: "py-4 text-body-lg font-body-lg"
    };

    const inputElement = (
        <div className={`flex items-center grow ${containerClassName}`}>
            {icon && (
                <div className="pl-4 text-on-surface-variant flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
            )}
            <input 
                id={id}
                ref={ref}
                className={`grow bg-transparent border-none focus:ring-0 px-4 text-on-surface placeholder-outline focus:outline-none ${sizeStyles[size]} ${className}`}
                {...props}
            />
        </div>
    );

    if (label) {
        return (
            <div className="space-y-2 w-full">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor={id}>
                    {label}
                </label>
                {inputElement}
            </div>
        );
    }

    return inputElement;
});

Input.displayName = 'Input';

export default Input;
