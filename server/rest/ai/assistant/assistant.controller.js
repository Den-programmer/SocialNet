import assistantService from './assistant.service.js'
import conversationService from './conversation.service.js'
import { StandartRes, catchRes } from '../../routes/responses/responses.js'

class AssistantController {
    async chat(req, res) {
        try {
            const { conversationId, content } = req.body
            const userId = req.user

            if (!conversationId) {
                return res.status(400).json(
                    new StandartRes(1, 'Conversation id is required')
                )
            }

            if (!content?.trim()) {
                return res.status(400).json(
                    new StandartRes(1, 'Content is required')
                )
            }

            const conversation = await conversationService.getById(
                conversationId,
                userId
            )

            if (!conversation) {
                return res.status(404).json(
                    new StandartRes(1, 'Conversation not found')
                )
            }

            const answer = await assistantService.chat(conversationId, content, userId)

            return res.json(
                new StandartRes(0, '', {
                    content: answer
                })
            )
        } catch (error) {
            console.error(error)
            return res.status(500).json(catchRes)
        }
    }
}

export default new AssistantController()