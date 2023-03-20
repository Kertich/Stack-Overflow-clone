import { Request, Response } from 'express';
import * as mssql from 'mssql';

class LoginController {
  public showLoginForm(req: Request, res: Response) {
    res.render('login'); // render the login form view
  }

  public async handleLoginFormSubmission(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const pool = await new mssql.ConnectionPool(config).connect(); // create a connection pool
      const result = await pool
        .request()
        .input('username', mssql.NVarChar(50), username)
        .input('password', mssql.NVarChar(50), password)
        .execute('ValidateUserCredentials'); // call the stored procedure to validate the user's credentials

      if (result.recordset[0].IsValid) {
        // if the user's credentials are valid, set the session and redirect to the dashboard
        req.session.userId = result.recordset[0].UserId;
        res.redirect('/dashboard');
      } else {
        // if the user's credentials are invalid, render the login form with an error message
        res.render('login', { error: 'Invalid username or password' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred'); // handle errors
    }
  }
}

export default LoginController;
