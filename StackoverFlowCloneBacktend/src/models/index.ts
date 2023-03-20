import { UsersModel } from './users.model';
import { PostsModel } from './posts.model';
import { TagsModel } from './tags.model';
import { PostTagModel } from './posttag.model';
import { AnswersModel } from './answers.model';
import { CommentsModel } from './comments.model';

UsersModel.hasMany(PostsModel, {
  foreignKey: { name: 'user_id', allowNull: false },
});
PostsModel.belongsTo(UsersModel);

UsersModel.hasMany(CommentsModel, {
  foreignKey: { name: 'user_id', allowNull: false },
});
CommentsModel.belongsTo(UsersModel);

UsersModel.hasMany(AnswersModel, {
  foreignKey: { name: 'user_id', allowNull: false },
});
AnswersModel.belongsTo(UsersModel);

PostsModel.hasMany(CommentsModel, {
  foreignKey: { name: 'post_id', allowNull: false },
});
CommentsModel.belongsTo(PostsModel);

PostsModel.hasMany(AnswersModel, {
  foreignKey: { name: 'post_id', allowNull: false },
});
AnswersModel.belongsTo(PostsModel);

PostsModel.belongsToMany(TagsModel, { through: PostTagModel, foreignKey: { name: 'post_id', allowNull: false } });
TagsModel.belongsToMany(PostsModel, { through: PostTagModel, foreignKey: { name: 'tag_id', allowNull: false } });

export {
  UsersModel,
  PostsModel,
  TagsModel,
  PostTagModel,
  AnswersModel,
  CommentsModel,
};
