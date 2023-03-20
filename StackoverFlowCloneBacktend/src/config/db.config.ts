import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import config from './index';

dotenv.config();

const sequelize = new Sequelize(
  config.DB.DATABASE,
  config.DB.USER,
  config.DB.PASSWORD,
  {
    dialect: 'mysql',
    host: config.DB.HOST,
    port: config.DB.PORT,
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

(async () => await sequelize.sync())();

export default sequelize;
