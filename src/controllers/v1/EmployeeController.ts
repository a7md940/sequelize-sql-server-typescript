import { NextFunction, Request, Response } from 'express';
import { Controller, GET, POST } from '../../core/decorators';
import {
  OrganizationRepository,
  EmployeeRepository
} from '../../presistence/sequelizer/repositories';
import { EmployeeDTO } from '../../dtos/employee.dto';

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
      const emps = await EmployeeRepository.findAll({
        include: [{ model: OrganizationRepository, as: 'organization' }]
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
      const emp = await EmployeeRepository.create(req.body);
      await emp.save();
      res.json(await EmployeeRepository.findByPk(emp.id));
    } catch (err) {
      res.send(err);
    }
  }

  @GET('/:orgId')
  async getEmployeeByOrgId(req: Request, res: Response) {
    EmployeeRepository.findAll({
      where: {
        OrganizationId: req.params.orgId
      },
      include: [
        {
          model: OrganizationRepository,
          as: 'organization'
        }
      ]
    })
      .then(emps => res.send(emps))
      .catch(err => res.send(err));
  }
}
