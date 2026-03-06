"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Star, ShoppingBag, Globe, Cpu } from "lucide-react";

interface ProductApp {
    id: string;
    name: string;
    nameFr?: string | null;
    category: string;
    categoryFr?: string | null;
    description: string;
    descriptionFr?: string | null;
    features: string;
    featuresFr?: string | null;
    priceText: string;
    priceTextFr?: string | null;
    imageUrl: string;
    demoLink?: string | null;
    isPopular: boolean;
}

export default function StoreClient({ initialApps }: { initialApps: ProductApp[] }) {
    const { t, language } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(initialApps.map(app =>
        (language === 'fr' && app.categoryFr) ? app.categoryFr : app.category
    )))];

    const filteredApps = activeFilter === "All"
        ? initialApps
        : initialApps.filter(app => {
            const currentCat = (language === 'fr' && app.categoryFr) ? app.categoryFr : app.category;
            return currentCat === activeFilter;
        });

    const getIconForCategory = (cat: string) => {
        switch (cat.toLowerCase()) {
            case "e-commerce": return <ShoppingBag className="w-5 h-5" />;
            case "restaurant": return <Globe className="w-5 h-5" />;
            case "restauration": return <Globe className="w-5 h-5" />;
            default: return <Cpu className="w-5 h-5" />;
        }
    };

    return (
        <section className="pt-32 pb-24 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        {t.storePage.badge}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/40 leading-none"
                    >
                        {t.storePage.title} <br /><span className="text-accent/80">{t.storePage.subtitle}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 font-body text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        {t.storePage.description}
                    </motion.p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 relative z-10">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border backdrop-blur-md ${activeFilter === cat
                                ? "bg-accent/20 border-accent/50 text-accent shadow-[0_0_30px_rgba(var(--accent),0.2)]"
                                : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
                                }`}
                        >
                            {cat === "All" ? t.storePage.filters.all : cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredApps.length === 0 ? (
                    <div className="text-center py-24 text-white/40">
                        <p>{t.storePage.noResults}</p>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        <AnimatePresence>
                            {filteredApps.map((app, idx) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    key={app.id}
                                    className="group relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col"
                                >
                                    {/* Popular Badge */}
                                    {app.isPopular && (
                                        <div className="absolute top-4 left-4 z-20 bg-[#0a0a0a]/80 backdrop-blur-xl border border-accent/30 text-accent px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                            <Star size={12} fill="currentColor" /> {t.storePage.bestseller}
                                        </div>
                                    )}

                                    {/* App Preview Image Container */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/50">
                                        <Image
                                            src={app.imageUrl}
                                            alt={(language === 'fr' && app.nameFr) ? app.nameFr : app.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

                                        {/* Category Icon */}
                                        <div className="absolute bottom-4 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            {getIconForCategory(app.category)}
                                        </div>
                                    </div>

                                    {/* App Details Content */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                            {(language === 'fr' && app.nameFr) ? app.nameFr : app.name}
                                        </h3>
                                        <p className="text-white/60 text-sm mb-6 flex-1">
                                            {(language === 'fr' && app.descriptionFr) ? app.descriptionFr : app.description}
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            {((language === 'fr' && app.featuresFr) ? app.featuresFr : app.features).split(',').slice(0, 4).map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 flex-shrink-0" />
                                                    <span>{feature.trim()}</span>
                                                </div>
                                            ))}
                                            {((language === 'fr' && app.featuresFr) ? app.featuresFr : app.features).split(',').length > 4 && (
                                                <div className="text-xs text-white/40 italic pl-4">
                                                    {t.storePage.moreFeatures.replace('{count}', String(((language === 'fr' && app.featuresFr) ? app.featuresFr : app.features).split(',').length - 4))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-4 mt-auto">
                                            <div className="py-4 border-y border-white/10 flex items-center justify-between">
                                                <span className="text-xs uppercase tracking-widest text-white/50 font-mono">{t.storePage.investment}</span>
                                                <span className="text-lg font-bold text-white tracking-widest">
                                                    {(language === 'fr' && app.priceTextFr) ? app.priceTextFr : app.priceText}
                                                </span>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                {app.demoLink && (
                                                    <a
                                                        href={app.demoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-3 px-4 rounded-xl border border-white/20 text-white text-center text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                                                    >
                                                        {t.storePage.demo}
                                                    </a>
                                                )}
                                                <Link
                                                    href="/contact"
                                                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-center text-sm font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 ${app.demoLink ? 'flex-1 bg-white text-black hover:bg-white/90' : 'w-full bg-accent text-background hover:bg-accent/90'}`}
                                                >
                                                    {t.storePage.cta} <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
