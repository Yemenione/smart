import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import AgencyClient from "./AgencyClient";

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
    const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

    return {
        title: translations[lang].seo.agency.title,
        description: translations[lang].seo.agency.description,
        openGraph: {
            title: translations[lang].seo.agency.title,
            description: translations[lang].seo.agency.description,
            locale: lang,
            type: 'website',
        },
    };
}

export default function AgencyPage() {
    return <AgencyClient />;
}
