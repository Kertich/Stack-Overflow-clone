import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendForgotPasswordEmail(to: string, token: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    // configure your email provider here
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const emailOptions: EmailOptions = {
    to: to,
    subject: 'Reset your password',
    html: `
      <p>You have requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  await transporter.sendMail(emailOptions);
}
