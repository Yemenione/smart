export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        seo: {
            home: {
                title: "DEULEUX | Agence Digitale & Design Systèmes Élite Paris",
                description: "Deuleux est une agence de design et d'ingénierie basée à Paris. Nous architecturons des expériences Next.js et Laravel de haute performance pour les marques de luxe et entreprises technologiques."
            },
            services: {
                title: "Nos Expertises Digitales | Architecture & Design | DEULEUX",
                description: "Ingénierie web avancée, architecture headless Next.js, e-commerce sur-mesure Shopify et identité numérique premium."
            },
            work: {
                title: "Nos Réalisations | DEULEUX",
                description: "Découvrez notre portfolio de projets digitaux : plateformes e-commerce performantes, sites vitrines premium et applications web complexes."
            },
            agency: {
                title: "L'Agence | DEULEUX",
                description: "Nous sommes un studio de conception numérique. Innovation, performance et design d'avant-garde."
            },
            team: {
                title: "Le Collectif | DEULEUX",
                description: "Rencontrez les ingénieurs et designers qui façonnent les expériences numériques de demain au sein de Deuleux."
            },
            insights: {
                title: "Perspectives | DEULEUX",
                description: "Dernières pensées, articles et actualités technologiques de notre équipe d'ingénierie et de design."
            },
            careers: {
                title: "Carrières - Rejoignez-nous | DEULEUX",
                description: "Explorez les opportunités de carrière chez Deuleux. Rejoignez notre hub créatif et technologique à Paris ou en remote."
            },
            contact: {
                title: "Contact | DEULEUX",
                description: "Initiez une transmission avec notre hub parisien pour lancer votre prochain projet numérique d'envergure."
            }
        },
        nav: {
            services: "Services",
            work: "Réalisations",
            agency: "L'Agence",
            team: "Le Collectif",
            insights: "Perspectives",
            careers: "Carrières",
            store: "Boutique",
            startProject: "Lancer Un Projet",
        },
        hero: {
            titleLine1: "INGÉNIERIE",
            titleLine2: "DU VIDE.",
            subtitle: "Nous ne créons pas de sites internet. Nous architecturons des expériences numériques puissantes et en apesanteur.",
            ctaPrimary: "DÉCOUVRIR NOTRE ADN",
            ctaSecondary: "LANCER UN PROJET",
            mainHeadline: "NOUS ARCHITECTURONS DES EXPÉRIENCES DIGITALES.",
            scrollIndicator: "Découvrir"
        },
        homeServices: {
            title: "Engineering The Future. / Notre Expertise.",
            frontend: {
                title: "Frontend Next.js Haute Performance",
                desc: "Développement d'applications ultra-rapides, optimisées SEO, reposant sur l'écosystème React de pointe."
            },
            design: {
                title: "Design Numérique Premium",
                desc: "Des expériences digitales primées qui fusionnent le minimalisme brutaliste avec des interactions cinématiques."
            },
            backend: {
                title: "Architecture Headless Laravel",
                desc: "Des systèmes backend robustes, sécurisés et évolutifs propulsant des solutions d'entreprise complexes."
            },
            cloud: {
                title: "Systèmes API et Cloud Scalables",
                desc: "Infrastructures globales, micro-services, et développement API spécialisés pour un trafic immense."
            },
            items_list: {
                engineering: ["Architecture CMS Headless", "E-Commerce (Shopify/Next.js)", "Applications Web (SaaS)", "Développement API & Cloud"],
                design: ["Direction Artistique", "Design UI/UX", "Motion & Interaction", "Prototypage 3D & WebGL"],
                strategy: ["Stratégie de Marque", "Systèmes d'Identité Visuelle", "Typographie & Éditorial", "Directives Digitales Globales"]
            }
        },
        servicesPage: {
            title: "NOS EXPERTISES",
            subtitle: "Nous opérons à l'intersection du design brutalisme et de l'ingénierie de haute précision. Nos services sont des architectures conçues pour l'impact.",
            items: {
                engineering: {
                    title: "Ingénierie Systèmes",
                    desc: "Développement d'architectures web complexes, robustes et hautement scalables."
                },
                design: {
                    title: "Design Numérique",
                    desc: "Création d'interfaces avant-gardistes alliant esthétique premium et ergonomie parfaite."
                },
                ecommerce: {
                    title: "E-Commerce Élite",
                    desc: "Solutions sur-mesure pour les marques de luxe et détaillants ambitieux."
                },
                strategy: {
                    title: "Stratégie Digitale",
                    desc: "Consulting et direction technologique pour transformer votre vision en réalité."
                }
            }
        },
        agencyPage: {
            title: "L'AGENCE: NOTRE ADN",
            subtitle: "Deuleux n'est pas une simple agence. C'est un laboratoire où la technologie rencontre l'art numérique.",
            philosophy: "Philosophie",
            mission: "Notre mission est de redéfinir les standards du web en créant des écosystèmes digitaux qui ne se contentent pas d'exister, mais qui dominent.",
            stats: {
                projects: "Projets Déployés",
                awards: "Distinctions",
                clients: "Marques Partenaires"
            }
        },
        careersPage: {
            title: "REJOINDRE LE CORE",
            subtitle: "Nous recherchons des architectes de l'impossible. Si vous repoussez les limites du code et du design, votre place est ici.",
            openPositions: "POSTES OUVERTS",
            roles: {
                frontend: "Ingénieur Frontend Senior",
                designer: "Creative Developer / Designer",
                backend: "Architecte Systèmes"
            },
            sendPortfolio: "Envoyer Votre Portfolio"
        },
        storePage: {
            title: "DÉPLOYEZ INSTANTANÉMENT.",
            subtitle: "PASSEZ À L'ÉCHELLE À L'INFINI.",
            description: "Applications web de haute performance, entièrement conçues et adaptées à votre secteur. Gagnez des mois de développement.",
            badge: "Apps Entreprise",
            filters: {
                all: "Tous",
                ecommerce: "E-Commerce",
                restaurant: "Restauration",
                corporate: "Entreprise"
            },
            cta: "Sécuriser Maintenant",
            demo: "Démo Live",
            investment: "Investissement",
            bestseller: "Meilleure Vente",
            noResults: "Aucune application disponible dans cette catégorie pour le moment.",
            moreFeatures: "+ {count} autres fonctionnalités"
        },
        insightsPage: {
            title: "TRANSMISSIONS",
            subtitle: "Chroniques depuis le cœur de la matrice. Études de cas, recherches technologiques et notre vision du futur numérique.",
            readMore: "Lire le rapport"
        },
        contact: {
            hubTitle: "Hub de Transmission",
            initiate: "INITIER.",
            locations: {
                paris: "PARIS (CORE) / 48.85° N",
                dubai: "DUBAI (NODE) / 25.20° N",
                remote: "REMOTE (UPLINK) / GLOBAL"
            },
            form: {
                name: "01_NOM >",
                email: "02_EMAIL >",
                project: "03_PROJET >",
                submitting: "ÉTABLISSEMENT DE LA LIAISON...",
                submit: "INITIER LA TRANSMISSION",
            },
            success: {
                encrypting: "> CHIFFREMENT DES DONNÉES...",
                uploading: "> TÉLÉCHARGEMENT VERS LE CORE DEULEUX...",
                secured: "TRANSMISSION RÉUSSIE",
                message: "Notre centre de commandement a bien reçu votre directive. Nous vous répondrons sous 24H."
            }
        },
        project: {
            client: "Commanditaire",
            expertise: "Expertise",
            techStack: "Tech Stack",
            year: "Année",
            challenge: "01 / LE DÉFI",
            solution: "02 / LA SOLUTION",
            deployedServices: "Expertises Déployées",
            nextProject: "RÉALISATION SUIVANTE",
            loading: "CHARGEMENT DES DONNÉES DU PROJET...",
            fallbackChallenge: "Découplage de leur Monolithe massif vers un écosystème Headless de pointe, atteignant des temps de chargement inférieurs à la seconde tout en conservant une identité visuelle sophistiquée et un motion design impeccable.",
            fallbackSolution: "Utilisation de Next.js à l'edge, combiné à une API Laravel robuste. Nous avons mis en place des stratégies de mise en cache ISR agressives et des shaders WebGL personnalisés pour offrir une expérience vraiment transformatrice et élitiste.",
            nextProjectTitle: "Aura Paris",
            nextProjectSubtitle: "E-Commerce"
        },
        estimator: {
            step: "Étape",
            question1: "Quel est votre budget anticipé ?",
            q1options: ["10k$ - 25k$", "25k$ - 50k$", "50k$ - 100k$", "100k$+"],
            question2: "Quel est votre calendrier souhaité ?",
            q2options: ["1-2 Mois", "3-4 Mois", "6+ Mois", "Partenaire Continu"],
            question3: "Quelle est la stack technique principale ?",
            q3options: ["Next.js / React", "Laravel", "Shopify Headless", "Indécis"],
            scopeCaptured: "PÉRIMÈTRE CAPTURÉ.",
            successMessage: "Sur la base de vos paramètres incroyablement ambitieux, nous sommes prêts à architecturer le futur. Nos partenaires vous contacteront.",
            proceed: "PASSER AU CONTACT"
        },
        preloader: {
            initializing: "DEULEUX / INITIALISATION..."
        },
        footer: {
            title: "DÉFIEZ LA GRAVITÉ.",
            subtitle: "LET'S BUILD. / CONSTRUISONS.",
            startProject: "Démarrer Votre Projet",
            rights: "Deuleux Agency. Tous droits réservés.",
            terms: "Conditions d'utilisation",
            privacy: "Politique de confidentialité"
        },
        cookie: {
            message: "Nous utilisons des cookies pour sublimer votre expérience numérique.",
            decline: "DÉCLINER",
            accept: "ACCEPTER"
        },
        notFound: {
            title: "PAGE INTROUVABLE.",
            subtitle: "VOUS ÊTES EN APESANTEUR.",
            message: "La page que vous recherchez a défié la gravité et dérivé dans le vide.",
            return: "RETOUR À LA BASE"
        }
    },
    en: {
        seo: {
            home: {
                title: "DEULEUX | Digital Architecture & Elite Systems Design Paris",
                description: "Deuleux is a premier design and engineering agency in Paris. We architect high-performance Next.js and Laravel experiences for luxury brands and tech enterprises."
            },
            services: {
                title: "Our Digital Expertise | Systems Architecture & Design | DEULEUX",
                description: "Advanced web engineering, headless Next.js architecture, bespoke Shopify e-commerce, and premium digital identity."
            },
            work: {
                title: "Our Work | DEULEUX",
                description: "Explore our portfolio of digital projects: high-performance e-commerce platforms, premium websites, and complex web apps."
            },
            agency: {
                title: "The Agency | DEULEUX",
                description: "We are a digital conception studio. Innovation, performance, and avant-garde design."
            },
            team: {
                title: "The Collective | DEULEUX",
                description: "Meet the engineers and designers shaping tomorrow's digital experiences at Deuleux."
            },
            insights: {
                title: "Insights | DEULEUX",
                description: "Latest thoughts, articles, and technological news from our engineering and design team."
            },
            careers: {
                title: "Careers - Join Us | DEULEUX",
                description: "Explore career opportunities at Deuleux. Join our creative and technological hub in Paris or remotely."
            },
            contact: {
                title: "Contact | DEULEUX",
                description: "Initiate a transmission with our Parisian hub to launch your next major digital project."
            }
        },
        nav: {
            services: "Services",
            work: "Work",
            agency: "The Agency",
            team: "The Collective",
            insights: "Insights",
            careers: "Careers",
            store: "Store",
            startProject: "Start A Project",
        },
        hero: {
            titleLine1: "ENGINEERING",
            titleLine2: "THE VOID.",
            subtitle: "We do not build websites. We architect powerful, weightless digital experiences.",
            ctaPrimary: "DISCOVER OUR DNA",
            ctaSecondary: "START A PROJECT",
            mainHeadline: "WE ARCHITECT DIGITAL EXPERIENCES.",
            scrollIndicator: "Discover"
        },
        homeServices: {
            title: "Engineering The Future. / Our Expertise.",
            frontend: {
                title: "High-Performance Next.js Frontends",
                desc: "We build lightning-fast, SEO-optimized web applications utilizing the bleeding edge of the React ecosystem."
            },
            design: {
                title: "Premium UI/UX Design",
                desc: "Award-winning digital experiences that merge Swiss minimalism with cinematic interactions."
            },
            backend: {
                title: "Laravel Headless Architecture",
                desc: "Robust, scalable, and secure backend systems powering complex enterprise solutions."
            },
            cloud: {
                title: "Scalable API Systems & Cloud",
                desc: "Global infrastructure, microservices, and specialized API development built for immense traffic."
            },
            items_list: {
                engineering: ["Headless CMS Architecture", "E-Commerce (Shopify/Next.js)", "Web Applications (SaaS)", "API & Cloud Development"],
                design: ["Art Direction", "UI/UX Design", "Motion & Interaction", "3D & WebGL Prototyping"],
                strategy: ["Brand Strategy", "Visual Identity Systems", "Typography & Editorial", "Global Digital Guidelines"]
            }
        },
        servicesPage: {
            title: "OUR EXPERTISE",
            subtitle: "We operate at the intersection of brutalist design and high-precision engineering. Our services are architectures built for impact.",
            items: {
                engineering: {
                    title: "Systems Engineering",
                    desc: "Development of complex, robust, and highly scalable web architectures."
                },
                design: {
                    title: "Digital Design",
                    desc: "Creation of avant-garde interfaces combining premium aesthetics and perfect ergonomics."
                },
                ecommerce: {
                    title: "Elite E-Commerce",
                    desc: "Bespoke solutions for luxury brands and ambitious retailers."
                },
                strategy: {
                    title: "Digital Strategy",
                    desc: "Consulting and technological direction to turn your vision into reality."
                }
            }
        },
        agencyPage: {
            title: "THE AGENCY: OUR DNA",
            subtitle: "Deuleux is not just an agency. It's a laboratory where technology meets digital art.",
            philosophy: "Philosophy",
            mission: "Our mission is to redefine web standards by creating digital ecosystems that don't just exist, but dominate.",
            stats: {
                projects: "Deployed Projects",
                awards: "Distinctions",
                clients: "Partner Brands"
            }
        },
        careersPage: {
            title: "JOIN THE CORE",
            subtitle: "We are looking for architects of the impossible. If you push the boundaries of code and design, you belong here.",
            openPositions: "OPEN POSITIONS",
            roles: {
                frontend: "Senior Frontend Engineer",
                designer: "Creative Developer / Designer",
                backend: "Systems Architect"
            },
            sendPortfolio: "Send Your Portfolio"
        },
        storePage: {
            title: "DEPLOY INSTANTLY.",
            subtitle: "SCALE INFINITELY.",
            description: "Fully engineered, high-performance web applications tailored for your industry. Skip the months of development.",
            badge: "Enterprise Apps",
            filters: {
                all: "All",
                ecommerce: "E-Commerce",
                restaurant: "Restaurant",
                corporate: "Corporate"
            },
            cta: "Secure Now",
            demo: "Live Demo",
            investment: "Investment",
            bestseller: "Bestseller",
            noResults: "No applications available in this category yet.",
            moreFeatures: "+ {count} more features"
        },
        insightsPage: {
            title: "TRANSMISSIONS",
            subtitle: "Chronicles from the heart of the matrix. Case studies, technological research, and our vision of the digital future.",
            readMore: "Read report"
        },
        contact: {
            hubTitle: "Transmission Hub",
            initiate: "INITIATE.",
            locations: {
                paris: "PARIS (CORE) / 48.85° N",
                dubai: "DUBAI (NODE) / 25.20° N",
                remote: "REMOTE (UPLINK) / GLOBAL"
            },
            form: {
                name: "01_NAME >",
                email: "02_EMAIL >",
                project: "03_DIRECTIVE >",
                submitting: "ESTABLISHING UPLINK...",
                submit: "INITIATE TRANSMISSION",
            },
            success: {
                encrypting: "> ENCRYPTING DATA...",
                uploading: "> UPLOADING TO CORE MAINNET...",
                secured: "TRANSMISSION SECURED",
                message: "Our command center has received your directive. We will establish contact shortly."
            }
        },
        project: {
            client: "Client",
            expertise: "Role",
            techStack: "Tech Stack",
            year: "Year",
            challenge: "01 / THE CHALLENGE",
            solution: "02 / THE SOLUTION",
            deployedServices: "Deployed Services",
            nextProject: "NEXT PROJECT",
            loading: "LOADING PROJECT DATA...",
            fallbackChallenge: "Decoupling their massive Monolith into a state-of-the-art Headless ecosystem, achieving sub-second load times while maintaining a sophisticated visual identity and flawless motion design.",
            fallbackSolution: "Leveraging Next.js on the edge, combined with a robust Laravel API. We implemented aggressive ISR caching strategies and custom WebGL shaders to deliver an experience that feels truly transformative and elite.",
            nextProjectTitle: "Aura Paris",
            nextProjectSubtitle: "E-Commerce"
        },
        estimator: {
            step: "Step",
            question1: "What is your anticipated budget?",
            q1options: ["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"],
            question2: "What is your desired timeline?",
            q2options: ["1-2 Months", "3-4 Months", "6+ Months", "Ongoing Partner"],
            question3: "What is the primary tech stack?",
            q3options: ["Next.js / React", "Laravel", "Shopify Headless", "Undecided"],
            scopeCaptured: "SCOPE CAPTURED.",
            successMessage: "Based on your incredibly ambitious parameters, we are ready to architect the future. Our partners will be in touch.",
            proceed: "PROCEED TO CONTACT"
        },
        preloader: {
            initializing: "DEULEUX / INITIALIZING..."
        },
        footer: {
            title: "DEFY GRAVITY.",
            subtitle: "LET'S BUILD. / CONSTRUISONS.",
            startProject: "Start Your Project",
            rights: "Deuleux Agency. All rights reserved.",
            terms: "Terms of Service",
            privacy: "Privacy Policy"
        },
        cookie: {
            message: "We use cookies to elevate your digital experience.",
            decline: "DECLINE",
            accept: "ACCEPT"
        },
        notFound: {
            title: "LOST IN SPACE.",
            subtitle: "PERDU DANS L'ESPACE.",
            message: "The page you are looking for has defied gravity and drifted into the void.",
            return: "RETURN TO BASE"
        }
    }
};
