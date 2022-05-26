import express from 'express'

import { DepartmentController } from '../../controllers'
import { wrapper } from '../../helpers'

const router = express.Router()
router.get('/', wrapper(DepartmentController.getAll))
router.post('/add', wrapper(DepartmentController.addDept))
router.put('/:deptId', wrapper(DepartmentController.updateDept))
router.delete('/:deptId', wrapper(DepartmentController.deleteDept))

export default router
