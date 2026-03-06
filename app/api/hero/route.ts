import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/hero
export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            orderBy: {
                order: 'asc',
            },
        });
        return NextResponse.json(slides);
    } catch (error) {
        console.error("Error fetching hero slides:", error);
        return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
    }
}

// POST /api/hero (Create new slide)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, subtitle, price, ctaText, ctaLink, imageUrl, order } = body;

        if (!title || !subtitle || !imageUrl) {
            return NextResponse.json({ error: "Title, subtitle, and image are required" }, { status: 400 });
        }

        const newSlide = await prisma.heroSlide.create({
            data: {
                title,
                subtitle,
                price,
                ctaText,
                ctaLink,
                imageUrl,
                order: order || 0,
            },
        });

        return NextResponse.json(newSlide, { status: 201 });
    } catch (error) {
        console.error("Error creating hero slide:", error);
        return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
    }
}
