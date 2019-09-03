import { NextFunction, Request, Response } from 'express';
import { Organization, OrganizationDTO } from '../models/OrganizationModel';
import { Employee } from '../models/EmployeeModel';

interface requestWithOrgDTO extends Request {
    body: OrganizationDTO
}
interface requestWithOrgId extends Request {
    params: {
        orgId: string
    }
}

export const organizationControlls = {
    getOrganizations(req: Request, res: Response, next: NextFunction) {
        Organization.findAll().then(orgs => {
            res.json(orgs)
        })
        .catch(res.json);
    },
    async createOrganizations(req: requestWithOrgDTO, res: Response) {
        try {
            const org = await Organization.create(req.body);
            org.save().then(org => res.json({org})).catch(err => res.json({err}));

        } catch (err) {
            res.json(err.parent.message)
        }
    },
    async getOrganizationById(req: requestWithOrgId, res: Response) {
        console.log(req.params.orgId)
        Organization.findByPk(req.params.orgId, {
            include: [
                {
                    model: Employee,
                    as: 'employees',

                }
            ]
        })
        .then(orgs => res.send(orgs))
        .catch(err => console.log(err))
    }
}