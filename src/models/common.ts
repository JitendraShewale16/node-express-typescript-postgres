import Helper from '../db_pool/helper'
import { logger } from '../providers/logger'

import { NullableNumber } from '../typings/types'

/**
 * Common class (instances throughout code as Common)
 *
 * This class is instantiated for each endpoint call and contains information about the Common
 *
 * @class Common
 */

export class Common {
  public id: NullableNumber = undefined

  public copyFrom(copyObj: any) {
    Helper.shallowCopy(copyObj, this)
  }

  /**
   * Dump this class to the log
   */
  dump() {
    logger.info(this)
  }

  /**
   * Determine if this instance has a specific property
   *
   * @param {*} prop
   */
  hasUserProperty(prop: any) {
    return this.hasOwnProperty(prop)
  }
}

export default Common
