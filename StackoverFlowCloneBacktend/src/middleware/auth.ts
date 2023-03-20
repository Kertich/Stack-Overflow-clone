import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import config from '../config';
import { responseHandler } from '../helpers/handlers';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json(responseHandler(false, 401, 'Sign-in required', null));
  }

  // Verify token
  try {
    JWT.verify(token, config.JWT.SECRET, (error: any, decoded: any) => {
      if (error) {
        return res
          .status(400)
          .json(responseHandler(false, 400, 'Try again', null));
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error(`error: ${err}`);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
};

export default auth;
