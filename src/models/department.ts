import { Common } from './common'
import Helper from '../db_pool/helper'
import { NullableBoolean, NullableDate, NullableString } from '../typings/types'

/**
 * Department class (instances throughout code as Department)
 *
 * This class is instantiated for each endpoint call and contains information about the Department
 *
 * @class Department
 */

export class Department extends Common {
  public deptname: NullableString = undefined

  public active: NullableBoolean = true

  public createdAt: NullableDate

  public updatedAt: NullableDate

  constructor(model?: any) {
    super()
    if (model) {
      Helper.shallowCopy(model, this)
    }
  }
}

export default Department
