import express from 'express'

import { wrapper } from '../../helpers'
import { AppController } from '../../controllers'

const router = express.Router()

router.get('/version', wrapper(AppController.version))

export default router
