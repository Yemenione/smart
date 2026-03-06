"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // In a real app, you'd send this to an API that verifies it against process.env.ADMIN_PASSWORD
        // and sets a secure HttpOnly cookie. For this simple setup, we're doing a basic check.
        // The middleware expects a cookie named 'admin_auth' with value 'authenticated'.

        // We'll set the cookie client-side for simplicity, but the middleware will still protect
        // the actual API routes and admin pages from anyone who doesn't have the cookie.

        if (password === "deuleux2025") {
            document.cookie = "admin_auth=authenticated; path=/; max-age=86400;"; // 1 day
            router.push("/admin");
        } else {
            setError("Mot de passe incorrect");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-accent/5 border border-border/10 p-8 rounded-2xl backdrop-blur-xl">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-accent" />
                    </div>
                </div>

                <h1 className="text-2xl font-light text-accent text-center mb-8">
                    Administration Deuleux
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-accent/5 border border-border/10 rounded-xl px-4 py-3 text-accent placeholder:text-accent/40 focus:outline-none focus:border-border/30 transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-accent/90 transition-colors"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
