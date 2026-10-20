import AIMessage from '../models/message.model.js'

class HistoryService {
    async get(conversationId, page, pageSize) {
        return await AIMessage.find({ conversationId, role: { $ne: 'tool' } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select('role content -_id')
            .lean()
            .then(messages => messages.reverse())
    }

    async count(conversationId) {
        return AIMessage.countDocuments({ conversationId, role: { $ne: 'tool' } })
    }

    async deleteByConversation(conversationId) {
        return await AIMessage.deleteMany({ conversationId })
    }

    async add(conversationId, role, content) {
        return await AIMessage.create({
            conversationId,
            role,
            content
        })
    }
}

export default new HistoryService()