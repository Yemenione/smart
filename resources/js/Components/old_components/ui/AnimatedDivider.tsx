"use client";

import { motion } from "framer-motion";

interface AnimatedDividerProps {
    className?: string;
}

export default function AnimatedDivider({ className = "" }: AnimatedDividerProps) {
    return (
        <div className={`w-full flex items-center justify-center overflow-hidden py-4 ${className}`}>
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-full max-w-7xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 origin-center"
            />
        </div>
    );
}
