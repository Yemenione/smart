import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, category, description, features, priceText, imageUrl, demoLink, isPopular, order } = body;

        const updatedApp = await prisma.productApp.update({
            where: { id },
            data: {
                name,
                category,
                description,
                features,
                priceText,
                imageUrl,
                demoLink,
                isPopular,
                order,
            },
        });

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
        await prisma.productApp.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "App deleted successfully" });
    } catch (error) {
        console.error("Error deleting app:", error);
        return NextResponse.json({ error: "Failed to delete app" }, { status: 500 });
    }
}
