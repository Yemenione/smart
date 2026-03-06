import { NextResponse } from "next/server";
import { heroService } from "@/lib/services/hero";

// UPDATE a slide
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updatedSlide = await heroService.update(id, body);
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
        await heroService.delete(id);
        return NextResponse.json({ success: true, message: "Slide deleted successfully" });
    } catch (error) {
        console.error("Error deleting hero slide:", error);
        return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
    }
}
