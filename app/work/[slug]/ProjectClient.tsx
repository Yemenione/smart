"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import ReadingProgress from "@/components/ui/ReadingProgress";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import ShareWidget from "@/components/ui/ShareWidget";
import { useEffect, useRef, useState } from "react";
import { getProjectBySlug, FullProjectData } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectClient({ initialProject }: { initialProject: FullProjectData | null }) {
    const { t, language } = useLanguage();

    // Use the server-provided project instantly (no loading waterfalls)
    const project = initialProject;

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax Effect for the Hero Image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
    };

    const getImageUrl = (imagePath: string | null | undefined) => {
        if (!imagePath) return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
        if (imagePath.startsWith("http")) return imagePath;
        const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8000/storage";
        return `${STORAGE_URL}/${imagePath}`;
    };

    // Ensure "services" and "galleryImages" exist as fallbacks since our minimal Backend model might not use them initially, 
    // but we want our beautiful UI to still look good using dummy data for missing advanced fields.
    const servicesList = project?.techStack || ["UX/UI Design", "Headless Tech", "Motion", "Backend API"];
    const galleryImages = [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    ];

    if (!project) {
        notFound(); // Triggers Next.js 404 page
    }

    return (
        <>
            <ReadingProgress />
            <Navbar />
            <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">

                {/* Cinematic Project Hero */}
                <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col justify-end pb-24 px-4">

                    {/* Parallax Background */}
                    <motion.div
                        style={{ y, opacity }}
                        className="absolute inset-0 z-0 origin-top"
                    >
                        <Image
                            src={getImageUrl(project.coverImage || "")}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Heavy Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                    </motion.div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                        >
                            <motion.h1
                                variants={textVariants}
                                className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-none text-white mb-12"
                            >
                                {language === 'fr' && project.titleFr ? project.titleFr : project.title}
                            </motion.h1>

                            {/* Desktop Meta Info Bar */}
                            <motion.div
                                variants={textVariants}
                                className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20"
                            >
                                <div>
                                    <h4 className="text-xs text-white/50 uppercase tracking-widest font-heading mb-2">{t.project.client}</h4>
                                    <p className="text-sm md:text-base font-body">{project.client}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-white/50 uppercase tracking-widest font-heading mb-2">{t.project.expertise}</h4>
                                    <p className="text-sm md:text-base font-body">{project.role}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-accent/50 uppercase tracking-widest font-heading mb-2">{t.project.techStack}</h4>
                                    <p className="text-sm md:text-base font-body">{project.techStack || "MERN Stack"}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-white/50 uppercase tracking-widest font-heading mb-2">{t.project.year}</h4>
                                    <p className="text-sm md:text-base font-body">{project.year}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Mobile Horizontal Metadata Bar */}
                <section className="md:hidden w-full px-4 -mt-16 mb-8 relative z-20">
                    <div className="flex flex-wrap gap-3 py-6 border-b border-white/10">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-white/70">
                            {t.project.client}: <span className="text-white ml-1">{project.client}</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-white/70">
                            {t.project.expertise}: <span className="text-white ml-1">{project.role}</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-white/70">
                            {t.project.year}: <span className="text-white ml-1">{project.year}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 w-full">
                            {Array.isArray(servicesList) && servicesList.map((service: string, idx: number) => (
                                <div key={idx} className="bg-accent/10 backdrop-blur-md border border-border/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-accent flex items-center gap-2 relative overflow-hidden group">
                                    <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                    <span className="group-hover:text-background relative z-10 transition-colors duration-300">{service}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 w-full">
                            <ShareWidget
                                title={project.title}
                                description={project.challenge || "Explore our latest work"}
                                urlPath={`/work/${project.slug}`}
                            />
                        </div>
                    </div>
                </section>

                {/* The Editorial Brief */}
                <section className="py-12 md:py-32 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 relative">

                    {/* Sticky Sidebar (Desktop Only) */}
                    <div className="md:col-span-4 lg:col-span-3 hidden md:block">
                        <div className="sticky top-32">
                            <h4 className="text-white/30 text-xs mb-8 uppercase tracking-widest font-heading">{t.project.deployedServices}</h4>
                            <div className="md:col-span-8 lg:col-span-7 space-y-2">
                                {Array.isArray(servicesList) && servicesList.map((service: string, idx: number) => (
                                    <div key={idx} className="overflow-hidden">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="text-accent/50 hover:text-accent hover:text-glow transition-all duration-300 uppercase text-sm tracking-widest py-4 border-b border-border/10 cursor-pointer origin-left"
                                        >
                                            {service}
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <ShareWidget
                                    title={project.title}
                                    description={project.challenge || "Explore our latest work"}
                                    urlPath={`/work/${project.slug}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* The Prose */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                        >
                            <h3 className="text-gradient-aura text-sm font-heading tracking-widest uppercase mb-4 md:mb-6">{t.project.challenge}</h3>
                            <div className="text-xl md:text-3xl lg:text-4xl leading-snug md:leading-relaxed font-body mb-16 md:mb-24 max-w-4xl text-white/80 md:text-white">
                                <ScrollRevealText
                                    text={(language === 'fr' && project.challengeFr ? project.challengeFr : project.challenge) || t.project.fallbackChallenge}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
                        >
                            <h3 className="text-gradient-aura text-sm font-heading tracking-widest uppercase mb-4 md:mb-6">{t.project.solution}</h3>
                            <div className="text-xl md:text-3xl lg:text-4xl leading-snug md:leading-relaxed font-body mb-16 md:mb-24 max-w-4xl text-white/80 md:text-white">
                                <ScrollRevealText
                                    text={(language === 'fr' && project.solutionFr ? project.solutionFr : project.solution) || t.project.fallbackSolution}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* The Asymmetrical Gallery */}
                <section className="max-w-[100vw] px-4 md:px-12 py-24 mx-auto overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ clipPath: "inset(100% 0 0 0)" }}
                                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: idx * 0.1 }}
                                className={`relative w-full aspect-[4/5] overflow-hidden ${idx % 2 !== 0 ? "md:mt-32" : ""}`}
                            >
                                <Image
                                    src={img}
                                    alt={`Gallery Image ${idx + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-[2s] hover:scale-105"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* The "Next Project" CTA */}
                <Link
                    href="/work/aura"
                    className="h-[50vh] w-full flex flex-col items-center justify-center text-center border-t border-white/10 cursor-pointer group mt-24 px-4 overflow-hidden block"
                >
                    <p className="font-heading text-sm text-white/50 tracking-widest uppercase mb-8 transition-colors duration-500 group-hover:text-white">
                        {t.project.nextProject}
                    </p>
                    <h2 className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-gray-500 hover:scale-105 transition-all duration-700 text-center w-full">
                        {t.project.nextProjectTitle} <br className="md:hidden" /> {t.project.nextProjectSubtitle}
                    </h2>
                </Link>

            </main>
            <Footer />
        </>
    );
}
