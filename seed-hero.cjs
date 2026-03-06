const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding BILINGUAL Marketing Hero Slides...");

    // Clear existing slides to avoid duplicates
    await prisma.heroSlide.deleteMany();

    const slides = [
        {
            title: "LANCEZ VOTRE PLATEFORME",
            subtitle: "Global E-Commerce Solutions",
            price: "dès 1500€",
            ctaText: "Découvrir Nos Offres",
            ctaLink: "/services",
            imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop", // Customer holding credit card / ecom
            order: 0,
        },
        {
            title: "CRÉEZ L'ÉVÉNEMENT DIGITAL",
            subtitle: "High-End Corporate Websites",
            price: "à partir de 800€",
            ctaText: "Démarrer un Projet",
            ctaLink: "/contact",
            imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop", // Dark laptop coding mockup
            order: 1,
        },
        {
            title: "LA RÉVOLUTION MOBILE APP",
            subtitle: "Native iOS & Android Applications",
            price: "Consultation Gratuite",
            ctaText: "Parler à un Expert",
            ctaLink: "/agency",
            imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop", // Mobile app design
            order: 2,
        },
        {
            title: "BRANDING QUI MARQUE",
            subtitle: "Elite Visual Identity & UI/UX",
            price: "Sur Mesure",
            ctaText: "Voir le Portfolio",
            ctaLink: "/work",
            imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", // Design agency layout / branding
            order: 3,
        }
    ];

    for (const slide of slides) {
        await prisma.heroSlide.create({
            data: slide,
        });
        console.log(`Created slide: ${slide.title}`);
    }

    console.log("✅ Marketing Slides seeded successfully in French/English!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
