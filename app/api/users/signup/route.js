import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request) {
  const body = await request.json(); // Parse JSON from the request body

  if (!body) {
    return new NextResponse("Invalid JSON payload", { status: 400 });
  }

  const { firstName, lastName, email, username, password } = body;
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
    });
    return NextResponse.json(
      { success: true, msg: "user created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
