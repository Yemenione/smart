"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    order: number;
}

export default function AdminFAQs() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFaqs = () => {
        setIsLoading(true);
        fetch("/api/faqs")
            .then((res) => res.json())
            .then((data) => {
                setFaqs(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load FAQs", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) return;

        try {
            const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchFaqs();
            }
        } catch (err) {
            console.error("Failed to delete FAQ", err);
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
                        <HelpCircle className="w-8 h-8 text-accent/40" />
                        Gestion de la FAQ
                    </h1>
                    <p className="text-accent/60">Gérez les questions fréquentes de la page Agence.</p>
                </div>
                <Link
                    href="/admin/faqs/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Nouvelle Question
                </Link>
            </div>

            <div className="border border-border/10 rounded-xl overflow-hidden bg-accent/5 backdrop-blur-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-accent/5 text-accent/60 border-b border-border/10">
                        <tr>
                            <th className="px-6 py-4 font-medium">Ordre</th>
                            <th className="px-6 py-4 font-medium">Question</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {faqs.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-accent/40">
                                    Aucune question trouvée.
                                </td>
                            </tr>
                        ) : (
                            faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-accent/5 transition-colors">
                                    <td className="px-6 py-4 text-accent/40 w-16">{faq.order}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-accent">{faq.question}</div>
                                        <div className="text-accent/40 text-xs line-clamp-1 truncate max-w-md">{faq.answer}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-3 text-accent/60">
                                            <Link
                                                href={`/admin/faqs/${faq.id}`}
                                                className="hover:text-accent transition-colors"
                                                title="Modifier"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(faq.id)}
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
