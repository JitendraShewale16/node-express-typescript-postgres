import Helper from '../db_pool/helper'
import { Employee } from '../models'
import PGPool from '../db_pool/pg_pool'
import { CommonService } from '.'
import { logger } from '../providers/logger'
import messages from '../constants'
import { DateTime } from 'luxon'

console.log(DateTime.now().toISO())

export class EmployeeService extends CommonService {
  // get all Employee
  public async getAllEmployees(): Promise<any> {
    const pool = Helper.pool()

    const sql = `SELECT * FROM public.tbl_employee where active = true`
    const query_results = await pool.aquery(sql)

    return {
      success: true,
      data: query_results.rows,
    }
  }

  // add Employee
  public async addEmployee(employee: Employee, pool?: PGPool): Promise<any> {
    let pooldefinedLocally = false

    // pool is not supplied, create one AND start transaction
    if (pool === undefined) {
      pooldefinedLocally = true
      pool = Helper.pool()
      // begin transaction
      await Helper.beginTransaction(pool)
    }

    if (!/\S+@\S+\.\S+/.test(employee.email || '')) {
      return { success: false, data: { message: messages.errors.employee.email } }
    }

    try {
      // Insert employee row
      const sql_emp = `INSERT INTO public.tbl_employee (empId, firstName, lastName, email, address, state, country, fk_deptId,fk_managerId, fk_projectId, joiningDate) 
      VALUES ('${employee.empId}','${employee.firstName}','${employee.lastName}','${employee.email}','${employee.address}','${employee.state}','${employee.country}','${employee.fk_deptId}','${employee.fk_managerId}','${employee.fk_projectId}','${employee.joiningDate}') returning id`

      const empResult = await pool.aquery(sql_emp, [])
      // commit if there is a transaction
      if (pooldefinedLocally) await Helper.commitTransaction(pool)

      return {
        success: true,
        data: {
          message: messages.success.insert,
          empId: empResult.rows[0].id,
        },
      }
    } catch (error) {
      logger.error(`EmpService.addEmployee() Error: ${error}`)
      return { success: false, data: { message: error.detail || error } }
    }
  }

  // get single employee
  public async getSingleEmployee(employee: Employee) {
    const pool = Helper.pool()
    const EmployeeID = employee.id
    try {
      const sql = `SELECT * FROM public.tbl_employee WHERE id = $1 `

      const params = [EmployeeID]

      const query_results = await pool.aquery(sql, params)

      if (query_results.rowCount <= 0) {
        throw { message: messages.errors.notFound, status: 404 }
      }

      const getEmployee = query_results.rows[0] // Helper.getEmployee(query_results.rows[0])
      return { success: true, data: { getEmployee } }
    } catch (error) {
      return { success: false, data: { message: error.message }, status: error.status }
    }
  }

  // update the update employee details
  public async updateEmployee(employee: Employee) {
    // validate email format
    if (!/\S+@\S+\.\S+/.test(employee.email || '')) {
      return { success: false, data: { message: messages.errors.employee.email } }
    }
    const pool = Helper.pool()

    try {
      // begin transaction
      await Helper.beginTransaction(pool)
      const sqlGet = `SELECT empId, email FROM public.tbl_employee WHERE empId =$1 AND email=$2 AND active= true`

      const empDetails = await pool.aquery(sqlGet, [employee.empId, employee.email])

      if (empDetails.rowCount <= 0) {
        return { success: false, data: { message: messages.errors.employee.invalidEmployeeId } }
      }

      const _columns = `firstName ='${employee.firstName}', lastName ='${employee.lastName}', address ='${employee.address}',
      state ='${employee.state}', country ='${employee.country}'`

      // update employee
      const updateEmployeeSQL = `UPDATE public.tbl_employee SET ${_columns} WHERE empId= $1`
      await pool.aquery(updateEmployeeSQL, [employee.empId])

      //commit transaction
      await Helper.commitTransaction(pool)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`EmployeeService.updateEmployee() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }

  // update the update employee details
  public async deleteEmployee(employee: Employee) {
    const pool = Helper.pool()

    try {
      // begin transaction
      await Helper.beginTransaction(pool)
      const sqlGet = `SELECT * FROM public.tbl_employee WHERE id =$1 AND active= true`

      const empDetails = await pool.aquery(sqlGet, [employee.id])

      if (empDetails.rowCount <= 0) {
        return { success: false, data: { message: messages.errors.employee.invalidEmployeeId } }
      }

      // update employee
      const updateEmployeeSQL = `UPDATE public.tbl_employee SET active= false WHERE id= $1`
      await pool.aquery(updateEmployeeSQL, [employee.id])

      //commit transaction
      await Helper.commitTransaction(pool)
      return { success: true, data: { message: messages.success.update } }
    } catch (error) {
      logger.error(`EmployeeService.updateEmployee() Error: ${error}`)
      return { success: false, data: { message: error.detail || error.message }, status: error.status }
    }
  }
}

export default EmployeeService
