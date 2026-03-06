"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, ArrowLeft, Calendars, User, Code, Globe, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";

export default function ProjectEditor() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const isNew = projectId === "new";

    const [project, setProject] = useState({
        title: "",
        titleFr: "",
        client: "",
        role: "",
        year: "",
        challenge: "",
        challengeFr: "",
        solution: "",
        solutionFr: "",
        techStack: "",
        coverImage: "",
        gallery: "",
        liveUrl: "",
        order: 0,
    });

    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/projects/${projectId}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Réalisation non trouvée");
                    return res.json();
                })
                .then((data) => {
                    setProject({
                        title: data.title || "",
                        titleFr: data.titleFr || "",
                        client: data.client || "",
                        role: data.role || "",
                        year: data.year || "",
                        challenge: data.challenge || "",
                        challengeFr: data.challengeFr || "",
                        solution: data.solution || "",
                        solutionFr: data.solutionFr || "",
                        techStack: data.techStack || "",
                        coverImage: data.coverImage || "",
                        gallery: data.gallery || "",
                        liveUrl: data.liveUrl || "",
                        order: data.order || 0,
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Impossible de charger la réalisation.");
                    setIsLoading(false);
                });
        }
    }, [projectId, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        try {
            const url = isNew ? "/api/projects" : `/api/projects/${projectId}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Erreur lors de la sauvegarde");
            }

            router.push("/admin/projects");
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
                    href="/admin/projects"
                    className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent/60 hover:text-accent"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isNew ? "Nouvelle Réalisation" : "Modifier la Réalisation"}
                    </h1>
                    <p className="text-accent/60">
                        {isNew ? "Créez une nouvelle étude de cas bilingue (EN/FR)." : "Mettez à jour le contenu (EN/FR)."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Main Content Area (2 Cols) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Title Section (Bilingual) */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                <Globe className="w-5 h-5" /> Informations Principales (Bilingue)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                        Titre (Anglais) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={project.title}
                                        onChange={(e) => setProject({ ...project, title: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30"
                                        placeholder="Ex. Luxury E-Commerce"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                        Titre (Français)
                                    </label>
                                    <input
                                        type="text"
                                        value={project.titleFr}
                                        onChange={(e) => setProject({ ...project, titleFr: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30"
                                        placeholder="Ex. E-Commerce de Luxe"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                            <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Détails du Projet</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2 flex items-center gap-2">
                                        <User className="w-4 h-4 text-accent/40" /> Client <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={project.client}
                                        onChange={(e) => setProject({ ...project, client: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30"
                                        placeholder="Ex. L'Oréal Paris"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                        Année
                                    </label>
                                    <input
                                        type="text"
                                        value={project.year}
                                        onChange={(e) => setProject({ ...project, year: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30"
                                        placeholder="Ex. 2024"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                    Rôle / Type de service
                                </label>
                                <input
                                    type="text"
                                    value={project.role}
                                    onChange={(e) => setProject({ ...project, role: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30"
                                    placeholder="Ex. UX Design, Headless CMS"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2 flex items-center gap-2">
                                    <Code className="w-4 h-4 text-accent/40" /> Stack Technique
                                </label>
                                <input
                                    type="text"
                                    value={project.techStack}
                                    onChange={(e) => setProject({ ...project, techStack: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30"
                                    placeholder="Next.js, Tailwind, Prisma"
                                />
                            </div>
                        </div>

                        {/* Content Area (Bilingual) */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                            <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Contenu Détaillé</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* English Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">
                                            The Challenge (Anglais)
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={project.challenge}
                                            onChange={(e) => setProject({ ...project, challenge: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">
                                            The Solution (Anglais)
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={project.solution}
                                            onChange={(e) => setProject({ ...project, solution: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30"
                                        />
                                    </div>
                                </div>

                                {/* French Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">
                                            Le Challenge (Français)
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={project.challengeFr}
                                            onChange={(e) => setProject({ ...project, challengeFr: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 text-accent/80 rounded-lg px-4 py-3 focus:outline-none focus:border-border/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">
                                            La Solution (Français)
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={project.solutionFr}
                                            onChange={(e) => setProject({ ...project, solutionFr: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 text-accent/80 rounded-lg px-4 py-3 focus:outline-none focus:border-border/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Area (1 Col) */}
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

                            {error && <p className="text-red-400 text-xs text-center font-mono mt-2">{error}</p>}
                        </div>

                        {/* Links/Order */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4 text-accent/40" /> Lien du Site
                                </label>
                                <input
                                    type="url"
                                    value={project.liveUrl}
                                    onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30 text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                    Ordre d'affichage
                                </label>
                                <input
                                    type="number"
                                    value={project.order}
                                    onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30 text-sm"
                                />
                            </div>
                        </div>

                        {/* Media */}
                        <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-accent/50 mb-3 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-accent/40" /> Image Principale
                                </label>
                                <ImageUpload
                                    label="Cover"
                                    value={project.coverImage}
                                    onChange={(url) => setProject({ ...project, coverImage: url })}
                                />
                            </div>

                            {/* Simple Gallery URLs Input (Can be enhanced to Array later) */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">
                                    Galerie (URLs JSON/Virgule)
                                </label>
                                <textarea
                                    rows={3}
                                    value={project.gallery}
                                    onChange={(e) => setProject({ ...project, gallery: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30 text-xs font-mono"
                                    placeholder="url1.jpg, url2.jpg..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
