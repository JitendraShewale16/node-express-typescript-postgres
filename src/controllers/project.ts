import { Request, Response } from 'express'
import { ProjectService } from '../services'
import { Project } from '../models'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class ProjectController {
  public static async getAll(_req: Request, res: Response) {
    const projectService: ProjectService = new ProjectService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await projectService.getAllProject())
  }

  public static async addProject(req: Request, res: Response) {
    const project = new Project({ ...req.body })
    const projectService: ProjectService = new ProjectService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await projectService.addProject(project))
  }

  public static async updateProject(req: Request, res: Response) {
    const project = new Project({ ...req.body })
    const projectService: ProjectService = new ProjectService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await projectService.updateProject(project))
  }

  public static async deleteProject(req: Request, res: Response) {
    const project = new Project({ ...req.body })
    project.id = parseInt(req.params.projectId)
    const reg = new RegExp('^[0-9]+$')
    if (!reg.test(req.params.projectId)) return res.send({ success: false, data: { message: 'Invalid Project Id' } })
    const projectService: ProjectService = new ProjectService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.created(await projectService.deleteProject(project))
  }
}
