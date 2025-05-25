import nodemailer from 'nodemailer';
import { FROM_EMAIL_ADDRESS, FROM_EMAIL_PASSWORD } from '../../shared/constants';

// Setup mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: FROM_EMAIL_ADDRESS,
    pass: FROM_EMAIL_PASSWORD,
  },
});

// Send an email
export async function sendMail({ html, subject, to }: { to: string; subject: string; html: string }) {
  try {
    console.log({ FROM_EMAIL_ADDRESS, FROM_EMAIL_PASSWORD });

    const info = await transporter.sendMail({
      from: `"Santhosh" <${FROM_EMAIL_ADDRESS}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
