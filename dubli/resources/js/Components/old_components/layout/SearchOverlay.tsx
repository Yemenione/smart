"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { useLanguage } from "@/context/LanguageContext";
import { PostData, ProjectData, getPosts, getProjects } from "@/lib/api";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const { t, language } = useLanguage();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ posts: PostData[]; projects: ProjectData[] }>({ posts: [], projects: [] });
    const [allData, setAllData] = useState<{ posts: PostData[]; projects: ProjectData[] }>({ posts: [], projects: [] });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
            fetchData();
        } else {
            document.body.style.overflow = "auto";
            setQuery("");
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
            setAllData({ posts, projects });
        } catch (error) {
            console.error("Search data fetch failed", error);
        }
    };

    useEffect(() => {
        if (!query.trim()) {
            setResults({ posts: [], projects: [] });
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filteredPosts = allData.posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            (post.titleFr?.toLowerCase().includes(lowerQuery)) ||
            post.content.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        const filteredProjects = allData.projects.filter(project =>
            project.title.toLowerCase().includes(lowerQuery) ||
            (project.titleFr?.toLowerCase().includes(lowerQuery)) ||
            project.client.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        setResults({ posts: filteredPosts, projects: filteredProjects });
    }, [query, allData]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 md:p-10">
                        <span className="font-heading text-xl font-bold tracking-tighter text-white/40">{t.search.title}</span>
                        <button
                            onClick={onClose}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Search Input Area */}
                    <div className="flex-1 overflow-y-auto px-6 md:px-20 pb-20">
                        <div className="max-w-5xl mx-auto pt-10 md:pt-20">
                            <div className="relative mb-12">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={40} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={t.search.placeholder}
                                    className="w-full bg-transparent border-b-2 border-white/10 py-6 pl-16 text-3xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tighter text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/5"
                                />
                            </div>

                            {/* Results Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {/* Projects Results */}
                                <div>
                                    <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-accent mb-8">{t.search.projects}</h3>
                                    <div className="space-y-6">
                                        {results.projects.length > 0 ? results.projects.map(project => (
                                            <Link
                                                key={project.id}
                                                href={`/work/${project.slug}`}
                                                onClick={onClose}
                                                className="group block"
                                            >
                                                <div className="flex items-center justify-between py-4 border-b border-white/5 group-hover:border-white/20 transition-colors">
                                                    <div>
                                                        <p className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                                            {language === 'fr' && project.titleFr ? project.titleFr : project.title}
                                                        </p>
                                                        <p className="text-sm text-white/40">{project.client}</p>
                                                    </div>
                                                    <ArrowRight size={20} className="text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                                                </div>
                                            </Link>
                                        )) : query.trim() ? (
                                            <p className="text-white/20 italic">{t.search.noProjects}</p>
                                        ) : (
                                            <div className="space-y-4 text-white/30">
                                                <p className="hover:text-white transition-colors cursor-pointer" onClick={() => setQuery("E-Commerce")}>→ E-Commerce</p>
                                                <p className="hover:text-white transition-colors cursor-pointer" onClick={() => setQuery("Branding")}>→ Branding</p>
                                                <p className="hover:text-white transition-colors cursor-pointer" onClick={() => setQuery("Next.js")}>→ Next.js</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Posts Results */}
                                <div>
                                    <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-accent mb-8">{t.search.insights}</h3>
                                    <div className="space-y-6">
                                        {results.posts.length > 0 ? results.posts.map(post => (
                                            <Link
                                                key={post.id}
                                                href={`/insights/${post.id}`}
                                                onClick={onClose}
                                                className="group block"
                                            >
                                                <div className="flex items-center justify-between py-4 border-b border-white/5 group-hover:border-white/20 transition-colors">
                                                    <div>
                                                        <p className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                                            {language === 'fr' && post.titleFr ? post.titleFr : post.title}
                                                        </p>
                                                        <p className="text-sm text-white/40">{new Date(post.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <ArrowRight size={20} className="text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                                                </div>
                                            </Link>
                                        )) : query.trim() ? (
                                            <p className="text-white/20 italic">{t.search.noPosts}</p>
                                        ) : (
                                            <div className="space-y-4 text-white/30">
                                                <p className="hover:text-white transition-colors cursor-pointer" onClick={() => setQuery("Design")}>→ Design</p>
                                                <p className="hover:text-white transition-colors cursor-pointer" onClick={() => setQuery("Innovation")}>→ Innovation</p>
                                                <p className="hover:text-white transition-colors cursor-pointer" onClick={() => setQuery("Future")}>→ Future</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
