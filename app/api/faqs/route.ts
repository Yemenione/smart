import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { question, answer, order } = body;

        if (!question || !answer) {
            return NextResponse.json({ error: "Question and Answer are required" }, { status: 400 });
        }

        const faq = await prisma.fAQ.create({
            data: {
                question,
                answer,
                order: order || 0,
            },
        });

        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }
}
