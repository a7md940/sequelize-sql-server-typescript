import * as sequelize from 'sequelize';
import Database from '../db/database';

export interface IUser extends sequelize.Model{
    readonly id : string;
    name:string;
    age : number;
}

type UserModel = typeof sequelize.Model & {
    new (values?: object, options?: sequelize.BuildOptions): IUser
}
const Users = <UserModel>Database.define('Users', {
    id: {
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        type: sequelize.UUID
    },
    name: {
        type: sequelize.STRING
    },
    age: {
        type: sequelize.INTEGER
    }
});

export {Users};