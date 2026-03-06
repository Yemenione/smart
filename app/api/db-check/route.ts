import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Test connection with a simple raw query or a focused find
        const result = await prisma.$queryRaw`SELECT 1 as connected`;

        return NextResponse.json({
            success: true,
            message: "Database connection successful",
            data: result
        });
    } catch (error: any) {
        console.error("Database connection check failed:", error);

        return NextResponse.json({
            success: false,
            message: "Database connection failed",
            error: error.message,
            code: error.code,
            meta: error.meta,
            env_db_url_exists: !!process.env.DATABASE_URL
        }, { status: 500 });
    }
}
