import { useState, useEffect } from "react";
import { Save, Loader2, ArrowLeft, Globe, User, Code, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface ProjectData {
    id?: string;
    title: string;
    title_fr?: string;
    client: string;
    role: string;
    year: string;
    challenge: string;
    challenge_fr?: string;
    solution: string;
    solution_fr?: string;
    tech_stack: string;
    cover_image: string;
    gallery: string;
    live_url: string;
    order: number;
}

interface Props {
    project: ProjectData | null;
}

export default function ProjectForm({ project: initialProject }: Props) {
    const isNew = !initialProject;

    const [project, setProject] = useState({
        title: initialProject?.title || "",
        titleFr: initialProject?.title_fr || "",
        client: initialProject?.client || "",
        role: initialProject?.role || "",
        year: initialProject?.year || "",
        challenge: initialProject?.challenge || "",
        challengeFr: initialProject?.challenge_fr || "",
        solution: initialProject?.solution || "",
        solutionFr: initialProject?.solution_fr || "",
        techStack: initialProject?.tech_stack || "",
        coverImage: initialProject?.cover_image || "",
        gallery: initialProject?.gallery || "",
        liveUrl: initialProject?.live_url || "",
        order: initialProject?.order || 0,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        if (isNew) {
            router.post("/admin/projects", project, {
                onError: (err: any) => {
                    setError("Une erreur est survenue lors de la création.");
                    setIsSaving(false);
                },
                onFinish: () => setIsSaving(false),
            });
        } else {
            router.put(`/admin/projects/${initialProject.id}`, project, {
                onError: (err: any) => {
                    setError("Une erreur est survenue lors de la modification.");
                    setIsSaving(false);
                },
                onFinish: () => setIsSaving(false),
            });
        }
    };

    const handleImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (res.ok) {
                setProject({ ...project, [key]: data.url });
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            alert("Échec du téléchargement.");
        }
    };

    const ArrowLeftIcon = ArrowLeft as any;
    const GlobeIcon = Globe as any;
    const UserIcon = User as any;
    const CodeIcon = Code as any;
    const LinkIconComp = LinkIcon as any;
    const ImageIconComp = ImageIcon as any;
    const SaveIcon = Save as any;
    const LoaderIcon = Loader2 as any;

    return (
        <AdminLayout>
            <Head title={isNew ? "Nouvelle Réalisation" : "Modifier la Réalisation"} />
            <div className="space-y-6 max-w-6xl pb-24 mx-auto">
                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href="/admin/projects"
                        className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent/60 hover:text-accent"
                    >
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-accent">
                            {isNew ? "Nouvelle Réalisation" : "Modifier la Réalisation"}
                        </h1>
                        <p className="text-accent/60 text-sm">
                            {isNew ? "Créez une nouvelle étude de cas bilingue (EN/FR)." : "Mettez à jour le contenu (EN/FR)."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title Section (Bilingual) */}
                            <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-4">
                                <h2 className="text-lg font-bold text-accent flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                    <GlobeIcon size={20} /> Informations Principales (Bilingue)
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
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30"
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
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Ex. E-Commerce de Luxe"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                                <h2 className="text-lg font-bold text-accent mb-4 border-b border-white/10 pb-2">Détails du Projet</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2 flex items-center gap-2">
                                            <UserIcon size={16} className="text-accent/40" /> Client <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={project.client}
                                            onChange={(e) => setProject({ ...project, client: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Ex. L'Oréal Paris"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">Année</label>
                                        <input
                                            type="text"
                                            value={project.year}
                                            onChange={(e) => setProject({ ...project, year: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Ex. 2024"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">Rôle / Service</label>
                                        <input
                                            type="text"
                                            value={project.role}
                                            onChange={(e) => setProject({ ...project, role: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Ex. UX Design, Headless CMS"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2 flex items-center gap-2">
                                            <CodeIcon size={16} className="text-accent/40" /> Stack Technique
                                        </label>
                                        <input
                                            type="text"
                                            value={project.techStack}
                                            onChange={(e) => setProject({ ...project, techStack: e.target.value })}
                                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30"
                                            placeholder="Next.js, Tailwind, Laravel"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                                <h2 className="text-lg font-bold text-accent mb-4 border-b border-white/10 pb-2">Contenu Détaillé</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">Le Challenge (EN)</label>
                                        <textarea rows={5} value={project.challenge} onChange={(e) => setProject({ ...project, challenge: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30" />
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">La Solution (EN)</label>
                                        <textarea rows={5} value={project.solution} onChange={(e) => setProject({ ...project, solution: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">Le Challenge (FR)</label>
                                        <textarea rows={5} value={project.challengeFr} onChange={(e) => setProject({ ...project, challengeFr: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30" />
                                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/30 mb-2">La Solution (FR)</label>
                                        <textarea rows={5} value={project.solutionFr} onChange={(e) => setProject({ ...project, solutionFr: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-accent/30" />
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
                                {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
                                <div className="pt-4 border-t border-white/5 space-y-4">
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2 flex items-center gap-2">
                                        <LinkIconComp size={16} className="text-accent/40" /> Lien Live
                                    </label>
                                    <input type="url" value={project.liveUrl} onChange={(e) => setProject({ ...project, liveUrl: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30 text-sm" placeholder="https://..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">Ordre</label>
                                    <input type="number" value={project.order} onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) || 0 })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30 text-sm" />
                                </div>
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-3 flex items-center gap-2">
                                        <ImageIconComp size={16} className="text-accent/40" /> Cover Image
                                    </label>
                                    <div className="relative h-40 border-2 border-dashed border-border/20 rounded-xl overflow-hidden bg-surface/30 flex items-center justify-center">
                                        {project.coverImage ? (
                                            <>
                                                <img src={project.coverImage} className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 cursor-pointer bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                                                    Changer
                                                    <input type="file" className="hidden" onChange={(e) => handleImageUpload('coverImage', e)} />
                                                </label>
                                            </>
                                        ) : (
                                            <label className="cursor-pointer text-accent/40 hover:text-accent transition-colors">
                                                <span>+ Upload Cover</span>
                                                <input type="file" className="hidden" onChange={(e) => handleImageUpload('coverImage', e)} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-widest text-accent/50 mb-2">Galerie (URLs virgules)</label>
                                    <textarea rows={3} value={project.gallery} onChange={(e) => setProject({ ...project, gallery: e.target.value })} className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/30 text-xs font-mono" placeholder="url1.jpg, url2.jpg..." />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
