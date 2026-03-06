import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log("Initializing Prisma Client...");
if (process.env.DATABASE_URL) {
    const maskedUrl = process.env.DATABASE_URL.replace(/:[^@:]+@/, ":****@");
    console.log(`Using DATABASE_URL: ${maskedUrl}`);
} else {
    console.warn("DATABASE_URL is not defined!");
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["error", "warn"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
