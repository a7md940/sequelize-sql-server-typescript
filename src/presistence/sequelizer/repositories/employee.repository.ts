import { BuildOptions, Model, INTEGER, STRING, BIGINT } from 'sequelize';
import dbInstance from '../db.instance';
import { IEmployee } from '../../../core/models/employee';

interface IEmployeeModel extends Model, IEmployee {}

type EmployeeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): IEmployeeModel;
};

/**
 * @swagger
 * definitions:
 *   Empployee:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       organizationId:
 *         type: integer
 *       age:
 *         type: integer
 *     required:
 *       - name
 *       - organizationId
 */
export const EmployeeRepository = <EmployeeModel>dbInstance.define(
  'Employee',
  {
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
    }
  },
  {
    tableName: 'Employee'
  }
);
