import { Request, Response, NextFunction } from 'express';
import { responseHandler } from '../helpers/handlers';
import { UsersRepository } from '../repositories';

const checkExistence = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  const user = await UsersRepository.retrieveOne({ username });

  if (user !== null) {
    return res
      .status(400)
      .json(responseHandler(false, 400, 'User already exists', null));
  }

  next();
};

export default checkExistence;
