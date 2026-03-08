"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] max-w-sm p-6 rounded-2xl bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-2xl font-body"
        >
            <p className="text-sm text-white/70 leading-relaxed mb-6 font-medium">
                Nous utilisons des cookies pour sublimer votre expérience numérique.
            </p>

            <div className="flex items-center justify-end gap-6">
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                >
                    DÉCLINER
                </button>
                <button
                    onClick={() => setIsVisible(false)}
                    className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 ease-out"
                >
                    ACCEPTER
                </button>
            </div>
        </motion.div>
    );
}
