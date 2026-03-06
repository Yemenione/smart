import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const diagnostic: any = {
        timestamp: new Date().toISOString(),
        env: {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL_SET: !!process.env.DATABASE_URL,
            DATABASE_URL_START: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) + "..." : "NONE",
        },
        connection: false,
        tables: {},
    };

    try {
        // 1. Test raw connection
        const rawResult = await prisma.$queryRaw`SELECT 1 as connected`.catch(e => ({ error: e.message }));
        diagnostic.connection = rawResult;

        // 2. Test specific tables
        diagnostic.tables.Setting = await prisma.setting.count().catch(e => ({ error: e.message }));
        diagnostic.tables.Project = await prisma.project.count().catch(e => ({ error: e.message }));
        diagnostic.tables.User = await prisma.user.count().catch(e => ({ error: e.message }));

        return NextResponse.json({
            success: true,
            message: "Diagnostic completed",
            diagnostic
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Diagnostic crashed",
            error: error.message,
            diagnostic
        }, { status: 500 });
    }
}
