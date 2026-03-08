"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useLanguage } from "@/context/LanguageContext";
import Skeleton from "@/Components/old_components/ui/Skeleton";

interface ProductApp {
    id: string;
    name: string;
    name_fr?: string | null;
    description: string;
    description_fr?: string | null;
    image_url: string;
    price_text: string;
    price_text_fr?: string | null;
    is_popular: boolean;
}

export default function FeaturedOffers({ initialProducts = [] }: { initialProducts?: ProductApp[] }) {
    const { t, language } = useLanguage();
    // We keep state in case we want to add dynamic filtering later
    const [products, setProducts] = useState<ProductApp[]>(initialProducts);

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return '/logo.png';
        if (url.startsWith('http')) return url;
        const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
        return `/storage/${cleanUrl}`;
    };

    if (products.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-4 md:px-12 bg-transparent relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-4 block"
                        >
                            {t.hero.eliteSolutions}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tighter"
                        >
                            {t.hero.exclusiveOffers}
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Link
                            href="/store"
                            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors font-body text-sm tracking-widest uppercase"
                        >
                            {t.common.viewStore}
                            <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={getImageUrl(product.image_url)}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                                />
                                <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    {t.common.popular}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="font-heading text-2xl text-white mb-3 font-bold">
                                    {language === 'fr' && product.name_fr ? product.name_fr : product.name}
                                </h3>
                                <p className="text-white/40 text-sm font-body line-clamp-2 mb-6">
                                    {language === 'fr' && product.description_fr ? product.description_fr : product.description}
                                </p>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-white font-mono text-sm tracking-tighter">
                                        {language === 'fr' && product.price_text_fr ? product.price_text_fr : product.price_text}
                                    </span>
                                    <Link
                                        href="/store"
                                        className="text-[10px] font-mono tracking-widest uppercase text-white/60 hover:text-white transition-colors"
                                    >
                                        {t.common.details} →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
