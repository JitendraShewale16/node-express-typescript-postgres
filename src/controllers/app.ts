import { Request, Response } from 'express'

import { apiVersion } from '../providers/version'
import { ResponseWrapper } from '../helpers/response_wrapper'

export class AppController {
  public static async version(_req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok({ success: true, data: apiVersion })
  }
}
