"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ExitIntentModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        // Prevent showing the modal multiple times
        if (localStorage.getItem("exit_intent_shown") === "true") return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                setIsVisible(true);
                localStorage.setItem("exit_intent_shown", "true");
            }
        };

        const handleScroll = () => {
            // Also show if they scroll to the very bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                if (localStorage.getItem("exit_intent_shown") !== "true") {
                    setIsVisible(true);
                    localStorage.setItem("exit_intent_shown", "true");
                }
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Simulating a fast backend submission for Lead Capture
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        }, 800);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 md:p-12">
                            <h3 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">Unlocking Growth</h3>

                            <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tighter text-white mb-4 leading-[1.1]">
                                Don't Leave Without A <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Strategy.</span>
                            </h2>

                            <p className="text-white/60 font-body mb-8 text-sm md:text-base leading-relaxed">
                                You're one step away from transforming your digital presence. Get a FREE bespoke consultation with our elite architects before you go.
                            </p>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-accent/10 border border-accent/30 text-accent rounded-xl p-6 text-center font-bold"
                                >
                                    Incredible choice. Our experts will email you shortly.
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your professional email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl px-4 py-4 hover:bg-white/90 transition-colors disabled:opacity-50"
                                    >
                                        {status === "loading" ? "Analyzing..." : "Claim Free Consultation"}
                                    </button>
                                </form>
                            )}

                            <p className="text-white/30 text-xs mt-6 text-center">
                                We respect your privacy. No spam, ever.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
