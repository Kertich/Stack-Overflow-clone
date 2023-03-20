import db from '../config/db.config';
import { Response } from 'express';
import { responseHandler, investApi } from '../helpers';
import utils from '../utils';
import {
  PostsRepository,
  AnswersRepository,
  CommentsRepository,
  PostTagRepository,
  TagsRepository,
} from '../repositories';

interface NewPost {
  title: string;
  body: string;
  userId: number;
  tagName: string;
}

export const create = async (newPost: NewPost, result: Response) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const tags = newPost.tagName.split(',').map((item) => item.trim());

    if (tags.length > 5) {
      return result(
        responseHandler(false, 400, 'Only Tags Upto 5 Are Allowed', null),
        null,
      );
    }

    const post = await PostsRepository.create(newPost, result);

    const mapAllTags = [];
    const mapAllTagsWithoutDesc = [];
    let mapNewTags = [];

    for (const item of tags) {
      const tag = await TagsRepository.retrieveOne(item);

      if (!utils.conditional.isNull(tag)) {
        mapAllTags.push({
          post_id: post.id,
          tag_id: tag.id,
        });
      } else {
        mapAllTagsWithoutDesc.push(item);
      }
    }

    /**
     * prepare a string of tags with ";" as delimeter
     * for eg:- [java, javascript] will become "java;javascript"
     */
    const mapAllTagsWithoutDescString = mapAllTagsWithoutDesc.join(';');

    const resp = await investApi.fetchTagDesc(mapAllTagsWithoutDescString);
    mapNewTags = investApi.prepareTags(mapAllTagsWithoutDesc, resp);

    const newCreatedTags = await TagsRepository.bulkCreate(mapNewTags);

    for (const tag of newCreatedTags) {
      mapAllTags.push({
        post_id: post.id,
        tag_id: tag.id,
      });
    }

    await PostTagRepository.bulkCreate(mapAllTags);

    result(null, responseHandler(true, 200, 'Post Created', post.id));

    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

export const remove = async (id: number, result: Response) => {
  let t;

  try {
    t = await db.transaction();

    await AnswersRepository.removePostAnswers(id, t);

    await CommentsRepository.removePostComments(id, t);

    await PostTagRepository.remove(id, t);

    await PostsRepository.remove(id, t);

    result(null, responseHandler(true, 200, 'Post Removed', null));

    await t.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    await t.rollback();
  }
};

export const retrieveOne = async (postId: number, result: Response) => {
  await PostsRepository.incrementViews(postId);

  const queryResult = await PostsRepository.retrieveOne(postId);

  const answersCount = await PostsRepository.countAnswersForOne(postId);

  const commentsCount = await PostsRepository.countCommentsForOne(postId);

  const response = {
    answer_count: answersCount,
    comment_count: commentsCount,
    ...queryResult,
  };

  return result(null, responseHandler(true, 200, 'Success', response));
};

export const retrieveAll = async (result: (err: any, data: any) => void): Promise<void> => {
  try {
    const postsMap: Post[] = await PostsRepository.retrieveAll();

    const postCounts = await PostsRepository.countForAll();

    const postCountsMap: PostWithCounts[] = postCounts.map((post) =>
      Utils.array.sequelizeResponse(post, 'id', 'answer_count', 'comment_count')
    );

    const response = Utils.array.mergeById(postsMap, postCountsMap);

    result(null, responseHandler(true, 200, 'Success', response));
  } catch (err) {
    console.log(err);
    result(err, responseHandler(false, 500, 'Server Error', null));
  }
};

export const retrieveAllTag = async (
  tagName: string,
  result: (err: any, data: any) => void
): Promise<void> => {
  try {
    const postsMap: Post[] = await PostsRepository.retrieveAll(tagName);

    const postCounts = await PostsRepository.countForAll();

    const postCountsMap: PostWithCounts[] = postCounts.map((post) =>
      Utils.array.sequelizeResponse(post, 'id', 'answer_count', 'comment_count')
    );

    const response = Utils.array.mergeById(postsMap, postCountsMap);

    result(null, responseHandler(true, 200, 'Success', response));
  } catch (err) {
    console.log(err);
    result(err, responseHandler(false, 500, 'Server Error', null));
  }
};
