"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import AnimatedDivider from "@/components/AnimatedDivider";
import ScrollRevealText from "@/components/ScrollRevealText";
import { motion } from "framer-motion";

export default function ServicesDetail() {
    const services = [
        {
            id: "01",
            title: "Strategy",
            description: "We architect scalable foundations. Through intense market analysis, technical feasibility studies, and precise scoping, we map out systems designed to dominate. Every decision is driven by data, engineered for growth, and crafted to outlast the competition.",
            icon: "◆"
        },
        {
            id: "02",
            title: "Design",
            description: "Swiss minimalism meets cinematic interaction. We do not just make screens; we forge environments. Utilizing WebGL, advanced Framer Motion physics, and custom shaders, we ensure every micro-interaction feels weightless and incredibly premium.",
            icon: "▲"
        },
        {
            id: "03",
            title: "Engineering",
            description: "Headless, Supersonic, Unbreakable. We build exclusively on high-performance stacks like Next.js and robust API layers like Laravel. We handle complex migrations, global CDN edge networks, and dynamic ISR caching to deliver sub-second rendering worldwide.",
            icon: "■"
        }
    ];

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
                        EXPERTISE. <br className="hidden md:block" /> / DOMAINES.
                    </motion.h1>
                </section>

                <AnimatedDivider className="mt-24 mb-12" />

                <section className="px-4 max-w-7xl mx-auto flex flex-col space-y-32 md:space-y-48 py-12">
                    {services.map((service, idx) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                            {/* Left Side: Floating Icon & Title */}
                            <div className="md:col-span-4 lg:col-span-5 flex flex-col md:sticky md:top-48">
                                <motion.div
                                    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-8xl md:text-[10rem] text-white/5 font-heading mb-8 leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                >
                                    {service.icon}
                                </motion.div>
                                <h2 className="font-heading text-sm text-white/50 tracking-widest uppercase mb-4">
                                    {service.id} / SERVICE
                                </h2>
                                <h3 className="font-heading text-5xl md:text-6xl text-white tracking-tight">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Right Side: Deep-Dive Process with Scroll Reveal */}
                            <div className="md:col-span-8 lg:col-span-7">
                                <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-body max-w-3xl">
                                    <ScrollRevealText text={service.description} />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ opacity: 1, scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mt-16 origin-left"
                                />
                            </div>
                        </div>
                    ))}
                </section>

            </main>

            <Footer />
        </div>
    );
}
