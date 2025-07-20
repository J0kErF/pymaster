import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";

// GET /api/blog/[slug]
export async function GET(_: NextRequest, { params }: any) {
  await dbConnect();

  try {
    const post = await Blog.findOne({ slug: params.slug });

    if (!post || !post.published) {
      return NextResponse.json({ error: "Blog not found or unpublished" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("❌ API GET error:", error);
    return NextResponse.json({ error: "Failed to fetch blog." }, { status: 500 });
  }
}

// PUT /api/blog/[slug]
export async function PUT(
  req: NextRequest,
  { params }:any
) {
  await dbConnect();

  try {
    const body = await req.json();

    const updated = await Blog.findOneAndUpdate({ slug: params.slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PUT /api/blog/[slug] error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/blog/[slug]
export async function DELETE(
  req: NextRequest,
  { params }: any
) {
  await dbConnect();

  try {
    const deleted = await Blog.findOneAndDelete({ slug: params.slug });

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE /api/blog/[slug] error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
