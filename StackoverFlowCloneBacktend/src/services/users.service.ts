import bcrypt from 'bcryptjs';
import { responseHandler, getJwtToken } from '../helpers';
import { UsersRepository } from '../repositories';

interface NewUser {
  username: string;
  password: string;
}

interface Payload {
  user: {
    id: number;
  }
}

export const register = async (newUser: NewUser, result: any): Promise<Payload> => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const insertObj = await UsersRepository.create(newUser);

  const payload: Payload = {
    user: {
      id: insertObj.dataValues.id,
    },
  };

  getJwtToken(payload, 'User registered', result);

  return payload;
};

interface LoginUser {
  username: string;
  password: string;
}

export const login = async (newUser: LoginUser, result: any): Promise<Payload | null> => {
  const user = await UsersRepository.retrieveOne({ username: newUser.username });

  if (user === null) {
    result(
      responseHandler(
        false,
        404,
        'User does not exists',
        null,
      ),
      null,
    );
    return null;
  }

  const isMatch = await bcrypt.compare(newUser.password, user.password);

  if (!isMatch) {
    result(
      responseHandler(false, 400, 'Incorrect password', null),
      null,
    );

    return null;
  }

  const payload: Payload = {
    user: {
      id: user.id,
    },
  };

  getJwtToken(payload, 'User logged in', result);

  return payload;
};

export const retrieveAll = (result: any) => UsersRepository.retrieveAll(result);

export const retrieveOne = async (id: number, result: any) => {
  await UsersRepository.incrementViews(id);

  const queryResult = await UsersRepository.retrieveOneWithCounts(id);

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};

export const loadUser = async (userId: number, result: any) => {
  const response = await UsersRepository.retrieveOne({ id: userId }, result);
  result(null, responseHandler(true, 200, 'Success', response));
};
