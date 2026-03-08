"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Technology {
    name: string;
    category: string;
}

const technologies: Technology[] = [
    { name: "Laravel", category: "Backend / PHP" },
    { name: "Next.js", category: "Frontend / React" },
    { name: "TypeScript", category: "Programming" },
    { name: "Tailwind", category: "Styling / UI" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Node.js", category: "Runtime" },
    { name: "Framer", category: "Motion / Animation" },
    { name: "React", category: "Frontend Lib" },
];

export default function TechStackMarquee() {
    const { t } = useLanguage();

    return (
        <section className="py-12 md:py-20 bg-transparent border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center md:text-right">
                <h3 className="text-sm font-mono tracking-widest uppercase text-white/50 mb-2">
                    {t.techStack.title}
                </h3>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tighter">
                    {t.techStack.subtitle}
                </h2>
            </div>

            {/* The infinite scrolling track - reversed direction for visual variety */}
            <div className="relative w-full flex overflow-x-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10" />

                <motion.div
                    className="flex shrink-0 gap-16 md:gap-32 items-center py-4 px-8"
                    animate={{
                        x: [-1035, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                >
                    {[...technologies, ...technologies].map((tech, idx) => (
                        <div key={idx} className="flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity cursor-default group">
                            <span className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-white pb-2">
                                {tech.name}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors">
                                {tech.category}
                            </span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex shrink-0 gap-16 md:gap-32 items-center py-4 px-8"
                    animate={{ x: [-1035, 0] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                >
                    {[...technologies, ...technologies].map((tech, idx) => (
                        <div key={idx} className="flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity cursor-default group">
                            <span className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-white pb-2">
                                {tech.name}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors">
                                {tech.category}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
