import express from 'express';
import { check } from 'express-validator';
import { auth, checkOwnership } from '../middleware';
import { commentsController } from '../controllers';

const router = express.Router();

/** @route      GET /api/posts/comments/:id
 *  @desc       fetch all comments of a post
 */
router.route('/:id')
  .get(commentsController.getComments);

/** @route      POST /api/posts/comments/:id
 *  @desc       add a comment to a post
 */
router.route('/:id')
  .post(
    auth,
    check('body', 'Comment is required').not().isEmpty(),
    commentsController.addComment,
  );

/** @route      DELETE /api/posts/comments/:id
 *  @desc       delete a comment to a post
 */
router.route('/:id')
  .delete(
    auth,
    checkOwnership,
    commentsController.deleteComment,
  );

export default router;
