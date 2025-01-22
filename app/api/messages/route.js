// src/app/api/messages/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("userId") || "");
    const recipientId = parseInt(searchParams.get("recipientId") || "");

    if (!userId || !recipientId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: recipientId },
          { senderId: recipientId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
