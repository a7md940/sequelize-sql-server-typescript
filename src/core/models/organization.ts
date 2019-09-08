import { IEmployee } from './employee';

export interface IOrganization {
  readonly id: number;
  name: string;
  employees: IEmployee[];
  phone?: string;
}
