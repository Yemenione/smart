import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();

        // Convert array to a key-value object for easier frontend use
        const settingsObj = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settingsObj);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({}, { status: 200 }); // Return empty object to keep UI stable
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Basic validation
        if (!data || typeof data !== "object") {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        // Upsert each setting
        const updatePromises = Object.entries(data).map(([key, value]) => {
            if (typeof value !== "string") return Promise.resolve();
            return prisma.setting.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        });

        await Promise.all(updatePromises);

        return NextResponse.json({ success: true, message: "Settings updated successfully" });
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
