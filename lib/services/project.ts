import { prisma } from "@/lib/prisma";

export const projectService = {
    async getAll() {
        return prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
    },

    async getById(id: string) {
        return prisma.project.findUnique({
            where: { id },
        });
    },

    async create(data: any) {
        const { title } = data;
        const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

        return prisma.project.create({
            data: {
                ...data,
                slug,
                titleFr: data.titleFr || null,
                role: data.role || "",
                year: data.year || "",
                challenge: data.challenge || null,
                challengeFr: data.challengeFr || null,
                solution: data.solution || null,
                solutionFr: data.solutionFr || null,
                techStack: data.techStack || null,
                gallery: data.gallery || null,
                liveUrl: data.liveUrl || null,
                order: data.order || 0,
            },
        });
    },

    async update(id: string, data: any) {
        return prisma.project.update({
            where: { id },
            data: {
                ...data,
                titleFr: data.titleFr || null,
                challenge: data.challenge || null,
                challengeFr: data.challengeFr || null,
                solution: data.solution || null,
                solutionFr: data.solutionFr || null,
                techStack: data.techStack || null,
                gallery: data.gallery || null,
                liveUrl: data.liveUrl || null,
                order: data.order || 0,
            },
        });
    },

    async delete(id: string) {
        return prisma.project.delete({
            where: { id },
        });
    }
};
