import { prisma } from "@/lib/prisma";

export const heroService = {
    async getAll() {
        return prisma.heroSlide.findMany({
            orderBy: { order: 'asc' },
        });
    },

    async create(data: any) {
        return prisma.heroSlide.create({
            data: {
                ...data,
                order: data.order || 0,
            },
        });
    },

    async update(id: string, data: any) {
        return prisma.heroSlide.update({
            where: { id },
            data: {
                ...data,
                order: data.order || 0,
            },
        });
    },

    async delete(id: string) {
        return prisma.heroSlide.delete({
            where: { id },
        });
    }
};
