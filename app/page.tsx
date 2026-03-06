"use client";

import Navbar from "@/components/layout/Navbar";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import { useLanguage } from "@/context/LanguageContext";
import MarketingHero from "@/components/sections/MarketingHero";
import InfiniteMarquee from "@/components/sections/InfiniteMarquee";
import FeaturedOffers from "@/components/sections/FeaturedOffers";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden flex flex-col bg-[#020202]">
        {/* Dynamic Marketing Hero Slider */}
        <MarketingHero />

        {/* Trust Signals */}
        <InfiniteMarquee />

        {/* Featured Offers (Products) */}
        <FeaturedOffers />
      </main>
      <AnimatedDivider />
      <Services />
      <AnimatedDivider />
      <Work />
      <AnimatedDivider />
      <Footer />
    </>
  );
}
