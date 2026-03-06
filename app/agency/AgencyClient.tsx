"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getFaqs, FAQData } from "@/lib/api";

export default function AgencyClient() {
    const { t } = useLanguage();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<FAQData[]>([]);

    useEffect(() => {
        getFaqs().then((data) => setFaqs(data));
    }, []);

    return (
        <div className="bg-background min-h-screen selection:bg-accent/20">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative px-4 pt-48 pb-32 md:pt-64 md:pb-48 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <p className="font-heading text-sm text-accent/50 tracking-widest uppercase mb-8">
                        The Agency / L'Agence
                    </p>
                    {/* Magical Aura Animated Text */}
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter leading-none text-gradient-aura text-glow mb-12">
                        {t.agencyPage.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-accent/70 font-body max-w-2xl mx-auto leading-relaxed">
                        {t.agencyPage.subtitle}
                    </p>
                </section>

                {/* Philosophy Section */}
                <section className="px-4 py-32 border-t border-border/5 bg-[#0a0a0a]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-heading text-sm text-accent/50 tracking-widest uppercase mb-4">
                            01 / {t.agencyPage.philosophy}
                        </h2>
                        {/* Apple-style Scroll Reveal Paragraph */}
                        <ScrollRevealText
                            text={t.agencyPage.mission}
                            className="font-body text-3xl md:text-5xl leading-[1.4] tracking-tight"
                        />
                    </div>
                </section>

                {/* Services Grid (Keeping expertise mostly visual/technical for consistency. Can translate later if needed) */}
                <section className="px-4 py-32 md:py-48 max-w-7xl mx-auto">
                    <h2 className="font-heading text-sm text-accent/30 tracking-widest uppercase mb-16">
                        02 / {t.servicesPage.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-border/10 pt-16">
                        {/* Service 1 */}
                        <div className="group">
                            <h3 className="font-heading text-2xl text-accent mb-6 tracking-tight">{t.servicesPage.items.engineering.title}</h3>
                            <p className="text-accent/50 font-body leading-relaxed mb-8">
                                {t.servicesPage.items.engineering.desc}
                            </p>
                            <ul className="space-y-4">
                                {t.homeServices.items_list.engineering.map((item: string) => (
                                    <li key={item} className="flex items-center text-sm font-body text-accent/70">
                                        <ArrowRight size={14} className="mr-3 text-accent/30 group-hover:text-accent transition-colors" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 2 */}
                        <div className="group">
                            <h3 className="font-heading text-2xl text-accent mb-6 tracking-tight">{t.servicesPage.items.design.title}</h3>
                            <p className="text-accent/50 font-body leading-relaxed mb-8">
                                {t.servicesPage.items.design.desc}
                            </p>
                            <ul className="space-y-4">
                                {t.homeServices.items_list.design.map((item: string) => (
                                    <li key={item} className="flex items-center text-sm font-body text-accent/70">
                                        <ArrowRight size={14} className="mr-3 text-accent/30 group-hover:text-accent transition-colors" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service 3 */}
                        <div className="group">
                            <h3 className="font-heading text-2xl text-accent mb-6 tracking-tight">{t.servicesPage.items.strategy.title}</h3>
                            <p className="text-accent/50 font-body leading-relaxed mb-8">
                                {t.servicesPage.items.strategy.desc}
                            </p>
                            <ul className="space-y-4">
                                {t.homeServices.items_list.strategy.map((item: string) => (
                                    <li key={item} className="flex items-center text-sm font-body text-accent/70">
                                        <ArrowRight size={14} className="mr-3 text-accent/30 group-hover:text-accent transition-colors" />
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
                    <h2 className="font-heading text-sm text-accent/30 tracking-widest uppercase mb-16 text-center">
                        03 / Logistics & FAQ
                    </h2>

                    <div className="flex flex-col border-t border-border/10">
                        {faqs.map((faq, idx) => {
                            const isActive = activeFaq === idx;
                            return (
                                <div key={idx} className="border-b border-border/10 overflow-hidden">
                                    <button
                                        onClick={() => setActiveFaq(isActive ? null : idx)}
                                        className="w-full py-8 flex items-center justify-between text-left group"
                                    >
                                        <span className={`font-heading text-xl md:text-3xl tracking-tight transition-all duration-300 ${isActive ? 'text-accent text-glow' : 'text-accent/60 group-hover:text-accent'}`}>
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isActive ? 45 : 0 }}
                                            transition={{ duration: 0.3, ease: "anticipate" }}
                                            className={`text-2xl font-light ${isActive ? 'text-accent' : 'text-accent/30 group-hover:text-accent'}`}
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
                                                <div className="pb-8 pt-2 text-accent/50 font-body text-lg md:text-xl leading-relaxed max-w-3xl">
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
