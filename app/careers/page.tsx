import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import CareersClient from "./CareersClient";

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
    const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

    return {
        title: translations[lang].seo.careers.title,
        description: translations[lang].seo.careers.description,
        openGraph: {
            title: translations[lang].seo.careers.title,
            description: translations[lang].seo.careers.description,
            locale: lang,
            type: 'website',
        },
    };
}

export default function CareersPage() {
    return <CareersClient />;
}
