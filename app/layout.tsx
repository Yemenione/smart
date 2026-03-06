import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CursorSpotlight from "@/components/CursorSpotlight";
import CinematicNoise from "@/components/CinematicNoise";
import GridBackground from "@/components/GridBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentModal from "@/components/ExitIntentModal";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

import { cookies } from "next/headers";
import { translations, Language } from "@/lib/translations";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLang = cookieStore.get('NEXT_LOCALE')?.value as Language | undefined;
  const lang = savedLang && (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'en';

  // Fetch dynamic settings for favicon, site name, and theme directly from DB
  let dynamicFavicon = "/favicon.ico";
  let dynamicSiteName = translations[lang].seo.home.title;
  let themeValues: Record<string, string> = {};

  try {
    const settings = await prisma.setting.findMany();

    const settingsMap = settings.reduce((acc, current) => {
      acc[current.key] = current.value;
      return acc;
    }, {} as Record<string, string>);

    if (settingsMap.siteName) dynamicSiteName = settingsMap.siteName;

    // Add cache buster to force browser update
    if (settingsMap.faviconUrl) {
      dynamicFavicon = `${settingsMap.faviconUrl}?v=${Date.now()}`;
    }

    // Capture theme values
    if (settingsMap.themeBackground) themeValues["--background"] = settingsMap.themeBackground;
    if (settingsMap.themeSurface) themeValues["--surface"] = settingsMap.themeSurface;
    if (settingsMap.themeBorder) themeValues["--border"] = settingsMap.themeBorder;
    if (settingsMap.themeAccent) themeValues["--accent"] = settingsMap.themeAccent;
    if (settingsMap.themeMuted) themeValues["--muted"] = settingsMap.themeMuted;

  } catch (e) {
    console.error("Layout metadata DB fetch failed", e);
  }

  // Passing theme settings globally via a context or directly in layout
  // We will inject the inline styles in the RootLayout using CSS variables
  // Since we are returning Metadata here, we need to find a way to pass it to the layout.
  // We can fetch it again in the component itself securely for RSC.

  return {
    title: {
      default: dynamicSiteName,
      template: `%s | ${dynamicSiteName}`,
    },
    description: translations[lang].seo.home.description,
    keywords: ["digital agency", "web design", "ux design", "paris", "digital strategy", "engineering"],
    authors: [{ name: "DEULEUX" }],
    creator: "DEULEUX",
    metadataBase: new URL("https://deuleux.com"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "fr-FR": "/fr",
      },
    },
    icons: {
      icon: dynamicFavicon,
      shortcut: dynamicFavicon,
      apple: dynamicFavicon,
    },
    openGraph: {
      title: dynamicSiteName,
      description: translations[lang].seo.home.description,
      siteName: 'DEULEUX Agency',
      url: "https://deuleux.com",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: dynamicSiteName,
        },
      ],
      locale: lang === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicSiteName,
      description: translations[lang].seo.home.description,
      images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let themeStyles: Record<string, string> = {};
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: ["themeBackground", "themeSurface", "themeBorder", "themeAccent", "themeMuted"]
        }
      }
    });

    if (settings.length > 0) {
      settings.forEach(s => {
        if (s.key === "themeBackground" && s.value) themeStyles["--background"] = s.value;
        if (s.key === "themeSurface" && s.value) themeStyles["--surface"] = s.value;
        if (s.key === "themeBorder" && s.value) themeStyles["--border"] = s.value;
        if (s.key === "themeAccent" && s.value) themeStyles["--accent"] = s.value;
        if (s.key === "themeMuted" && s.value) themeStyles["--muted"] = s.value;
      });
    }
  } catch (e) {
    console.error("Theme fetch failed inline", e)
  }

  return (
    <html lang="en" data-scroll-behavior="smooth" style={themeStyles as React.CSSProperties}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <LanguageProvider>
          <Preloader />
          <CustomCursor />
          <CursorSpotlight />
          <CinematicNoise />
          <GridBackground />
          <main>{children}</main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "DEULEUX",
                "url": "https://deuleux.com",
                "logo": "https://deuleux.com/logo.png",
                "sameAs": [
                  "https://instagram.com/deuleux",
                  "https://linkedin.com/company/deuleux",
                  "https://twitter.com/deuleux"
                ],
                "description": "High-end digital agency based in Paris."
              })
            }}
          />
          <WhatsAppButton />
          <ExitIntentModal />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
