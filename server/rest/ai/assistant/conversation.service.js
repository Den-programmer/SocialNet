import Conversation from '../models/conversation.model.js'
import historyService from './history.service.js'

class ConversationService {
    async create(data) {
        return await Conversation.create({
            title: data.title ?? 'New Chat',
            userId: data.userId
        })
    }

    async getUserConversations(userId) {
        return await Conversation.find({
            userId
        })
            .sort({
                updatedAt: -1
            })
            .lean()
    }

    async getById(
        conversationId,
        userId
    ) {
        return Conversation.findOne({
            _id: conversationId,
            userId
        }).lean()
    }

    async getMessages(conversationId, userId) {
        const conversation = await this.getById(conversationId, userId)

        if (!conversation) {
            return []
        }

        const messages = await historyService.get(conversationId)

        return messages.filter(message => message.role !== 'tool')
    }

    async update(conversationId, data) {
        return await Conversation.findByIdAndUpdate(
            conversationId,
            data,
            {
                new: true
            }
        )
    }

    async rename(conversationId, title) {
        return this.update(conversationId, {
            title
        })
    }

    async touch(conversationId, lastMessage = '') {
        return await Conversation.findByIdAndUpdate(
            conversationId,
            {
                updatedAt: new Date(),
                ...(lastMessage && { lastMessage })
            },
            {
                new: true
            }
        )
    }

    async delete(conversationId) {
        await historyService.deleteByConversation(conversationId)

        return await Conversation.findByIdAndDelete(conversationId)
    }
}

export default new ConversationService()