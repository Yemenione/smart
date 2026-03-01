"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Insights() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                {/* Minimalist Background Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                    className="relative z-10"
                >
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white mb-8">
                        INSIGHTS. <br className="hidden md:block" /> RÉFLEXIONS.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 font-body max-w-2xl mx-auto leading-relaxed">
                        Our thoughts on headless architecture and Swiss design are compiling. <br className="hidden md:block" />
                        <span className="text-white/30 text-lg">Nos articles arrivent bientôt.</span>
                    </p>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
