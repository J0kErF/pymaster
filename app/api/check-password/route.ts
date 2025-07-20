import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, incrementRateLimit } from "@/lib/rateLimiter";

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";



    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Too many attempts. Try again later." },
            { status: 429 }
        );
    }

    const { password } = await req.json();
    const correctPassword = process.env.BLOG_EDIT_PASSWORD;

    if (!password || password !== correctPassword) {
        incrementRateLimit(ip);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "Access granted" });
}
