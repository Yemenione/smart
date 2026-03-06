import { NextResponse } from "next/server";
import { postService } from "@/lib/services/post";

export async function GET() {
    try {
        const posts = await postService.getAll();
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.title || !data.content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const post = await postService.create(data);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
