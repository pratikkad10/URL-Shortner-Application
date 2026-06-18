import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import PricingSection from "../../components/landing/PricingSection";

const Home = () => {
    return (
        <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
            <Navbar />

            <main className="grow">
                <HeroSection />
                <FeaturesSection />
                <PricingSection />
            </main>

            <Footer />
        </div>
    );
};

export default Home;