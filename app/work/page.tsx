"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkSection from "@/components/Work";

export default function Work() {
    return (
        <div className="bg-[#050505] min-h-screen pt-20">
            <Navbar />

            {/* Minimalist Header for the standalone page */}
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white/5">
                    ARCHIVE.
                </h1>
            </div>

            {/* Reusing our beautiful bento grid Work component */}
            <WorkSection />

            <Footer />
        </div>
    );
}
