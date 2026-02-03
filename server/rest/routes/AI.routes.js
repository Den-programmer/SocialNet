import { Router } from 'express'
import AIController from '../controllers/AIController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken) 

router.post('/getAIoutput', AIController.getAIContent)

export default router