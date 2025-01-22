import { NextResponse } from "next/server";
import redisClient from "@/utils/redisClient"; // Import the Redis client

export async function POST(req) {
  const body = await req.json();

  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json(
      { error: "Email and OTP are required" },
      { status: 400 }
    );
  }
  try {
    const storedOtp = await redisClient.get(email);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "OTP has expired or does not exist" },
        { status: 400 }
      );
    }

    if (storedOtp == Number(otp)) {
      await redisClient.del(email);

      return NextResponse.json(
        { message: "OTP verified successfully", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    console.error("Failed to verify OTP:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
