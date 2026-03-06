import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, titleFr, client, role, year, challenge, challengeFr, solution, solutionFr, techStack, coverImage, gallery, liveUrl, order } = body;

        if (!title || !client) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

        const project = await prisma.project.create({
            data: {
                title,
                titleFr: titleFr || null,
                slug,
                client,
                role: role || "",
                year: year || "",
                challenge: challenge || null,
                challengeFr: challengeFr || null,
                solution: solution || null,
                solutionFr: solutionFr || null,
                techStack: techStack || null,
                coverImage,
                gallery: gallery || null,
                liveUrl: liveUrl || null,
                order: order || 0,
            },
        });

        return NextResponse.json(project);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Un projet مع هذا العنوان موجود بالفعل" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
