import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler, asyncHandler } from '../helpers/handlers';
import { usersService } from '../services';

interface User {
  username: string;
  password: string;
}

const User = (user: User) => ({
  username: user.username,
  password: user.password,
});

export const loadUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    await usersService.loadUser(req.user.id, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    // Login the user
    await usersService.login(User(req.body), (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(true, 500, 'Server Error', null));
  }
});

