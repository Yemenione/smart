import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Seeding SEO-Targeted Insights ---');

    // 1. Get Author
    const author = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || await prisma.user.findFirst();
    if (!author) {
        console.error('No author found. Please run initial seed first.');
        return;
    }

    // 2. Get Categories
    const engineeringCat = await prisma.category.findUnique({ where: { name: 'Engineering' } });
    const designCat = await prisma.category.findUnique({ where: { name: 'Design' } });
    const strategyCat = await prisma.category.findUnique({ where: { name: 'Strategy' } });

    const seoPosts = [
        {
            title: "How to Build High-Performance Next.js Apps in 2024",
            titleFr: "Comment créer des applications Next.js haute performance en 2024",
            slug: "nextjs-performance-guide-2024",
            content: "SEO is more than just keywords. It's about Core Web Vitals. Discover how we optimize Next.js for sub-second loading speeds using ISR, image optimization, and minimalist code structures.",
            contentFr: "Le SEO n'est pas seulement une question de mots-clés. Il s'agit des Core Web Vitals. Découvrez comment nous optimisons Next.js pour des vitesses de chargement inférieures à la seconde en utilisant l'ISR, l'optimisation d'image et des structures de code minimalistes.",
            imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200", // Representative image
            published: true,
            categoryId: engineeringCat?.id,
            authorId: author.id
        },
        {
            title: "Laravel Backend Security: Best Practices for Enterprise",
            titleFr: "Sécurité Backend Laravel : Bonnes Pratiques pour l'Entreprise",
            slug: "laravel-backend-security-enterprise",
            content: "In the era of data breaches, your backend architecture is your first line of defense. We explore headless Laravel security, JWT authentication, and encrypted database patterns.",
            contentFr: "À l'ère des violations de données, votre architecture backend est votre première ligne de défense. Nous explorons la sécurité Laravel headless, l'authentification JWT et les modèles de bases de données chiffrées.",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200",
            published: true,
            categoryId: engineeringCat?.id,
            authorId: author.id
        },
        {
            title: "Digital Strategy: The Deuleux Methodology",
            titleFr: "Stratégie Digitale : La Méthodologie Deuleux",
            slug: "digital-strategy-methodology",
            content: "Transforming a brand requires a holistic approach. From technical audit to cinematic design, learn our process for delivering world-class digital products.",
            contentFr: "Transformer une marque nécessite une approche holistique. De l'audit technique au design cinématique, apprenez notre processus pour livrer des produits numériques de classe mondiale.",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
            published: true,
            categoryId: strategyCat?.id,
            authorId: author.id
        }
    ];

    for (const post of seoPosts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: post,
            create: post
        });
    }

    console.log(`--- SEO Seed completed: ${seoPosts.length} posts updated/created ---`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
