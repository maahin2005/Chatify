import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { senderId, receiverId, content } = await request.json();
  try {
    const message = await prisma.message.create({
      data: { senderId, receiverId, content },
    });
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
