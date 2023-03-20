import { Request, Response } from 'express';
import { pool } from '../index';

class QuestionController {
  public async getQuestions(req: Request, res: Response) {
    try {
      const result = await pool.request().execute('GetQuestions');
      const questions = result.recordset;
      res.render('questions/index', { questions });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  public async getQuestion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const questionResult = await pool.request()
        .input('QuestionId', id)
        .execute('GetQuestionById');
      const question = questionResult.recordset[0];
      if (!question) {
        return res.status(404).send('Question not found');
      }
      const answerResult = await pool.request()
        .input('QuestionId', id)
        .execute('GetAnswersByQuestionId');
      const answers = answerResult.recordset;
      res.render('questions/show', { question, answers });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  public async editQuestion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.request()
        .input('QuestionId', id)
        .execute('GetQuestionById');
      const question = result.recordset[0];
      if (!question) {
        return res.status(404).send('Question not found');
      }
      res.render('questions/edit', { question });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  public async updateQuestion(req: Request, res: Response) {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
      await pool.request()
        .input('QuestionId', id)
        .input('Title', title)
        .input('Body', body)
        .execute('UpdateQuestion');
      res.redirect(`/questions/${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  public async deleteQuestion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await pool.request()
        .input('QuestionId', id)
        .execute('DeleteQuestion');
      res.redirect('/questions');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }
}

export const questionController = new QuestionController();
