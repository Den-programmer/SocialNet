import { Router } from 'express'
import AIController from '../controllers/AIController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import ConversationController from '../controllers/AIConversationController.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken) 

router.post('/chat', AIController.getAIContent)
router.post('/conversations', ConversationController.create)
router.get('/conversations', ConversationController.getAll)
router.patch('/conversations/:id', ConversationController.rename)
router.delete('/conversations/:id', ConversationController.delete)
router.get(
    '/conversations/:id/messages',
    ConversationController.getMessages
)
router.get(
    '/conversations/:id',
    ConversationController.getById
)


export default router