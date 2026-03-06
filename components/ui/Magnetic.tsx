"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
    children: React.ReactElement;
    maxDistance?: number;
    magneticForce?: number;
}

export default function Magnetic({ children, maxDistance = 60, magneticForce = 0.3 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Allow opting out of hover effects on mobile devices to prevent sticky hover states
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = ref.current.getBoundingClientRect();

            const elementCenterX = left + width / 2;
            const elementCenterY = top + height / 2;

            const distanceX = clientX - elementCenterX;
            const distanceY = clientY - elementCenterY;
            const maxRadius = maxDistance;

            // If cursor is within the maxDistance threshold, pull the element
            if (Math.abs(distanceX) < maxRadius && Math.abs(distanceY) < maxRadius) {
                // Apply a magnetic force formula
                setPosition({ x: distanceX * magneticForce, y: distanceY * magneticForce });
            } else {
                // Return to original position
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        // Important: also reset if cursor leaves the window
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [maxDistance, magneticForce]);

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}
