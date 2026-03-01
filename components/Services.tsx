"use client";

import { motion } from "framer-motion";

export default function Services() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
    };

    return (
        <section id="expertise" className="py-12 md:py-32 px-4 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="font-heading text-4xl md:text-5xl text-white mb-16 tracking-tight"
                >
                    Engineering The Future. / Notre Expertise.
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Card 1 */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 lg:col-span-2 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-white/40 active:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] active:shadow-[0_0_40px_rgba(255,255,255,0.1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-700 ease-out"
                    >
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-heading text-white mb-4 group-hover:-translate-y-1 group-hover:text-glow transition-all duration-500">
                            High-Performance Next.js Frontends
                        </h3>
                        <p className="text-neutral-400 font-body max-w-md group-hover:-translate-y-1 transition-transform duration-500">
                            We build lightning-fast, SEO-optimized web applications utilizing the bleeding edge of the React ecosystem.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-1 lg:col-span-1 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-white/40 active:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] active:shadow-[0_0_40px_rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-700 ease-out"
                    >
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-heading text-white mb-4 group-hover:-translate-y-1 group-hover:text-glow transition-all duration-500">
                            Premium UI/UX Design
                        </h3>
                        <p className="text-neutral-400 font-body group-hover:-translate-y-1 transition-transform duration-500">
                            Award-winning digital experiences that merge Swiss minimalism with cinematic interactions.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-1 lg:col-span-1 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-white/40 active:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] active:shadow-[0_0_40px_rgba(255,255,255,0.1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-700 ease-out"
                    >
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-heading text-white mb-4 group-hover:-translate-y-1 group-hover:text-glow transition-all duration-500">
                            Laravel Headless Architecture
                        </h3>
                        <p className="text-neutral-400 font-body group-hover:-translate-y-1 transition-transform duration-500">
                            Robust, scalable, and secure backend systems powering complex enterprise solutions.
                        </p>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 lg:col-span-2 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-white/40 active:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] active:shadow-[0_0_40px_rgba(255,255,255,0.1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-700 ease-out"
                    >
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-heading text-white mb-4 group-hover:-translate-y-1 group-hover:text-glow transition-all duration-500">
                            Scalable API Systems & Cloud
                        </h3>
                        <p className="text-neutral-400 font-body max-w-md group-hover:-translate-y-1 transition-transform duration-500">
                            Global infrastructure, microservices, and specialized API development built for immense traffic.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
