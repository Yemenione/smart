import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, titleFr, client, role, year, challenge, challengeFr, solution, solutionFr, techStack, coverImage, gallery, liveUrl, order } = body;

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                titleFr: titleFr || null,
                client,
                role,
                year,
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
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.project.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
