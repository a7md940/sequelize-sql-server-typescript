import { NextFunction, Request, Response } from 'express';
import { Organization, OrganizationDTO } from '../../models/OrganizationModel';
import { Employee } from '../../models/EmployeeModel';
import { bodyValidator, Controller, GET, POST, use } from '../decorators';
import authRequired from '../../middleware/auth';

interface requestWithOrgDTO extends Request {
  body: OrganizationDTO;
}
// interface requestWithOrgId extends Request {
//   params: {
//     orgId: string;
//   };
// }

@Controller('/organization')
class OrganizationController {
  @GET('')
  @use(authRequired)
  getOrganizations(req: Request, res: Response, next: NextFunction) {
    Organization.findAll()
      .then(orgs => {
        res.json(orgs);
      })
      .catch(res.json);
  }

  @POST('')
  @bodyValidator('name')
  @use(authRequired)
  async createOrganizations(req: requestWithOrgDTO, res: Response) {
    try {
      const org = await Organization.create(req.body);
      org
        .save()
        .then(org => res.json({ org }))
        .catch(err => res.json({ err }));
    } catch (err) {
      res.json(err.parent.message);
    }
  }

  /**
   * @swagger
   * /organization/${orgId}:
   *   get:
   *     tags:
   *       - Organization
   *     name: GetOrganizationById
   *     summary: Find One Organization By Id
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: orgId
   *         schema:
   *           type: string
   *         description: Numeric ID of organization
   *         required:
   *           - orgId
   *     responses:
   *       '200':
   *         description: Organization Object
   *         schema:
   *           $ref: '#/definitions/Organization'
   *       '401':
   *         description: No auth token / no user found in db with that name
   *       '403':
   *         description: JWT token and username from client don't match
   */
  @GET('/:orgId')
  async getOrganizationById(req: Request, res: Response) {
    console.log(req.params.orgId);
    Organization.findByPk(req.params.orgId, {
      include: [
        {
          model: Employee,
          as: 'employees'
        }
      ]
    })
      .then(orgs => res.send(orgs))
      .catch(err => console.log(err));
  }
}
