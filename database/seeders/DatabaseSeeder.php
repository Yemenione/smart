<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\ProductApp;
use App\Models\Post;
use App\Models\Project;
use App\Models\HeroSlide;
use App\Models\FAQ;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    // use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Cleanup existing data
        Schema::disableForeignKeyConstraints();
        FAQ::truncate();
        HeroSlide::truncate();
        Post::truncate();
        Project::truncate();
        ProductApp::truncate();
        Category::truncate();
        Schema::enableForeignKeyConstraints();

        // Keep the main admin user, or update if exists
        $user = User::updateOrCreate(
            ['email' => 'team@smartouies.fr'],
            [
                'name' => 'Smartouies Team',
                'password' => Hash::make('securepassword123'),
                'role' => 'ADMIN',
            ]
        );

        // 2. Categories
        $engCat = Category::create(['name' => 'Engineering']);
        $desCat = Category::create(['name' => 'Design']);
        $strCat = Category::create(['name' => 'Strategy']);

        // 3. PRODUCTS (OFFERS/BOUTIQUE)
        $products = [
            [
                'name' => "Starter Web. One", 'name_fr' => "Web Starter. One",
                'category' => "Starter", 'category_fr' => "Démarrage",
                'description' => "High-performance landing page for startups. Fast, responsive, and SEO-ready.",
                'description_fr' => "Landing page haute performance pour startups. Rapide, responsive et prête pour le SEO.",
                'features' => "1 Page, Fast Loading, Mobile Optimized, Basic SEO",
                'features_fr' => "1 Page, Chargement rapide, Optimisé mobile, SEO de base",
                'price_text' => "€80 Setup", 'price_text_fr' => "80€ Installation",
                'image_url' => "products/starter.png",
                'demo_link' => "https://starter.deuleux.com", 'is_popular' => true, 'order' => 0
            ],
            [
                'name' => "VibePOS. Elite", 'name_fr' => "VibePOS. Élite",
                'category' => "Restaurant", 'category_fr' => "Restauration",
                'description' => "Enterprise POS system with offline-first PWA architecture and real-time inventory tracking.",
                'description_fr' => "Système POS d'entreprise avec architecture PWA offline-first et suivi d'inventaire en temps réel.",
                'features' => "Offline Operations, Shift Management, Multi-user support, Analytics 2.0",
                'features_fr' => "Opérations hors-ligne, Gestion des postes, Support multi-utilisateurs, Analyses 2.0",
                'price_text' => "€149/mo", 'price_text_fr' => "149€/mois",
                'image_url' => "products/pos_elite.png",
                'demo_link' => "https://vibepos.deuleux.com", 'is_popular' => true, 'order' => 1
            ],
            [
                'name' => "AuraCommerce HQ", 'name_fr' => "AuraCommerce HQ",
                'category' => "E-Commerce", 'category_fr' => "E-Commerce",
                'description' => "Headless e-commerce starter for luxury brands requiring sub-second performance and cinematic UX.",
                'description_fr' => "Starter e-commerce headless pour les marques de luxe exigeant une performance ultra-rapide et une UX cinématique.",
                'features' => "Next.js Edge, Shopify API, WebGL Transitions, Premium SEO",
                'features_fr' => "Next.js Edge, API Shopify, Transitions WebGL, SEO Premium",
                'price_text' => "€199/mo", 'price_text_fr' => "199€/mois",
                'image_url' => "products/aura_ecommerce.png",
                'demo_link' => "https://aura.deuleux.com", 'is_popular' => true, 'order' => 2
            ],
            [
                'name' => "CRM Hub Elite", 'name_fr' => "CRM Hub Élite",
                'category' => "SaaS", 'category_fr' => "SaaS",
                'description' => "Scalable customer relationship management for high-growth tech teams.",
                'description_fr' => "Gestion de la relation client évolutive pour les équipes tech à forte croissance.",
                'features' => "Automated Workflows, AI Insights, Multi-channel Sync",
                'features_fr' => "Workflows automatisés, Analyses IA, Synchro multi-canaux",
                'price_text' => "€299/mo", 'price_text_fr' => "299€/mois",
                'image_url' => "products/crm_vibe.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 3
            ],
            [
                'name' => "Zenith HR", 'name_fr' => "Zénith RH",
                'category' => "Corporate", 'category_fr' => "Entreprise",
                'description' => "Modern HR management platform for globally distributed remote companies.",
                'description_fr' => "Plateforme de gestion RH moderne pour les entreprises en télétravail international.",
                'features' => "Global Payroll, Talent Portal, Compliance Engine",
                'features_fr' => "Paie mondiale, Portail talents, Moteur de conformité",
                'price_text' => "€500/mo", 'price_text_fr' => "500€/mois",
                'image_url' => "products/hr_zenith.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 4
            ],
            [
                'name' => "LuxeBooking Custom", 'name_fr' => "LuxeBooking Sur-Mesure",
                'category' => "Custom", 'category_fr' => "Sur-Mesure",
                'description' => "Bespoke reservation engine for boutique hotels and luxury retreats.",
                'description_fr' => "Moteur de réservation sur-mesure pour hôtels de charme et retraites de luxe.",
                'features' => "Interactive Maps, 3D Room Previews, concierge API",
                'features_fr' => "Cartes interactives, Aperçus 3D, API conciergerie",
                'price_text' => "€5000 Setup", 'price_text_fr' => "5000€ Installation",
                'image_url' => "products/hotel_luxe.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 5
            ],
            [
                'name' => "E-Menu Pro", 'name_fr' => "E-Menu Pro",
                'category' => "Restaurant", 'category_fr' => "Restauration",
                'description' => "Digital dining experience with QR ordering and inventory forecasting.",
                'description_fr' => "Expérience culinaire digitale avec commande QR et prévision d'inventaire.",
                'features' => "Real-time updates, QR Ordering, Analytics",
                'features_fr' => "Mises à jour réelles, Commande QR, Analyses",
                'price_text' => "€49/mo", 'price_text_fr' => "49€/mois",
                'image_url' => "products/pos_elite.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 6
            ],
            [
                'name' => "SecurePay Gateway", 'name_fr' => "Passerelle SecurePay",
                'category' => "SaaS", 'category_fr' => "SaaS",
                'description' => "High-security payment infrastructure for international e-commerce.",
                'description_fr' => "Infrastructure de paiement haute sécurité pour l'e-commerce international.",
                'features' => "Fraud Protection, Multi-currency, 1-Click Checkout",
                'features_fr' => "Protection fraude, Multi-devises, Paiement en 1 clic",
                'price_text' => "€0.05 / trans", 'price_text_fr' => "0.05€ / trans",
                'image_url' => "products/aura_ecommerce.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 7
            ],
            [
                'name' => "Global Logistics", 'name_fr' => "Logistique Globale",
                'category' => "Custom", 'category_fr' => "Sur-Mesure",
                'description' => "Real-time tracking and optimization dashboard for shipping fleets.",
                'description_fr' => "Tableau de bord d'optimisation et suivi temps réel pour flottes de transport.",
                'features' => "Live Tracking, Route Optimization, Fleet Health",
                'features_fr' => "Suivi en direct, Optimisation trajet, Santé flotte",
                'price_text' => "€8000 Setup", 'price_text_fr' => "8000€ Installation",
                'image_url' => "products/crm_vibe.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 8
            ],
            [
                'name' => "Aura Social Engine", 'name_fr' => "Aura Social Engine",
                'category' => "E-Commerce", 'category_fr' => "E-Commerce",
                'description' => "Social commerce platform integrating TikTok and Instagram shop APIs.",
                'description_fr' => "Plateforme de social-commerce intégrant les APIs TikTok et Instagram Shopping.",
                'features' => "Social Sync, Influencer Portal, Viral Analytics",
                'features_fr' => "Synchro Sociale, Portail influenceurs, Analyses virales",
                'price_text' => "€399/mo", 'price_text_fr' => "399€/mois",
                'image_url' => "products/aura_ecommerce.png",
                'demo_link' => null, 'is_popular' => false, 'order' => 9
            ]
        ];

        foreach ($products as $p) {
            ProductApp::create($p);
        }

        // 4. POSTS (INSIGHTS/PERSPECTIVES)
        $postData = [
            [
                'title' => "The Future of AI-Driven UX Design",
                'title_fr' => "Le futur du design UX piloté par l'IA",
                'slug' => 'future-ai-ux-design',
                'content' => "Exploring how artificial intelligence is transforming the way we create user experiences. From generative UI to predictive navigation, the landscape is shifting rapidly.",
                'content_fr' => "Explorer comment l'intelligence artificielle transforme la façon dont nous créons des expériences utilisateur. De l'interface générative à la navigation prédictive.",
                'image_url' => "posts/ai_strategy.png",
                'category_id' => $desCat->id
            ],
            [
                'title' => "Sub-Second Performance in E-Commerce",
                'title_fr' => "Performance ultra-rapide en E-Commerce",
                'slug' => 'sub-second-performance-ecommerce',
                'content' => "In the luxury digital space, milliseconds mean millions. We break down the technical stack required to achieve sub-second load times on mobile devices.",
                'content_fr' => "Dans l'espace numérique du luxe, les millisecondes valent des millions. Nous décomposons la pile technique requise.",
                'image_url' => "posts/ecommerce_old.png",
                'category_id' => $engCat->id
            ],
            [
                'title' => "Scaling Digital Strategy for 2024",
                'title_fr' => "Mise à l'échelle de la stratégie digitale pour 2024",
                'slug' => 'scaling-digital-strategy-2024',
                'content' => "A comprehensive guide to modern digital strategy, focusing on cross-channel integration and data-driven decision making.",
                'content_fr' => "Un guide complet sur la stratégie digitale moderne, axé sur l'intégration multicanal.",
                'image_url' => "posts/strategy_old.png",
                'category_id' => $strCat->id
            ],
            [
                'title' => "Inside the Modern Digital Agency",
                'title_fr' => "Au cœur de l'agence digitale moderne",
                'slug' => 'inside-modern-digital-agency',
                'content' => "A look behind the scenes at Deuleux. Our culture, our tools, and how we deliver premium results for our clients worldwide.",
                'content_fr' => "Un regard dans les coulisses de Deuleux. Notre culture, nos outils et notre façon de travailler.",
                'image_url' => "posts/agency_life.png",
                'category_id' => $strCat->id
            ],
            [
                'title' => "Mastering Framer Motion for Cinematic UX",
                'title_fr' => "Maîtriser Framer Motion pour une UX cinématique",
                'slug' => 'mastering-framer-motion',
                'content' => "Motion is the soul of a weightless interface. Learn how to use Framer Motion to create fluid, immersive transitions that wow users.",
                'content_fr' => "Le mouvement est l'âme d'une interface en apesanteur. Apprenez à utiliser Framer Motion.",
                'image_url' => "posts/ai_ux_old.png",
                'category_id' => $desCat->id
            ],
            [
                'title' => "The Rise of Headless Commerce",
                'title_fr' => "L'essor du commerce Headless",
                'slug' => 'rise-headless-commerce',
                'content' => "Why industry leaders are moving away from traditional monoliths in favor of flexible, API-driven architectures.",
                'content_fr' => "Pourquoi les leaders de l'industrie abandonnent les monolithes traditionnels au profit d'architectures flexibles.",
                'image_url' => "posts/ecommerce_old.png",
                'category_id' => $engCat->id
            ],
            [
                'title' => "SEO Strategies for Next.js 14",
                'title_fr' => "Stratégies SEO pour Next.js 14",
                'slug' => 'seo-strategies-nextjs-14',
                'content' => "Harnessing the power of Server Components and Metadata API to dominate search engine results.",
                'content_fr' => "Exploiter la puissance des Server Components et de l'API Metadata pour dominer les résultats de recherche.",
                'image_url' => "posts/strategy_old.png",
                'category_id' => $strCat->id
            ],
            [
                'title' => "Cybersecurity in Modern Web Apps",
                'title_fr' => "Cybersécurité dans les applications web modernes",
                'slug' => 'cybersecurity-modern-web',
                'content' => "Protecting user data in an era of increasing digital threats. Best practices for Laravel and React developers.",
                'content_fr' => "Protéger les données des utilisateurs à une époque de menaces numériques croissantes.",
                'image_url' => "posts/lifestyle_old.png",
                'category_id' => $engCat->id
            ],
            [
                'title' => "Designing for Accessibility",
                'title_fr' => "Concevoir pour l'accessibilité",
                'slug' => 'designing-accessibility',
                'content' => "Inclusion is not an afterthought. How to build beautiful interfaces that are accessible to everyone, regardless of ability.",
                'content_fr' => "L'inclusion n'est pas une réflexion après coup. Comment construire de belles interfaces accessibles à tous.",
                'image_url' => "posts/ai_ux_old.png",
                'category_id' => $desCat->id
            ],
            [
                'title' => "The Power of Minimalist Branding",
                'title_fr' => "La puissance du branding minimaliste",
                'slug' => 'power-minimalist-branding',
                'content' => "In a world of noise, silence is luxury. Why minimalist design communicates prestige and focus in the digital age.",
                'content_fr' => "Dans un monde de bruit, le silence est un luxe. Pourquoi le design minimaliste communique le prestige.",
                'image_url' => "posts/strategy_old.png",
                'category_id' => $desCat->id
            ],
        ];

        foreach ($postData as $data) {
            Post::create(array_merge($data, [
                'published' => true,
                'author_id' => $user->id
            ]));
        }

        // 5. PROJECTS (WORK/RÉALISATIONS)
        Project::create([
            'slug' => 'aura-paris',
            'title' => 'Aura Paris', 'title_fr' => 'Aura Paris',
            'client' => 'Aura Luxury', 'role' => 'E-Commerce Experience',
            'year' => '2024', 'tech_stack' => 'Next.js, Shopify, WebGL',
            'challenge' => 'Creating a cinematic luxury experience for a high-end fashion house.',
            'challenge_fr' => 'Créer une expérience de luxe cinématique pour une maison de couture haut de gamme.',
            'solution' => 'Headless architecture with custom shaders and sub-second load times.',
            'solution_fr' => 'Architecture headless avec shaders personnalisés et temps de chargement records.',
            'cover_image' => 'projects/aura_paris.png',
            'published' => true, 'order' => 1
        ]);
        Project::create([
            'slug' => 'quantum-ecom',
            'title' => 'Quantum E-Commerce', 'title_fr' => 'Quantum E-Commerce',
            'client' => 'Quantum Corp', 'role' => 'Headless Architecture',
            'year' => '2023', 'tech_stack' => 'Next.js, Laravel, Tailwind CSS',
            'challenge' => 'Decoupling a massive legacy monolith into a scalable ecosystem.',
            'challenge_fr' => 'Découpler un monolithe massif en un écosystème scalable.',
            'solution' => 'Next.js on the edge with a robust Laravel backend API.',
            'solution_fr' => "Next.js sur l'edge avec un backend API Laravel robuste.",
            'cover_image' => 'projects/quantum_ecom.png',
            'published' => true, 'order' => 2
        ]);

        // 6. HERO SLIDES
        HeroSlide::truncate();
        HeroSlide::create([
            'title' => 'DIGITAL ARCHITECTURE.',
            'subtitle' => 'CRAFTING WEIGHTLESS EXPERIENCES FOR THE NEXT ERA.',
            'cta_text' => 'Explore Projects',
            'cta_link' => '/work',
            'image_url' => 'hero/digital_architecture.png',
            'order' => 1
        ]);
        HeroSlide::create([
            'title' => "ELITE BOUTIQUE.",
            'subtitle' => "DISCOVER OUR CURATED DIGITAL SOLUTIONS.",
            'image_url' => "hero/boutique_store.png",
            'cta_text' => "Shop Now",
            'cta_link' => "/store",
            'order' => 2
        ]);
        HeroSlide::create([
            'title' => "SUB-SECOND VISION.",
            'subtitle' => "PERFORMANCE-DRIVEN DESIGN FOR LUXURY BRANDS.",
            'image_url' => "hero/innovation.png",
            'cta_text' => "Read Insights",
            'cta_link' => "/insights",
            'order' => 3
        ]);

        // 7. FAQ
        FAQ::create([
            'question' => 'What is your project timeline?',
            'answer' => 'Typically 3 to 6 months.',
            'order' => 1
        ]);
        FAQ::create([
            'question' => "Do you provide post-launch support?",
            'answer' => "Yes, we offer monthly maintenance and scaling packages.",
            'order' => 2
        ]);
    }
}
