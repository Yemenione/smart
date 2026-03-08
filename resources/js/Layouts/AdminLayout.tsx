import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, FileText, Settings, LogOut, Briefcase, HelpCircle, AppWindow, Image } from "lucide-react";
import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();

    const handleLogout = () => {
        // Here we could hit a ziggy route for logout or just standard logic
        // But for Inertia with Breeze/Jetstream, usually it's a POST to /logout
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = token;
            form.appendChild(csrfInput);
        }
        document.body.appendChild(form);
        form.submit();
    };

    const navItems = [
        { label: "Tableau de Bord", icon: LayoutDashboard, href: "/admin" },
        { label: "Bannières Hero", icon: Image, href: "/admin/hero" },
        { label: "Boutique SaaS", icon: AppWindow, href: "/admin/products" },
        { label: "Réalisations", icon: Briefcase, href: "/admin/projects" },
        { label: "Actualités & Blog", icon: FileText, href: "/admin/posts" },
        { label: "Support / FAQ", icon: HelpCircle, href: "/admin/faqs" },
        { label: "Paramètres", icon: Settings, iconClassName: "w-5 h-5", href: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-background text-accent flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border/10 flex flex-col shrink-0">
                <div className="p-8 flex flex-col items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-auto" />
                    </Link>
                    <p className="text-[10px] text-accent/30 tracking-[0.2em] font-medium uppercase mt-2">Admin Panel</p>
                </div>

                <nav className="flex-1 px-4 space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon as React.ElementType;
                        const isActive = url.startsWith(item.href) && (item.href !== '/admin' || url === '/admin');

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-white text-black font-semibold shadow-lg shadow-white/5"
                                    : "text-accent/50 hover:text-accent hover:bg-accent/5"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${item.iconClassName || ""}`} />
                                <span className="text-sm tracking-tight">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border/10">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                        {React.createElement(LogOut as React.ElementType, { className: "w-5 h-5" })}
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#0a0a0a]">
                <div className="p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
