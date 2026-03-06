"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    published: boolean;
    createdAt: string;
}

export default function AdminPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = () => {
        setIsLoading(true);
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load posts", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchPosts(); // Refresh list
            }
        } catch (err) {
            console.error("Failed to delete post", err);
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
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Gestion des Postes</h1>
                    <p className="text-accent/60">Gérez vos articles, actualités et cas clients.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Nouveau Poste
                </Link>
            </div>

            <div className="border border-border/10 rounded-xl overflow-hidden bg-accent/5 backdrop-blur-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-accent/5 text-accent/60 border-b border-border/10">
                        <tr>
                            <th className="px-6 py-4 font-medium">Titre</th>
                            <th className="px-6 py-4 font-medium">Statut</th>
                            <th className="px-6 py-4 font-medium">Date de création</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-accent/40">
                                    Aucun poste trouvé. Créez-en un pour commencer.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-accent/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-accent">{post.title}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                                    ? "bg-green-400/10 text-green-400"
                                                    : "bg-yellow-400/10 text-yellow-400"
                                                }`}
                                        >
                                            {post.published ? "Publié" : "Brouillon"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-accent/60">
                                        {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-3 text-accent/60">
                                            <Link
                                                href={`/admin/posts/${post.id}`}
                                                className="hover:text-accent transition-colors"
                                                title="Modifier"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
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
