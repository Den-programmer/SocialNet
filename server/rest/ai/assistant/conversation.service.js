import Conversation from '../models/conversation.model.js'
import historyService from './history.service.js'
import { storagePolicy } from '../../../config/storagePolicy.js'

class ConversationService {
    async create(data) {
        return await Conversation.create({
            title: data.title ?? 'New Chat',
            userId: data.userId
        })
    }

    async getUserConversations(userId, page, pageSize) {
        return await Conversation.find({
            userId
        })
            .sort({
                updatedAt: -1
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean()
    }

    async countUserConversations(userId) {
        return Conversation.countDocuments({ userId })
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

    async getMessages(conversationId, userId, page, pageSize) {
        const conversation = await this.getById(conversationId, userId)

        if (!conversation) {
            return []
        }

        const messages = await historyService.get(conversationId, page, pageSize)

        return messages
    }

    async countMessages(conversationId, userId) {
        const conversation = await this.getById(conversationId, userId)
        return conversation ? historyService.count(conversationId) : 0
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
                expiresAt: new Date(Date.now() + storagePolicy.ttlDays * 24 * 60 * 60 * 1000),
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