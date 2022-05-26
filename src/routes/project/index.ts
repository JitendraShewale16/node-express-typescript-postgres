import express from 'express'

import { ProjectController } from '../../controllers'
import { wrapper } from '../../helpers'

const router = express.Router()

router.get('/', wrapper(ProjectController.getAll))
router.post('/add', wrapper(ProjectController.addProject))
router.put('/add', wrapper(ProjectController.updateProject))
router.delete('/:projectId', wrapper(ProjectController.deleteProject))

export default router
