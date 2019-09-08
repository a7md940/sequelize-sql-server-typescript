import { BuildOptions, Model, INTEGER, STRING, BIGINT } from 'sequelize';
import Database from '../db/database';
import { Organization, IOrganization } from './OrganizationModel';

export class Employee extends Model {
  constructor(
    private readonly id: number,
    private name: string,
    private organizationId: number,
    private age?: number
  ) {
    super();
  }

  get getId(): number {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }
  get getOrganizationId(): number {
    return this.organizationId;
  }
  get getAge(): number | undefined {
    return this.age;
  }
  // readonly id: number;

  // name: string;
  // organizationId: number;
  // age?: number;
  // organization?: IOrganization;
}

export interface EmployeeDTO {
  id?: number;
  name: string;
  organizationId?: number;
  age?: number;
}

type EmployeeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): Employee;
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
const EmployeeRepository = <EmployeeModel>Database.define(
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
    tableName: 'Employee',
    timestamps: false
  }
);

export { EmployeeRepository as EmployeeDB };
