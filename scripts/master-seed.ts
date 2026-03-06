import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting MASTER SEED: Restoring all platform content...');

    // 1. DATA CLEANUP (Wipe all content tables)
    console.log('🧹 Cleaning existing data...');
    await prisma.post.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.heroSlide.deleteMany({});
    await prisma.fAQ.deleteMany({});
    await prisma.productApp.deleteMany({});

    // 2. USER & CATEGORIES
    console.log('👤 Setting up baseline users and categories...');
    let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!author) {
        author = await prisma.user.create({
            data: {
                email: 'team@deuleux.com',
                name: 'Deuleux Team',
                password: 'securepassword123',
                role: 'ADMIN'
            }
        });
    }

    const catNames = ['Engineering', 'Design', 'Strategy'];
    for (const name of catNames) {
        await prisma.category.create({ data: { name } });
    }

    const engCat = await prisma.category.findUnique({ where: { name: 'Engineering' } });
    const desCat = await prisma.category.findUnique({ where: { name: 'Design' } });
    const strCat = await prisma.category.findUnique({ where: { name: 'Strategy' } });

    // 3. PRODUCTS (OFFERS/BOUTIQUE)
    console.log('🛒 Restoring Store Offers (Boutique)...');
    const products = [
        {
            name: "Starter Web. One",
            nameFr: "Web Starter. One",
            category: "Starter",
            categoryFr: "Démarrage",
            description: "High-performance landing page for startups. Fast, responsive, and SEO-ready.",
            descriptionFr: "Landing page haute performance pour startups. Rapide, responsive et prête pour le SEO.",
            features: "1 Page, Fast Loading, Mobile Optimized, Basic SEO",
            featuresFr: "1 Page, Chargement rapide, Optimisé mobile, SEO de base",
            priceText: "€80 Setup",
            priceTextFr: "80€ Installation",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
            demoLink: "https://starter.deuleux.com",
            isPopular: true,
            order: 0
        },
        {
            name: "VibePOS. Elite",
            nameFr: "VibePOS. Élite",
            category: "Restaurant",
            categoryFr: "Restauration",
            description: "Enterprise POS system with offline-first PWA architecture and real-time inventory tracking.",
            descriptionFr: "Système POS d'entreprise avec architecture PWA offline-first et suivi d'inventaire en temps réel.",
            features: "Offline Operations, Shift Management, Multi-user support, Analytics 2.0",
            featuresFr: "Opérations hors-ligne, Gestion des postes, Support multi-utilisateurs, Analyses 2.0",
            priceText: "€149/mo",
            priceTextFr: "149€/mois",
            imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
            demoLink: "https://vibepos.deuleux.com",
            isPopular: true,
            order: 1
        },
        {
            name: "AuraCommerce HQ",
            nameFr: "AuraCommerce HQ",
            category: "E-Commerce",
            categoryFr: "E-Commerce",
            description: "Headless e-commerce starter for luxury brands requiring sub-second performance and cinematic UX.",
            descriptionFr: "Starter e-commerce headless pour les marques de luxe exigeant une performance ultra-rapide et une UX cinématique.",
            features: "Next.js Edge, Shopify API, WebGL Transitions, Premium SEO",
            featuresFr: "Next.js Edge, API Shopify, Transitions WebGL, SEO Premium",
            priceText: "€199/mo",
            priceTextFr: "199€/mois",
            imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
            demoLink: "https://aura.deuleux.com",
            isPopular: true,
            order: 2
        },
        {
            name: "CRM Hub Elite",
            nameFr: "CRM Hub Élite",
            category: "SaaS",
            categoryFr: "SaaS",
            description: "Scalable customer relationship management for high-growth tech teams.",
            descriptionFr: "Gestion de la relation client évolutive pour les équipes tech à forte croissance.",
            features: "Automated Workflows, AI Insights, Multi-channel Sync",
            featuresFr: "Workflows automatisés, Analyses IA, Synchro multi-canaux",
            priceText: "€299/mo",
            priceTextFr: "299€/mois",
            imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
            isPopular: false,
            order: 3
        },
        {
            name: "Zenith HR",
            nameFr: "Zénith RH",
            category: "Corporate",
            categoryFr: "Entreprise",
            description: "Modern HR management platform for globally distributed remote companies.",
            descriptionFr: "Plateforme de gestion RH moderne pour les entreprises en télétravail international.",
            features: "Global Payroll, Talent Portal, Compliance Engine",
            featuresFr: "Paie mondiale, Portail talents, Moteur de conformité",
            priceText: "€500/mo",
            priceTextFr: "500€/mois",
            imageUrl: "https://images.unsplash.com/photo-14541658337ec-c8a973b0a68c?q=80&w=1200",
            isPopular: false,
            order: 4
        },
        {
            name: "LuxeBooking Custom",
            nameFr: "LuxeBooking Sur-Mesure",
            category: "Custom",
            categoryFr: "Sur-Mesure",
            description: "Bespoke reservation engine for boutique hotels and luxury retreats.",
            descriptionFr: "Moteur de réservation sur-mesure pour hôtels de charme et retraites de luxe.",
            features: "Interactive Maps, 3D Room Previews, concierge API",
            featuresFr: "Cartes interactives, Aperçus 3D, API conciergerie",
            priceText: "€5000 Setup",
            priceTextFr: "5000€ Installation",
            imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
            isPopular: false,
            order: 5
        },
        {
            name: "E-Menu Pro",
            nameFr: "E-Menu Pro",
            category: "Restaurant",
            categoryFr: "Restauration",
            description: "Digital dining experience with QR ordering and inventory forecasting.",
            descriptionFr: "Expérience culinaire digitale avec commande QR et prévision d'inventaire.",
            features: "Real-time updates, QR Ordering, Analytics",
            featuresFr: "Mises à jour réelles, Commande QR, Analyses",
            priceText: "€49/mo",
            priceTextFr: "49€/mois",
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
            isPopular: false,
            order: 6
        },
        {
            name: "SecurePay Gateway",
            nameFr: "Passerelle SecurePay",
            category: "SaaS",
            categoryFr: "SaaS",
            description: "High-security payment infrastructure for international e-commerce.",
            descriptionFr: "Infrastructure de paiement haute sécurité pour l'e-commerce international.",
            features: "Fraud Protection, Multi-currency, 1-Click Checkout",
            featuresFr: "Protection fraude, Multi-devises, Paiement en 1 clic",
            priceText: "€0.05 / trans",
            priceTextFr: "0.05€ / trans",
            imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200",
            isPopular: false,
            order: 7
        },
        {
            name: "Global Logistics",
            nameFr: "Logistique Globale",
            category: "Custom",
            categoryFr: "Sur-Mesure",
            description: "Real-time tracking and optimization dashboard for shipping fleets.",
            descriptionFr: "Tableau de bord d'optimisation et suivi temps réel pour flottes de transport.",
            features: "Live Tracking, Route Optimization, Fleet Health",
            featuresFr: "Suivi en direct, Optimisation trajet, Santé flotte",
            priceText: "€8000 Setup",
            priceTextFr: "8000€ Installation",
            imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200",
            isPopular: false,
            order: 8
        },
        {
            name: "Aura Social Engine",
            nameFr: "Aura Social Engine",
            category: "E-Commerce",
            categoryFr: "E-Commerce",
            description: "Social commerce platform integrating TikTok and Instagram shop APIs.",
            descriptionFr: "Plateforme de social-commerce intégrant les APIs TikTok et Instagram Shopping.",
            features: "Social Sync, Influencer Portal, Viral Analytics",
            featuresFr: "Synchro Sociale, Portail Influenceurs, Analyses Virales",
            priceText: "€399/mo",
            priceTextFr: "399€/mois",
            imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200",
            isPopular: false,
            order: 9
        }
    ];

    for (const p of products) {
        await prisma.productApp.create({ data: p });
    }

    // 4. POSTS (INSIGHTS/PERSPECTIVES)
    console.log('✍️ Restoring Insights & SEO Posts...');
    const posts = [
        {
            title: "The Architecture of Weightless Interfaces",
            titleFr: "L'Architecture des Interfaces en Apesanteur",
            slug: "architecture-weightless-interfaces",
            content: "Deep dive into cinematic web experiences using Next.js and Framer Motion.",
            contentFr: "Plongez dans les expériences web cinématiques utilisant Next.js et Framer Motion.",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
            published: true,
            categoryId: engCat?.id,
            authorId: author.id
        },
        {
            title: "Digital Luxury: The Future of E-Commerce",
            titleFr: "Luxe Digital : Le Futur de l'E-Commerce",
            slug: "digital-luxury-future",
            content: "How aesthetics and performance merge in the luxury digital space.",
            contentFr: "Comment l'esthétique et la performance fusionnent dans l'espace digital du luxe.",
            imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200",
            published: true,
            categoryId: desCat?.id,
            authorId: author.id
        },
        {
            title: "How to Build High-Performance Next.js Apps",
            titleFr: "Comment créer des applications Next.js haute performance",
            slug: "nextjs-performance-seo",
            content: "SEO and performance optimization strategies for the modern web.",
            contentFr: "Stratégies d'optimisation SEO et de performance pour le web moderne.",
            imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200",
            published: true,
            categoryId: engCat?.id,
            authorId: author.id
        }
    ];

    for (const post of posts) {
        await prisma.post.create({ data: post });
    }

    // 5. PROJECTS (WORK/RÉALISATIONS)
    console.log('🏗️ Restoring Featured Projects (Work)...');
    const projects = [
        {
            slug: "aura-paris",
            title: "Aura Paris",
            titleFr: "Aura Paris",
            client: "Aura Luxury",
            role: "E-Commerce Experience",
            year: "2024",
            techStack: "Next.js, Shopify, WebGL",
            challenge: "Creating a cinematic luxury experience for a high-end fashion house.",
            challengeFr: "Créer une expérience de luxe cinématique pour une maison de couture haut de gamme.",
            solution: "Headless architecture with custom shaders and sub-second load times.",
            solutionFr: "Architecture headless avec shaders personnalisés et temps de chargement records.",
            coverImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200",
            published: true,
            order: 1
        },
        {
            slug: "quantum-ecom",
            title: "Quantum E-Commerce",
            titleFr: "Quantum E-Commerce",
            client: "Quantum Corp",
            role: "Headless Architecture",
            year: "2023",
            techStack: "Next.js, Laravel, Tailwind CSS",
            challenge: "Decoupling a massive legacy monolith into a scalable ecosystem.",
            challengeFr: "Découpler un monolithe massif en un écosystème scalable.",
            solution: "Next.js on the edge with a robust Laravel backend API.",
            solutionFr: "Next.js sur l'edge avec un backend API Laravel robuste.",
            coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
            published: true,
            order: 2
        }
    ];

    for (const p of projects) {
        await prisma.project.create({ data: p });
    }

    // 6. HERO SLIDES
    console.log('🎞️ Restoring Hero Slides...');
    const slides = [
        {
            title: "SITE STARTER.",
            subtitle: "DÉPLOYEZ VOTRE VISION À PRIX RÉDUIT.",
            price: "80€",
            ctaText: "Démarrer Maintenant",
            ctaLink: "/contact",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
            order: 1
        },
        {
            title: "DIGITAL ARCHITECTURE.",
            subtitle: "Engineering weightless experiences for the next era of the web.",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
            ctaText: "Explore Work",
            ctaLink: "/work",
            order: 2
        }
    ];

    for (const s of slides) {
        await prisma.heroSlide.create({ data: s });
    }

    // 7. FAQ
    console.log('❓ Restoring FAQs...');
    await prisma.fAQ.create({
        data: {
            question: "What is your project timeline?",
            answer: "Typically 3 to 6 months.",
            order: 1
        }
    });

    console.log('✅ MASTER SEED COMPLETED: Platform fully restored!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
