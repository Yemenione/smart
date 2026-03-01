"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollRevealText from "@/components/ScrollRevealText";

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
    };

    return (
        <footer id="agency" className="min-h-[80vh] relative flex flex-col items-center justify-center bg-[#000000] overflow-hidden px-4">
            {/* Subtle giant radial gradient */}
            <div className="absolute bottom-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/5 via-black/0 to-black/0 pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl"
            >
                <motion.h2
                    variants={itemVariants}
                    className="font-heading text-5xl md:text-8xl font-bold tracking-tighter text-white"
                >
                    DEFY GRAVITY.
                </motion.h2>

                <motion.div variants={itemVariants} className="mt-2 w-full text-center flex justify-center">
                    <ScrollRevealText
                        text="LET'S BUILD. / CONSTRUISONS."
                        className="font-heading justify-center text-5xl md:text-8xl tracking-tight [-webkit-text-stroke:2px_rgba(255,255,255,0.2)]"
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <button className="mt-12 px-10 py-4 rounded-full bg-white text-black font-medium text-lg border border-transparent hover:bg-transparent hover:text-white hover:border-white hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500 ease-out">
                        Start Your Project
                    </button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-32 w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 font-body gap-4"
                >
                    <p>© {new Date().getFullYear()} Deuleux Agency. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                        <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
