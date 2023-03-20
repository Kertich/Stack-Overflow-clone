import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface PostAttributes {
  id: string;
  title: string;
  body: string;
  views: number;
  userId: string;
}

class PostsModel extends Model<PostAttributes> implements PostAttributes {
  public id!: string;
  public title!: string;
  public body!: string;
  public views!: number;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize: db,
    tableName: 'posts',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ],
      },
      {
        name: 'user_id',
        using: 'BTREE',
        fields: [
          { name: 'user_id' },
        ],
      },
    ],
  }
);

export default PostsModel;
