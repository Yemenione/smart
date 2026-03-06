"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function CareersClient() {
    const { t } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                    className="relative z-10"
                >
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter text-accent mb-8">
                        {t.careersPage.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-accent/50 font-body max-w-2xl mx-auto leading-relaxed mb-16">
                        {t.careersPage.subtitle}
                    </p>

                    <a
                        href="mailto:hello@deuleux.com"
                        className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-black font-heading uppercase tracking-widest text-sm py-5 px-10 rounded-full hover:text-accent transition-colors duration-300"
                    >
                        <span className="relative z-10">{t.careersPage.sendPortfolio}</span>
                        <div className="absolute inset-0 h-full w-full bg-background transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
                    </a>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
