import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Robust Prisma initialization
const createPrismaClient = () => {
    try {
        return new PrismaClient({
            log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
            errorFormat: "minimal",
        });
    } catch (error) {
        console.error("CRITICAL: Failed to initialize Prisma Client", error);
        // Fallback or re-throw depending on your preference
        throw error;
    }
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
