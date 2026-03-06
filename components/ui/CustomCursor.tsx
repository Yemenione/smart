"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(true);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [isMobile, mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <>
            {/* The Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />
            {/* The Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />
        </>
    );
}
