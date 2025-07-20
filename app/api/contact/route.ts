import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { fullName, phoneNumber, emailAddress, message } = await req.json();

    if (!fullName || !emailAddress || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMessage = await ContactMessage.create({
      fullName,
      phoneNumber,
      emailAddress,
      message,
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

// GET /api/contact-messages

export async function GET(req: NextRequest) {
  const password = req.headers.get("x-view-password");
  const expectedPassword = process.env.VIEW_PASSWORD;

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("❌ GET contact messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}