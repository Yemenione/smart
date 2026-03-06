import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Seeding Insights ---');

    // 1. Ensure an author exists
    let author = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });

    if (!author) {
        author = await prisma.user.findFirst();
    }

    if (!author) {
        console.log('Creating fallback author...');
        author = await prisma.user.create({
            data: {
                email: 'team@deuleux.com',
                name: 'Deuleux Team',
                password: 'password123', // Placeholder
                role: 'ADMIN'
            }
        });
    }

    // 2. Ensure Categories exist
    const categories = [
        { name: 'Engineering' },
        { name: 'Design' },
        { name: 'Strategy' }
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat
        });
    }

    const engineeringCat = await prisma.category.findUnique({ where: { name: 'Engineering' } });
    const designCat = await prisma.category.findUnique({ where: { name: 'Design' } });
    const strategyCat = await prisma.category.findUnique({ where: { name: 'Strategy' } });

    // 3. Clear existing posts to avoid duplicates during seed
    await prisma.post.deleteMany({});

    const posts = [
        {
            title: "The Architecture of Weightless Interfaces",
            titleFr: "L'Architecture des Interfaces en Apesanteur",
            slug: "architecture-weightless-interfaces",
            content: "Deep dive into how we use Next.js and Framer Motion to create high-performance web experiences that feel cinematic yet incredibly fast.",
            contentFr: "Plongez dans la façon dont nous utilisons Next.js et Framer Motion pour créer des expériences web haute performance, cinématiques et incroyablement rapides.",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
            published: true,
            categoryId: engineeringCat?.id,
            authorId: author.id
        },
        {
            title: "Brutalist Design: Redefining Digital Luxury",
            titleFr: "Le Design Brutaliste : Redéfinir le Luxe Digital",
            slug: "brutalist-design-digital-luxury",
            content: "Exploring the intersection of raw aesthetics and premium digital experiences. Why minimalism is the ultimate form of sophistication.",
            contentFr: "Explorer l'intersection entre l'esthétique brute et les expériences numériques premium. Pourquoi le minimalisme est la forme ultime de sophistication.",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
            published: true,
            categoryId: designCat?.id,
            authorId: author.id
        },
        {
            title: "Scaling SaaS for Global Traffic",
            titleFr: "Scaler le SaaS pour un Trafic Mondial",
            slug: "scaling-saas-global-traffic",
            content: "Technical strategies for handling millions of requests using edge computing, distributed databases, and intelligent caching.",
            contentFr: "Stratégies techniques pour gérer des millions de requêtes en utilisant l'edge computing, les bases de données distribuées et le caching intelligent.",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200",
            published: true,
            categoryId: engineeringCat?.id,
            authorId: author.id
        },
        {
            title: "Digital Transformation: Beyond the Buzzword",
            titleFr: "Transformation Digitale : Au-delà du mot à la mode",
            slug: "digital-transformation-strategy",
            content: "How established brands can pivot to a technology-first approach without losing their heritage or client trust.",
            contentFr: "Comment les marques établies peuvent pivoter vers une approche technocentrique sans perdre leur héritage ou la confiance de leurs clients.",
            imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
            published: true,
            categoryId: strategyCat?.id,
            authorId: author.id
        }
    ];

    for (const post of posts) {
        await prisma.post.create({
            data: post
        });
    }

    console.log(`--- Seed completed: ${posts.length} posts created ---`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
