import nodemailer, { TransportOptions } from "nodemailer";
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: "spemisp40@gmail.com",
    password: "380638132867Qqq",
  },
} as TransportOptions);
