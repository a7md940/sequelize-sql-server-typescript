import { Sequelize } from "sequelize";
const username = 'radwantest';
const dbName = 'test';
const dbPassword = 'd95844';

export default new Sequelize(dbName, username, dbPassword, {
    host: 'localhost',
    dialect: 'mssql'
});