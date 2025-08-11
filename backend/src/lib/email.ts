import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

// Simplified transporter using only email and password.
// Default to Gmail service; adjust SERVICE env if you use another provider supported by Nodemailer.
// Required env vars:
// - EMAIL_USER (e.g., youraddress@gmail.com)
// - EMAIL_PASS (e.g., app password for Gmail)
// Optional:
// - EMAIL_FROM (fallbacks to EMAIL_USER)
// - EMAIL_SERVICE (defaults to 'gmail')
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(params: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const { to, subject, text, html } = params;

  if (!to || !subject || (!text && !html)) {
    throw new Error("Missing required email fields (to, subject, text/html)");
  }

  const from = process.env.EMAIL_USER;
  if (!from) throw new Error("Missing EMAIL_USER for 'from' address");

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
