import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

// Assuming User model and UserRepository are defined elsewhere

export class ForgotPasswordController {
  // GET /forgot-password - display forgot password form
  public async displayForm(req: Request, res: Response): Promise<void> {
    res.render('forgot-password');
  }

  // POST /forgot-password - handle form submission
  public async handleForm(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    // Find the user with the given email
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      // If no user was found, show an error message
      res.render('forgot-password', { error: 'No user found with that email address.' });
      return;
    }

    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Update the user's password reset token and expiration date
    await UserRepository.updatePasswordResetToken(user.id, token, new Date(Date.now() + 3600000));

    // Send an email with a link to the password reset page
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your.email@gmail.com',
        pass: 'yourpassword'
      }
    });

    const resetUrl = `https://example.com/reset-password?token=${token}`;

    const mailOptions = {
      from: 'your.email@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `Hello ${user.username},\n\nYou have requested a password reset for your account on Example.com. Please click on the following link to reset your password:\n\n${resetUrl}\n\nIf you did not make this request, please ignore this email and your password will remain unchanged.\n\nThanks,\nThe Example.com Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.render('forgot-password', { error: 'An error occurred while sending the password reset email. Please try again later.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.render('forgot-password', { message: 'An email with instructions for resetting your password has been sent to your email address.' });
      }
    });
  }
}
