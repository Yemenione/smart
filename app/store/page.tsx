import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreClient from "./StoreClient";
import { PrismaClient } from '@prisma/client'
import { Metadata } from "next";
import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";

const prisma = new PrismaClient()

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
    const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

    const title = lang === 'fr' ? "Applications SaaS | DEULEUX" : "SaaS Applications | DEULEUX";
    const description = lang === 'fr'
        ? "Découvrez nos applications pré-configurées (E-Commerce, Restauration) prêtes à être déployées."
        : "Discover our pre-configured, instantly deployable applications for E-Commerce and Restaurants.";

    const ogUrl = new URL(
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    );
    ogUrl.pathname = '/api/og';
    ogUrl.searchParams.set('title', title);
    ogUrl.searchParams.set('subtitle', description);
    ogUrl.searchParams.set('context', "SaaS Store");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: lang,
            type: 'website',
            images: [{ url: ogUrl.toString(), width: 1200, height: 630, alt: title }]
        },
    };
}

export default async function StorePage() {
    // Fetch apps Server-Side for SEO
    const apps = await prisma.productApp.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
            <Navbar />
            <StoreClient initialApps={apps} />
            <Footer />
        </main>
    );
}
