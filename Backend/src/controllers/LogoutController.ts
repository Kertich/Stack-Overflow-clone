import { Request, Response } from 'express';
import { sql } from 'mssql';

export const logout = async (req: Request, res: Response) => {
  try {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });

    // Redirect the user to the home page
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
