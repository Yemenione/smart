import { prisma } from "@/lib/prisma";

export const faqService = {
    async getAll() {
        return prisma.fAQ.findMany({
            orderBy: { order: 'asc' },
        });
    },

    async create(data: any) {
        return prisma.fAQ.create({
            data: {
                ...data,
                order: data.order || 0,
            },
        });
    },

    async update(id: string, data: any) {
        return prisma.fAQ.update({
            where: { id },
            data: {
                ...data,
                order: data.order || 0,
            },
        });
    },

    async delete(id: string) {
        return prisma.fAQ.delete({
            where: { id },
        });
    }
};
