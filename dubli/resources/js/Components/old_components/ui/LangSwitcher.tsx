"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function LangSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'en' : 'fr');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center font-mono text-sm uppercase tracking-widest relative group hoverable"
        >
            <span className="text-white/30">[</span>
            <div className="flex gap-2 mx-2">
                <span className={`transition-all duration-300 ${language === 'fr' ? 'text-white text-glow font-bold' : 'text-white/30 hover:text-white/70'}`}>
                    FR
                </span>
                <span className="text-white/30">/</span>
                <span className={`transition-all duration-300 ${language === 'en' ? 'text-white text-glow font-bold' : 'text-white/30 hover:text-white/70'}`}>
                    EN
                </span>
            </div>
            <span className="text-white/30">]</span>

            {/* Glowing underline indicator */}
            <motion.div
                className="absolute -bottom-1 h-[1px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                initial={false}
                animate={{
                    left: language === 'fr' ? '9px' : '38px', // Approximate positions, adjust if needed
                    width: '18px'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </button>
    );
}
