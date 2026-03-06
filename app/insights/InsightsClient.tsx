"use client";

import { useState, useEffect } from "react";
import { getPosts, PostData } from "@/lib/api";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Skeleton from "@/components/ui/Skeleton";

export default function InsightsClient() {
    const { t, language } = useLanguage();
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data.filter(p => p.published));
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
                {/* Minimalist Background Element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03)_0%,_transparent_50%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="text-center mb-20"
                    >
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-accent mb-6">
                            {t.insightsPage.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-accent/50 font-body max-w-2xl mx-auto leading-relaxed">
                            {t.insightsPage.subtitle}
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <Skeleton key={i} className="h-[500px] rounded-3xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-accent/5 border border-border/10 rounded-3xl overflow-hidden hover:border-border/20 transition-all duration-500"
                                >
                                    <div className="relative h-64 w-full bg-neutral-900">
                                        {post.imageUrl ? (
                                            <Image
                                                src={post.imageUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-accent/10 font-heading text-4xl">
                                                DEULEUX
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/40 mb-3">
                                            {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <h3 className="text-2xl font-bold text-accent mb-4 line-clamp-2 leading-tight group-hover:text-accent/80 transition-colors">
                                            {language === 'fr' && post.titleFr ? post.titleFr : post.title}
                                        </h3>
                                        <p className="text-accent/50 line-clamp-3 font-body text-sm leading-relaxed mb-6">
                                            {language === 'fr' && post.contentFr ? post.contentFr : post.content}
                                        </p>
                                        <div className="pt-4 border-t border-border/5">
                                            <span className="text-xs uppercase tracking-widest text-accent/80 group-hover:translate-x-2 transition-transform inline-block">
                                                Lire la suite →
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!isLoading && posts.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-border/10 rounded-3xl bg-white/[0.02]">
                            <p className="text-accent/30 font-body">Aucun article publié pour le moment.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
