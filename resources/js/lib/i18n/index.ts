import { commonTranslations } from "./common";
import { seoTranslations } from "./seo";
import { marketingTranslations } from "./marketing";
import { projectTranslations } from "./projects";
import { storeTranslations } from "./store";
import { contentTranslations } from "./content";

export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        ...seoTranslations.fr,
        ...commonTranslations.fr,
        ...marketingTranslations.fr,
        ...projectTranslations.fr,
        ...storeTranslations.fr,
        ...contentTranslations.fr,
    },
    en: {
        ...seoTranslations.en,
        ...commonTranslations.en,
        ...marketingTranslations.en,
        ...projectTranslations.en,
        ...storeTranslations.en,
        ...contentTranslations.en,
    },
};
