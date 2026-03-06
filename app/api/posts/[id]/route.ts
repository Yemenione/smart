import { NextResponse } from "next/server";
import { postService } from "@/lib/services/post";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const post = await postService.getById(id);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const post = await postService.update(id, data);
        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await postService.delete(id);
        return NextResponse.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
