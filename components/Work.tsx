"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProjects, ProjectData } from "@/lib/api";

export default function Work() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
            // Artificial elite delay to show the fetching state smoothly (Optional)
            setTimeout(() => setIsLoading(false), 800);
        };

        fetchProjects();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
        if (imagePath.startsWith("http")) return imagePath;
        const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8000/storage";
        return `${STORAGE_URL}/${imagePath}`;
    };

    return (
        <section className="py-12 md:py-32 px-4 md:px-12 bg-[#050505] relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="font-heading text-4xl md:text-5xl text-white mb-16 tracking-tight"
                >
                    Selected Work. / Nos Réalisations.
                </motion.h2>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
                        {[1, 2, 3, 4].map((skeleton) => (
                            <div
                                key={skeleton}
                                className={`w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 h-[60vh] md:h-[70vh] animate-pulse ${skeleton % 2 === 0 ? "md:mt-16" : ""}`}
                            >
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col gap-4">
                                    <div className="h-8 md:h-12 w-3/4 bg-white/10 rounded-md" />
                                    <div className="h-4 w-1/4 bg-white/5 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }}
                                className={`group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-white/40 active:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] active:shadow-[0_0_30px_rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-700 ease-out cursor-pointer ${index % 2 !== 0 ? "md:mt-16" : ""
                                    }`}
                            >
                                <Link href={`/work/${project.slug}`} className="block w-full h-full">
                                    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                                        <Image
                                            src={getImageUrl(project.cover_image)}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                    </div>

                                    {/* Content inside the card */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
                                        <h3 className="font-heading text-3xl md:text-4xl text-white mb-2 font-bold tracking-tight">
                                            {project.title}
                                        </h3>
                                        <p className="font-body text-white/60 tracking-widest uppercase text-xs md:text-sm">
                                            {project.role}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
