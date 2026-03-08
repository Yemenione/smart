import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, FileText, Settings, Briefcase, HelpCircle, ArrowRight, Image, AppWindow } from "lucide-react";

export default function AdminDashboard() {
    const { siteName } = usePage().props as any;
    const name = siteName || 'SMARTOUIES';

    const stats = [
        { label: "Bannières Hero", icon: Image, color: "text-yellow-400", href: "/admin/hero", desc: "Gérez les bannières et promotions." },
        { label: "Boutique SaaS", icon: AppWindow, color: "text-pink-400", href: "/admin/products", desc: "Gérez vos produits et applications." },
        { label: "Réalisations", icon: Briefcase, color: "text-blue-400", href: "/admin/projects", desc: "Gérez vos études de cas et travaux." },
        { label: "Actualités & Blog", icon: FileText, color: "text-purple-400", href: "/admin/posts", desc: "Publiez des actualités et articles." },
        { label: "Support / FAQ", icon: HelpCircle, color: "text-green-400", href: "/admin/faqs", desc: "Gérez les questions fréquentes." },
        { label: "Paramètres", icon: Settings, color: "text-orange-400", href: "/admin/settings", desc: "Identité visuelle et contact." },
    ];

    return (
        <AdminLayout>
            <Head title={`Admin Dashboard | ${name}`} />
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2 text-accent">Tableau de Bord</h1>
                    <p className="text-accent/50 text-lg">Bienvenue dans votre centre de contrôle {name}.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {stats.map((item) => {
                        const ItemIcon = item.icon as React.ElementType;
                        const ArrowIcon = ArrowRight as React.ElementType;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group relative rounded-2xl border border-border/10 bg-accent/5 p-8 transition-all hover:bg-white/[0.08] hover:border-border/20 overflow-hidden"
                            >
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="space-y-4">
                                        <div className={`p-3 rounded-xl bg-accent/5 ${item.color} w-fit`}>
                                            <ItemIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-accent mb-2">{item.label}</h3>
                                            <p className="text-accent/50 leading-relaxed text-sm max-w-[240px]">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-full bg-accent/5 text-accent/20 group-hover:text-accent transition-colors">
                                        <ArrowIcon className="w-5 h-5" />
                                    </div>
                                </div>
                                {/* Subtle background glow */}
                                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-colors" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
