import { Model, DataTypes } from 'sequelize';
import db from '../config/db.config';
import { PostsModel } from './posts.model';
import { TagsModel } from './tags.model';

class PostTagModel extends Model {
  public postId!: string;
  public tagId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostTagModel.init({}, {
  sequelize: db,
  tableName: 'posttag',
  underscored: true,
});

PostTagModel.belongsTo(PostsModel, { foreignKey: { name: 'post_id', allowNull: false } });
PostTagModel.belongsTo(TagsModel, { foreignKey: { name: 'tag_id', allowNull: false } });

export { PostTagModel };
