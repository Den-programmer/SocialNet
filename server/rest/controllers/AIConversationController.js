import conversationService from '../ai/assistant/conversation.service.js'
import { StandartRes, catchRes } from '../routes/responses/responses.js'

class ConversationController {
    async create(req, res) {
        try {
            const conversation =
                await conversationService.create({
                    userId: req.user,
                    title: 'New Chat'
                })

            return res.json(
                new StandartRes(0, '', {
                    _id: conversation._id
                })
            )
        } catch (e) {
            console.error(e)
            return res.status(500).json(catchRes)
        }
    }

    async rename(req, res) {
        try {
            const { id } = req.params
            const { title } = req.body
            const userId = req.user

            if (!title?.trim()) {
                return res.status(400).json(
                    new StandartRes(1, 'Title is required')
                )
            }

            const conversation = await conversationService.getById(id, userId)

            if (!conversation) {
                return res.status(404).json(
                    new StandartRes(1, 'Conversation not found')
                )
            }

            const updatedConversation = await conversationService.rename(
                id,
                title.trim()
            )

            return res.json(
                new StandartRes(0, '', updatedConversation)
            )
        } catch (e) {
            console.error(e)
            return res.status(500).json(catchRes)
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params
            const userId = req.user

            const conversation =
                await conversationService.getById(id, userId)

            return res.json(
                new StandartRes(0, '', conversation)
            )
        } catch (e) {
            console.error(e)
            return res.status(500).json(catchRes)
        }
    }
    async getAll(req, res) {
        try {
            const userId = req.user

            const conversations =
                await conversationService.getUserConversations(userId)

            return res.json(
                new StandartRes(0, '', conversations)
            )
        } catch (e) {
            console.error(e)
            return res.status(500).json(catchRes)
        }
    }
    async getMessages(req, res) {
        try {
            const { id } = req.params
            const userId = req.user

            const messages =
                await conversationService.getMessages(id, userId)

            return res.json(
                new StandartRes(0, '', messages)
            )
        } catch (e) {
            console.error(e)
            return res.status(500).json(catchRes)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const userId = req.user

            const conversation = await conversationService.getById(id, userId)

            if (!conversation) {
                return res.status(404).json(
                    new StandartRes(1, 'Conversation not found')
                )
            }

            await conversationService.delete(id)

            return res.json(
                new StandartRes(0, '', { deleted: true })
            )
        } catch (e) {
            console.error(e)
            return res.status(500).json(catchRes)
        }
    }
}

export default new ConversationController()