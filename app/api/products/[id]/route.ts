import { NextResponse } from "next/server";
import { productService } from "@/lib/services/product";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updatedApp = await productService.update(id, body);
        return NextResponse.json(updatedApp);
    } catch (error) {
        console.error("Error updating app:", error);
        return NextResponse.json({ error: "Failed to update app" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await productService.delete(id);
        return NextResponse.json({ success: true, message: "App deleted successfully" });
    } catch (error) {
        console.error("Error deleting app:", error);
        return NextResponse.json({ error: "Failed to delete app" }, { status: 500 });
    }
}
