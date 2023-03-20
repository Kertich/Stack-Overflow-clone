import { DataTypes } from 'sequelize';
import { db } from '../config/db.config';

const TagsModel = db.define('tags', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  tagname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'tagname',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'tags',
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
      name: 'tagname',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'tagname' },
      ],
    },
  ],
});

export { TagsModel };
