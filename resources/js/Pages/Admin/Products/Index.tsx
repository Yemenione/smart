import { useState } from "react";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface ProductApp {
    id: string;
    name: string;
    name_fr?: string | null;
    category: string;
    category_fr?: string | null;
    description: string;
    description_fr?: string | null;
    features: string;
    features_fr?: string | null;
    price_text: string;
    price_text_fr?: string | null;
    image_url: string;
    demo_link?: string;
    is_popular: boolean;
    order: number;
}

interface Props {
    apps: ProductApp[];
}

export default function AppsAdminPage({ apps = [] }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentAppId, setCurrentAppId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [nameFr, setNameFr] = useState("");
    const [category, setCategory] = useState("E-Commerce");
    const [categoryFr, setCategoryFr] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionFr, setDescriptionFr] = useState("");
    const [features, setFeatures] = useState(""); // comma separated
    const [featuresFr, setFeaturesFr] = useState("");
    const [priceText, setPriceText] = useState("");
    const [priceTextFr, setPriceTextFr] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [isPopular, setIsPopular] = useState(false);
    const [order, setOrder] = useState<number>(0);

    const categories = ["E-Commerce", "Restaurant", "Corporate", "SaaS", "Custom"];

    const resetForm = () => {
        setIsEditing(false);
        setCurrentAppId(null);
        setName("");
        setNameFr("");
        setCategory("E-Commerce");
        setCategoryFr("");
        setDescription("");
        setDescriptionFr("");
        setFeatures("");
        setFeaturesFr("");
        setPriceText("");
        setPriceTextFr("");
        setImageUrl("");
        setDemoLink("");
        setIsPopular(false);
        setOrder(0);
    };

    const handleEdit = (app: ProductApp) => {
        setIsEditing(true);
        setCurrentAppId(app.id);
        setName(app.name);
        setNameFr(app.name_fr || "");
        setCategory(app.category);
        setCategoryFr(app.category_fr || "");
        setDescription(app.description);
        setDescriptionFr(app.description_fr || "");
        setFeatures(app.features);
        setFeaturesFr(app.features_fr || "");
        setPriceText(app.price_text);
        setPriceTextFr(app.price_text_fr || "");
        setImageUrl(app.image_url);
        setDemoLink(app.demo_link || "");
        setIsPopular(app.is_popular);
        setOrder(app.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (!window.confirm("Are you sure you want to delete this specific application?")) return;

        setIsLoading(true);
        router.delete(`/admin/products/${id}`, {
            onFinish: () => setIsLoading(false),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const appData = {
            name, nameFr,
            category, categoryFr,
            description, descriptionFr,
            features, featuresFr,
            priceText, priceTextFr,
            imageUrl, demoLink, isPopular, order
        };

        if (isEditing && currentAppId) {
            router.put(`/admin/products/${currentAppId}`, appData, {
                onSuccess: () => resetForm(),
                onFinish: () => setIsSaving(false),
            });
        } else {
            router.post("/admin/products", appData, {
                onSuccess: () => resetForm(),
                onFinish: () => setIsSaving(false),
            });
        }
    };

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return '/placeholder.png';
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

    const PlusIcon = Plus as React.ElementType;
    const EditIcon = Edit2 as React.ElementType;
    const TrashIcon = Trash2 as React.ElementType;
    const StarIcon = Star as React.ElementType;

    return (
        <AdminLayout>
            <Head title="Boutique SaaS | Admin" />
            <div className="p-8 max-w-7xl mx-auto space-y-12">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-accent mb-2">Écosystème d'Applications SaaS</h1>
                    <p className="text-accent/60">Gérez vos packages de type Shopify, vos applications de restauration et vos déploiements en entreprise.</p>
                </div>

                {/* Form Section */}
                <div className="bg-surface border border-border/10 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            {isEditing ? <EditIcon size={20} /> : <PlusIcon size={20} />}
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
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Nom (EN) *</label>
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
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Nom (FR)</label>
                                        <input
                                            type="text"
                                            value={nameFr}
                                            onChange={(e) => setNameFr(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                            placeholder="ex: E-Commerce Élite (FR)"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Catégorie (EN) *</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50 appearance-none"
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Catégorie (FR)</label>
                                        <input
                                            type="text"
                                            value={categoryFr}
                                            onChange={(e) => setCategoryFr(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                            placeholder="ex: Restauration"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Description (EN) *</label>
                                        <textarea
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50 resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Description (FR)</label>
                                        <textarea
                                            value={descriptionFr}
                                            onChange={(e) => setDescriptionFr(e.target.value)}
                                            rows={3}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50 resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Fonctionnalités (EN) *</label>
                                        <input
                                            type="text"
                                            required
                                            value={features}
                                            onChange={(e) => setFeatures(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Fonctionnalités (FR)</label>
                                        <input
                                            type="text"
                                            value={featuresFr}
                                            onChange={(e) => setFeaturesFr(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Prix (EN) *</label>
                                        <input
                                            type="text"
                                            required
                                            value={priceText}
                                            onChange={(e) => setPriceText(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-accent/80 mb-2">Prix (FR)</label>
                                        <input
                                            type="text"
                                            value={priceTextFr}
                                            onChange={(e) => setPriceTextFr(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-accent/80 mb-2">URL Démo</label>
                                        <input
                                            type="url"
                                            value={demoLink}
                                            onChange={(e) => setDemoLink(e.target.value)}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/50"
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
                                                <img src={getImageUrl(imageUrl)} alt="Preview" className="object-cover rounded-xl absolute inset-0 w-full h-full" />
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
                    {isLoading && (
                        <div className="h-1 bg-white/20 overflow-hidden relative rounded-full">
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/50 animate-pulse"></div>
                        </div>
                    )}
                    {apps && apps.length === 0 ? (
                        <div className="bg-surface border border-border/10 rounded-2xl p-12 text-center">
                            <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-4 text-accent/50">
                                <PlusIcon size={32} />
                            </div>
                            <p className="text-accent/80 font-medium">Votre boutique d'applications SaaS est vide.</p>
                            <p className="text-accent/50 text-sm mt-1">Déployez votre premier package E-Commerce ou Restaurant ci-dessus.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {apps && apps.map(app => (
                                <div key={app.id} className="group bg-surface border border-border/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                                    <div className="relative h-48 w-full bg-black/20">
                                        <img src={getImageUrl(app.image_url)} alt={app.name} className="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                                {app.category}
                                            </span>
                                            {app.is_popular && (
                                                <span className="bg-green-500/20 border border-green-500/30 text-green-400 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                                    <StarIcon size={10} fill="currentColor" /> Popular
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="font-heading font-bold text-white text-xl mb-1">{app.name}</h3>
                                            <div className="text-accent font-mono text-sm font-bold">{app.price_text}</div>
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
                                                <EditIcon size={14} /> Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                disabled={isLoading}
                                                className="text-sm font-medium text-red-500/80 hover:text-red-500 transition-colors flex items-center gap-2"
                                            >
                                                <TrashIcon size={14} /> Supprimer
                                            </button>
                                        </div>
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
