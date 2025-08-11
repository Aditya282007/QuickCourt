import User from "../model/user.model";
import { sendEmail } from "./email";

export async function sendOtpToUser(email: string) {
  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate 6-digit OTP and 5-minute expiry
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Save to user
  (user as any).otp = otp;
  (user as any).otpExpires = expiresAt;
  await user.save();

  // Send email
  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
  });

  return { otp, expiresAt };
}

