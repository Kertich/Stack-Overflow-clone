import { Request, Response } from 'express';
import { pool } from '../index';

export class AdminController {
  // Display admin dashboard
  static async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      // Retrieve analytics from database
      const [users, questions, answers] = await Promise.all([
        pool.request().execute('GetUserCount'),
        pool.request().execute('GetQuestionCount'),
        pool.request().execute('GetAnswerCount'),
      ]);
      const data = {
        userCount: users.recordset[0].UserCount,
        questionCount: questions.recordset[0].QuestionCount,
        answerCount: answers.recordset[0].AnswerCount,
      };

      res.render('admin/dashboard', { data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  // Handle user deletion
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      // Delete user from database
      await pool.request().input('UserId', userId).execute('DeleteUser');

      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  // Handle question deletion
  static async deleteQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { questionId } = req.params;

      // Delete question and associated answers from database
      await pool
        .request()
        .input('QuestionId', questionId)
        .execute('DeleteQuestionAndAnswers');

      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}
