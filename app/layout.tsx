import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CursorSpotlight from "@/components/CursorSpotlight";
import CinematicNoise from "@/components/CinematicNoise";
import GridBackground from "@/components/GridBackground";
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

export const metadata: Metadata = {
  title: "DEULEUX | Architecture Digitale & Design Systèmes",
  description: "Agence de design et d'ingénierie basée à Paris. Nous créons des expériences numériques de haute performance. We engineer weightless digital experiences.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
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
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
