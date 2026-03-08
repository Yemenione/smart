import { useState } from "react";
import { Save, Loader2, ArrowLeft, Globe, FileText, ImageIcon } from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface PostData {
    id?: string;
    title: string;
    title_fr?: string;
    content: string;
    content_fr?: string;
    image_url?: string;
    published: boolean;
    category_id?: string;
}

interface Category {
    id: string;
    name: string;
}

interface Props {
    post: PostData | null;
    categories: Category[];
}

export default function PostForm({ post: initialPost, categories = [] }: Props) {
    const isNew = !initialPost;

    const [post, setPost] = useState({
        title: initialPost?.title || "",
        titleFr: initialPost?.title_fr || "",
        content: initialPost?.content || "",
        contentFr: initialPost?.content_fr || "",
        imageUrl: initialPost?.image_url || "",
        published: initialPost?.published ?? false,
        categoryId: initialPost?.category_id || "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        if (isNew) {
            router.post("/admin/posts", post, {
                onError: () => {
                    setError("Erreur lors de la création.");
                    setIsSaving(false);
                },
                onFinish: () => setIsSaving(false),
            });
        } else {
            router.put(`/admin/posts/${initialPost.id}`, post, {
                onError: () => {
                    setError("Erreur lors de la modification.");
                    setIsSaving(false);
                },
                onFinish: () => setIsSaving(false),
            });
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (res.ok) {
                setPost({ ...post, imageUrl: data.url });
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            alert("Échec du téléchargement.");
        }
    };

    const ArrowLeftIcon = ArrowLeft as any;
    const GlobeIcon = Globe as any;
    const FileTextIcon = FileText as any;
    const ImageIconComp = ImageIcon as any;
    const SaveIcon = Save as any;
    const LoaderIcon = Loader2 as any;

    return (
        <AdminLayout>
            <Head title={isNew ? "Créer un Poste" : "Modifier le Poste"} />
            <div className="space-y-6 max-w-6xl pb-24 mx-auto">
                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href="/admin/posts"
                        className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent/60 hover:text-accent"
                    >
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-accent">
                            {isNew ? "Créer un Poste" : "Modifier le Poste"}
                        </h1>
                        <p className="text-accent/60 text-sm">
                            {isNew ? "Rédigez un nouvel article bilingue." : "Mettez à jour le contenu (EN/FR)."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title Section */}
                            <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4">
                                <h2 className="text-lg font-bold text-accent flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                    <GlobeIcon size={20} /> Titres (Bilingue)
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                            Titre (EN) <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={post.title}
                                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Headline in English"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                            Titre (FR)
                                        </label>
                                        <input
                                            type="text"
                                            value={post.titleFr}
                                            onChange={(e) => setPost({ ...post, titleFr: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Titre en Français"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                                <h2 className="text-lg font-bold text-accent flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                    <FileTextIcon size={20} /> Contenu (EN/FR)
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">Contenu (EN) *</label>
                                        <textarea required rows={18} value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30 font-mono text-sm leading-relaxed" placeholder="Body in English..." />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">Contenu (FR)</label>
                                        <textarea rows={18} value={post.contentFr} onChange={(e) => setPost({ ...post, contentFr: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30 font-mono text-sm leading-relaxed" placeholder="Contenu en Français..." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4 sticky top-6">
                                <button type="submit" disabled={isSaving} className="flex w-full justify-center items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors disabled:opacity-50 uppercase tracking-widest text-sm">
                                    {isSaving ? <LoaderIcon size={20} className="animate-spin" /> : <SaveIcon size={20} />}
                                    {isNew ? "Publier" : "Enregistrer"}
                                </button>

                                <div className="pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" checked={post.published} onChange={(e) => setPost({ ...post, published: e.target.checked })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-accent/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent/90"></div>
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-accent/50 group-hover:text-accent transition-colors">
                                            {post.published ? "En Ligne" : "Brouillon"}
                                        </span>
                                    </label>
                                </div>

                                {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}

                                <div className="pt-4 border-t border-white/5">
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">Catégorie</label>
                                    <select value={post.categoryId} onChange={(e) => setPost({ ...post, categoryId: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30 text-sm appearance-none">
                                        <option value="">Sélectionner...</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-3 flex items-center gap-2">
                                        <ImageIconComp size={16} className="text-accent/40" /> Cover Image
                                    </label>
                                    <div className="relative h-40 border-2 border-dashed border-border/20 rounded-xl overflow-hidden bg-surface/30 flex items-center justify-center">
                                        {post.imageUrl ? (
                                            <>
                                                <img src={post.imageUrl} className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 cursor-pointer bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                                                    Changer
                                                    <input type="file" className="hidden" onChange={handleImageUpload} />
                                                </label>
                                            </>
                                        ) : (
                                            <label className="cursor-pointer text-accent/40 hover:text-accent transition-colors">
                                                <span>+ Upload Image</span>
                                                <input type="file" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
