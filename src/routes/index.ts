import { Router } from 'express'

import app from './app'
import employee from './employee'
import dept from './dept'
import project from './project'
import * as auth from '../middlewares/auth'

const router = Router()

router.use('/app', app)
router.use('/employee', auth.authorize(['/']), employee)
router.use('/dept', auth.authorize(['/']), dept)
router.use('/project', auth.authorize(['/']), project)

export default router
