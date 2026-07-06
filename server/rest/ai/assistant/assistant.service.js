import historyService from './history.service.js'
import ollamaProvider from '../providers/ollama.provider.js'
import SYSTEM_PROMPT from '../prompts/system.prompt.js'
import promptService from './prompt.service.js'
import conversationService from './conversation.service.js'


class AssistantService {
    async chat(conversationId, content) {
        await historyService.add(
            conversationId,
            'user',
            content
        )

        const history =
            await historyService.get(conversationId)

        const messages = promptService.build(
            SYSTEM_PROMPT,
            history
        )

        const answer =
            await ollamaProvider.chat(messages)

        await historyService.add(
            conversationId,
            'assistant',
            answer
        )

        await conversationService.touch(
            conversationId,
            answer
        )

        return answer
    }
}

export default new AssistantService()