"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Star } from "lucide-react";

interface ProductApp {
    id: string;
    name: string;
    category: string;
    description: string;
    features: string;
    priceText: string;
    imageUrl: string;
    demoLink?: string;
    isPopular: boolean;
    order: number;
}

export default function AppsAdminPage() {
    const [apps, setApps] = useState<ProductApp[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentAppId, setCurrentAppId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("E-Commerce");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState(""); // comma separated
    const [priceText, setPriceText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [isPopular, setIsPopular] = useState(false);
    const [order, setOrder] = useState<number>(0);

    const categories = ["E-Commerce", "Restaurant", "Corporate", "SaaS", "Custom"];

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            const res = await fetch("/api/products");
            if (res.ok) {
                const data = await res.json();
                setApps(data);
            }
        } catch (error) {
            console.error("Failed to fetch apps", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentAppId(null);
        setName("");
        setCategory("E-Commerce");
        setDescription("");
        setFeatures("");
        setPriceText("");
        setImageUrl("");
        setDemoLink("");
        setIsPopular(false);
        setOrder(0);
    };

    const handleEdit = (app: ProductApp) => {
        setIsEditing(true);
        setCurrentAppId(app.id);
        setName(app.name);
        setCategory(app.category);
        setDescription(app.description);
        setFeatures(app.features);
        setPriceText(app.priceText);
        setImageUrl(app.imageUrl);
        setDemoLink(app.demoLink || "");
        setIsPopular(app.isPopular);
        setOrder(app.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this specific application?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchApps();
            } else {
                alert("Failed to delete the application");
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const appData = { name, category, description, features, priceText, imageUrl, demoLink, isPopular, order };

        try {
            const url = isEditing ? `/api/products/${currentAppId}` : "/api/products";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appData),
            });

            if (res.ok) {
                fetchApps();
                resetForm();
            } else {
                const error = await res.json();
                alert(`Error: ${error.error || "Failed to save application"}`);
            }
        } catch (error) {
            console.error("Save Error:", error);
            alert("An unexpected error occurred while saving.");
        } finally {
            setIsSaving(false);
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
                setImageUrl(data.url);
            } else {
                throw new Error(data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image. Please try again.");
        }
    };

    if (isLoading) return <div className="p-8 text-accent animate-pulse">Loading SaaS Ecosystem...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-heading font-bold text-accent mb-2">Écosystème d'Applications SaaS</h1>
                <p className="text-accent/60">Gérez vos packages de type Shopify, vos applications de restauration et vos déploiements en entreprise.</p>
            </div>

            {/* Form Section */}
            <div className="bg-surface border border-border/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        {isEditing ? <Edit2 size={20} /> : <Plus size={20} />}
                    </div>
                    <h2 className="text-xl font-heading font-semibold text-accent">
                        {isEditing ? "Modifier le Package d'Application" : "Déployer un Nouveau Package"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Column: Details */}
                        <div className="md:col-span-8 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Nom de l'Application *</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder="ex: E-Commerce Élite"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Catégorie *</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50 appearance-none"
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Argumentaire de Vente (Description) *</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50 resize-none"
                                    placeholder="Convainquez vos clients pourquoi ce package est le meilleur du marché."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Fonctionnalités Clés (Séparées par des virgules) *</label>
                                <input
                                    type="text"
                                    required
                                    value={features}
                                    onChange={(e) => setFeatures(e.target.value)}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="ex: Paiements Stripe, App Mobile, Domaine Offert, SEO"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">Structure de Prix *</label>
                                    <input
                                        type="text"
                                        required
                                        value={priceText}
                                        onChange={(e) => setPriceText(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder="ex: 150€ / mois + 1000€ de frais de mise en service"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">URL de Démo Live (Optionnel)</label>
                                    <input
                                        type="url"
                                        value={demoLink}
                                        onChange={(e) => setDemoLink(e.target.value)}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder="https://demo.vostresite.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Visuals & Meta */}
                        <div className="md:col-span-4 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">App Preview Mockup *</label>
                                <div className="border-2 border-dashed border-border/20 rounded-xl p-4 flex flex-col items-center justify-center relative bg-surface/30 h-[220px]">
                                    {imageUrl ? (
                                        <>
                                            <Image src={imageUrl} alt="Preview" fill className="object-cover rounded-xl" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                                <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg text-sm font-medium">
                                                    Replace Mockup
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="cursor-pointer flex flex-col items-center space-y-2 text-accent/60 hover:text-accent transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center">
                                                <span className="text-xl">+</span>
                                            </div>
                                            <span className="text-sm font-medium">Upload Mockup</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-4 border border-border/10 rounded-lg bg-surface/50 cursor-pointer hover:border-accent/30 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={isPopular}
                                    onChange={(e) => setIsPopular(e.target.checked)}
                                    className="w-5 h-5 rounded border-border/30 text-accent focus:ring-accent bg-transparent"
                                />
                                <div>
                                    <p className="text-sm font-medium text-accent">Marquer comme 'Le Plus Populaire'</p>
                                    <p className="text-xs text-accent/60">Met en avant ce package dans la boutique.</p>
                                </div>
                            </label>

                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Ordre d'Affichage</label>
                                <input
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-border/10">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 rounded-xl border border-border/20 text-accent hover:bg-surface/80 transition-colors font-medium"
                            >
                                Annuler
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSaving || !imageUrl}
                            className="bg-accent text-background px-8 py-3 rounded-xl font-bold hover:bg-accent/90 transition-transform active:scale-95 disabled:opacity-50"
                        >
                            {isSaving ? "Déploiement..." : (isEditing ? "Mettre à jour" : "Déployer le Package")}
                        </button>
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold text-accent">Inventaire Boutique</h2>
                {apps.length === 0 ? (
                    <div className="bg-surface border border-border/10 rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-4 text-accent/50">
                            <Plus size={32} />
                        </div>
                        <p className="text-accent/80 font-medium">Votre boutique d'applications SaaS est vide.</p>
                        <p className="text-accent/50 text-sm mt-1">Déployez votre premier package E-Commerce ou Restaurant ci-dessus.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {apps.map(app => (
                            <div key={app.id} className="group bg-surface border border-border/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                                <div className="relative h-48 w-full bg-black/20">
                                    <Image src={app.imageUrl} alt={app.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            {app.category}
                                        </span>
                                        {app.isPopular && (
                                            <span className="bg-green-500/20 border border-green-500/30 text-green-400 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                                <Star size={10} fill="currentColor" /> Popular
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="font-heading font-bold text-white text-xl mb-1">{app.name}</h3>
                                        <div className="text-accent font-mono text-sm font-bold">{app.priceText}</div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <p className="text-accent/60 text-sm mb-4 line-clamp-2">{app.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {app.features.split(',').slice(0, 3).map((f, i) => (
                                            <span key={i} className="text-[10px] text-accent/50 border border-border/10 px-2 py-1 rounded-md whitespace-nowrap">
                                                {f.trim()}
                                            </span>
                                        ))}
                                        {app.features.split(',').length > 3 && (
                                            <span className="text-[10px] text-accent/30 px-2 py-1">+{app.features.split(',').length - 3}</span>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/5">
                                        <button
                                            onClick={() => handleEdit(app)}
                                            className="text-sm font-medium text-accent hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <Edit2 size={14} /> Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(app.id)}
                                            className="text-sm font-medium text-red-500/80 hover:text-red-500 transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 size={14} /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
