"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    price?: string;
    ctaText?: string;
    ctaLink?: string;
    imageUrl: string;
    order: number;
}

export default function MarketingHero({ initialSlides = [] }: { initialSlides?: HeroSlide[] }) {
    const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance slides every 6 seconds
    useEffect(() => {
        if (slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    if (slides.length === 0) {
        // Fallback state if no slides are provided
        return (
            <div className="relative w-full h-screen bg-[#020202] flex items-center justify-center overflow-hidden">
                <div className="text-white/20 text-sm">No featured slides available</div>
            </div>
        );
    }

    const currentSlide = slides[currentIndex];

    // Animation variants for the text
    const textVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    };

    return (
        <div className="relative w-full h-screen bg-[#020202] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={currentSlide.imageUrl}
                            alt={currentSlide.title}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 flex flex-col justify-center pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="max-w-3xl"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        {/* Subtitle / Badge */}
                        <motion.div variants={textVariants} className="mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-accent" />
                            <span className="font-mono text-sm tracking-widest uppercase text-accent font-bold">
                                {currentSlide.subtitle}
                            </span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            variants={textVariants}
                            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl"
                            dir="auto"
                        >
                            {currentSlide.title}
                        </motion.h1>

                        {/* Price Tag (If exists) */}
                        {currentSlide.price && (
                            <motion.div variants={textVariants} className="mb-10">
                                <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 font-bold px-6 py-2 rounded-full text-2xl md:text-3xl shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                                    {currentSlide.price}
                                </span>
                            </motion.div>
                        )}

                        {/* CTA Button */}
                        {currentSlide.ctaText && currentSlide.ctaLink && (
                            <motion.div variants={textVariants}>
                                <Link
                                    href={currentSlide.ctaLink}
                                    className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95"
                                >
                                    <span className="relative z-10">{currentSlide.ctaText}</span>
                                    <span className="relative z-10 bg-black text-white p-2 rounded-full transform group-hover:translate-x-1 transition-transform">
                                        <ChevronRight size={16} />
                                    </span>
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 mix-blend-difference" />
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slider Controls */}
            {slides.length > 1 && (
                <div className="absolute bottom-10 right-10 z-20 flex items-center gap-4">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-md transition-all active:scale-90"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-md transition-all active:scale-90"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Progress indicators */}
                    <div className="hidden md:flex items-center gap-2 ml-4">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
