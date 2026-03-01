"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import AnimatedDivider from "@/components/AnimatedDivider";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamPage() {
    const team = [
        {
            name: "Alexander",
            role: "Founder & Technical Director",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop"
        },
        {
            name: "Sophie",
            role: "Head of Art Direction",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
        },
        {
            name: "Marcus",
            role: "Lead Interactive Engineer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
        },
        {
            name: "Elena",
            role: "Creative Strategist",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
        },
        {
            name: "David",
            role: "Backend Architect",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
        },
        {
            name: "Isabella",
            role: "Motion Designer",
            image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    const typewriterVariants = {
        hidden: { opacity: 0, width: "0%" },
        show: { opacity: 1, width: "100%", transition: { duration: 1, ease: "easeOut" } }
    };

    return (
        <div className="bg-transparent min-h-screen text-white selection:bg-white/20">
            <Navbar />
            <GridBackground />

            <main className="relative z-10 pt-48 pb-32">
                <section className="px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-heading text-7xl md:text-9xl font-bold uppercase tracking-tighter text-gradient-aura text-glow"
                    >
                        THE COLLECTIVE. <br className="hidden md:block" /> / L'ÉQUIPE.
                    </motion.h1>
                </section>

                <AnimatedDivider className="mt-24 mb-12" />

                <section className="px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-white/10 group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-700">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                </div>

                                <div className="mt-6 flex flex-col">
                                    <h3 className="font-heading text-xl md:text-2xl text-white group-hover:text-glow transition-colors duration-500">
                                        {member.name}
                                    </h3>

                                    {/* Typewriter effect for role on hover triggered by parent group */}
                                    <div className="relative overflow-hidden w-fit mt-1">
                                        <p className="font-body text-white/50 text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {member.role}
                                        </p>
                                        <div className="absolute inset-0 bg-[#050505] origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
