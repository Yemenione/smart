import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/old_components/layout/Navbar';
import Footer from '@/Components/old_components/layout/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Index({ initialPosts }: { initialPosts: any[] }) {
    const { t, language } = useLanguage();
    const posts = initialPosts;

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return '/placeholder.png';
        if (url.startsWith('http')) return url;
        const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
        return `/storage/${cleanUrl}`;
    };

    const { siteName } = usePage().props as any;
    const docTitle = t.seo?.insights?.title || `Insights | ${siteName}`;

    return (
        <>
            <Head title={docTitle} />
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden text-white bg-[#050505]">
                {/* Minimalist Background Element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03)_0%,_transparent_50%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="text-center mb-20"
                    >
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-accent mb-6 text-white">
                            {t.insightsPage.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-accent/50 font-body max-w-2xl mx-auto leading-relaxed text-white/50">
                            {t.insightsPage.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-accent/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                            >
                                <Link href={`/insights/${post.id}`} className="block">
                                    <div className="relative h-64 w-full bg-neutral-900 overflow-hidden">
                                        {post.image_url ? (
                                            <img
                                                src={getImageUrl(post.image_url)}
                                                alt={post.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-accent/10 font-heading text-4xl">
                                                {siteName.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/40 mb-3 text-white/40">
                                            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <h3 className="text-2xl font-bold text-accent mb-4 line-clamp-2 leading-tight group-hover:text-white/80 transition-colors text-white">
                                            {language === 'fr' && post.title_fr ? post.title_fr : post.title}
                                        </h3>
                                        <p className="text-accent/50 line-clamp-3 font-body text-sm leading-relaxed mb-6 text-white/50">
                                            {language === 'fr' && post.content_fr ? post.content_fr : post.content.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                        <div className="pt-4 border-t border-white/5">
                                            <span className="text-xs uppercase tracking-widest text-accent/80 group-hover:translate-x-2 transition-transform inline-block text-white/80">
                                                Lire la suite →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                            <p className="text-accent/30 font-body text-white/30">Aucun article publié pour le moment.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
