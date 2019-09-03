import { Router } from 'express';
import { organizationControlls } from '../controllers/organizationController';

const organizationRouter = Router();

organizationRouter.get('/', organizationControlls.getOrganizations)
organizationRouter.get('/:orgId', organizationControlls.getOrganizationById)
organizationRouter.post('/', organizationControlls.createOrganizations)

export default organizationRouter;