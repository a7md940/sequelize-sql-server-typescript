import { BuildOptions, Model, INTEGER, STRING, BIGINT } from 'sequelize';
import Database from '../db/database';
import { EmployeeDB, Employee } from './EmployeeModel';

export interface IOrganization extends Model {
  readonly id: number;
  name: string;
  // employees: IEmployee[],
  phone?: string;
}

export interface OrganizationDTO {
  name: string;
  phone?: string;
}

export type OrganizationModel = typeof Model & {
  new (values?: object, options?: BuildOptions): IOrganization;
};

/**
 * @swagger
 * definitions:
 *   Organization:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       phone:
 *         type: string
 *       employees:
 *         type: array
 *         items:
 *            $ref: '#/definitions/Empployee'
 *     required:
 *       - name
 *       - organizationId
 */

const Organization = <OrganizationModel>Database.define(
  'Organization',
  {
    // if you did not define id attr with primaryKey and autoIncrement prop
    // sequelize will make it by default
    // if you want to change 'id' name to any thing else like orgId
    /*
    you have to write this -->
    orgId: {
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
    phone: {
      type: STRING,
      allowNull: true
    }
  },
  {
    tableName: 'Organization',
    timestamps: false
  }
);

Organization.hasMany(EmployeeDB, {
  foreignKey: {
    name: 'OrganizationId',
    allowNull: false
  },
  sourceKey: 'id',
  as: 'employees'
});

EmployeeDB.belongsTo(Organization, {
  foreignKey: 'OrganizationId',
  targetKey: 'id',
  as: 'organization'
});

export { Organization };
