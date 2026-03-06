import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Seed Settings
    const settings = [
        { key: 'siteName', value: 'DEULEUX Agency' },
        { key: 'contactEmail', value: 'contact@deuleux.com' },
        { key: 'contactPhone', value: '+33 1 23 45 67 89' },
    ]

    for (const s of settings) {
        await prisma.setting.upsert({
            where: { key: s.key },
            update: {},
            create: s,
        })
    }

    // 2. Seed Projects (from old hardcoded Work data)
    const projects = [
        {
            title: "Quantum E-Commerce",
            slug: "quantum",
            client: "Quantum Corp",
            role: "Headless Architecture",
            year: "2023",
            challenge: "Decoupling their massive Monolith into a state-of-the-art Headless ecosystem.",
            solution: "Leveraging Next.js on the edge, combined with a robust Laravel API.",
            techStack: "Next.js, Laravel, Tailwind CSS, Framer Motion",
            coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            published: true,
        },
        {
            title: "Aura Paris",
            slug: "aura",
            client: "Aura Fashion",
            role: "UI/UX Experience",
            year: "2022",
            challenge: "Establishing a digital presence for a luxury fashion house in Paris.",
            solution: "Creative art direction and a high-performance interactive catalog.",
            techStack: "Next.js, WebGL, GSAP",
            coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
            published: true,
        },
        {
            title: "Neuromorphic AI",
            slug: "neuromorphic",
            client: "NeuroTech Solutions",
            role: "Creative Engineering",
            year: "2024",
            challenge: "Visualizing complex AI data in a human-centric interface.",
            solution: "Using 3D visualizations and real-time data streaming.",
            techStack: "React, Three.js, Node.js",
            coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
            published: true,
        }
    ]

    for (const p of projects) {
        await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        })
    }

    // 3. Seed FAQs (from Agency page)
    const faqs = [
        {
            question: "How do you price your engagements?",
            answer: "We operate on flat-fee sprint models or comprehensive retained partnerships. This ensures our alignment is entirely focused on generating extreme value, not tracking hours.",
            order: 1
        },
        {
            question: "What is your typical project timeline?",
            answer: "A hyper-focused MVP sprint takes 4 to 6 weeks. Full-scale digital transformations and headless ecosystem deployments typically range from 3 to 6 months.",
            order: 2
        },
        {
            question: "Do you offer post-launch support and maintenance?",
            answer: "We do not just hand over the keys. We establish Service Level Agreements (SLAs) offering continuous engineering and performance optimization.",
            order: 3
        },
        {
            question: "What technologies do you specialize in?",
            answer: "Our stack consists of Next.js for supersonic frontend delivery, and native Laravel for robust backend architecture. We also utilize WebGL and Framer Motion.",
            order: 4
        }
    ]

    for (const f of faqs) {
        const existing = await prisma.fAQ.findFirst({ where: { question: f.question } })
        if (!existing) {
            await prisma.fAQ.create({ data: f })
        }
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
