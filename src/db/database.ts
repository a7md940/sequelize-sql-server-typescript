import { Sequelize } from "sequelize";
const username = 'radwantest';
const dbName = 'SequelizeDemo';
const dbPassword = 'd95844';
const db = new Sequelize(dbName, username, dbPassword, {
    host: 'localhost',
    dialect: 'mssql'
});

 
export default db;