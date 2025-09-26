import { Router } from 'express'
import UsernameController from '../controllers/UsernameController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getUsername/:userId', UsernameController.getUsername)
router.put('/saveUsername', UsernameController.saveUsername)

export default router