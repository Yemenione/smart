"use client";

import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { getProjects, ProjectData } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import Skeleton from "@/Components/old_components/ui/Skeleton";
import ProjectCursor from "@/Components/old_components/ui/ProjectCursor";

export default function Work({ initialProjects = [] }: { initialProjects?: ProjectData[] }) {
    const { t, language } = useLanguage();
    const [projects, setProjects] = useState<ProjectData[]>(initialProjects);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
        if (url.startsWith('http')) return url;
        const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
        return `/storage/${cleanUrl}`;
    };

    return (
        <section className="py-12 md:py-24 px-4 md:px-12 bg-transparent relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="font-heading text-4xl md:text-5xl text-white mb-16 tracking-tight"
                >
                    {t.nav.work}.
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                >
                    {projects.map((project, index) => {
                        // Asymmetrical Grid Logic: Make every 3rd item span 2 columns on desktop
                        const isDoubleWide = index % 3 === 0;

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: (index % 3) * 0.1 }}
                                className={`group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-white/40 active:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-700 ease-out cursor-none
                                    ${isDoubleWide ? "md:col-span-2 md:aspect-[21/9]" : "md:col-span-1 md:aspect-[4/5]"}
                                    ${index === 1 && !isDoubleWide ? "md:mt-24" : ""}
                                `}
                            >
                                <ProjectCursor cursorText={t.hero.scrollIndicator.toUpperCase()}>
                                    <Link href={`/work/${project.slug}`} className="block w-full h-full relative overflow-hidden">
                                        <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                                            <img
                                                src={getImageUrl(project.cover_image || project.coverImage)}
                                                alt={project.title}
                                                // Grayscale by default, color on hover + slight scale
                                                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                                                onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                                            />
                                        </div>
                                        {/* Cinematic dark overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                                        {/* Content inside the card */}
                                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <h3 className="font-heading text-3xl md:text-5xl text-white mb-3 font-bold tracking-tight drop-shadow-lg">
                                                {language === 'fr' && (project.title_fr || project.titleFr) ? (project.title_fr || project.titleFr) : project.title}
                                            </h3>
                                            <div className="flex items-center gap-4">
                                                <p className="font-body text-white/80 tracking-widest uppercase text-xs md:text-sm bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                                                    {project.role}
                                                </p>
                                                {project.year && (
                                                    <p className="font-mono text-white/50 text-xs tracking-wider">
                                                        {project.year}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </ProjectCursor>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
}
