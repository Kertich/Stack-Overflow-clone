import { Transaction } from 'sequelize';
import { PostTagModel } from '../models';

export const remove = async (postId: number, t: Transaction): Promise<{ status: boolean, message: string }> => {
  try {
    await PostTagModel.destroy({ where: { post_id: postId }, transaction: t });
    return { status: true, message: 'PostTag Removed' };
  } catch (error) {
    throw new Error(`PostTag Delete Operation Failed: ${error}`);
  }
};

export const bulkCreate = async (tags: Array<{ /* attributes of PostTagModel */ }>): Promise<void> => {
  try {
    await PostTagModel.bulkCreate(tags);
  } catch (error) {
    console.log(error);
    // You need to define `result` and `responseHandler` functions to handle this error.
    // The following line will return null.
    return null;
  }
};
