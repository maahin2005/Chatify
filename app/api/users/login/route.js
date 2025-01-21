import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For token generation

const JWT_SECRET = process.env.JWT_SECRET; // Make sure to set this in your environment variables

export async function POST(request) {
  const body = await request.json(); // Parse JSON from the request body

  if (!body) {
    return new NextResponse("Invalid JSON payload", { status: 400 });
  }

  const { username, password } = body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new NextResponse("Invalid username or password", { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse("Invalid username or password", { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const response = NextResponse.json(
      { success: true, msg: `Glad to see you again! ${user.name}.` },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
