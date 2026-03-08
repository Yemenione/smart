import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface Post {
    id: string;
    title: string;
    published: boolean;
    created_at: string;
}

interface Props {
    posts: Post[];
}

export default function AdminPosts({ posts = [] }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) return;

        setIsLoading(true);
        router.delete(`/admin/posts/${id}`, {
            onFinish: () => setIsLoading(false),
        });
    };

    const PlusIcon = Plus as React.ElementType;
    const EditIcon = Edit2 as React.ElementType;
    const TrashIcon = Trash2 as React.ElementType;

    return (
        <AdminLayout>
            <Head title="Gestion des Postes | Admin" />
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
                        <PlusIcon className="w-5 h-5" />
                        Nouveau Poste
                    </Link>
                </div>

                <div className="border border-border/10 rounded-xl overflow-hidden bg-accent/5 backdrop-blur-sm relative">
                    {isLoading && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/50 animate-pulse"></div>
                        </div>
                    )}
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
                                            {post.created_at ? new Date(post.created_at).toLocaleDateString("fr-FR") : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3 text-accent/60">
                                                <Link
                                                    href={`/admin/posts/${post.id}`}
                                                    className="hover:text-accent transition-colors"
                                                    title="Modifier"
                                                >
                                                    <EditIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="hover:text-red-400 transition-colors"
                                                    title="Supprimer"
                                                    disabled={isLoading}
                                                >
                                                    <TrashIcon className="w-4 h-4" />
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
