import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import ProjectClient from "./ProjectClient";
import { getProjectBySlug } from "@/lib/api";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const defaultMeta = {
        title: "Work | DEULEUX",
        description: "Explore our portfolio of digital projects."
    };

    try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug;
        const project = await getProjectBySlug(slug);

        const cookieStore = await cookies();
        const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
        const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

        const title = project?.title ? `${project.title} | DEULEUX` : translations[lang].seo.work.title;
        const description = project?.challenge || translations[lang].seo.work.description;

        // Dynamically build the OG Image URL
        const ogUrl = new URL(
            process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        );
        ogUrl.pathname = '/api/og';
        ogUrl.searchParams.set('title', project?.title || 'Our Work');
        ogUrl.searchParams.set('subtitle', project?.client || 'Explore our latest projects');
        ogUrl.searchParams.set('context', 'Case Study');
        if (project?.coverImage) {
            ogUrl.searchParams.set('bg', project.coverImage);
        }

        return {
            title,
            description,
            openGraph: {
                title,
                description,
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

export default function ProjectPage() {
    return <ProjectClient />;
}
