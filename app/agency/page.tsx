"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ScrollRevealText from "@/components/ScrollRevealText";
import AnimatedDivider from "@/components/AnimatedDivider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Agency() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        { question: "How do you price your engagements?", answer: "We operate on flat-fee sprint models or comprehensive retained partnerships. This ensures our alignment is entirely focused on generating extreme value, not tracking hours." },
        { question: "What is your typical project timeline?", answer: "A hyper-focused MVP sprint takes 4 to 6 weeks. Full-scale digital transformations and headless ecosystem deployments typically range from 3 to 6 months depending on the physics and APIs involved." },
        { question: "Do you offer post-launch support and maintenance?", answer: "We do not just hand over the keys. We establish Service Level Agreements (SLAs) offering continuous engineering, performance optimization, and scale strategy." },
        { question: "What technologies do you specialize in?", answer: "Our elite tier stack consists of Next.js for supersonic frontend delivery, and native Laravel for robust, unshakeable backend architecture. We also heavily utilize WebGL and Framer Motion." }
    ];

    return (
        <div className="bg-[#050505] min-h-screen selection:bg-white/20">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative px-4 pt-48 pb-32 md:pt-64 md:pb-48 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <p className="font-heading text-sm text-white/50 tracking-widest uppercase mb-8">
                        The Agency / L'Agence
                    </p>
                    {/* Magical Aura Animated Text */}
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter leading-none text-gradient-aura text-glow mb-12">
                        OUR DNA.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 font-body max-w-2xl mx-auto leading-relaxed">
                        We are a digital boutique crafting immersive experiences, headless architectures, and brand narratives for the elite.
                    </p>
                </section>

                {/* Philosophy Section */}
                <section className="px-4 py-32 border-t border-white/5 bg-[#0a0a0a]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-heading text-sm text-white/30 tracking-widest uppercase mb-16">
                            01 / Philosophy
                        </h2>
                        {/* Apple-style Scroll Reveal Paragraph */}
                        <ScrollRevealText
                            text="At Deuleux, we blend Swiss Design principles with high-performance Headless Architecture. We believe digital space is not just for information intake, but for emotional connection. Every pixel, every easing curve, and every millisecond of load time is carefully orchestrated to position our clients at the absolute zenith of their industries."
                            className="font-body text-3xl md:text-5xl leading-[1.4] tracking-tight"
                        />
                    </div>
                </section>

                {/* Services Grid */}
                <section className="px-4 py-32 md:py-48 max-w-7xl mx-auto">
                    <h2 className="font-heading text-sm text-white/30 tracking-widest uppercase mb-16">
                        02 / Expertise
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-16">
                        {/* Service 1 */}
                        <div className="group">
                            <h3 className="font-heading text-2xl text-white mb-6 tracking-tight">Digital Platforms</h3>
                            <p className="text-white/50 font-body leading-relaxed mb-8">
                                Scalable, API-first ecosystems using Next.js and Laravel, designed for supersonic speed and unbreakable security.
                            </p>
                            <ul className="space-y-4">
                                {["Headless CMS Architecture", "E-Commerce (Shopify/Next.js)", "Web Applications", "API Development"].map((item) => (
                                    <li key={item} className="flex items-center text-sm font-body text-white/70">
                                        <ArrowRight size={14} className="mr-3 text-white/30 group-hover:text-white transition-colors" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 2 */}
                        <div className="group">
                            <h3 className="font-heading text-2xl text-white mb-6 tracking-tight">Interactive Design</h3>
                            <p className="text-white/50 font-body leading-relaxed mb-8">
                                Awwwards-winning interfaces that leverage WebGL, Framer Motion, and cinematic storytelling to captivate users.
                            </p>
                            <ul className="space-y-4">
                                {["Art Direction", "UI/UX Design", "Motion & Interaction", "3D & WebGL Prototyping"].map((item) => (
                                    <li key={item} className="flex items-center text-sm font-body text-white/70">
                                        <ArrowRight size={14} className="mr-3 text-white/30 group-hover:text-white transition-colors" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 3 */}
                        <div className="group">
                            <h3 className="font-heading text-2xl text-white mb-6 tracking-tight">Brand Identity</h3>
                            <p className="text-white/50 font-body leading-relaxed mb-8">
                                Forging iconic visual languages and strategic positioning for ambitious brands ready to redefine their market.
                            </p>
                            <ul className="space-y-4">
                                {["Brand Strategy", "Visual Identity Systems", "Typography & Editorial", "Digital Guidelines"].map((item) => (
                                    <li key={item} className="flex items-center text-sm font-body text-white/70">
                                        <ArrowRight size={14} className="mr-3 text-white/30 group-hover:text-white transition-colors" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Visual Intermission */}
                <section className="w-full h-[60vh] md:h-screen relative overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Deuleux Vision"
                        fill
                        className="object-cover grayscale opacity-30 mix-blend-luminosity hover:grayscale-0 hover:opacity-80 transition-all duration-[3s]"
                    />
                </section>

                {/* FAQ / Logistics */}
                <section className="px-4 py-32 max-w-4xl mx-auto">
                    <h2 className="font-heading text-sm text-white/30 tracking-widest uppercase mb-16 text-center">
                        03 / Logistics & FAQ
                    </h2>

                    <div className="flex flex-col border-t border-white/10">
                        {faqs.map((faq, idx) => {
                            const isActive = activeFaq === idx;
                            return (
                                <div key={idx} className="border-b border-white/10 overflow-hidden">
                                    <button
                                        onClick={() => setActiveFaq(isActive ? null : idx)}
                                        className="w-full py-8 flex items-center justify-between text-left group"
                                    >
                                        <span className={`font-heading text-xl md:text-3xl tracking-tight transition-all duration-300 ${isActive ? 'text-white text-glow' : 'text-white/60 group-hover:text-white'}`}>
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isActive ? 45 : 0 }}
                                            transition={{ duration: 0.3, ease: "anticipate" }}
                                            className={`text-2xl font-light ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white'}`}
                                        >
                                            +
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div className="pb-8 pt-2 text-white/50 font-body text-lg md:text-xl leading-relaxed max-w-3xl">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <AnimatedDivider />
            </main>

            <Footer />
        </div >
    );
}
