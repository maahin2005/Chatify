import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });

    // Return the users as JSON
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
