"use client";

import { useEffect, useState } from "react";

export default function CinematicNoise() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Highly optimized inline base64 SVG noise
    const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

    if (!mounted) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.035] mix-blend-screen"
            style={{
                backgroundImage: `url("${noiseSvg}")`,
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px" // Keep the noise grain appropriately sized
            }}
            aria-hidden="true"
        />
    );
}
