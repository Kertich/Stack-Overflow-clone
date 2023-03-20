import Sequelize, { Literal } from 'sequelize';
import constantsHolder from '../constants';
import { responseHandler } from '../helpers';
import utils from '../utils';
import { UsersModel, PostsModel, TagsModel, AnswersModel, CommentsModel } from '../models';

type NewUser = {
  username: string;
  password: string;
};

export const create = async (newUser: NewUser) =>
  await UsersModel.create({
    username: newUser.username,
    password: newUser.password,
    gravatar: constantsHolder.GRAVATAR_URL(utils.math.getRandomInt()),
  }).catch((error: Error) => {
    console.log(error.message);
    throw new Error('Some error occurred while registering the user.');
  });

type Result<T> = (err: Error | null, data: T | null) => void;

export const retrieveAll = async (result: Result<any>) => {
  const queryResult = await UsersModel.findAll({
    distinct: true,
    attributes: [
      'id',
      'username',
      'gravatar',
      'views',
      'created_at',
      [Literal('COUNT(DISTINCT(posts.id))'), 'posts_count'],
      [Literal('COUNT(DISTINCT(tagname))'), 'tags_count'],
    ],
    include: [
      {
        model: PostsModel,
        attributes: [],
        required: false,
        include: {
          model: TagsModel,
          attributes: [],
          required: false,
        },
      },
    ],
    group: ['users.id'],
    order: [[Literal('posts_count'), 'DESC']],
  }).catch((error: Error) => {
    console.log(error);
    return result(responseHandler(false, 500, 'Something went wrong!', null), null);
  });

  const usersMap = queryResult.map((user: any) =>
    utils.array.sequelizeResponse(
      user,
      'id',
      'username',
      'gravatar',
      'views',
      'created_at',
      'posts_count',
      'tags_count',
    ),
  );

  if (utils.conditional.isArrayEmpty(usersMap)) {
    return result(responseHandler(false, 404, 'There are no users', null), null);
  }

  return result(null, responseHandler(true, 200, 'Success', usersMap));
};

export const incrementViews = async (userId: number) => {
  await UsersModel.increment('views', {
    by: 1,
    where: { id: userId },
  }).catch((error: Error) => {
    console.log('error: ', error);
    throw new Error("There isn't any user by this id");
  });
};

export const retrieveOneWithCounts = async (id: number) => {
  let queryResult = await UsersModel.findOne({
    where: { id },
    attributes: [
      'id',
      'username',
      'gravatar',
      'views',
      'created_at',
      [Literal('COUNT(DISTINCT(posts.id))'), 'posts_count'],
      [Literal('COUNT(DISTINCT(tagname))'), 'tags_count'],
      [Literal('COUNT(DISTINCT(answers.id))'), 'answers_count'],
      [Literal('COUNT(DISTINCT(comments.id))'), 'comments_count'],
    ],
    include: [
      {
        required: false,
        model: PostsModel,
        attributes: [],
        include: {
          attributes: [],
          required: false,
          model: TagsModel,
        },
      },
      {
        attributes: [],
        required: false,
        model: AnswersModel,
      },
      {
        attributes: [],
        required: false,
        model: CommentsModel,
      },
    ],
   
