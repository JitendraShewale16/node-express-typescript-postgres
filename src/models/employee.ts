import { Common } from './common'
import Helper from '../db_pool/helper'
import { NullableBoolean, NullableDate, NullableNumber, NullableString } from '../typings/types'

/**
 * Employee class (instances throughout code as Employee)
 *
 * This class is instantiated for each endpoint call and contains information about the employee and
 * session associated with the endpoint call.
 *
 * @class Employee
 */

export class Employee extends Common {
  public empId: NullableString = undefined

  public firstName: NullableNumber = undefined

  public lastName: NullableString = undefined

  public email: NullableString = undefined

  public address: NullableString = undefined

  public state: NullableString = undefined

  public country: NullableString = undefined

  public fk_projectId: NullableNumber = undefined

  public fk_managerId: NullableNumber = undefined

  public fk_deptId: NullableNumber = undefined

  public active: NullableBoolean = true

  public createdAt: NullableDate

  public updatedAt: NullableDate

  public joiningDate: NullableDate = undefined

  constructor(model?: any) {
    super()
    if (model) {
      Helper.shallowCopy(model, this)
    }
  }
}

export default Employee
