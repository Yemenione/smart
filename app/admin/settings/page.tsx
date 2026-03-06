"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Edit3 } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        siteName: "",
        logoUrl: "",
        faviconUrl: "",
        contactEmail: "",
        contactPhone: "",
        themeBackground: "5, 5, 5",
        themeSurface: "17, 17, 17",
        themeBorder: "255, 255, 255",
        themeAccent: "255, 255, 255",
        themeMuted: "136, 136, 136",
        socialTwitter: "",
        socialLinkedin: "",
        socialInstagram: "",
        socialFacebook: "",
        socialWhatsapp: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Helper to convert rgb comma to hex for color picker
    const rgbToHex = (rgbStr: string) => {
        if (!rgbStr) return "#000000";
        const rgb = rgbStr.split(',').map(s => parseInt(s.trim()));
        if (rgb.length !== 3 || rgb.some(isNaN)) return "#000000";
        return "#" + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
    };

    // Helper to convert hex to rgb comma for DB
    const hexToRgb = (hex: string) => {
        let h = hex.replace("#", "");
        if (h.length === 3) h = h.split("").map((c) => c + c).join("");
        const r = parseInt(h.substring(0, 2), 16);
        const g = parseInt(h.substring(2, 4), 16);
        const b = parseInt(h.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    };

    const applyPreset = (mode: "dark" | "light") => {
        if (mode === "dark") {
            setSettings({
                ...settings,
                themeBackground: "5, 5, 5",
                themeSurface: "17, 17, 17",
                themeBorder: "255, 255, 255", // Using accent
                themeAccent: "255, 255, 255",
                themeMuted: "136, 136, 136",
            });
        } else {
            setSettings({
                ...settings,
                themeBackground: "250, 250, 250",
                themeSurface: "255, 255, 255",
                themeBorder: "0, 0, 0", // Using accent
                themeAccent: "0, 0, 0",
                themeMuted: "119, 119, 119",
            });
        }
    };

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                setSettings({
                    siteName: data.siteName || "",
                    logoUrl: data.logoUrl || "",
                    faviconUrl: data.faviconUrl || "",
                    contactEmail: data.contactEmail || "",
                    contactPhone: data.contactPhone || "",
                    themeBackground: data.themeBackground || "5, 5, 5",
                    themeSurface: data.themeSurface || "17, 17, 17",
                    themeBorder: data.themeBorder || "255, 255, 255",
                    themeAccent: data.themeAccent || "255, 255, 255",
                    themeMuted: data.themeMuted || "136, 136, 136",
                    socialTwitter: data.socialTwitter || "",
                    socialLinkedin: data.socialLinkedin || "",
                    socialInstagram: data.socialInstagram || "",
                    socialFacebook: data.socialFacebook || "",
                    socialWhatsapp: data.socialWhatsapp || "",
                });
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load settings", err);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error("Erreur lors de la sauvegarde.");

            setMessage({ text: "Paramètres enregistrés avec succès ! (Rafraîchissez pour voir les nouvelles couleurs)", type: "success" });
        } catch (err) {
            setMessage({ text: "Impossible d'enregistrer les paramètres.", type: "error" });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage({ text: "", type: "" }), 5000);
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
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Paramètres de l'Agence</h1>
                <p className="text-accent/60">Gérez le nom du site, le logo principal et vos coordonnées de contact.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* BRANDING SECTION */}
                <div className="space-y-4 rounded-xl border border-border/10 bg-accent/5 p-6">
                    <h2 className="text-xl font-bold text-accent mb-4 border-b border-border/10 pb-2">Identité & Contact</h2>
                    <div>
                        <label className="block text-sm font-medium text-accent/80 mb-2">
                            Nom du Site
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Edit3 className="h-5 w-5 text-accent/40" />
                            </div>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                className="pl-10 w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="Ex. Deuleux Agency"
                            />
                        </div>
                    </div>

                    <div>
                        <ImageUpload
                            label="Favicon du Site (PNG/ICO)"
                            value={settings.faviconUrl}
                            onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                        />
                        <p className="mt-1 text-[10px] text-accent/30 uppercase tracking-wider">Format carré recommandé (PNG/ICO)</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/5">
                        <ImageUpload
                            label="Logo du Site (Navbar)"
                            value={settings.logoUrl}
                            onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                        />
                        <p className="mt-1 text-[10px] text-accent/30 uppercase tracking-wider">Logo horizontal avec fond transparent recommandé</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">
                                Email de Contact
                            </label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="contact@deuleux.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">
                                Téléphone de Contact
                            </label>
                            <input
                                type="text"
                                value={settings.contactPhone}
                                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="+33 1 23 45 67 89"
                            />
                        </div>
                    </div>
                </div>

                {/* SOCIAL MEDIA SECTION */}
                <div className="space-y-4 rounded-xl border border-border/10 bg-accent/5 p-6">
                    <h2 className="text-xl font-bold text-accent mb-4 border-b border-border/10 pb-2">Réseaux Sociaux</h2>
                    <p className="text-sm text-accent/60 mb-4">Liens vers vos profils sociaux pour le footer. Laissez vide pour masquer.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Twitter (X)</label>
                            <input
                                type="url"
                                value={settings.socialTwitter}
                                onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">LinkedIn</label>
                            <input
                                type="url"
                                value={settings.socialLinkedin}
                                onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="https://linkedin.com/company/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Instagram</label>
                            <input
                                type="url"
                                value={settings.socialInstagram}
                                onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Facebook</label>
                            <input
                                type="url"
                                value={settings.socialFacebook}
                                onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-400 mb-2">WhatsApp</label>
                            <input
                                type="text"
                                value={settings.socialWhatsapp}
                                onChange={(e) => setSettings({ ...settings, socialWhatsapp: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-border/30"
                                placeholder="+33 6 12 34 56 78"
                            />
                        </div>
                    </div>
                </div>

                {/* THEME & COLORS SECTION */}
                <div className="space-y-6 rounded-xl border border-border/10 bg-accent/5 p-6">
                    <div className="border-b border-border/10 pb-4">
                        <h2 className="text-xl font-bold text-accent mb-2">Thème et Couleurs</h2>
                        <p className="text-sm text-accent/50 mb-4">Personnalisez les couleurs principales de l'agence. Les changements seront appliqués sur l'ensemble du site après sauvegarde.</p>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => applyPreset('dark')}
                                className="px-4 py-2 rounded bg-[#050505] text-white border border-white/20 text-sm font-medium hover:opacity-80 transition"
                            >
                                Mode Sombre (Défaut)
                            </button>
                            <button
                                type="button"
                                onClick={() => applyPreset('light')}
                                className="px-4 py-2 rounded bg-white text-black border border-black/20 text-sm font-medium hover:opacity-80 transition"
                            >
                                Mode Clair
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Background Color */}
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Fond Principal</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={rgbToHex(settings.themeBackground)}
                                    onChange={(e) => setSettings({ ...settings, themeBackground: hexToRgb(e.target.value) })}
                                    className="w-10 h-10 rounded border border-border/20 cursor-pointer bg-transparent"
                                />
                                <span className="text-xs text-accent/50 font-mono">{rgbToHex(settings.themeBackground).toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Surface Color */}
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Fond Secondaire (Cartes)</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={rgbToHex(settings.themeSurface)}
                                    onChange={(e) => setSettings({ ...settings, themeSurface: hexToRgb(e.target.value) })}
                                    className="w-10 h-10 rounded border border-border/20 cursor-pointer bg-transparent"
                                />
                                <span className="text-xs text-accent/50 font-mono">{rgbToHex(settings.themeSurface).toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Accent Color (Text) */}
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Texte & Accent</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={rgbToHex(settings.themeAccent)}
                                    onChange={(e) => {
                                        const r = hexToRgb(e.target.value);
                                        setSettings({ ...settings, themeAccent: r, themeBorder: r });
                                    }}
                                    className="w-10 h-10 rounded border border-border/20 cursor-pointer bg-transparent"
                                />
                                <span className="text-xs text-accent/50 font-mono">{rgbToHex(settings.themeAccent).toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Muted Color */}
                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Texte Secondaire</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={rgbToHex(settings.themeMuted)}
                                    onChange={(e) => setSettings({ ...settings, themeMuted: hexToRgb(e.target.value) })}
                                    className="w-10 h-10 rounded border border-border/20 cursor-pointer bg-transparent"
                                />
                                <span className="text-xs text-accent/50 font-mono">{rgbToHex(settings.themeMuted).toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {message.text}
                    </p>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
}
