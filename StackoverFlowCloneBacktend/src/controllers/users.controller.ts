import { validationResult, Request, Response } from 'express';
import { responseHandler, asyncHandler } from '../helpers/handlers';
import { usersService } from '../services';

interface User {
  username: string;
  password: string;
}

const User = (user: any): User => ({
  username: user.username,
  password: user.password,
});

export const getOneUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await usersService.retrieveOne(
      id,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    await usersService.retrieveAll(
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    // Register user in the database
    await usersService.register(User(req.body), (err: any, data: any) => {
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

