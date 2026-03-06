import { prisma } from "@/lib/prisma";

export const productService = {
    async getAll() {
        return prisma.productApp.findMany({
            orderBy: { order: 'asc' },
        });
    },

    async getById(id: string) {
        return prisma.productApp.findUnique({
            where: { id },
        });
    },

    async create(data: any) {
        return prisma.productApp.create({
            data: {
                ...data,
                isPopular: data.isPopular || false,
                order: data.order || 0,
            },
        });
    },

    async update(id: string, data: any) {
        return prisma.productApp.update({
            where: { id },
            data: {
                ...data,
                isPopular: data.isPopular || false,
                order: data.order || 0,
            },
        });
    },

    async delete(id: string) {
        return prisma.productApp.delete({
            where: { id },
        });
    }
};
