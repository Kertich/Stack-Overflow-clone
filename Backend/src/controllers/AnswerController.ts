import { Request, Response } from 'express';
import { pool } from '../index';
import * as sql from 'mssql';
import { executeQuery } from '../index';

// import { executeQuery } from '../database';
// import { Answer } from '../models/Answer';
// import { Vote } from '../models/Vote';
// import { Comment } from '../models/Comment';

export const postAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId, content, userId } = req.body;

    const result = await executeQuery('spInsertAnswer', [questionId, content, userId]);

    if (result.rowsAffected[0] === 1) {
      res.redirect(`/question/${questionId}`);
    } else {
      res.status(500).send('Unable to post answer');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

export const postVote = async (req: Request, res: Response) => {
  try {
    const { answerId, userId, voteValue } = req.body;

    const result = await executeQuery('spInsertVote', [answerId, userId, voteValue]);

    if (result.rowsAffected[0] === 1) {
      res.redirect('back');
    } else {
      res.status(500).send('Unable to vote');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

export const postComment = async (req: Request, res: Response) => {
  try {
    const { answerId, content, userId } = req.body;

    const result = await executeQuery('spInsertComment', [answerId, content, userId]);

    if (result.rowsAffected[0] === 1) {
      res.redirect('back');
    } else {
      res.status(500).send('Unable to post comment');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

export const markAnswerAsPreferred = async (req: Request, res: Response) => {
  try {
    const { answerId } = req.body;

    const result = await executeQuery('spUpdateAnswerPreferred', [answerId]);

    if (result.rowsAffected[0] === 1) {
      res.redirect('back');
    } else {
      res.status(500).send('Unable to mark answer as preferred');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
