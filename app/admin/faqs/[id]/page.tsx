"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FAQEditor() {
    const router = useRouter();
    const params = useParams();
    const faqId = params.id;
    const isNew = faqId === "new";

    const [faq, setFaq] = useState({
        question: "",
        answer: "",
        order: 0,
    });
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/faqs/${faqId}`)
                .then((res) => {
                    if (!res.ok) throw new Error("FAQ non trouvée");
                    return res.json();
                })
                .then((data) => {
                    setFaq({
                        question: data.question || "",
                        answer: data.answer || "",
                        order: data.order || 0,
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Impossible de charger la question.");
                    setIsLoading(false);
                });
        }
    }, [faqId, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        try {
            const url = isNew ? "/api/faqs" : `/api/faqs/${faqId}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(faq),
            });

            if (!res.ok) {
                throw new Error("Erreur lors de la sauvegarde");
            }

            router.push("/admin/faqs");
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
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/faqs"
                    className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent/60 hover:text-accent"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isNew ? "Nouvelle Question" : "Modifier la Question"}
                    </h1>
                    <p className="text-accent/60">Configurez les questions et réponses pour vos clients.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border border-border/10 bg-accent/5 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-accent/80 mb-2">
                            Question <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={faq.question}
                            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30 text-lg"
                            placeholder="Ex. Quels sont vos tarifs ?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-accent/80 mb-2">
                            Réponse <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            rows={6}
                            required
                            value={faq.answer}
                            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-3 text-accent focus:outline-none focus:border-border/30 leading-relaxed"
                            placeholder="Détaillez votre réponse ici..."
                        />
                    </div>

                    <div className="w-32">
                        <label className="block text-sm font-medium text-accent/80 mb-2">
                            Ordre d'affichage
                        </label>
                        <input
                            type="number"
                            value={faq.order}
                            onChange={(e) => setFaq({ ...faq, order: parseInt(e.target.value) || 0 })}
                            className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-border/30 text-center"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <p className="text-red-400 text-sm">{error}</p>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isNew ? "Créer la question" : "Mettre à jour"}
                    </button>
                </div>
            </form>
        </div>
    );
}
