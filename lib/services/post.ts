import { prisma } from "@/lib/prisma";

export const postService = {
    async getAll() {
        return prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
    },

    async getById(id: string) {
        return prisma.post.findUnique({
            where: { id },
        });
    },

    async create(data: any) {
        const slug = (data.slug || data.title)
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-")
            .trim();

        let authorId = data.authorId;
        if (!authorId) {
            const firstUser = await prisma.user.findFirst();
            if (firstUser) {
                authorId = firstUser.id;
            } else {
                const newUser = await prisma.user.create({
                    data: {
                        email: "admin@deuleux.com",
                        name: "Deuleux Admin",
                        password: "changeme123",
                    }
                });
                authorId = newUser.id;
            }
        }

        return prisma.post.create({
            data: {
                title: data.title,
                titleFr: data.titleFr || null,
                content: data.content,
                contentFr: data.contentFr || null,
                slug: slug,
                imageUrl: data.imageUrl || null,
                published: data.published ?? false,
                authorId: authorId,
            },
        });
    },

    async update(id: string, data: any) {
        return prisma.post.update({
            where: { id },
            data: {
                title: data.title,
                titleFr: data.titleFr || null,
                content: data.content,
                contentFr: data.contentFr || null,
                imageUrl: data.imageUrl,
                published: data.published,
            },
        });
    },

    async delete(id: string) {
        return prisma.post.delete({
            where: { id },
        });
    }
};
