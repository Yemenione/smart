import Navbar from "@/Components/old_components/layout/Navbar";
import Footer from "@/Components/old_components/layout/Footer";
import GridBackground from "@/Components/old_components/ui/GridBackground";
import AnimatedDivider from "@/Components/old_components/ui/AnimatedDivider";
import ScrollRevealText from "@/Components/old_components/sections/ScrollRevealText";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Head } from '@inertiajs/react';

export default function ServicesIndex() {
    const { t } = useLanguage();

    const services = [
        {
            id: "01",
            title: t.servicesPage.items.strategy.title,
            description: t.servicesPage.items.strategy.desc,
            icon: "◆"
        },
        {
            id: "02",
            title: t.servicesPage.items.design.title,
            description: t.servicesPage.items.design.desc,
            icon: "▲"
        },
        {
            id: "03",
            title: t.servicesPage.items.engineering.title,
            description: t.servicesPage.items.engineering.desc,
            icon: "■"
        },
        {
            id: "04",
            title: t.servicesPage.items.ecommerce.title,
            description: t.servicesPage.items.ecommerce.desc,
            icon: "●"
        }
    ];

    return (
        <div className="bg-transparent min-h-screen text-accent selection:bg-accent/20">
            <Head title={t.servicesPage.title} />
            <Navbar />
            <GridBackground />

            <main className="relative z-10 pt-48 pb-32">
                <section className="px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter text-gradient-aura text-glow"
                    >
                        {t.servicesPage.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 text-xl md:text-2xl text-accent/70 max-w-3xl font-body"
                    >
                        {t.servicesPage.subtitle}
                    </motion.p>
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
                                    className="text-8xl md:text-[10rem] text-accent/5 font-heading mb-8 leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                >
                                    {service.icon}
                                </motion.div>
                                <h2 className="font-heading text-sm text-accent/50 tracking-widest uppercase mb-4">
                                    {service.id} / {t.nav.services.slice(0, -1).toUpperCase()}
                                </h2>
                                <h3 className="font-heading text-5xl md:text-6xl text-accent tracking-tight">
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
