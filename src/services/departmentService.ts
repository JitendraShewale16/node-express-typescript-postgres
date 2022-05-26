import Helper from '../db_pool/helper'
import { Department } from '../models'
import PGPool from '../db_pool/pg_pool'
import { CommonService } from '.'
import { logger } from '../providers/logger'
import messages from '../constants'
import { DateTime } from 'luxon'

console.log(DateTime.now().toISO())

export class DepartmentService extends CommonService {
  // get all Department list
  public async getAllDepartment(): Promise<any> {
    const pool = Helper.pool()

    const sql = `SELECT * FROM public.tbl_department where active = true`
    const query_results = await pool.aquery(sql)

    return {
      success: true,
      data: query_results.rows,
    }
  }

  // add Department
  public async addDepartment(dept: Department, pool?: PGPool): Promise<any> {
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
      const sql_dept = `INSERT INTO public.tbl_department (deptname) VALUES ('${dept.deptname}') returning id`

      const deptResult = await pool.aquery(sql_dept, [])
      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool)

      return {
        success: true,
        data: {
          message: messages.success.insert,
          deptId: deptResult.rows[0].id,
        },
      }
    } catch (error) {
      logger.error(`DepartmentService.addDepartment() Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }

  // update the Department details
  public async updateDepartment(dept: Department) {
    const pool = Helper.pool()

    try {
      // begin transaction
      await Helper.beginTransaction(pool)
      const sqlGet = `SELECT id, deptname FROM public.tbl_department WHERE id =$1 AND active= true`

      const deptDetails = await pool.aquery(sqlGet, [dept.id])

      if (deptDetails.rowCount <= 0) {
        return { success: false, data: { message: messages.errors.department.invalidDepartId } }
      }

      const _columns = `deptname ='${dept.deptname}'`

      // update Department
      const updateDeptSQL = `UPDATE public.tbl_department SET ${_columns} WHERE id= $1`
      await pool.aquery(updateDeptSQL, [dept.id])

      //commit transaction
      await Helper.commitTransaction(pool)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`DepartmentService.updateDepartment() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  // delete the Department details
  public async deleteDepartment(dept: Department) {
    const pool = Helper.pool()

    try {
      // begin transaction
      await Helper.beginTransaction(pool)
      const sqlGet = `SELECT * FROM public.tbl_department WHERE id =$1 AND active= true`

      const deptDetails = await pool.aquery(sqlGet, [dept.id])

      if (deptDetails.rowCount <= 0) {
        return { success: false, data: { message: messages.errors.department.invalidDepartId } }
      }

      // update Department
      const updateDeptSQL = `UPDATE public.tbl_department SET active= true WHERE id= $1`
      await pool.aquery(updateDeptSQL, [dept.id])

      //commit transaction
      await Helper.commitTransaction(pool)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`DepartmentService.updateDepartment() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
}

export default DepartmentService
