"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, ArrowLeft, Globe, FileText, ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import Link from "next/link";

export default function PostEditor() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id;
    const isNew = postId === "new";

    const [post, setPost] = useState({
        title: "",
        titleFr: "",
        content: "",
        contentFr: "",
        imageUrl: "",
        published: false,
    });
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/posts/${postId}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Poste non trouvé");
                    return res.json();
                })
                .then((data) => {
                    setPost({
                        title: data.title || "",
                        titleFr: data.titleFr || "",
                        content: data.content || "",
                        contentFr: data.contentFr || "",
                        imageUrl: data.imageUrl || "",
                        published: data.published || false,
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Impossible de charger le poste.");
                    setIsLoading(false);
                });
        }
    }, [postId, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        try {
            const url = isNew ? "/api/posts" : `/api/posts/${postId}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Erreur lors de la sauvegarde");
            }

            router.push("/admin/posts");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue");
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-accent/50" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-6xl pb-24">
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/admin/posts"
                    className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent/60 hover:text-accent"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isNew ? "Créer un Poste" : "Modifier le Poste"}
                    </h1>
                    <p className="text-accent/60">
                        {isNew ? "Rédigez un nouvel article bilingue." : "Mettez à jour le contenu (EN/FR)."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Titles Section (Bilingual) */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                <Globe className="w-5 h-5" /> Titres (Bilingue)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                        Titre (Anglais) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={post.title}
                                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30"
                                        placeholder="Headline in English"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                        Titre (Français)
                                    </label>
                                    <input
                                        type="text"
                                        value={post.titleFr}
                                        onChange={(e) => setPost({ ...post, titleFr: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30"
                                        placeholder="Titre en Français"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Area (Bilingual) */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                <FileText className="w-5 h-5" /> Contenu (EN/FR)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* English Content */}
                                <div className="space-y-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">
                                        Content (Anglais) <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={18}
                                        value={post.content}
                                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30 font-mono text-sm leading-relaxed"
                                        placeholder="Body in English..."
                                    />
                                </div>

                                {/* French Content */}
                                <div className="space-y-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">
                                        Contenu (Français)
                                    </label>
                                    <textarea
                                        rows={18}
                                        value={post.contentFr}
                                        onChange={(e) => setPost({ ...post, contentFr: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent/80 focus:outline-none focus:border-border/30 font-mono text-sm leading-relaxed"
                                        placeholder="Contenu en Français..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">

                        {/* Status/Actions */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4 sticky top-6">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex w-full justify-center items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors disabled:opacity-50 uppercase tracking-widest text-sm"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {isNew ? "Publier" : "Sauvegarder"}
                            </button>

                            <div className="pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={post.published}
                                            onChange={(e) => setPost({ ...post, published: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-accent/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent/90"></div>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-accent/50 group-hover:text-accent transition-colors">
                                        {post.published ? "En Ligne" : "Brouillon"}
                                    </span>
                                </label>
                            </div>

                            {error && <p className="text-red-400 text-xs text-center font-mono mt-2">{error}</p>}
                        </div>

                        {/* Media */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4">
                            <label className="block text-xs uppercase tracking-widest text-accent/50 mb-3 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> Image de Couverture
                            </label>
                            <ImageUpload
                                label="Cover"
                                value={post.imageUrl}
                                onChange={(url) => setPost({ ...post, imageUrl: url })}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
