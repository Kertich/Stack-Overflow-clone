const { CommentsRepository } = require('../repositories');

exports.create = (newComment, result) => CommentsRepository.create(newComment, result);

exports.remove = (id, result) => CommentsRepository.remove(id, result);

exports.retrieveAll = (postId, result) => CommentsRepository.retrieveAll(postId, result);


import { CommentsRepository } from '../repositories';

export const create = (newComment: any, result: any) => CommentsRepository.create(newComment, result);

export const remove = (id: any, result: any) => CommentsRepository.remove(id, result);

export const retrieveAll = (postId: any, result: any) => CommentsRepository.retrieveAll(postId, result);
