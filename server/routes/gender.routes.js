import { Router } from 'express'
import GenderController from '../controllers/GenderController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getGender/:userId', GenderController.getGender)
router.put('/updateGender', GenderController.updateGender)

export default router