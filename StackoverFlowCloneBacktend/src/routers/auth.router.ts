import express, { Router } from 'express';
import { check } from 'express-validator';
import { auth, RequestWithUser } from '../middleware';
import { authController } from '../controllers';

const router: Router = express.Router();

/** @route      GET /api/auth
 *  @desc       fetch logged-in user details
 */
router.route('/')
  .get(
    auth,
    (req: RequestWithUser, res: express.Response) => authController.loadUser(req, res),
  );

/** @route      POST /api/auth
 *  @desc       log in user
 */
router.route('/')
  .post(
    check('username', 'Please include a valid username').isLength({ min: 5 }),
    check('password', 'Password is required').not().isEmpty(),
    (req: express.Request, res: express.Response) => authController.login(req, res),
  );

export default router;
