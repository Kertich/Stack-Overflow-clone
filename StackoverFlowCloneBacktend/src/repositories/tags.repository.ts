import { Sequelize, Op } from 'sequelize';
import { Response } from 'express';
import { responseHandler } from '../helpers';
import { TagsModel, PostsModel } from '../models';
import { sequelizeResponse, isArrayEmpty, isNull } from '../utils';

export const retrieveAll = async (result: Response): Promise<void> => {
  try {
    const queryResult = await TagsModel.findAll({
      distinct: true,
      attributes: [
        'id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at',
      ],
      include: {
        model: PostsModel,
        attributes: [],
      },
      group: ['tags.id'],
      order: [[Sequelize.col('posts_count'), 'DESC']],
    });

    const tagsMap = queryResult.map((tag) => sequelizeResponse(
      tag,
      'id',
      'tagname',
      'description',
      'posts_count',
      'created_at',
    ));

    if (isArrayEmpty(tagsMap)) {
      result.status(404).json(responseHandler(false, 404, 'There are no tags', null));
    } else {
      result.status(200).json(responseHandler(true, 200, 'Success', tagsMap));
    }
  } catch (error) {
    console.log(error);
    result.status(500).json(responseHandler(false, 500, 'Something went wrong', null));
  }
};

export const retrieveOneWithCount = async (tagName: string, result: Response): Promise<void> => {
  try {
    let queryResult = await TagsModel.findOne({
      where: { tagname: tagName },
      attributes: [
        'id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at',
      ],
      include: {
        model: PostsModel,
        attributes: [],
      },
      group: ['tags.id'],
    });

    if (isNull(queryResult)) {
      result.status(404).json(responseHandler(false, 404, "This tag doesn't exist", null));
    } else {
      queryResult = sequelizeResponse(
        queryResult,
        'id',
        'tagname',
        'description',
        'posts_count',
        'created_at',
      );
      result.status(200).json(responseHandler(true, 200, 'Success', queryResult));
    }
  } catch (error) {
    console.log(error);
    result.status(500).json(responseHandler(false, 500, 'Something went wrong', null));
  }
};

export const bulkCreate = async (tags: object[]): Promise<void> => {
  try {
    await TagsModel.bulkCreate(tags);
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

export const retrieveOne = async (tagname: string): Promise<object | null> => {
  try {
    console.log('hello', tagname);
    const queryResult = await TagsModel.findOne({
      where: { tagname },
    });
    return queryResult;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
