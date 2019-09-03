import { NextFunction, Request, Response } from 'express';
import { EmployeeDTO, Employee } from '../models/EmployeeModel';
import { Organization } from '../models/OrganizationModel';

interface requestWithEmpDTO extends Request {
    body: EmployeeDTO
}
interface RequestWithOrgId extends Request {
    params: {
        orgId: string;
    }
}

export const employeeControlls = {
    async createEmployee(req: requestWithEmpDTO, res: Response) {
        try {
            const emp = await Employee.create(req.body);
            await emp.save();
            res.json(await Employee.findByPk(emp.id))
        } catch (err) {
            res.send(err)
        }
    },
    async getAllEmployee(req: Request, res: Response) {
        try {
            const emps = await Employee.findAll(
                { include: [{model: Organization, as: 'organization' }] }
                )
            res.send(emps)

        } catch (err) {
            console.error(err)
            res.send(err)
        }
    },
    async getEmployeeByOrgId(req: RequestWithOrgId, res: Response) {
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
        .catch(err => res.send(err))

    }
}