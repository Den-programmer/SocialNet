class PromptService {
    build(systemPrompt, history) {
        const MAX_MESSAGES = 30

        const trimmed =
            history.length > MAX_MESSAGES
                ? history.slice(-MAX_MESSAGES)
                : history

        return [
            {
                role: 'system',
                content: systemPrompt
            },
            ...trimmed
        ]
    }
}

export default new PromptService()