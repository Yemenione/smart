import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Cleaning existing products ---');
    await prisma.productApp.deleteMany({});

    const products = [
        {
            name: "VibePOS. Elite",
            nameFr: "VibePOS. Élite",
            category: "Restaurant",
            categoryFr: "Restauration",
            description: "Complete restaurant management system with multi-terminal support, offline-first PWA architecture, and advanced analytics.",
            descriptionFr: "Système complet de gestion de restaurant avec support multi-terminaux, architecture PWA offline-first et analyses avancées.",
            features: "Offline Operations, Shift Management, Z-Reports, Multi-user support, Real-time Inventory",
            featuresFr: "Opérations Hors-ligne, Gestion des Postes, Rapports Z, Support Multi-utilisateurs, Inventaire Temps Réel",
            priceText: "€149/mo",
            priceTextFr: "149€/mois",
            imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
            demoLink: "https://vibepos.deuleux.com",
            isPopular: true,
            order: 1
        },
        {
            name: "Socotra Experience",
            nameFr: "L'Expérience Socotra",
            category: "Travel & Eco-Tourism",
            categoryFr: "Voyage & Écotourisme",
            description: "A premium booking and storytelling portal for the Socotra Archipelago. Includes custom reservation systems for eco-stays and interactive maps.",
            descriptionFr: "Un portail premium de réservation et de narration pour l'archipel de Socotra. Inclut des systèmes de réservation sur mesure et des cartes interactives.",
            features: "Interactive SVG Maps, Bespoke Booking Engine, Multi-language Support, Native Photo Gallery",
            featuresFr: "Cartes SVG Interactives, Moteur de Réservaison Sur-mesure, Support Multilingue, Galerie Photo Native",
            priceText: "€2500 Setup",
            priceTextFr: "2500€ Installation",
            imageUrl: "https://images.unsplash.com/photo-1620165985066-5452f0269f8c?q=80&w=1200", // Dragon Blood Tree image
            demoLink: "https://socotra.deuleux.com",
            isPopular: false,
            order: 2
        },
        {
            name: "AuraCommerce HQ",
            nameFr: "Siège AuraCommerce",
            category: "E-Commerce",
            categoryFr: "E-Commerce",
            description: "Headless e-commerce starter built with Next.js and Shopify. Optimized for luxury brands requiring sub-second performance.",
            descriptionFr: "Starter e-commerce headless construit avec Next.js et Shopify. Optimisé pour les marques de luxe exigeant des performances ultra-rapides.",
            features: "Shopify Hydrogen base, Edge Caching, Dynamic Product variants, Advanced SEO schema",
            featuresFr: "Base Shopify Hydrogen, Mise en cache Edge, Variantes produits dynamiques, Schéma SEO avancé",
            priceText: "€199/mo",
            priceTextFr: "199€/mois",
            imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
            demoLink: "https://aura.deuleux.com",
            isPopular: true,
            order: 0
        },
        {
            name: "Nexus CRM",
            nameFr: "Nexus CRM",
            category: "Enterprise Software",
            categoryFr: "Logiciel Entreprise",
            description: "Custom sales pipeline management for creative agencies. Minimalist interface with maximum performance.",
            descriptionFr: "Gestion personnalisée du pipeline de vente pour les agences créatives. Interface minimaliste avec performance maximale.",
            features: "Kanban Pipelines, Automated Invoicing, Client Portal, Team Collaboration",
            featuresFr: "Pipelines Kanban, Facturation Automatisée, Portail Client, Collaboration d'Équipe",
            priceText: "Custom Quote",
            priceTextFr: "Devis Limité",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
            demoLink: null,
            isPopular: false,
            order: 3
        }
    ];

    for (const product of products) {
        await prisma.productApp.create({
            data: product
        });
    }

    console.log('--- Seed completed: 4 products created ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
