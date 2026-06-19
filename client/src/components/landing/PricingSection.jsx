import React from 'react';
import PricingCard from '../ui/PricingCard';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { paymentService } from '../../services/paymentService';
import Button from '../ui/Button';

const PricingSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePlanAction = async (title) => {
        if (title === 'Free') {
            navigate('/register');
            return;
        }

        if (title === 'Enterprise') {
            navigate('/contact');
            return;
        }

        if (title === 'Pro') {
            if (!user) {
                toast.error("Please log in to upgrade to Pro");
                navigate('/login');
                return;
            }

            paymentService.upgradeToPro(
                user,
                (successMessage) => {
                    toast.success(successMessage);
                },
                (errorMessage) => {
                    toast.error(errorMessage);
                }
            );
        }
    };

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

    if (user?.tier === 'pro' || user?.tier === 'enterprise') {
        return (
            <section id="pricing" className="px-6 py-16 max-w-7xl mx-auto">
                <div className="bg-primary-container/10 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden shadow-sm">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-tertiary/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <span className="material-symbols-outlined text-[64px] text-primary mb-6 relative z-10">verified</span>
                    <h2 className="text-display-sm md:text-display-md font-display-sm text-on-surface mb-4 relative z-10">
                        You're on the <span className="capitalize">{user.tier}</span> Plan!
                    </h2>
                    <p className="text-body-lg font-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto relative z-10">
                        Thank you for your support. You currently have access to all premium features, including unlimited links, custom branding, and priority support.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Button variant="primary" onClick={() => navigate('/dashboard')} className="min-w-[200px] justify-center">
                            Go to Dashboard
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/settings')} className="min-w-[200px] justify-center">
                            Manage Subscription
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="pricing" className="px-6 py-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Transparent Pricing</h2>
                <p className="text-body-md font-body-md text-on-surface-variant">Scale your link management as your team grows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mt-8">
                {plans.map((plan, index) => (
                    <PricingCard key={index} {...plan} onAction={handlePlanAction} />
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
