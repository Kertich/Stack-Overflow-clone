import { AnswersRepository } from '../repositories';

export const create = (newAnswer: any, result: any) => AnswersRepository.create(newAnswer, result);

export const remove = (id: any, result: any) => AnswersRepository.remove(id, result);

export const retrieveAll = (postId: any, result: any) => AnswersRepository.retrieveAll(postId, result);
