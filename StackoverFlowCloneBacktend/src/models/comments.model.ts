import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface CommentAttributes {
  id: string;
  body: string;
  user_id: string;
  post_id: string;
  created_at?: Date;
  updated_at?: Date;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: string;
  public body!: string;
  public user_id!: string;
  public post_id!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'comments',
    underscored: true,
    timestamps: true,
    sequelize: db,
  },
);

export default Comment;
