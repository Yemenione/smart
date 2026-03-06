"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkSection from "@/components/Work";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function WorkClient() {
    const { t } = useLanguage();

    return (
        <div className="bg-background min-h-screen pt-20 overflow-hidden">
            <Navbar />

            {/* Cinematic Header Text Scatter */}
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <motion.h1
                    className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-accent/20 flex overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            }
                        }
                    }}
                >
                    {String(t.nav.work).split('').map((char, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                hidden: { y: "100%", opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        damping: 20,
                                        stiffness: 100
                                    }
                                }
                            }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                    <motion.span
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
                        }}
                        className="text-accent"
                    >
                        .
                    </motion.span>
                </motion.h1>
            </div>

            {/* Reusing our beautiful bento grid Work component */}
            <WorkSection />

            <Footer />
        </div>
    );
}
