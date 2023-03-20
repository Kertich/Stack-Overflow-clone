import { Request, Response } from 'express';
import sql from 'mssql';

export class ResetPasswordController {
  // Display the reset password form
  public static async showResetPasswordForm(req: Request, res: Response): Promise<void> {
    res.render('reset-password', {
      title: 'Reset Password',
      error: req.flash('error'),
      success: req.flash('success'),
    });
  }

  // Handle the reset password form submission
  public static async resetPassword(req: Request, res: Response): Promise<void> {
    const { email, password, confirmPassword, token } = req.body;

    // Validate the form data
    if (!email || !password || !confirmPassword || !token) {
      req.flash('error', 'Please fill in all fields.');
      return res.redirect('/reset-password');
    }

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect('/reset-password');
    }

    try {
      // Connect to the database
      const pool = await sql.connect({
        server: 'localhost',
        database: 'exampledb',
        user: 'sa',
        password: 'password',
      });

      // Call the stored procedure to validate the reset password token
      const tokenResult = await pool.request()
        .input('Email', sql.NVarChar, email)
        .input('Token', sql.NVarChar, token)
        .execute('ValidateResetPasswordToken');

      if (!tokenResult.recordset[0].IsValid) {
        req.flash('error', 'Invalid or expired token.');
        return res.redirect('/reset-password');
      }

      // Call the stored procedure to update the user's password
      await pool.request()
        .input('Email', sql.NVarChar, email)
        .input('Password', sql.NVarChar, password)
        .execute('UpdatePassword');

      req.flash('success', 'Password reset successfully.');
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      req.flash('error', 'An error occurred while resetting the password. Please try again later.');
      res.redirect('/reset-password');
    }
  }
}
