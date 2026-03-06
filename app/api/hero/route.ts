import { NextResponse } from "next/server";
import { heroService } from "@/lib/services/hero";

// GET /api/hero
export async function GET() {
    try {
        const slides = await heroService.getAll();
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

        if (!body.title || !body.subtitle || !body.imageUrl) {
            return NextResponse.json({ error: "Title, subtitle, and image are required" }, { status: 400 });
        }

        const newSlide = await heroService.create(body);
        return NextResponse.json(newSlide, { status: 201 });
    } catch (error) {
        console.error("Error creating hero slide:", error);
        return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
    }
}
