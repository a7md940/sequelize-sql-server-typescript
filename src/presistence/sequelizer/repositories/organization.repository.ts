import { BuildOptions, Model, INTEGER, STRING, BIGINT } from 'sequelize';
import dbInstance from '../db.instance';
import { EmployeeRepository } from './employee.repository';
import { IOrganization } from '../../../core/models/organization';

interface IOrganizationModel extends Model, IOrganization {}

type OrganizationModel = typeof Model & {
  new (values?: object, options?: BuildOptions): IOrganizationModel;
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

export const OrganizationRepository = <OrganizationModel>dbInstance.define(
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

OrganizationRepository.hasMany(EmployeeRepository, {
  foreignKey: {
    name: 'OrganizationId',
    allowNull: false
  },
  sourceKey: 'id',
  as: 'employees'
});

EmployeeRepository.belongsTo(OrganizationRepository, {
  foreignKey: 'OrganizationId',
  targetKey: 'id',
  as: 'organization'
});
