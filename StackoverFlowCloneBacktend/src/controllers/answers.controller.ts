import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler, asyncHandler } from '../helpers/handlers';
import { answersService } from '../services';

export interface Answer {
  body: string;
  userId: string;
  postId: string;
}

export const Answer = (answer: any): Answer => ({
  body: answer.body,
  userId: answer.userId,
  postId: answer.postId,
});

export const getAnswers = asyncHandler(async (req: Request, res: Response) => {
  try {
    await answersService.retrieveAll(req.params.id, (err: any, data: any) => {
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

export const addAnswer = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    const answer: Answer = Answer({
      body: req.body.text,
      userId: req.user.id,
      postId: req.params.id,
    });
    // Save Answer in the database
    await answersService.create(answer, (err: any, data: any) => {
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

export const deleteAnswer = asyncHandler(async (req: Request, res: Response) => {
  try {
    await answersService.remove(req.params.id, (err: any, data: any) => {
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
