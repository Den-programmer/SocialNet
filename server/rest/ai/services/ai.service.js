import ollamaProvider from '../providers/ollama.provider.js'
import historyService from './history.service.js'
import conversationService from './conversation.service.js'
import SYSTEM_PROMPT from '../prompts/system.prompt.js'
import promptService from './prompt.service.js'
import socialToolsService from './social-tools.service.js'

class AIService {
    async chat(conversationId, content, currentUserId) {
        await historyService.add(
            conversationId,
            'user',
            content
        )

        const history = await historyService.get(conversationId)

        const messages = promptService.build(SYSTEM_PROMPT, history)

        let finalAnswer = ''
        let lastToolResponse = ''
        const maxIterations = 4

        for (let iteration = 0; iteration < maxIterations; iteration += 1) {
            const assistantMessage = await ollamaProvider.chat(messages, socialToolsService.getDefinitions())

            const toolCalls = assistantMessage?.tool_calls ?? []

            if (toolCalls.length === 0) {
                finalAnswer = assistantMessage?.content?.trim() ?? ''
                break
            }

            messages.push({
                role: 'assistant',
                content: assistantMessage.content ?? '',
                tool_calls: toolCalls
            })

            for (const toolCall of toolCalls) {
                const toolName = toolCall.function?.name ?? toolCall.name
                const toolArguments = toolCall.function?.arguments ?? toolCall.arguments

                const toolResult = await socialToolsService.execute(
                    toolName,
                    toolArguments,
                    {
                        currentUserId
                    }
                )

                const serializedToolResult = JSON.stringify({
                    tool: toolName,
                    arguments: socialToolsService.parseArguments(toolArguments),
                    result: toolResult
                })
                lastToolResponse = JSON.stringify({
                    tool: toolName,
                    arguments: socialToolsService.parseArguments(toolArguments),
                    result: toolResult
                })

                messages.push({
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: serializedToolResult
                })

                await historyService.add(
                    conversationId,
                    'tool',
                    serializedToolResult
                )
            }
        }

        if (!finalAnswer) {
            finalAnswer = lastToolResponse || 'I could not generate a response from the available tools.'
        }

        await historyService.add(
            conversationId,
            'assistant',
            finalAnswer
        )

        await conversationService.touch(
            conversationId,
            finalAnswer
        )

        return finalAnswer
    }
}

export default new AIService()