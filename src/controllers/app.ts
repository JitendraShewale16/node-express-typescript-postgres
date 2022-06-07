import { Request, Response } from 'express'

import { apiVersion } from '../providers/version'
import { ResponseWrapper } from '../helpers/response_wrapper'
import { generateToken } from '../utils/jwt.utils'

console.log('JWT token -', generateToken())

export class AppController {
  public static async version(_req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok({ success: true, data: apiVersion })
  }

  public static async getToken(_req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res)

    return response.ok({ success: true, data: { token: generateToken() } })
  }
}
