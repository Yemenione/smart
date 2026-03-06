import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://deuleux.com';

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/services',
        '/work',
        '/agency',
        '/insights',
        '/store',
        '/contact',
        '/legal/terms',
        '/legal/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Projects
    let projectRoutes: MetadataRoute.Sitemap = [];
    try {
        const projects = await prisma.project.findMany({
            select: { slug: true, updatedAt: true },
        });
        projectRoutes = projects.map((p) => ({
            url: `${baseUrl}/work/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    } catch (e) {
        console.error('Sitemap project fetch failed', e);
    }

    // 3. Dynamic Insights/Posts
    let postRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });
        postRoutes = posts.map((p) => ({
            url: `${baseUrl}/insights/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (e) {
        console.error('Sitemap post fetch failed', e);
    }

    return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
