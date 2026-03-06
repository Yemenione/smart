"use client";

import { motion } from "framer-motion";

interface Partner {
    name: string;
    description: string;
}

const partners: Partner[] = [
    { name: "LVMH", description: "Digital Transformation" },
    { name: "Shopify Plus", description: "Certified Elite Partner" },
    { name: "Vercel", description: "Enterprise Architecture" },
    { name: "Accor Hotels", description: "Global Booking Apps" },
    { name: "Stripe", description: "Fintech Integrations" },
    { name: "Meta", description: "Performance Marketing" },
];

export default function InfiniteMarquee() {
    return (
        <section className="py-24 bg-[#020202] border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center md:text-left">
                <h3 className="text-sm font-mono tracking-widest uppercase text-white/50 mb-2">Trusted Globally</h3>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tighter">
                    Empowering Industry Leaders
                </h2>
            </div>

            {/* The infinite scrolling track */}
            <div className="relative w-full flex overflow-x-hidden">
                {/* Gradient Masks for smooth fading edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10" />

                <motion.div
                    className="flex shrink-0 gap-16 md:gap-32 items-center py-4 px-8"
                    animate={{
                        x: [0, -1035],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Render the list twice to create the seamless loop effect */}
                    {[...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity cursor-default group">
                            <span className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 pb-2">
                                {partner.name}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-widest text-accent/80 group-hover:text-accent transition-colors">
                                {partner.description}
                            </span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex shrink-0 gap-16 md:gap-32 items-center py-4 px-8"
                    animate={{ x: [0, -1035] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {[...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity cursor-default group">
                            <span className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 pb-2">
                                {partner.name}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-widest text-accent/80 group-hover:text-accent transition-colors">
                                {partner.description}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
