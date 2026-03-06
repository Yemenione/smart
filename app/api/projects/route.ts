import { NextResponse } from "next/server";
import { projectService } from "@/lib/services/project";

export async function GET() {
    try {
        const projects = await projectService.getAll();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.title || !body.client) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const project = await projectService.create(body);
        return NextResponse.json(project);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Un projet avec ce titre existe déjà" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
