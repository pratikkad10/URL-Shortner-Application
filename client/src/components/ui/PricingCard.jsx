import React from 'react';
import Button from './Button';

const PricingCard = ({
    title,
    price,
    period,
    description,
    features = [],
    buttonText,
    highlighted = false,
    buttonVariant = 'outline',
    onAction
}) => {
    return (
        <div className={`bg-surface-container-lowest rounded-xl p-6 flex flex-col relative transition-transform ${
            highlighted ? 'border-2 border-primary-container shadow-md md:scale-105 z-10' : 'border border-outline-variant hover:shadow-md'
        }`}>
            {highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary text-label-sm font-label-sm px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Most Popular
                </div>
            )}
            
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1">{title}</h3>
            
            <div className={`text-display-lg font-display-lg text-on-surface ${price === 'Custom' ? 'mb-4 py-3 text-headline-md font-headline-md' : 'mb-4'}`}>
                {price}
                {period && <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">{period}</span>}
            </div>
            
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-6 grow">{description}</p>
            
            <ul className="space-y-2 mb-8 text-body-sm font-body-sm text-on-surface">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                        {feature}
                    </li>
                ))}
            </ul>
            
            <Button variant={buttonVariant} className="w-full justify-center" onClick={() => onAction && onAction(title)}>
                {buttonText}
            </Button>
        </div>
    );
};

export default PricingCard;
