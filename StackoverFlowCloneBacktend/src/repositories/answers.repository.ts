import { Literal, Op } from 'sequelize';
import { responseHandler } from '../helpers';
import { AnswersModel } from '../models/answers';
import { UsersModel } from '../models/users';
import { array, conditional } from '../utils';

interface NewAnswer {
  body: string;
  userId: string;
  postId: string;
}

type ResultCallback = (err: Error | null, result: unknown | null) => void;

export const create = async (newAnswer: NewAnswer, result: ResultCallback) => {
  try {
    const response = await AnswersModel.create({
      body: newAnswer.body,
      user_id: newAnswer.userId,
      post_id: newAnswer.postId,
    });
    result(null, responseHandler(true, 200, 'Answer Added', response.id));
  } catch (error) {
    console.log(error);
    result(
      responseHandler(false, 500, 'Some error occurred while adding the answer.', null),
      null
    );
  }
};

export const remove = async (id: string, result: ResultCallback) => {
  try {
    await AnswersModel.destroy({
      where: { id },
    });
    result(null, responseHandler(true, 200, 'Answer Removed', null));
  } catch (error) {
    console.log(error.message);
    result(
      responseHandler(false, 404, "This answer doesn't exists", null),
      null
    );
  }
};

export const removePostAnswers = async (postId: string, t: unknown) => {
  try {
    await AnswersModel.destroy({
      where: { post_id: postId },
      transaction: t,
    });
    return { status: true, message: 'Answer Removed' };
  } catch (error) {
    throw new Error(`Answer Delete Operation Failed: ${error}`);
  }
};

export const retrieveAll = async (postId: string, result: ResultCallback) => {
  try {
    const queryResult = await AnswersModel.findAll({
      where: {
        post_id: postId,
      },
      attributes: [
        'id',
        'user_id',
        'post_id',
        'body',
        'created_at',
        [
          Literal('user.username'),
          'username',
        ],
        [
          Literal('user.gravatar'),
          'gravatar',
        ],
      ],
      include: {
        model: UsersModel,
        attributes: [],
      },
    });

    const queryResultMap = queryResult.map((answer) => array.sequelizeResponse(
      answer,
      'id',
      'user_id',
      'post_id',
      'body',
      'created_at',
      'username',
      'gravatar',
    ));

    if (conditional.isArrayEmpty(queryResultMap)) {
      console.log('error: ', 'There are no answers');
      return result(responseHandler(false, 404, 'There are no answers', null), null);
    }

    return result(null, responseHandler(true, 200, 'Success', queryResultMap));
  } catch (error) {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  }
};
