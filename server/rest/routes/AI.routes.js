import { Router } from 'express'
import AIController from '../controllers/AIController.js'
import SearchController from '../ai/assistant/search.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import ConversationController from '../controllers/AIConversationController.js'
import dotenv from 'dotenv'
import { rateLimitMiddleware } from '../../security/securityHeaders.js'
import Conversation from '../ai/models/conversation.model.js'
import { enforceCountQuota, userQuota } from '../../middleware/quota.js'

dotenv.config()

const router = Router()

router.use(verifyToken) 

router.post('/chat', rateLimitMiddleware(5, 60000, req => req.user || req.ip), AIController.getAIContent)
router.post(
    '/conversations',
    rateLimitMiddleware(10, 60000, req => req.user || req.ip),
    enforceCountQuota(Conversation, req => ({ userId: req.user }), userQuota.maxUserConversations, 'conversation'),
    ConversationController.create
)
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


router.get(
    "/posts/search",
    SearchController.posts
)


export default router