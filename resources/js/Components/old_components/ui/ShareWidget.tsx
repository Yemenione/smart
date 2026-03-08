"use client";

import { useState, useEffect } from "react";
import { Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ShareWidgetProps {
    title: string;
    description: string;
    urlPath: string; // the relative path e.g. /work/project-slug
}

export default function ShareWidget({ title, description, urlPath }: ShareWidgetProps) {
    const [baseUrl, setBaseUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    const shareUrl = `${baseUrl}${urlPath}`;

    // Social Links
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description);

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <div className="flex flex-col gap-3 py-6 border-t border-border/10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-accent/60 font-mono">Share on Socials</h4>
            <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface border border-border/20 flex items-center justify-center text-accent/80 hover:text-accent hover:border-accent/50 hover:bg-[#0077b5]/10 transition-all duration-300 group"
                    aria-label="Share on LinkedIn"
                >
                    <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* Twitter / X */}
                <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface border border-border/20 flex items-center justify-center text-accent/80 hover:text-accent hover:border-accent/50 hover:bg-white/5 transition-all duration-300 group"
                    aria-label="Share on X"
                >
                    <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* Copy Link */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 h-10 rounded-full bg-surface border border-border/20 text-sm font-medium text-accent/80 hover:text-accent hover:border-accent/50 transition-all duration-300"
                >
                    {copied ? (
                        <>
                            <Check size={16} className="text-green-500" />
                            <span className="text-green-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <LinkIcon size={16} />
                            <span>Copy Link</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
