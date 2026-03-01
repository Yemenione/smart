"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Careers() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                    className="relative z-10"
                >
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white mb-8">
                        JOIN US. <br className="hidden md:block" /> REJOIGNEZ-NOUS.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 font-body max-w-2xl mx-auto leading-relaxed mb-16">
                        We are always looking for elite engineers and designers who defy gravity. <br className="hidden md:block" />
                        <span className="text-white/30 text-lg">Nous cherchons des talents exceptionnels.</span>
                    </p>

                    <a
                        href="mailto:hello@deuleux.com"
                        className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-black font-heading uppercase tracking-widest text-sm py-5 px-10 rounded-full hover:text-white transition-colors duration-300"
                    >
                        <span className="relative z-10">Send Your Portfolio</span>
                        <div className="absolute inset-0 h-full w-full bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
                    </a>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
