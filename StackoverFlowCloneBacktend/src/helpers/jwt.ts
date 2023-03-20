import JWT from 'jsonwebtoken';
import config from '../config';
import { responseHandler } from './handlers';

interface Payload {
  [key: string]: any;
}

type ResultCallback = (error: Error | null, response: ReturnType<typeof responseHandler> | null) => void;

const getJwtToken = (payload: Payload, logMessage: string, result: ResultCallback) => {
  JWT.sign(
    payload,
    config.JWT.SECRET,
    { expiresIn: new Date().setDate(new Date().getDate() + config.JWT.EXPIRES_IN) },
    (error, token) => {
      if (error) {
        console.log('error: ', error);
        return result(responseHandler(false, error.statusCode, error.message, null), null);
      }

      return result(null, responseHandler(true, 200, logMessage, { token }));
    },
  );
};

export default getJwtToken;
