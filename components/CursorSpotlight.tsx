"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorSpotlight() {
    const [isMounted, setIsMounted] = useState(false);

    // Use spring physics for buttery smooth following
    const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            // Offset by half the width/height of the spotlight to center it on the cursor
            mouseX.set(e.clientX - 500); // 1000px / 2 context
            mouseY.set(e.clientY - 500);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[1] pointer-events-none"
            style={{
                width: "100%",
                height: "100%",
                WebkitMaskImage: "linear-gradient(black, black)",
                maskImage: "linear-gradient(black, black)",
            }}
        >
            <motion.div
                className="absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    background: "radial-gradient(500px circle at center, rgba(255,255,255,0.06), transparent 80%)",
                }}
            />
        </motion.div>
    );
}
