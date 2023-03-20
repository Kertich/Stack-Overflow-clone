import { RequestHandler } from 'express';
import * as auth  from './auth';
import * as checkExistence  from './checkExistence';
import * as checkOwnership  from './checkOwnership';

export {
  auth,
  checkExistence,
  checkOwnership,
};
