import AIMessage from '../models/message.model.js'

class HistoryService {
    async get(conversationId) {
        return await AIMessage.find({ conversationId })
            .sort({ createdAt: 1 })
            .select('role content -_id')
            .lean()
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