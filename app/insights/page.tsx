import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
    const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

    const title = translations[lang].seo.insights.title;
    const description = translations[lang].seo.insights.description;

    const ogUrl = new URL(
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    );
    ogUrl.pathname = '/api/og';
    ogUrl.searchParams.set('title', title);
    ogUrl.searchParams.set('subtitle', description);
    ogUrl.searchParams.set('context', 'Insights & News');

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: lang,
            type: 'website',
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ]
        },
    };
}

import { prisma } from "@/lib/prisma";

export default async function InsightsPage() {
    let posts: any[] = [];
    try {
        const rawPosts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        });
        posts = JSON.parse(JSON.stringify(rawPosts));
    } catch (err) {
        console.error("Failed to fetch posts for InsightsPage using Prisma:", err);
    }

    return <InsightsClient initialPosts={posts} />;
}
