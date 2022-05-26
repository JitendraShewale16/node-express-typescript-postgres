import { Request, Response } from 'express'
import { EmployeeService } from '../services'
import { Employee } from '../models'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class EmployeeController {
  public static async addEmployee(req: Request, res: Response) {
    const user = new Employee({ ...req.body })
    const employeeService: EmployeeService = new EmployeeService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await employeeService.addEmployee(user))
  }

  public static async getAll(_req: Request, res: Response) {
    const employeeService: EmployeeService = new EmployeeService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await employeeService.getAllEmployees())
  }

  public static async getEmployee(req: Request, res: Response) {
    const employee = new Employee()
    employee.id = parseInt(req.params.employeeId)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.employeeId)) return res.send({ success: false, data: { message: 'Invalid Employee Id' } })

    const employeeService: EmployeeService = new EmployeeService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await employeeService.getSingleEmployee(employee))
  }

  public static async updateEmployee(req: Request, res: Response) {
    const employee = new Employee({ ...req.body })
    const employeeService: EmployeeService = new EmployeeService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await employeeService.updateEmployee(employee))
  }

  public static async deleteEmployee(req: Request, res: Response) {
    const employee = new Employee({ ...req.body })
    employee.id = parseInt(req.params.employeeId)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.employeeId)) return res.send({ success: false, data: { message: 'Invalid Employee Id' } })

    const employeeService: EmployeeService = new EmployeeService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await employeeService.deleteEmployee(employee))
  }
}
