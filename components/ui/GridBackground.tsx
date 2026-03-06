"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
            {/* The Fine Geometric Grid */}
            <div
                className="absolute inset-0 opacity-10 md:opacity-[0.15] bg-[length:100px_100px] md:bg-[length:60px_60px]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
                }}
            />

            {/* The Slow-Moving Radial Gradient Blob to Illuminate Lines (Desktop Only) */}
            <motion.div
                animate={{
                    x: ["-20vw", "100vw"],
                    y: ["-20vh", "100vh"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
                className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-white opacity-5 mix-blend-screen"
            />

            {/* Fading Blob for Mobile Performance */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="md:hidden absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-white mix-blend-screen"
            />

            {/* Secondary Pulse (Desktop Only) */}
            <motion.div
                animate={{
                    x: ["80vw", "-10vw"],
                    y: ["100vh", "-10vh"],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-gray-500 opacity-[0.03] mix-blend-screen"
            />
        </div>
    );
}
