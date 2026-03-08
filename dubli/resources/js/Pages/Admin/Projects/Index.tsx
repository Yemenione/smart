import React, { useState } from "react";
import { Plus, Edit2, Trash2, Loader2, Briefcase } from "lucide-react";
import { Link, Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface Project {
    id: string;
    title: string;
    client: string;
    year: string;
}

interface Props {
    projects: Project[];
}

export default function AdminProjects({ projects }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) return;

        setIsLoading(true);
        router.delete(`/admin/projects/${id}`, {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Réalisations | Admin" />
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                            {React.createElement(Briefcase as React.ElementType, { className: "w-8 h-8 text-accent/40" })}
                            Gestion des Réalisations
                        </h1>
                        <p className="text-accent/60">Gérez vos études de cas, projets et travaux clients.</p>
                    </div>
                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors shrink-0"
                    >
                        {React.createElement(Plus as React.ElementType, { className: "w-5 h-5" })}
                        Nouvelle Réalisation
                    </Link>
                </div>

                <div className="border border-border/10 rounded-xl overflow-hidden bg-accent/5 backdrop-blur-sm">
                    {isLoading && (
                        <div className="h-1 bg-white/20 overflow-hidden relative">
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/50 animate-pulse"></div>
                        </div>
                    )}
                    <table className="w-full text-left text-sm">
                        <thead className="bg-accent/5 text-accent/60 border-b border-border/10">
                            <tr>
                                <th className="px-6 py-4 font-medium">Titre / Client</th>
                                <th className="px-6 py-4 font-medium">Année</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-accent/40">
                                        Aucune réalisation trouvée. Ajoutez votre premier projet !
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-accent">{project.title}</div>
                                            <div className="text-accent/40 text-xs">{project.client}</div>
                                        </td>
                                        <td className="px-6 py-4 text-accent/60">{project.year}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3 text-accent/60">
                                                <Link
                                                    href={`/admin/projects/${project.id}`}
                                                    className="hover:text-accent transition-colors"
                                                    title="Modifier"
                                                >
                                                    {React.createElement(Edit2 as React.ElementType, { className: "w-4 h-4" })}
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="hover:text-red-400 transition-colors"
                                                    title="Supprimer"
                                                    disabled={isLoading}
                                                >
                                                    {React.createElement(Trash2 as React.ElementType, { className: "w-4 h-4" })}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
