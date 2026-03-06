import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(Array.isArray(faqs) ? faqs : []);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return NextResponse.json([], { status: 200 }); // Return empty array to keep UI stable
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
