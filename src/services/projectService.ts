import Helper from '../db_pool/helper'
import { Project } from '../models'
import PGPool from '../db_pool/pg_pool'
import { CommonService } from '.'
import { logger } from '../providers/logger'
import messages from '../constants'
import { DateTime } from 'luxon'

console.log(DateTime.now().toISO())

export class ProjectService extends CommonService {
  // get all project list
  public async getAllProject(): Promise<any> {
    const pool = Helper.pool()

    const sql = `SELECT * FROM public.tbl_project where active = true`
    const query_results = await pool.aquery(sql)

    return {
      success: true,
      data: query_results.rows,
    }
  }

  // add project details
  public async addProject(project: Project, pool?: PGPool): Promise<any> {
    let pooldefinedLocally = false

    // pool is not supplied, create one AND start transaction
    if (pool === undefined) {
      pooldefinedLocally = true
      pool = Helper.pool()
      // begin transaction
      await Helper.beginTransaction(pool)
    }

    try {
      // Insert Department row
      const sql_project = `INSERT INTO public.tbl_project (projectcode, projectname, clientname, startdate, enddate) 
      VALUES ('${project.projectcode}','${project.projectname}','${project.clientname}','${project.startdate}','${project.enddate}') returning id`

      const projectResult = await pool.aquery(sql_project, [])
      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool)

      return {
        success: true,
        data: {
          message: messages.success.insert,
          projectId: projectResult.rows[0].id,
        },
      }
    } catch (error) {
      logger.error(`ProjectService.addProject() Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }

  // update the project details
  public async updateProject(project: Project) {
    const pool = Helper.pool()

    try {
      // begin transaction
      await Helper.beginTransaction(pool)
      const sqlGet = `SELECT id, projectcode FROM public.tbl_project WHERE  projectcode=$1 AND active= true`

      const projectDetails = await pool.aquery(sqlGet, [project.projectcode])

      if (projectDetails.rowCount <= 0) {
        return { success: false, data: { message: messages.errors.project.invalidProjectId } }
      }

      const _columns = `projectname ='${project.projectname}', clientname ='${project.clientname}', startdate ='${project.startdate}',
      enddate ='${project.enddate}'`

      // update project
      const updateProjectSQL = `UPDATE public.tbl_project SET ${_columns} WHERE id= $1`
      await pool.aquery(updateProjectSQL, [project.id])

      //commit transaction
      await Helper.commitTransaction(pool)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`ProjectService.updateProject() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  // delete the project details
  public async deleteProject(project: Project) {
    const pool = Helper.pool()

    try {
      // begin transaction
      await Helper.beginTransaction(pool)
      const sqlGet = `SELECT * FROM public.tbl_project WHERE id =$1 AND active= true`

      const projectDetails = await pool.aquery(sqlGet, [project.id])

      if (projectDetails.rowCount <= 0) {
        return { success: false, data: { message: messages.errors.project.invalidProjectId } }
      }

      // update project
      const updateProjectSQL = `UPDATE public.tbl_project SET active= false WHERE id= $1`
      await pool.aquery(updateProjectSQL, [project.id])

      //commit transaction
      await Helper.commitTransaction(pool)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`ProjectService.updateProject() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
}

export default ProjectService
