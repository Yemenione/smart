import { useState } from "react";
import { Plus, Edit2, Trash2, HelpCircle, Save, X } from "lucide-react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    order: number;
}

interface Props {
    faqs: FAQ[];
}

export default function AdminFAQs({ faqs = [] }: Props) {
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

    // Form state
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [order, setOrder] = useState<number>(0);

    const resetForm = () => {
        setEditingFaq(null);
        setQuestion("");
        setAnswer("");
        setOrder(0);
        setIsModalOpen(false);
    };

    const handleEdit = (faq: FAQ) => {
        setEditingFaq(faq);
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setOrder(faq.order);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) return;
        router.delete(`/admin/faqs/${id}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const data = { question, answer, order };

        if (editingFaq) {
            router.put(`/admin/faqs/${editingFaq.id}`, data, {
                onSuccess: () => resetForm(),
                onFinish: () => setIsSaving(false),
            });
        } else {
            router.post("/admin/faqs", data, {
                onSuccess: () => resetForm(),
                onFinish: () => setIsSaving(false),
            });
        }
    };

    const HelpIcon = HelpCircle as any;
    const PlusIcon = Plus as any;
    const EditIcon = Edit2 as any;
    const TrashIcon = Trash2 as any;
    const SaveIcon = Save as any;
    const CloseIcon = X as any;

    return (
        <AdminLayout>
            <Head title="Admin | FAQ" />
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-accent">
                            <HelpIcon className="w-8 h-8 text-accent/40" />
                            Gestion de la FAQ
                        </h1>
                        <p className="text-accent/60">Gérez les questions fréquentes de la page Agence.</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors shrink-0"
                    >
                        <PlusIcon size={20} />
                        Nouvelle Question
                    </button>
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
                                                <button
                                                    onClick={() => handleEdit(faq)}
                                                    className="hover:text-accent transition-colors"
                                                >
                                                    <EditIcon size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faq.id)}
                                                    className="hover:text-red-400 transition-colors"
                                                >
                                                    <TrashIcon size={16} />
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

            {/* Simple Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-surface border border-border/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-border/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-accent">{editingFaq ? "Modifier" : "Ajouter"} une Question</h3>
                            <button onClick={resetForm} className="text-accent/40 hover:text-accent transition-colors">
                                <CloseIcon size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Question</label>
                                <input
                                    type="text"
                                    required
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="Ex: Quelle est la durée d'un projet ?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Réponse</label>
                                <textarea
                                    required
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50 min-h-[120px]"
                                    placeholder="Entrez votre réponse ici..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Ordre</label>
                                <input
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2 text-accent focus:outline-none focus:border-accent/50"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 text-accent/60 hover:text-accent transition-colors text-sm font-medium"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-accent/90 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? "Chargement..." : <SaveIcon size={18} />}
                                    {editingFaq ? "Enregistrer" : "Ajouter"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
