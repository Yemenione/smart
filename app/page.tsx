import Navbar from "@/components/layout/Navbar";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Footer from "@/components/layout/Footer";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import MarketingHero from "@/components/sections/MarketingHero";
import InfiniteMarquee from "@/components/sections/InfiniteMarquee";
import FeaturedOffers from "@/components/sections/FeaturedOffers";
import { heroService } from "@/lib/services/hero";
import { productService } from "@/lib/services/product";
import { projectService } from "@/lib/services/project";

export const revalidate = 60; // Optional ISR for homepage speed

export default async function Home() {
  // Fetch data on the server with error boundaries for absolute stability
  let slides: any[] = [];
  let products: any[] = [];
  let projects: any[] = [];

  try {
    const rawSlides = await heroService.getAll();
    slides = Array.isArray(rawSlides) ? rawSlides : [];
  } catch (err) {
    console.error("Home: Failed to fetch hero slides", err);
  }

  try {
    const rawProducts = await productService.getAll();
    if (Array.isArray(rawProducts)) {
      products = rawProducts.filter(p => p.isPopular).slice(0, 3);
    }
  } catch (err) {
    console.error("Home: Failed to fetch products", err);
  }

  try {
    const rawProjects = await projectService.getAll();
    if (Array.isArray(rawProjects)) {
      projects = rawProjects.filter(p => p.published);
    }
  } catch (err) {
    console.error("Home: Failed to fetch projects", err);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden flex flex-col bg-[#020202]">
        {/* Dynamic Marketing Hero Slider */}
        <MarketingHero initialSlides={slides} />

        {/* Trust Signals */}
        <InfiniteMarquee />

        {/* Featured Offers (Products) */}
        <FeaturedOffers initialProducts={products} />
      </main>
      <AnimatedDivider />
      <Services />
      <AnimatedDivider />
      <Work initialProjects={projects} />
      <AnimatedDivider />
      <Footer />
    </>
  );
}
