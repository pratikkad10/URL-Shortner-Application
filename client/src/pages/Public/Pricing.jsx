import React from 'react';
import PricingCard from '../../components/ui/PricingCard';

const Pricing = () => {
    const plans = [
        {
            title: "Free",
            price: "₹0",
            period: "/mo",
            description: "Perfect for individuals starting out.",
            features: [
                "50 links/month",
                "Random short codes",
                "Standard redirects"
            ],
            buttonText: "Get Started",
            buttonVariant: "outline"
        },
        {
            title: "Pro",
            price: "₹199",
            period: "/mo",
            description: "For professionals requiring brand control.",
            features: [
                "Unlimited links",
                "Custom branded aliases",
                "Priority support"
            ],
            buttonText: "Upgrade to Pro",
            buttonVariant: "primary",
            highlighted: true
        },
        {
            title: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for large organizations.",
            features: [
                "Dedicated API access",
                "Dedicated account manager",
                "Custom SLA"
            ],
            buttonText: "Contact Sales",
            buttonVariant: "outline"
        }
    ];

    return (
        <div className="min-h-screen bg-surface flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
                {/* Header section */}
                <div className="mb-16 text-center">
                    <h1 className="text-headline-lg md:text-display-sm font-semibold text-on-surface tracking-tight mb-4">Simple, transparent pricing</h1>
                    <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                        Choose the plan that's right for you. Start for free and upgrade as you grow.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
