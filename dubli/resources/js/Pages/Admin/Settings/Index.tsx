import { useState, useEffect } from "react";
import { Save, Loader2, Edit3, CheckCircle, AlertCircle, Mail, Shield, Lock } from "lucide-react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface Props {
    settings: Record<string, string>;
}

export default function AdminSettings({ settings: initialSettings }: Props) {
    const [settings, setSettings] = useState({
        siteName: initialSettings.siteName || "",
        logoUrl: initialSettings.logoUrl || "",
        faviconUrl: initialSettings.faviconUrl || "",
        contactEmail: initialSettings.contactEmail || "",
        contactPhone: initialSettings.contactPhone || "",
        themeBackground: initialSettings.themeBackground || "5, 5, 5",
        themeSurface: initialSettings.themeSurface || "17, 17, 17",
        themeBorder: initialSettings.themeBorder || "255, 255, 255",
        themeAccent: initialSettings.themeAccent || "255, 255, 255",
        themeMuted: initialSettings.themeMuted || "136, 136, 136",
        socialTwitter: initialSettings.socialTwitter || "",
        socialLinkedin: initialSettings.socialLinkedin || "",
        socialInstagram: initialSettings.socialInstagram || "",
        socialFacebook: initialSettings.socialFacebook || "",
        socialWhatsapp: initialSettings.socialWhatsapp || "",
        mail_host: initialSettings.mail_host || "",
        mail_port: initialSettings.mail_port || "587",
        mail_username: initialSettings.mail_username || "",
        mail_password: initialSettings.mail_password || "",
        mail_encryption: initialSettings.mail_encryption || "tls",
        mail_from_address: initialSettings.mail_from_address || "",
        mail_from_name: initialSettings.mail_from_name || "",
    });

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
                themeBorder: "255, 255, 255",
                themeAccent: "255, 255, 255",
                themeMuted: "136, 136, 136",
            });
        } else {
            setSettings({
                ...settings,
                themeBackground: "250, 250, 250",
                themeSurface: "255, 255, 255",
                themeBorder: "0, 0, 0",
                themeAccent: "0, 0, 0",
                themeMuted: "119, 119, 119",
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: "", type: "" });

        router.put("/admin/settings", { settings }, {
            onSuccess: () => {
                setMessage({ text: "Paramètres enregistrés avec succès !", type: "success" });
                setTimeout(() => setMessage({ text: "", type: "" }), 5000);
            },
            onError: () => {
                setMessage({ text: "Impossible d'enregistrer les paramètres.", type: "error" });
            },
            onFinish: () => setIsSaving(false),
        });
    };

    const handleImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setSettings({ ...settings, [key]: data.url });
            } else {
                throw new Error(data.error || "Échec du téléchargement");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Échec du téléchargement de l'image.");
        }
    };

    const LoaderIcon = Loader2 as any;
    const SaveIcon = Save as any;
    const EditIcon = Edit3 as any;

    return (
        <AdminLayout>
            <Head title="Admin | Paramètres" />
            <div className="space-y-8 max-w-4xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-accent">Paramètres de l'Agence</h1>
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
                                    <EditIcon size={18} className="text-accent/40" />
                                </div>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                    className="pl-10 w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="Ex. Elite Digital Agency"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Logo du Site</label>
                                <div className="relative h-24 bg-surface/30 rounded-lg border border-dashed border-border/20 flex items-center justify-center overflow-hidden">
                                    {settings.logoUrl ? (
                                        <img src={settings.logoUrl} alt="Logo" className="max-h-full object-contain" />
                                    ) : (
                                        <span className="text-accent/30 text-xs">Aucun logo</span>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-bold">Changer</span>
                                        <input type="file" className="hidden" onChange={(e) => handleImageUpload('logoUrl', e)} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Favicon</label>
                                <div className="relative h-24 bg-surface/30 rounded-lg border border-dashed border-border/20 flex items-center justify-center overflow-hidden">
                                    {settings.faviconUrl ? (
                                        <img src={settings.faviconUrl} alt="Favicon" className="w-12 h-12 object-contain" />
                                    ) : (
                                        <span className="text-accent/30 text-xs">Aucun favicon</span>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-bold">Changer</span>
                                        <input type="file" className="hidden" onChange={(e) => handleImageUpload('faviconUrl', e)} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Email de Contact</label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="Ex. contact@agency.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Téléphone</label>
                                <input
                                    type="text"
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="+33 1 23 45 67 89"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL MEDIA SECTION */}
                    <div className="space-y-4 rounded-xl border border-border/10 bg-accent/5 p-6">
                        <h2 className="text-xl font-bold text-accent mb-2 border-b border-border/10 pb-2">Réseaux Sociaux</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Twitter', 'Linkedin', 'Instagram', 'Facebook', 'Whatsapp'].map(social => (
                                <div key={social}>
                                    <label className="block text-sm font-medium text-accent/80 mb-2">{social}</label>
                                    <input
                                        type="text"
                                        value={settings[`social${social}` as keyof typeof settings] || ""}
                                        onChange={(e) => setSettings({ ...settings, [`social${social}`]: e.target.value })}
                                        className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                        placeholder={`Lien ${social}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* THEME & COLORS SECTION */}
                    <div className="space-y-6 rounded-xl border border-border/10 bg-accent/5 p-6">
                        <div className="border-b border-border/10 pb-4">
                            <h2 className="text-xl font-bold text-accent mb-2">Thème et Couleurs</h2>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => applyPreset('dark')}
                                    className="px-4 py-2 rounded bg-[#050505] text-white border border-white/20 text-xs font-medium hover:opacity-80 transition"
                                >
                                    Mode Sombre
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyPreset('light')}
                                    className="px-4 py-2 rounded bg-white text-black border border-black/20 text-xs font-medium hover:opacity-80 transition"
                                >
                                    Mode Clair
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { label: 'Fond 1', key: 'themeBackground' },
                                { label: 'Fond 2', key: 'themeSurface' },
                                { label: 'Accent', key: 'themeAccent' },
                                { label: 'Bordure', key: 'themeBorder' },
                                { label: 'Muted', key: 'themeMuted' },
                            ].map(color => (
                                <div key={color.key}>
                                    <label className="block text-[10px] font-medium text-accent/50 mb-1 uppercase">{color.label}</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={rgbToHex(settings[color.key as keyof typeof settings] as string)}
                                            onChange={(e) => setSettings({ ...settings, [color.key]: hexToRgb(e.target.value) })}
                                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                        />
                                        <span className="text-[10px] text-accent/30 font-mono">{rgbToHex(settings[color.key as keyof typeof settings] as string).toUpperCase()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SMTP CONFIGURATION SECTION */}
                    <div className="space-y-4 rounded-xl border border-border/10 bg-accent/5 p-6">
                        <div className="flex items-center gap-3 border-b border-border/10 pb-2 mb-4">
                            <Mail className="text-accent/60" size={20} />
                            <h2 className="text-xl font-bold text-accent">Configuration SMTP (E-mail)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-accent/80 mb-2">Serveur SMTP (Host)</label>
                                <input
                                    type="text"
                                    value={settings.mail_host}
                                    onChange={(e) => setSettings({ ...settings, mail_host: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="smtp.example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Port</label>
                                <input
                                    type="text"
                                    value={settings.mail_port}
                                    onChange={(e) => setSettings({ ...settings, mail_port: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="587"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Utilisateur (Username)</label>
                                <input
                                    type="text"
                                    value={settings.mail_username}
                                    onChange={(e) => setSettings({ ...settings, mail_username: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="user@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Mot de passe (Password)</label>
                                <input
                                    type="password"
                                    value={settings.mail_password}
                                    onChange={(e) => setSettings({ ...settings, mail_password: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-accent/80 mb-2">Chiffrement (Encryption)</label>
                                <select
                                    value={settings.mail_encryption}
                                    onChange={(e) => setSettings({ ...settings, mail_encryption: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                >
                                    <option value="tls">TLS (Recommandé)</option>
                                    <option value="ssl">SSL</option>
                                    <option value="none">Aucun</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-accent/80 mb-2">Email de l'expéditeur (From Email)</label>
                                <input
                                    type="email"
                                    value={settings.mail_from_address}
                                    onChange={(e) => setSettings({ ...settings, mail_from_address: e.target.value })}
                                    className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                    placeholder="no-reply@yourdomain.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-accent/80 mb-2">Nom de l'expéditeur (From Name)</label>
                            <input
                                type="text"
                                value={settings.mail_from_name}
                                onChange={(e) => setSettings({ ...settings, mail_from_name: e.target.value })}
                                className="w-full bg-surface/50 border border-border/10 rounded-lg px-4 py-2.5 text-accent focus:outline-none focus:border-accent/50"
                                placeholder="Your Agency Name"
                            />
                        </div>

                        <div className="bg-yellow-400/10 border border-yellow-400/20 p-4 rounded-lg mt-4">
                            <p className="text-yellow-400 text-xs flex items-start gap-2">
                                <Shield size={14} className="mt-0.5" />
                                <span>Note : Assurez-vous que vos identifiants SMTP sont corrects pour permettre l'envoi des formulaires de contact.</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {message.text && (
                                <>
                                    {message.type === 'success' ? <CheckCircle size={16} className="text-green-400" /> : <AlertCircle size={16} className="text-red-400" />}
                                    <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {message.text}
                                    </p>
                                </>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-all disabled:opacity-50"
                        >
                            {isSaving ? <LoaderIcon size={18} className="animate-spin" /> : <SaveIcon size={18} />}
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
