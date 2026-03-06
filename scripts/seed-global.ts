import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Seeding Projects, Slides & FAQ ---');

    // 1. PROJECTS
    await prisma.project.deleteMany({});
    const projects = [
        {
            slug: "aura-paris",
            title: "Aura Paris",
            titleFr: "Aura Paris",
            client: "Aura Luxury Group",
            role: "E-Commerce / Design",
            year: "2024",
            techStack: "Next.js, Shopify, WebGL",
            challenge: "Creating a weightless luxury shopping experience for a high-end Parisian brand.",
            challengeFr: "Créer une expérience d'achat de luxe en apesanteur pour une marque parisienne haut de gamme.",
            solution: "Implemented a headless architecture with custom WebGL transitions and edge caching.",
            solutionFr: "Mise en œuvre d'une architecture headless avec des transitions WebGL personnalisées et un caching edge.",
            coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
            gallery: JSON.stringify(["https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200"]),
            liveUrl: "https://aura.paris",
            order: 1
        },
        {
            slug: "vibepos-system",
            title: "VibePOS Core",
            titleFr: "VibePOS Core",
            client: "Vibe Systems",
            role: "System Architecture",
            year: "2023",
            techStack: "Laravel, React, PWA",
            challenge: "Designing a robust POS system that works perfectly offline for high-traffic restaurants.",
            challengeFr: "Conception d'un système POS robuste qui fonctionne parfaitement hors-ligne pour les restaurants à fort trafic.",
            solution: "Built an offline-first PWA with local database syncing and real-time analytics.",
            solutionFr: "Construction d'une PWA offline-first avec synchronisation de base de données locale et analyses en temps réel.",
            coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
            gallery: JSON.stringify(["https://images.unsplash.com/photo-1556740734-758254c46d3e?q=80&w=1200"]),
            liveUrl: "https://vibepos.com",
            order: 2
        }
    ];

    for (const p of projects) {
        await prisma.project.create({ data: p });
    }

    // 2. HERO SLIDES
    await prisma.heroSlide.deleteMany({});
    const slides = [
        {
            title: "DIGITAL ARCHITECTURE.",
            subtitle: "Engineering weightless experiences for the next era of the web.",
            price: null,
            ctaText: "Explore Work",
            ctaLink: "/work",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
            order: 1
        },
        {
            title: "BRUTALIST DESIGN.",
            subtitle: "Minimalism meets supreme performance. We build what's next.",
            price: null,
            ctaText: "Discover ADN",
            ctaLink: "/agency",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000",
            order: 2
        }
    ];

    for (const s of slides) {
        await prisma.heroSlide.create({ data: s });
    }

    // 3. FAQ
    await prisma.fAQ.deleteMany({});
    const faqs = [
        {
            question: "What is your typical project timeline?",
            answer: "Most complex digital architectures take between 3 to 6 months from initial conception to final deployment, depending on the scope.",
            order: 1
        },
        {
            question: "Do you offer post-launch support?",
            answer: "Yes, we provide ongoing maintenance and strategic evolution for all platforms we engineer.",
            order: 2
        }
    ];

    for (const f of faqs) {
        await prisma.fAQ.create({ data: f });
    }

    console.log('--- Global Seed Completed ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
