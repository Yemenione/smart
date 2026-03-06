import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// UPDATE a slide
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, subtitle, price, ctaText, ctaLink, imageUrl, order } = body;

        const updatedSlide = await prisma.heroSlide.update({
            where: { id },
            data: {
                title,
                subtitle,
                price,
                ctaText,
                ctaLink,
                imageUrl,
                order,
            },
        });

        return NextResponse.json(updatedSlide);
    } catch (error) {
        console.error("Error updating hero slide:", error);
        return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
    }
}

// DELETE a slide
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.heroSlide.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Slide deleted successfully" });
    } catch (error) {
        console.error("Error deleting hero slide:", error);
        return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
    }
}
