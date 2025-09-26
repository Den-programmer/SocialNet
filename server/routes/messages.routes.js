import { Router } from 'express'
import MessagesController from '../controllers/MessagesController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getMessagesBetweenUsers/:userId1/:userId2', MessagesController.getMessagesBetweenUsers)
router.delete('/deleteMessage/:id', MessagesController.deleteMessage)
router.post('/addMessage/:id', MessagesController.addMessage)

export default router