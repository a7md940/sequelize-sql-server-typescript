import  {BuildOptions, Model, INTEGER, STRING, BIGINT} from 'sequelize';
import Database from '../db/database';
import { Organization, IOrganization } from './OrganizationModel';

export interface IEmployee extends Model {
    readonly id: number;
    name: string;
    organizationId: number;
    age?: number;
    // organization?: IOrganization;
}

export interface EmployeeDTO {
    name: string;
    organizationId: number;
    age?: number; 
}

type EmployeeModel = typeof Model & {
    new (values?: object, options?: BuildOptions): IEmployee
}
const Employee = <EmployeeModel>Database.define('Employee', {
    // if you did not define id attr with primaryKey and autoIncrement prop
    // sequelize will make it by default
    // if you want to change 'id' name to any thing else like orgId
    /*
    you have to write this -->
    empId: {
        type: BIGINT,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    }
    */
    id: {
        type: BIGINT,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    age: {
        type: INTEGER,
        allowNull: true
    }, 
}, {
    tableName: 'Employee'
});

export { Employee };