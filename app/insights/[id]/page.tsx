import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import PostClient from "./PostClient";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{ id: string }>;
};

async function getPostById(id: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const defaultMeta = {
        title: "Insight | DEULEUX",
        description: "Read our latest thoughts on digital innovation."
    };

    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const post = await getPostById(id);

        const cookieStore = await cookies();
        const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
        const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

        const title = post?.title ? `${post.title} | DEULEUX` : translations[lang].seo.insights.title;
        // Strip HTML tags for description preview
        const cleanContent = post?.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "..." : translations[lang].seo.insights.description;

        // Dynamically build the OG Image URL
        const ogUrl = new URL(
            process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        );
        ogUrl.pathname = '/api/og';
        ogUrl.searchParams.set('title', post?.title || 'Insight Article');
        ogUrl.searchParams.set('subtitle', 'Digital Innovation');
        ogUrl.searchParams.set('context', 'Latest News');
        if (post?.imageUrl) {
            ogUrl.searchParams.set('bg', post.imageUrl);
        }

        return {
            title,
            description: cleanContent,
            openGraph: {
                title,
                description: cleanContent,
                locale: lang,
                type: 'article',
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
    } catch {
        return defaultMeta;
    }
}

export default async function PostPage({ params }: Props) {
    const resolvedParams = await params;
    const post = await getPostById(resolvedParams.id);

    // Serialize to pass safe JSON to the Client Component
    const serializedPost = post ? JSON.parse(JSON.stringify(post)) : null;

    return <PostClient initialPost={serializedPost} />;
}
