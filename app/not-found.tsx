"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center relative overflow-hidden">

                {/* Massive Floating 404 */}
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    <h1
                        className="text-[10rem] md:text-[15rem] leading-none font-bold font-heading [-webkit-text-stroke:2px_rgba(255,255,255,0.1)] text-transparent select-none"
                    >
                        404
                    </h1>
                </motion.div>

                {/* Text Details */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                    className="text-2xl md:text-3xl text-white font-heading mt-8 tracking-widest uppercase"
                >
                    PAGE INTROUVABLE.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    className="text-neutral-400 font-body mt-4 max-w-md mx-auto uppercase tracking-widest text-sm"
                >
                    VOUS ÊTES EN APESANTEUR.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                    className="mt-12 relative z-20"
                >
                    <Link
                        href="/"
                        className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-300 inline-block shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        RETOUR À LA BASE
                    </Link>
                </motion.div>

            </main>
            <Footer />
        </>
    );
}
