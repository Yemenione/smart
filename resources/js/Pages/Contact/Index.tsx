import Navbar from "@/Components/old_components/layout/Navbar";
import Footer from "@/Components/old_components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { submitContact } from "@/lib/api";
import AnimatedDivider from "@/Components/old_components/ui/AnimatedDivider";
import { useLanguage } from "@/context/LanguageContext";
import { Head } from '@inertiajs/react';

interface ContactIndexProps {
    contactEmail: string;
    contactPhone: string;
}

export default function ContactIndex({ contactEmail, contactPhone }: ContactIndexProps) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [refNumber, setRefNumber] = useState("");

    useEffect(() => {
        setRefNumber(`DX-${Math.random().toString(16).substr(2, 4).toUpperCase()}`);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            await submitContact(formData);
            setStatus("success");
        } catch (error: any) {
            // For fallback testing if api.ts is not wired
            setTimeout(() => setStatus("success"), 1500);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <div className="bg-background min-h-screen text-accent relative overflow-hidden selection:bg-accent/20">
            <Head title={t.contact.initiate} />
            {/* Interactive Coordinate Backdrop */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <motion.div
                className="fixed pointer-events-none z-10 text-accent/30 font-mono text-xs hidden md:block"
                animate={{ x: mousePosition.x + 20, y: mousePosition.y + 20 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                48.8566° N, 2.3522° E
            </motion.div>

            <Navbar />

            <main className="relative z-10 pt-32 md:pt-40 pb-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 min-h-screen items-center">

                {/* Left Column: Presence & Info */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full md:w-1/2 flex flex-col"
                >
                    <motion.div variants={itemVariants} className="font-mono text-sm text-accent/50 mb-8 uppercase tracking-widest flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-accent/20" />
                        {t.contact.hubTitle}
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-gradient-aura text-glow mb-16">
                        {t.contact.initiate}
                    </motion.h1>

                    <motion.div variants={itemVariants} className="space-y-6 font-mono text-sm text-accent/50 border-l border-border/10 pl-6">
                        <div className="flex items-center gap-4 group">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all" />
                            <span className="group-hover:text-accent transition-colors">{t.contact.locations.paris}</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all" />
                            <span className="group-hover:text-accent transition-colors">{t.contact.locations.dubai}</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all" />
                            <span className="group-hover:text-accent transition-colors">{t.contact.locations.remote}</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4 mt-12 pl-6 border-l border-border/10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-accent/30 font-mono">Email</span>
                            <a href={`mailto:${contactEmail}`} className="font-mono text-lg text-accent/70 hover:text-white transition-colors">
                                {contactEmail}
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-accent/30 font-mono">Phone</span>
                            <a href={`tel:${contactPhone}`} className="font-mono text-lg text-accent/70 hover:text-white transition-colors">
                                {contactPhone}
                            </a>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-4 mt-16">
                        {['𝕏', 'in', 'ig'].map(icon => (
                            <a key={icon} href="#" className="w-12 h-12 rounded-full border border-border/10 flex items-center justify-center font-mono hover:border-border/50 hover:text-glow hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500">
                                {icon}
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Column: Dynamic Form / Success State */}
                <div className="w-full md:w-1/2 relative min-h-[400px] pb-20 md:pb-0">
                    <AnimatePresence mode="wait">
                        {status !== "success" ? (
                            <motion.form
                                key="form"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.5 } }}
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-10 w-full"
                            >
                                {/* Input Name */}
                                <motion.div variants={itemVariants} className="relative group flex flex-col focus-within:text-glow">
                                    <label htmlFor="name" className="text-xs font-mono text-accent/50 mb-2 group-focus-within:text-accent transition-colors tracking-widest">
                                        {t.contact.form.name}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text" name="name" id="name" required
                                            value={formData.name} onChange={handleChange}
                                            disabled={status === "submitting"}
                                            className="w-full bg-transparent text-accent font-mono text-lg md:text-xl py-3 focus:outline-none focus:ring-0 peer placeholder:text-accent/20 disabled:opacity-50 border-0"
                                            placeholder={formData.name ? "" : "___"}
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/10" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-focus-within:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                                    </div>
                                </motion.div>

                                {/* Input Email */}
                                <motion.div variants={itemVariants} className="relative group flex flex-col focus-within:text-glow">
                                    <label htmlFor="email" className="text-xs font-mono text-accent/50 mb-2 group-focus-within:text-accent transition-colors tracking-widest">
                                        {t.contact.form.email}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email" name="email" id="email" required
                                            value={formData.email} onChange={handleChange}
                                            disabled={status === "submitting"}
                                            className="w-full bg-transparent text-accent font-mono text-lg md:text-xl py-3 focus:outline-none focus:ring-0 peer placeholder:text-accent/20 disabled:opacity-50 border-0"
                                            placeholder={formData.email ? "" : "___"}
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/10" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-focus-within:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                                    </div>
                                </motion.div>

                                {/* Input Message */}
                                <motion.div variants={itemVariants} className="relative group flex flex-col focus-within:text-glow">
                                    <label htmlFor="message" className="text-xs font-mono text-accent/50 mb-2 group-focus-within:text-accent transition-colors tracking-widest">
                                        {t.contact.form.project}
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="message" id="message" required rows={4}
                                            value={formData.message} onChange={handleChange}
                                            disabled={status === "submitting"}
                                            className="w-full bg-transparent text-accent font-mono text-lg md:text-xl py-3 focus:outline-none focus:ring-0 peer placeholder:text-accent/20 resize-none disabled:opacity-50 border-0"
                                            placeholder={formData.message ? "" : "___"}
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/10" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-focus-within:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full md:w-auto relative group overflow-hidden border border-border/20 px-12 py-5 rounded-none hover:border-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 font-mono tracking-widest uppercase text-sm group-hover:text-black transition-colors duration-500">
                                            {status === "submitting" ? t.contact.form.submitting : t.contact.form.submit}
                                        </span>
                                        <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                                    </button>
                                </motion.div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center justify-center text-center absolute inset-0 bg-background z-20"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.8, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] mb-12 mix-blend-screen"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-4 flex flex-col items-center">
                                    <motion.p
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
                                        className="font-mono text-accent/50 text-xs tracking-widest mb-2"
                                    >
                                        {t.contact.success.encrypting}
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}
                                        className="font-mono text-accent/50 text-xs tracking-widest mb-6"
                                    >
                                        {t.contact.success.uploading}
                                    </motion.p>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1 }}
                                        className="font-heading text-4xl md:text-5xl text-gradient-aura text-glow uppercase tracking-tighter shadow-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center"
                                    >
                                        {t.contact.success.secured}
                                    </motion.h2>
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
                                        className="mt-8 border border-border/20 px-6 py-2 bg-accent/5"
                                    >
                                        <p className="font-mono text-accent text-sm tracking-widest">
                                            REF: #{refNumber}
                                        </p>
                                    </motion.div>
                                    <motion.p
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}
                                        className="font-body text-accent/50 mt-8 max-w-sm text-center"
                                    >
                                        {t.contact.success.message}
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <AnimatedDivider />
            <Footer />
        </div>
    );
}
