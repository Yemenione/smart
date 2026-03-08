"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Preloader() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Unmount the preloader slightly after the animation finishes
        const timer = setTimeout(() => setIsVisible(false), 3200);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100vh" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 1.8 }}
            className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center pointer-events-none gap-8"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <ApplicationLogo className="h-16 md:h-24 text-white" />
            </motion.div>

            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="font-heading text-white/50 tracking-[0.3em] text-sm uppercase"
            >
                {t.preloader.initializing}
            </motion.div>
        </motion.div>
    );
}
