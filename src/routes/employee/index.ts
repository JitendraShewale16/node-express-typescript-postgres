import express from 'express'

import { EmployeeController } from '../../controllers'
import { wrapper } from '../../helpers'

const router = express.Router()
router.post('/add', wrapper(EmployeeController.addEmployee))
router.get('/', wrapper(EmployeeController.getAll))
router.get('/:employeeId', wrapper(EmployeeController.getEmployee))
router.put('/add', wrapper(EmployeeController.updateEmployee))
router.delete('/:employeeId', wrapper(EmployeeController.deleteEmployee))

export default router
