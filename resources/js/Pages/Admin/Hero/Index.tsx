import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    price?: string;
    cta_text?: string;
    cta_link?: string;
    image_url: string;
    order: number;
}

interface Props {
    slides: HeroSlide[];
}

export default function HeroAdminPage({ slides = [] }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentSlideId, setCurrentSlideId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [price, setPrice] = useState("");
    const [ctaText, setCtaText] = useState("");
    const [ctaLink, setCtaLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [order, setOrder] = useState<number>(0);

    const resetForm = () => {
        setIsEditing(false);
        setCurrentSlideId(null);
        setTitle("");
        setSubtitle("");
        setPrice("");
        setCtaText("");
        setCtaLink("");
        setImageUrl("");
        setOrder(0);
    };

    const handleEdit = (slide: HeroSlide) => {
        setIsEditing(true);
        setCurrentSlideId(slide.id);
        setTitle(slide.title);
        setSubtitle(slide.subtitle);
        setPrice(slide.price || "");
        setCtaText(slide.cta_text || "");
        setCtaLink(slide.cta_link || "");
        setImageUrl(slide.image_url);
        setOrder(slide.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette diapositive ?")) return;

        setIsLoading(true);
        router.delete(`/admin/hero/${id}`, {
            onFinish: () => setIsLoading(false),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const slideData = { title, subtitle, price, ctaText, ctaLink, imageUrl, order };

        if (isEditing && currentSlideId) {
            router.put(`/admin/hero/${currentSlideId}`, slideData, {
                onSuccess: () => resetForm(),
                onFinish: () => setIsSaving(false),
            });
        } else {
            router.post("/admin/hero", slideData, {
                onSuccess: () => resetForm(),
                onFinish: () => setIsSaving(false),
            });
        }
    };

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
        return `/storage/${cleanUrl}`;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                // Store the relative path, not the full URL
                setImageUrl(data.path);
            } else {
                throw new Error(data.error || "Échec du téléchargement");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Échec du téléchargement de l'image. Veuillez réessayer.");
        }
    };

    const PlusIcon = Plus as any;
    const EditIcon = Edit2 as any;
    const TrashIcon = Trash2 as any;

    return (
        <AdminLayout>
            <Head title="Admin | Bannières Hero" />
            <div className="p-8 max-w-6xl mx-auto space-y-12">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-accent mb-2">Bannières Hero Marketing</h1>
                    <p className="text-accent/60">Gérez le slider promotionnel de votre page d'accueil.</p>
                </div>

                {/* Form Section */}
                <div className="bg-surface border border-border/10 rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-heading font-semibold text-accent mb-6">
                        {isEditing ? "Modifier la Diapositive" : "Créer une Nouvelle Diapositive"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Titre Principal *</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder="Ex: Créez votre site avec nous"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Sous-titre / Badge *</label>
                                    <input
                                        type="text"
                                        required
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder="Offre exclusive entreprise"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Prix أو Highlight (Optionnel)</label>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder="Ex: 80€"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Texte du bouton CTA</label>
                                        <input
                                            type="text"
                                            value={ctaText}
                                            onChange={(e) => setCtaText(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                            placeholder="Commander maintenant"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Lien du bouton CTA</label>
                                        <input
                                            type="text"
                                            value={ctaLink}
                                            onChange={(e) => setCtaLink(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                            placeholder="/contact"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Ordre d'affichage (0 est le premier)</label>
                                    <input
                                        type="number"
                                        value={order}
                                        onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                    />
                                </div>
                            </div>

                            {/* Image Upload Area */}
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Image de Fond de la Diapositive *</label>
                                <div className="border-2 border-dashed border-border/20 rounded-xl p-8 flex flex-col items-center justify-center relative bg-surface/30 h-[280px]">
                                    {imageUrl ? (
                                        <>
                                            <img
                                                src={getImageUrl(imageUrl) || ""}
                                                alt="Preview"
                                                className="object-cover rounded-xl absolute inset-0 w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                                <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg text-sm font-medium">
                                                    Changer l'Image
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="cursor-pointer flex flex-col items-center space-y-3 text-accent/60 hover:text-accent transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center">
                                                <span className="text-2xl">+</span>
                                            </div>
                                            <span className="text-sm font-medium">Télécharger une Image</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-border/10">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2.5 rounded-lg border border-border/20 text-accent hover:bg-surface/80 transition-colors"
                                >
                                    Annuler
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isSaving || !imageUrl}
                                className="bg-accent text-background px-8 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? "Enregistrement..." : (isEditing ? "Mettre à jour" : "Créer la Diapositive")}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-heading font-semibold text-accent">Diapositives Actives</h2>
                    {slides.length === 0 ? (
                        <div className="bg-surface border border-border/10 rounded-2xl p-8 text-center text-accent/60">
                            Aucune diapositive créée pour le moment. Ajoutez votre première bannière ci-dessus !
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {slides.map(slide => (
                                <div key={slide.id} className="group bg-surface border border-border/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors">
                                    <div className="relative h-48 w-full">
                                        <img src={getImageUrl(slide.image_url) || ""} alt={slide.title} className="object-cover absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-xs text-accent/80 mb-1">{slide.subtitle}</div>
                                            <div className="font-bold text-white text-lg truncate">{slide.title}</div>
                                            {slide.price && <div className="text-green-400 font-mono text-xs mt-1">{slide.price}</div>}
                                        </div>
                                        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                            <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-tighter">
                                                Ordre: {slide.order}
                                            </div>
                                            {slide.cta_text && (
                                                <div className="bg-accent text-background text-[8px] font-bold px-2 py-0.5 rounded shadow-lg">
                                                    {slide.cta_text}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between bg-surface/50">
                                        <button
                                            onClick={() => handleEdit(slide)}
                                            className="text-sm font-medium text-accent hover:underline flex items-center gap-1"
                                        >
                                            <EditIcon size={14} /> Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slide.id)}
                                            className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
                                        >
                                            <TrashIcon size={14} /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
