import React from 'react';
import FeatureCard from '../ui/FeatureCard';
import MockLinkVisual from './MockLinkVisual';

const FeaturesSection = () => {
    return (
        <section id="features" className="px-6 py-12 md:py-16 bg-surface-container-low border-y border-outline-variant">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg text-on-surface mb-3 md:mb-2">Everything you need to master your links</h2>
                    <p className="text-body-sm md:text-body-md font-body-sm md:font-body-md text-on-surface-variant max-w-2xl mx-auto px-4 md:px-0">A powerful, intuitive platform to shorten, customize, and manage your URLs effortlessly.</p>
                </div>
                <div className="bento-grid">
                    {/* Feature 1: Custom Aliases */}
                    <FeatureCard 
                        large={true}
                        title="Custom URL Aliases"
                        description="Don't settle for random character strings. LinkSnap allows you to create recognizable, memorable custom aliases for your links, increasing click-through rates and brand trust."
                        icon="edit_note"
                        iconBg="bg-primary-fixed"
                        iconColor="text-on-primary-fixed-variant"
                    >
                        <div className="flex-1 w-full md:w-1/2 h-56 relative flex items-center justify-center min-w-0">
                            <MockLinkVisual />
                        </div>
                    </FeatureCard>

                    {/* Feature 2: Link Control */}
                    <FeatureCard 
                        title="Complete Link Control"
                        description="Manage all your shortened URLs from a centralized dashboard. Easily update destinations, edit existing aliases, or delete old campaigns as your needs evolve."
                        icon="dashboard"
                        iconBg="bg-secondary-fixed"
                        iconColor="text-on-secondary-fixed-variant"
                    />

                    {/* Feature 3: Speed & Reliability */}
                    <FeatureCard 
                        title="Lightning Fast Redirects"
                        description="Engineered for maximum speed and reliability. Our optimized routing infrastructure ensures your visitors reach their final destination instantly, without noticeable delays."
                        icon="bolt"
                        iconBg="bg-tertiary-fixed"
                        iconColor="text-on-tertiary-fixed-variant"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
