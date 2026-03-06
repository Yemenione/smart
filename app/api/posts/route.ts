import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
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

        // Generate slug from English title
        const slug = (data.slug || data.title)
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-")
            .trim();

        // Get or Create a default author if none exists
        let authorId = data.authorId;
        if (!authorId) {
            const firstUser = await prisma.user.findFirst();
            if (firstUser) {
                authorId = firstUser.id;
            } else {
                const newUser = await prisma.user.create({
                    data: {
                        email: "admin@deuleux.com",
                        name: "Deuleux Admin",
                        password: "changeme123", // Required field
                    }
                });
                authorId = newUser.id;
            }
        }

        const post = await prisma.post.create({
            data: {
                title: data.title,
                titleFr: data.titleFr || null,
                content: data.content,
                contentFr: data.contentFr || null,
                slug: slug,
                imageUrl: data.imageUrl || null,
                published: data.published ?? false,
                authorId: authorId,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
