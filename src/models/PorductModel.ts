import * as sequelize from 'sequelize';
import Database from '../db/database';
import { IUser, Users } from './UserModel';

export interface IPost extends sequelize.Model{
    readonly id : string;
    userId: IUser | string;
    title: string;
}

type PostModel = typeof sequelize.Model & {
    new (values?: object, options?: sequelize.BuildOptions): IPost
}
const Posts = <PostModel>Database.define('Posts', {
    id: {
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        type: sequelize.UUID
    },
    title: {
        type: sequelize.STRING
    }
});

Posts.belongsTo(Users, { foreignKey: 'userId' });

export { Posts }