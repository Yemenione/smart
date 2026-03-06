import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
    try {
        const apps = await prisma.productApp.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(apps);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch apps" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, category, description, features, priceText, imageUrl, demoLink, isPopular, order } = body;

        const newApp = await prisma.productApp.create({
            data: { name, category, description, features, priceText, imageUrl, demoLink, isPopular: isPopular || false, order: order || 0 },
        });
        return NextResponse.json(newApp, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create app" }, { status: 500 });
    }
}
