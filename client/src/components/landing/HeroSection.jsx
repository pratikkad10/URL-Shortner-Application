import UrlForm from "../forms/UrlForm";

const HeroSection = () => {
    return (
        <section className="px-6 py-16 md:py-16 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[716px]">
            <h1 className="text-display-lg font-display-lg text-on-surface mb-6 max-w-3xl mx-auto leading-tight">
                Shorten, Track, and Manage Links <span className="text-primary-container">Effortlessly</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
                The enterprise-grade platform for optimizing your digital touchpoints. Turn long URLs into powerful marketing assets with advanced analytics and granular control.
            </p>
            
            <UrlForm />

            <div className="mt-4 text-label-sm font-label-sm text-outline flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">lock</span> No credit card required. Free plan available.
            </div>
        </section>
    );
};

export default HeroSection;
