import { Head } from '@inertiajs/react';
import Navbar from '@/Components/old_components/layout/Navbar';
import Services from '@/Components/old_components/sections/Services';
import Work from '@/Components/old_components/sections/Work';
import Footer from '@/Components/old_components/layout/Footer';
import AnimatedDivider from '@/Components/old_components/ui/AnimatedDivider';
import MarketingHero from '@/Components/old_components/sections/MarketingHero';
import TechStackMarquee from '@/Components/old_components/sections/TechStackMarquee';
import FeaturedOffers from '@/Components/old_components/sections/FeaturedOffers';
import { useLanguage } from '@/context/LanguageContext';

interface HomeProps {
    slides: any[];
    products: any[];
    projects: any[];
}

export default function Home({ slides, products, projects }: HomeProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-[#020202] min-h-screen text-white">
            <Head title={t.nav.home} />
            <Navbar />
            <main className="relative overflow-hidden flex flex-col">
                {/* Dynamic Marketing Hero Slider */}
                <MarketingHero initialSlides={slides} />

                {/* Programming Languages / Tech Stack */}
                <TechStackMarquee />

                {/* Featured Offers (Products) */}
                <FeaturedOffers initialProducts={products} />

                <AnimatedDivider />
                <Services />
                <AnimatedDivider />
                <Work initialProjects={projects} />
                <AnimatedDivider />
                <Footer />
            </main>
        </div>
    );
}
