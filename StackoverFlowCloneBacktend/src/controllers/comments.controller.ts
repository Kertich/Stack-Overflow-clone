import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler, asyncHandler } from '../helpers/handlers';
import { commentsService } from '../services';

interface CommentType {
  body: string;
  userId: string;
  postId: string;
}

const Comment = (comment: CommentType) => ({
  body: comment.body,
  userId: comment.userId,
  postId: comment.postId,
});

export const getComments = asyncHandler(async (req: Request, res: Response) => {
  try {
    await commentsService.retrieveAll(req.params.id, (err: any, data: any) => {
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

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }

  try {
    const comment = Comment({
      body: req.body.body,
      userId: req.user.id,
      postId: req.params.id,
    });
    // Save Comment in the database
    await commentsService.create(comment, (err: any, data: any) => {
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

export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  try {
    await commentsService.remove(req.params.id, (err: any, data: any) => {
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
