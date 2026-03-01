"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollRevealText from "@/components/ScrollRevealText";
import { useEffect, useRef, useState } from "react";
import { getProjectBySlug, FullProjectData } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function CaseStudy() {
    const { t } = useLanguage();
    const params = useParams();
    const slug = params.slug as string;

    const [project, setProject] = useState<FullProjectData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            const data = await getProjectBySlug(slug);
            setProject(data);
            // Brief elegant loading state
            setTimeout(() => setIsLoading(false), 500);
        };

        if (slug) fetchProject();
    }, [slug]);

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
    const servicesList = project?.tech_stack || ["UX/UI Design", "Headless Tech", "Motion", "Backend API"];
    const galleryImages = [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    ];

    if (isLoading) {
        return (
            <div ref={containerRef} className="min-h-screen bg-[#050505] flex items-center justify-center">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="font-heading text-white/50 tracking-[0.3em] text-sm uppercase"
                >
                    LOADING PROJECT DATA...
                </motion.div>
            </div>
        );
    }

    if (!project) {
        notFound(); // Triggers Next.js 404 page
    }

    return (
        <>
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
                            src={getImageUrl(project.cover_image)}
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
                                {project.title}
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
                                    <h4 className="text-xs text-white/50 uppercase tracking-widest font-heading mb-2">{t.project.techStack}</h4>
                                    <p className="text-sm md:text-base font-body">{project.tech_stack?.join(" • ") || "MERN Stack"}</p>
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
                        {servicesList.slice(0, 2).map((service, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-white flex items-center gap-2 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                                <span className="relative z-10">{service}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* The Editorial Brief */}
                <section className="py-12 md:py-32 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 relative">

                    {/* Sticky Sidebar (Desktop Only) */}
                    <div className="md:col-span-4 lg:col-span-3 hidden md:block">
                        <div className="sticky top-32">
                            <h4 className="text-white/30 text-xs mb-8 uppercase tracking-widest font-heading">{t.project.deployedServices}</h4>
                            <motion.ul className="flex flex-col border-l-2 border-white/20 pl-6">
                                {servicesList.map((service, idx) => (
                                    <motion.li
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        className="text-white/50 hover:text-white hover:text-glow transition-all duration-300 uppercase text-sm tracking-widest py-4 border-b border-white/10 cursor-pointer origin-left"
                                    >
                                        {service}
                                    </motion.li>
                                ))}
                            </motion.ul>
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
                                    text={project.challenge || "Decoupling their massive Monolith into a state-of-the-art Headless ecosystem, achieving sub-second load times while maintaining a sophisticated visual identity and flawless motion design."}
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
                                    text={project.solution || "Leveraging Next.js on the edge, combined with a robust Laravel API. We implemented aggressive ISR caching strategies and custom WebGL shaders to deliver an experience that feels truly transformative and elite."}
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
                        Aura Paris <br className="md:hidden" /> E-Commerce
                    </h2>
                </Link>

            </main>
            <Footer />
        </>
    );
}
