"use client";

import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import AnimatedDivider from "@/components/AnimatedDivider";
import { useLanguage } from "@/context/LanguageContext";
import MarketingHero from "@/components/MarketingHero";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import FeaturedOffers from "@/components/FeaturedOffers";

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
