import React from 'react';

const Checkbox = React.forwardRef(({ label, id, className = '', containerClassName = '', ...props }, ref) => {
    return (
        <div className={`flex items-center ${containerClassName}`}>
            <input 
                ref={ref}
                id={id}
                type="checkbox"
                className={`h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded bg-surface-container-lowest ${className}`}
                {...props}
            />
            {label && (
                <label htmlFor={id} className="ml-2 block font-body-sm text-body-sm text-on-surface-variant">
                    {label}
                </label>
            )}
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
