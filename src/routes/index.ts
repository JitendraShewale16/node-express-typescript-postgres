import { Router } from 'express'

import app from './app'
import employee from './employee'
import dept from './dept'
import project from './project'

const router = Router()

router.use('/app', app)
router.use('/employee', employee)
router.use('/dept', dept)
router.use('/project', project)

export default router
