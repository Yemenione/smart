"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

export default function HeroAdminPage() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentSlideId, setCurrentSlideId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [subtitle, subtitleSet] = useState(""); // workaround name shadowing
    const [price, setPrice] = useState("");
    const [ctaText, setCtaText] = useState("");
    const [ctaLink, setCtaLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [order, setOrder] = useState<number>(0);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch("/api/hero");
            if (res.ok) {
                const data = await res.json();
                setSlides(data);
            }
        } catch (error) {
            console.error("Failed to fetch slides", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentSlideId(null);
        setTitle("");
        subtitleSet("");
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
        subtitleSet(slide.subtitle);
        setPrice(slide.price || "");
        setCtaText(slide.ctaText || "");
        setCtaLink(slide.ctaLink || "");
        setImageUrl(slide.imageUrl);
        setOrder(slide.order);

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette diapositive ?")) return;

        try {
            const res = await fetch(`/api/hero/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchSlides();
            } else {
                alert("Échec de la suppression de la diapositive");
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const slideData = { title, subtitle: subtitle, price, ctaText, ctaLink, imageUrl, order };

        try {
            const url = isEditing ? `/api/hero/${currentSlideId}` : "/api/hero";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(slideData),
            });

            if (res.ok) {
                fetchSlides();
                resetForm();
            } else {
                const error = await res.json();
                alert(`Erreur: ${error.error || "Échec de l'enregistrement de la diapositive"}`);
            }
        } catch (error) {
            console.error("Save Error:", error);
            alert("Une erreur inattendue est survenue lors de l'enregistrement.");
        } finally {
            setIsSaving(false);
        }
    };

    // Handle Image Upload
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
                setImageUrl(data.url);
            } else {
                throw new Error(data.error || "Échec du téléchargement");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Échec du téléchargement de l'image. Veuillez réessayer.");
        }
    };

    if (isLoading) return <div className="p-8 text-accent animate-pulse">Chargement des diapositives Hero...</div>;

    return (
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
                                    onChange={(e) => subtitleSet(e.target.value)}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="Offre exclusive entreprise"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Prix ou Highlight (Optionnel)</label>
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
                                        <Image
                                            src={imageUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover rounded-xl"
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
                                    <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
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
                                        {slide.ctaText && (
                                            <div className="bg-accent text-background text-[8px] font-bold px-2 py-0.5 rounded shadow-lg">
                                                {slide.ctaText}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between bg-surface/50">
                                    <button
                                        onClick={() => handleEdit(slide)}
                                        className="text-sm font-medium text-accent hover:underline"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(slide.id)}
                                        className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
