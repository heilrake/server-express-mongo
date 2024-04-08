import nodemailer from "nodemailer";
import { transporter } from "../../../configs/nodemailer";

class MailService {
  async sendActivationMail(to: string, link: string) {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Active user account" + process.env.API_URL,
      text: "",
      html: `
        <div>
            <h1>For activating account please follow link</h1>
            <a href=${link}>{link}</a>
        </div>
      
      `,
    });
  }
}

export const mailService = new MailService();
