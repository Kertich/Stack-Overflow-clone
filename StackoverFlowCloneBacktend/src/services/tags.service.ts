import { TagAttributes } from '../models/Tag';
import { TagsRepository } from '../repositories';
import { ResponseHandler } from '../helpers';

type ResultCallback<T> = (err: Error | null, result: T | null) => void;

export const retrieveAll = (result: ResultCallback<TagAttributes[]>) => {
  TagsRepository.retrieveAll(result);
};

export const retrieveOne = (tagName: string, result: ResultCallback<TagAttributes>) => {
  TagsRepository.retrieveOneWithCount(tagName, result);
};
