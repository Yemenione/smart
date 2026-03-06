import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const faq = await prisma.fAQ.findUnique({
            where: { id },
        });

        if (!faq) {
            return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        }

        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { question, answer, order } = body;

        const faq = await prisma.fAQ.update({
            where: { id },
            data: {
                question,
                answer,
                order,
            },
        });

        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.fAQ.delete({
            where: { id },
        });
        return NextResponse.json({ message: "FAQ deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }
}
