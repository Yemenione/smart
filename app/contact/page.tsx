import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
    const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

    return {
        title: translations[lang].seo.contact.title,
        description: translations[lang].seo.contact.description,
        openGraph: {
            title: translations[lang].seo.contact.title,
            description: translations[lang].seo.contact.description,
            locale: lang,
            type: 'website',
        },
    };
}

export default function ContactPage() {
    return <ContactClient />;
}
