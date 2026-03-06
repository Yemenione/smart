import { NextResponse } from "next/server";
import { productService } from "@/lib/services/product";

export async function GET() {
    try {
        const apps = await productService.getAll();
        return NextResponse.json(Array.isArray(apps) ? apps : []);
    } catch (error) {
        console.error("Error fetching apps:", error);
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newApp = await productService.create(body);
        return NextResponse.json(newApp, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create app" }, { status: 500 });
    }
}
