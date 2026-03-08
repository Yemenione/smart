"use client";

import { cn } from "@/lib/utils"; // Assuming a utility exists. If not, we fall back to simple string interpolation.

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse rounded-md bg-accent/10 ${className || ""}`}
            {...props}
        />
    );
}
