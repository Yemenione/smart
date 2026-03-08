import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/old_components/layout/Navbar';
import Footer from '@/Components/old_components/layout/Footer';
import { motion } from 'framer-motion';
import ReadingProgress from '@/Components/old_components/ui/ReadingProgress';
import ShareWidget from '@/Components/old_components/ui/ShareWidget';
import { useLanguage } from '@/context/LanguageContext';

export default function Show({ initialPost }: { initialPost: any }) {
    const { t, language } = useLanguage();
    const post = initialPost;

    const getImageUrl = (imagePath: string | null | undefined) => {
        if (!imagePath) return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
        if (imagePath.startsWith("http")) return imagePath;
        const STORAGE_URL = "/storage";
        return `${STORAGE_URL}/${imagePath}`;
    };

    if (!post) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Article Not Found</div>;
    }

    const { siteName } = usePage().props as any;
    const docTitle = `${post.title} | ${siteName}`;

    return (
        <>
            <Head title={docTitle} />
            <ReadingProgress />
            <Navbar />
            <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
                <article className="max-w-4xl mx-auto px-4 md:px-8 mt-16">

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter leading-tight mb-8"
                        >
                            {post.title}
                        </motion.h1>

                        <div className="flex items-center justify-center gap-4 text-sm text-white/50 font-mono hidden md:flex">
                            {post.author && <span>By {post.author.name}</span>}
                            <span>•</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </header>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16"
                    >
                        <img
                            src={getImageUrl(post.image_url)}
                            alt={post.title}
                            className="object-cover w-full h-full"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        {/* Sidebar */}
                        <div className="md:col-span-3 order-2 md:order-1 hidden md:block">
                            <div className="sticky top-32">
                                <ShareWidget
                                    title={post.title}
                                    description={post.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}
                                    urlPath={`/insights/${post.id}`}
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-9 order-1 md:order-2">
                            <div
                                className="prose prose-invert prose-lg max-w-none 
                                prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tight
                                prose-p:font-body prose-p:leading-relaxed prose-p:text-white/80
                                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Mobile Share Widget */}
                            <div className="md:hidden mt-12 pt-8 border-t border-white/10">
                                <ShareWidget
                                    title={post.title}
                                    description={post.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}
                                    urlPath={`/insights/${post.id}`}
                                />
                            </div>

                            <Link href="/insights" className="inline-block mt-16 px-6 py-3 rounded-full border border-white/20 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                ← Back to Insights
                            </Link>
                        </div>
                    </div>

                </article>
            </main>
            <Footer />
        </>
    );
}
