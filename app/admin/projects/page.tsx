"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Briefcase } from "lucide-react";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    client: string;
    year: string;
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = () => {
        setIsLoading(true);
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load projects", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProjects();
            }
        } catch (err) {
            console.error("Failed to delete project", err);
            alert("Erreur lors de la suppression.");
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
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-accent/40" />
                        Gestion des Réalisations
                    </h1>
                    <p className="text-accent/60">Gérez vos études de cas, projets et travaux clients.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Nouvelle Réalisation
                </Link>
            </div>

            <div className="border border-border/10 rounded-xl overflow-hidden bg-accent/5 backdrop-blur-sm">
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
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="hover:text-red-400 transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
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
    );
}
