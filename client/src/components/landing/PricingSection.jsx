import React from 'react';
import PricingCard from '../ui/PricingCard';

const PricingSection = () => {
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
        <section id="pricing" className="px-6 py-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Transparent Pricing</h2>
                <p className="text-body-md font-body-md text-on-surface-variant">Scale your link management as your team grows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mt-8">
                {plans.map((plan, index) => (
                    <PricingCard key={index} {...plan} />
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
