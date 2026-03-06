"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
    const { t } = useLanguage();
    const [settings, setSettings] = useState<{
        logoUrl?: string;
        siteName?: string;
        socialTwitter?: string;
        socialLinkedin?: string;
        socialInstagram?: string;
        socialFacebook?: string;
    }>({});

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => setSettings(data))
            .catch((err) => console.error("Failed to load footer settings", err));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
    };

    return (
        <footer id="agency" className="min-h-[80vh] relative flex flex-col items-center justify-center bg-[#000000] overflow-hidden px-4">
            {/* Subtle giant radial gradient */}
            <div className="absolute bottom-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/5 via-black/0 to-black/0 pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl"
            >
                <motion.div variants={itemVariants} className="mb-8">
                    {settings.logoUrl ? (
                        <img src={settings.logoUrl} alt="Logo" className="h-12 md:h-16 w-auto object-contain mx-auto opacity-80" />
                    ) : (
                        <h3 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-white/90">
                            {settings.siteName || "DEULEUX"}<span className="text-white/20">.</span>
                        </h3>
                    )}
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className="font-heading text-5xl md:text-8xl font-bold tracking-tighter text-white"
                >
                    {t.footer.title}
                </motion.h2>

                <motion.div variants={itemVariants} className="mt-2 w-full text-center flex justify-center">
                    <div className="font-heading justify-center text-5xl md:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] drop-shadow-sm">
                        {t.footer.subtitle}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Magnetic>
                        <button className="mt-12 px-10 py-4 rounded-full bg-white text-black font-medium text-lg border border-transparent hover:bg-transparent hover:text-white hover:border-white hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500 ease-out">
                            {t.footer.startProject}
                        </button>
                    </Magnetic>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-32 w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 font-body gap-4"
                >
                    <p>© {new Date().getFullYear()} {t.footer.rights}</p>
                    <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                        <Link href="/legal/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
                        <Link href="/legal/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
                        {settings.socialTwitter && <a href={settings.socialTwitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Twitter (X)</a>}
                        {settings.socialLinkedin && <a href={settings.socialLinkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>}
                        {settings.socialInstagram && <a href={settings.socialInstagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>}
                        {settings.socialFacebook && <a href={settings.socialFacebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Facebook</a>}
                        {(!settings.socialTwitter && !settings.socialLinkedin && !settings.socialInstagram && !settings.socialFacebook) && (
                            <>
                                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
