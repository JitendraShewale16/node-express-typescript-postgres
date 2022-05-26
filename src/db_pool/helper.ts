import PGPool from './pg_pool'
import { Employee } from '../models'
import { EmployeeService } from '../services'
import * as config from '../../config'
import { SQLStatementInsert, SQLStatementUpdate } from '../typings/interface'

export class Helper {
  public static getEmployee(user: Employee) {
    const _user: Employee = new Employee()
    Helper.shallowCopy(user, _user)
    return _user
  }

  public static pool() {
    return new PGPool(config.dbObj)
  }

  public static getUserService() {
    const _employeeService = new EmployeeService()
    return _employeeService
  }

  public static defaultUser() {
    const _user: Employee = new Employee()
    _user.empId = '1001'
    return _user
  }

  public static async beginTransaction(pool: PGPool) {
    const sql = 'BEGIN'
    try {
      return await pool.aquery(sql, [])
    } catch (error) {
      throw error
    }
  }

  public static async commitTransaction(pool: PGPool) {
    const sql = 'COMMIT'
    try {
      return await pool.aquery(sql, [])
    } catch (error) {
      throw error
    }
  }

  public static async rollbackTransaction(pool: PGPool) {
    const sql = 'ROLLBACK'
    try {
      return await pool.aquery(sql, [])
    } catch (error) {
      throw error
    }
  }

  public static shallowCopy(source: any, target: any) {
    Object.keys(target).forEach((key) => {
      if (source[key] !== undefined) {
        target[key] = source[key]
      }
    })

    return target
  }

  public static getSQLSatementInsert(source: any): SQLStatementInsert {
    const sql_columns: Array<string> = []
    const sql_columns_params: Array<string> = []
    const sql_values: Array<any> = []
    let i = 1

    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined && key !== 'id' && key !== '_table_name') {
        sql_columns.push(key)
        sql_columns_params.push(`$${i++}`)
        sql_values.push(source[key])
      }
    })

    return { columns: sql_columns.join(','), param_ids: sql_columns_params.join(','), param_values: sql_values }
  }

  public static getSQLSatementUpdate(source: any): SQLStatementUpdate {
    const sql_columns: Array<string> = []
    const sql_values: Array<any> = []
    let i = 1

    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined && key !== 'id' && key !== '_table_name') {
        sql_columns.push(`${key} = $${i++}`)
        sql_values.push(source[key])
      }
    })

    return { columns: sql_columns.join(','), param_values: sql_values }
  }
}

export default Helper
