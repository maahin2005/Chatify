import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { decodeToken } from "@/utils/decodeToken";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "No tokens provided" }, { status: 401 });
  }

  const decoded = await decodeToken(accessToken);
  const { username } = decoded;
  try {
    // Fetch all users from the database
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
