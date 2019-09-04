import { NextFunction, Request, Response } from 'express';
import { EmployeeDTO, Employee } from '../../models/EmployeeModel';
import { Organization } from '../../models/OrganizationModel';
import { Controller, GET, POST } from '../decorators';

interface requestWithEmpDTO extends Request {
  body: EmployeeDTO;
}

// interface RequestWithOrgId extends Request {
//   params: {
//     orgId: string;
//   };
//   body: undefined;
// }

@Controller('/employee')
class EmployeeController {
  /**
   * @swagger
   * /employee:
   *   get:
   *     tags:
   *       - Employee
   *     name: GetEmployeesByOrganizationId
   *     summary: Find All Employees Belongs To Specefic Organization
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: orgId
   *         schema:
   *           oneOf:
   *             - string
   *             - integer
   *         required:
   *           - orgId
   *     responses:
   *       '200':
   *         description: An Array of Employees
   *         schema:
   *           $ref: '#/definitions/Empployee'
   *       '401':
   *         description: No auth token / no user found in db with that name
   *       '403':
   *         description: JWT token and username from client don't match
   */
  @GET('')
  async getAllEmployee(req: Request, res: Response) {
    try {
      const emps = await Employee.findAll({
        include: [{ model: Organization, as: 'organization' }]
      });
      res.send(emps);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }

  @POST('')
  async createEmployee(req: requestWithEmpDTO, res: Response) {
    try {
      const emp = await Employee.create(req.body);
      await emp.save();
      res.json(await Employee.findByPk(emp.id));
    } catch (err) {
      res.send(err);
    }
  }

  @GET('/:orgId')
  async getEmployeeByOrgId(req: Request, res: Response) {
    Employee.findAll({
      where: {
        OrganizationId: req.params.orgId
      },
      include: [
        {
          model: Organization,
          as: 'organization'
        }
      ]
    })
      .then(emps => res.send(emps))
      .catch(err => res.send(err));
  }
}
