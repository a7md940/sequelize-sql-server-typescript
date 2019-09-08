import { EmployeeDTO, Employee } from '../models/EmployeeModel';
import { EmployeeDB } from '../models/EmployeeModel';

export class EmplyeeService {
  constructor() {}

  async createEmployee(employee: EmployeeDTO): Promise<Employee | Error> {
    try {
      const emp = await EmployeeDB.create(employee);
      return new Employee(
        emp.getId,
        emp.getName,
        emp.getOrganizationId,
        emp.getAge
      );
    } catch (err) {
      console.log(err);
      return Promise.resolve(err);
    }
  }

  //   async updateEmployee(
  //     employee: Array<EmployeeDTO>
  //   ): Promise<Employee | Error> {
  //     try {
  //       const emp = await EmployeeDB.update(employee, {
  //         where: {}
  //       });
  //     } catch (err) {}
  //   }

  async findEmployee() {}

  async findAllEmployees() {}

  async deleteEmployee() {}
}
