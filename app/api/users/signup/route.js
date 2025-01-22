import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // For token generation

export async function POST(request) {
  const body = await request.json(); // Parse JSON from the request body

  if (!body) {
    return new NextResponse("Invalid JSON payload", { status: 400 });
  }

  const { firstName, lastName, email, username, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const response = NextResponse.json(
      { success: true, msg: `Welcome to Chatify! Dear ${user.name}.` },
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
