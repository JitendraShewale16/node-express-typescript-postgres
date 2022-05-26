import { Common } from './common'
import Helper from '../db_pool/helper'
import { NullableBoolean, NullableDate, NullableString } from '../typings/types'

/**
 * Project class (instances throughout code as Project)
 *
 * This class is instantiated for each endpoint call and contains information about the project
 *
 * @class Project
 */

export class Project extends Common {
  public projectcode: NullableString = undefined

  public projectname: NullableString = undefined

  public clientname: NullableString = undefined

  public startdate: NullableDate = undefined

  public enddate: NullableDate = undefined

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

export default Project
