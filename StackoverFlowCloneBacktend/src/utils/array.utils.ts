import { Model } from 'sequelize';

const sequelizeResponse = (model: Model, ...params: string[]) => {
  const result: Record<string, any> = {};

  params.forEach((item) => {
    result[item] = model.getDataValue(item);
  });

  return result;
};

const mergeById = (arr1: Record<string, any>[], arr2: Record<string, any>[]) =>
  arr1.map((itemOne) => ({
    ...arr2.find((itemTwo) => itemTwo.id === itemOne.id) || {},
    ...itemOne,
  }));

export { sequelizeResponse, mergeById };
