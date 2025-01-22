import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client

export async function GET() {
  try {
    const usernames = await prisma.user
      .findMany({
        select: {
          username: true,
        },
      })
      .then((users) => users.map((user) => user.username));

    return NextResponse.json(
      { success: true, data: usernames },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
