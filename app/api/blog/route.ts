import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";

export async function GET() {
  await dbConnect();
  try {
    const posts = await Blog.find({ published: true }).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ GET blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  // 🔐 Check password header
  const passwordHeader = req.headers.get("x-blog-password");
  const correctPassword = process.env.VIEW_PASSWORD;

  if (passwordHeader !== correctPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      content,
      tags,
      slug,
      author,
      coverImage,
      published = false,
    } = body;

    // Validation
    if (
      !title?.he || !title?.ar || !title?.en ||
      !content?.he || !content?.ar || !content?.en ||
      !tags?.he || !tags?.ar || !tags?.en
    ) {
      return NextResponse.json({ error: "Missing multilingual fields" }, { status: 400 });
    }

    // Save the blog
    const newPost = await Blog.create({
      title,
      content,
      tags,
      slug,
      author,
      coverImage,
      published,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("❌ POST blog error:", error);
    return NextResponse.json({ error: "Failed to create blog." }, { status: 500 });
  }
}
