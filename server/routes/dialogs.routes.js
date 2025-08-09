import { Router } from 'express'
import DialogsController from '../controllers/DialogsController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken) // защищаем все роуты

router.get('/getAllDialogs', DialogsController.getAllDialogs)
router.post('/addDialog/:userId', DialogsController.addDialog)
router.delete('/deleteDialog', DialogsController.deleteDialog)

export default router