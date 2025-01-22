import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client

export async function GET() {
  try {
    const emails = await prisma.user
      .findMany({
        select: {
          email: true, // Only fetch the email field
        },
      })
      .then((users) => users.map((user) => user.email));

    return NextResponse.json({ success: true, data: emails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
