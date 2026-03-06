import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import WorkClient from "./WorkClient";

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
    const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

    return {
        title: translations[lang].seo.work.title,
        description: translations[lang].seo.work.description,
        openGraph: {
            title: translations[lang].seo.work.title,
            description: translations[lang].seo.work.description,
            locale: lang,
            type: 'website',
        },
    };
}

import { projectService } from "@/lib/services/project";

export default async function WorkPage() {
    let projects: any[] = [];
    try {
        const rawProjects = await projectService.getAll();
        // Serialize the DB objects to flat JSON to remove Prisma Date objects, matching the Client Component prop expectations.
        const safeProjects = Array.isArray(rawProjects) ? rawProjects.filter(p => p.published) : [];
        projects = JSON.parse(JSON.stringify(safeProjects));
    } catch (err) {
        console.error("Failed to fetch projects for Work page", err);
    }

    return <WorkClient initialProjects={projects} />;
}
