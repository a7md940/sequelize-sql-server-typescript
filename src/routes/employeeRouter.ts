import { Router } from 'express';

import { employeeControlls } from '../controllers/EmployeeController';

const employeeRouter = Router();

employeeRouter.post('/', employeeControlls.createEmployee);
employeeRouter.get('/', employeeControlls.getAllEmployee);
employeeRouter.get('/:orgId', employeeControlls.getEmployeeByOrgId);

export default employeeRouter;