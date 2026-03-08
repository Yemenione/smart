"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Erreur lors du téléchargement de l'image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-white/80">{label}</label>}

            <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center p-4 min-h-[140px] ${value
                    ? "border-white/20 bg-white/5"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/[0.08]"
                    }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                        <span className="text-xs text-white/40">Téléchargement...</span>
                    </div>
                ) : value ? (
                    <div className="relative w-full h-full flex items-center justify-center group/preview">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={value}
                            alt="Preview"
                            className="max-h-32 object-contain rounded-lg"
                        />
                        <button
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/preview:opacity-100 transition-opacity shadow-lg"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-xs text-white font-medium">Changer l'image</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="p-3 bg-white/5 rounded-full text-white/40 group-hover:text-white/60 transition-colors">
                            <Upload className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-white/60 font-medium">Cliquez pour ajouter une image</p>
                            <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">JPG, PNG, WEBP (Max 5 Mo)</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
