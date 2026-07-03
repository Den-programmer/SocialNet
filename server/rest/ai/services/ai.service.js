import ollamaProvider from '../providers/ollama.provider.js'
import SYSTEM_PROMPT from '../prompts/system.prompt.js'

class AIService {
    async chat(content) {
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            },
            {
                role: 'user',
                content
            }
        ]

        return await ollamaProvider.chat(messages)
    }
}

export default new AIService()