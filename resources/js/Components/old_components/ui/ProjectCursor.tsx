"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface ProjectCursorProps {
    children: React.ReactNode;
    cursorText?: string;
}

export default function ProjectCursor({ children, cursorText = "VIEW" }: ProjectCursorProps) {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Precise coordinates for the cursor
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springing motion for the bubble trailing effect
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Update raw values
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* The actual project card content */}
            <div className={`h-full w-full transition-all duration-300`}>
                {children}
            </div>

            {/* The floating Bubble Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-24 h-24 rounded-full bg-accent/90 backdrop-blur-md text-background flex items-center justify-center pointer-events-none z-[100] overflow-hidden"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isHovering ? 1 : 0,
                    opacity: isHovering ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <motion.span
                    className="font-mono text-xs font-bold tracking-widest"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovering ? 0 : 20, opacity: isHovering ? 1 : 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                >
                    {cursorText}
                </motion.span>
            </motion.div>
        </div>
    );
}
