import { Sequelize } from 'sequelize';
import config from '../config/configKeys';

const db = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.type
  }
);

export default db;
