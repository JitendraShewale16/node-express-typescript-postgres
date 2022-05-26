import { Request, Response } from 'express'
import { DepartmentService } from '../services'
import { Department } from '../models'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class DepartmentController {
  public static async getAll(_req: Request, res: Response) {
    const deptService: DepartmentService = new DepartmentService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok(await deptService.getAllDepartment())
  }

  public static async addDept(req: Request, res: Response) {
    const dept = new Department({ ...req.body })
    const deptService: DepartmentService = new DepartmentService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await deptService.addDepartment(dept))
  }

  public static async updateDept(req: Request, res: Response) {
    const dept = new Department({ ...req.body })
    dept.id = parseInt(req.params.deptId)
    const reg = new RegExp('^[0-9]+$')

    if (!reg.test(req.params.deptId)) return res.send({ success: false, data: { message: 'Invalid Department Id' } })

    const deptService: DepartmentService = new DepartmentService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await deptService.updateDepartment(dept))
  }

  public static async deleteDept(req: Request, res: Response) {
    const dept = new Department({ ...req.body })
    dept.id = parseInt(req.params.deptId)
    const reg = new RegExp('^[0-9]+$')

    if (!reg.test(req.params.deptId)) return res.send({ success: false, data: { message: 'Invalid Department Id' } })

    const deptService: DepartmentService = new DepartmentService()
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.created(await deptService.deleteDepartment(dept))
  }
}
