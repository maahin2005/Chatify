import prisma from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request:NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const notifications = await prisma.notification.findMany({
    where: { user_id: parseInt(userId), is_read: false }
  });

  return NextResponse.json(notifications);
}

// POST: Mark notification as read
export async function POST(request:NextRequest) {
  const body = await request.json();
  const { notificationId } = body;

  if (!notificationId) {
    return NextResponse.json(
      { error: "Notification ID is required" },
      { status: 400 }
    );
  }

  await prisma.notification.update({
    where: { id: notificationId },
    data: { is_read: true },
  });

  return NextResponse.json({ success: true });
}
