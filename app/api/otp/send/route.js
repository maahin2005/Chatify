import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import redisClient from "@/utils/redisClient"; // Import the Redis client

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Chatify OTP",
    text: `Your Chatify OTP code is: ${otp} \n Dont'share with anyone! `,
  };

  try {
    await transporter.sendMail(mailOptions);

    await redisClient.set(email, otp, "EX", 300);

    return NextResponse.json(
      { message: "OTP sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
