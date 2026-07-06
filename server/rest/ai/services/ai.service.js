import ollamaProvider from '../providers/ollama.provider.js'
import historyService from './history.service.js'
import conversationService from './conversation.service.js'
import SYSTEM_PROMPT from '../prompts/system.prompt.js'

class AIService {
    async chat(conversationId, content) {
        await historyService.add(
            conversationId,
            'user',
            content
        )

        const history = await historyService.get(conversationId)

        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            },
            ...history
        ]

        const answer = await ollamaProvider.chat(messages)

        await historyService.add(
            conversationId,
            'assistant',
            answer
        )

        await conversationService.touch(
            conversationId,
            content
        )

        return answer
    }
}

export default new AIService()