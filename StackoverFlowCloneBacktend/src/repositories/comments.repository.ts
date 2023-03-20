import Sequelize, { literal } from 'sequelize';
import { responseHandler } from '../helpers';
import { CommentsModel, UsersModel } from '../models';
import { isArrayEmpty } from '../utils';

export const create = async (newComment: { body: string, userId: number, postId: number }, result: Function) => {
  await CommentsModel.create({
    body: newComment.body,
    user_id: newComment.userId,
    post_id: newComment.postId,
  })
    .then((response: any) => {
      result(
        null,
        responseHandler(true, 200, 'Comment Added', response.id),
      );
    })
    .catch((error: any) => {
      console.log(error);
      result(responseHandler(false, 500, 'Some error occurred while adding the comment.', null), null);
    });
};

export const remove = async (id: number, result: Function) => {
  await CommentsModel.destroy({
    where: { id },
  })
    .then(() => {
      result(null, responseHandler(true, 200, 'Comment Removed', null));
    })
    .catch((error: any) => {
      console.log(error.message);
      result(responseHandler(false, 404, 'This comment doesn\'t exists', null), null);
    });
};

export const removePostComments = async (postId: number, t: any) => {
  await CommentsModel
    .destroy({ where: { post_id: postId }, transaction: t })
    .then(() => ({ status: true, message: 'Comment Removed' }))
    .catch((error: any) => {
      throw new Error(`Comment Delete Operation Failed: ${error}`);
    });
};

export const retrieveAll = async (postId: number, result: Function) => {
  const queryResult = await CommentsModel.findAll({
    where: {
      post_id: postId,
    },
    attributes: ['id', 'user_id', 'post_id', 'body', 'created_at', [literal('user.username'), 'username']],
    include: {
      model: UsersModel,
      attributes: [],
    },
  }).catch((error: any) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const queryResultMap = queryResult.map((comment: any) => ({
    id: comment.id,
    user_id: comment.user_id,
    post_id: comment.post_id,
    body: comment.body,
    created_at: comment.created_at,
    username: comment.username,
  }));

  if (isArrayEmpty(queryResultMap)) {
    console.log('error: ', 'There are no comments');
    return result(responseHandler(false, 404, 'There are no comments', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', queryResultMap));
};
