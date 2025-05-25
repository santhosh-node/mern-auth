import { sendMail } from '../nodemailer';

const APP_NAME = 'YourApp';

export async function sendPasswordResetEmail(email: string, token: string | number) {
  const html = `
    <h2>Password Reset Request</h2>
    <p>You requested to reset your password. Please use the code below to proceed:</p>
    <pre style="font-size: 20px; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 5px;">
${token}
    </pre>
    <p>If you did not request this, please ignore this email.</p>
  `;

  return sendMail({
    to: email,
    subject: `${APP_NAME} - Password Reset Code`,
    html,
  });
}

export async function sendEmailVerification(email: string, token: string | number) {
  const html = `
    <h2>Email Verification</h2>
    <p>Thanks for signing up! Please use the code below to verify your email:</p>
    <pre style="font-size: 20px; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 5px;">
${token}
    </pre>
    <p>If you did not sign up, you can ignore this message.</p>
  `;

  return sendMail({
    to: email,
    subject: `${APP_NAME} - Verify Your Email Code`,
    html,
  });
}
