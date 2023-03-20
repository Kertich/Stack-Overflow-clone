import { Request, Response } from 'express';
import { pool } from '../config/db';

export const UserController = {
  async getUserProfile(req: Request, res: Response) {
    const userId = req.session?.userId;

    if (!userId) {
      return res.redirect('/login');
    }

    const getUserProfileQuery = 'EXEC GetUserProfile @UserId = @userId';
    const getUserProfileParams = { userId };

    try {
      const userProfile = await pool
        .request()
        .input('userId', getUserProfileParams.userId)
        .query(getUserProfileQuery);

      const userQuestionsQuery = 'EXEC GetUserQuestions @UserId = @userId';
      const userQuestionsParams = { userId };
      const userQuestions = await pool
        .request()
        .input('userId', userQuestionsParams.userId)
        .query(userQuestionsQuery);

      const userAnswersQuery = 'EXEC GetUserAnswers @UserId = @userId';
      const userAnswersParams = { userId };
      const userAnswers = await pool
        .request()
        .input('userId', userAnswersParams.userId)
        .query(userAnswersQuery);

      const userRecentActivityQuery = 'EXEC GetUserRecentActivity @UserId = @userId';
      const userRecentActivityParams = { userId };
      const userRecentActivity = await pool
        .request()
        .input('userId', userRecentActivityParams.userId)
        .query(userRecentActivityQuery);

      return res.render('user/profile', {
        title: 'User Profile',
        userProfile: userProfile.recordset[0],
        userQuestions: userQuestions.recordset,
        userAnswers: userAnswers.recordset,
        userRecentActivity: userRecentActivity.recordset,
      });
    } catch (error) {
      console.error(error);
      return res.render('error/500', { title: 'Server Error' });
    }
  },
};
