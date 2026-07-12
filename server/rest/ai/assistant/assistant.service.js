import historyService from './history.service.js'
import ollamaProvider from '../providers/ollama.provider.js'
import SYSTEM_PROMPT from '../prompts/system.prompt.js'
import promptService from './prompt.service.js'
import conversationService from './conversation.service.js'
import socialToolsService from '../services/social-tools.service.js'

const DEFAULT_CONVERSATION_TITLE = 'New Chat'
const MAX_CONVERSATION_TITLE_LENGTH = 48

const SUPPORTED_TOOL_NAMES = new Set([
    'getProfile',
    'searchUsers',
    'getRecentPosts'
])

const getShortcutFromText = (content) => {
    if (typeof content !== 'string') {
        return null
    }

    const trimmed = content.trim()
    const normalized = trimmed.toLowerCase()

    if (!normalized) {
        return null
    }

    if (/^(my\s+)?profile(\s+snapshot)?$/.test(normalized) || normalized.includes('my profile')) {
        return {
            tool: 'getProfile',
            args: {}
        }
    }

    if (/^(finding|searching|search|find)\s+users?/.test(normalized) || normalized.includes('search users')) {
        const searchMatch = trimmed.match(/(?:finding|searching|search|find)\s+users?(?:\s+for|\s+with|\s+about|\s*:\s*)?(.*)$/i)
        const term = searchMatch?.[1]?.trim() ?? ''

        return {
            tool: 'searchUsers',
            args: term ? { term } : {}
        }
    }

    if (normalized.includes('recent posts') || normalized.includes('latest posts') || normalized.includes('newest posts')) {
        return {
            tool: 'getRecentPosts',
            args: {}
        }
    }

    return null
}

const parseToolShortcut = (content) => {
    if (typeof content !== 'string') {
        return null
    }

    const trimmed = content.trim()

    if (!trimmed.startsWith('{')) {
        return null
    }

    try {
        const parsed = JSON.parse(trimmed)

        if (!parsed || typeof parsed !== 'object') {
            return null
        }

        if (!SUPPORTED_TOOL_NAMES.has(parsed.tool)) {
            return null
        }

        return {
            tool: parsed.tool,
            args: parsed.args ?? {}
        }
    } catch {
        return getShortcutFromText(content)
    }
}

const redactUrls = (value) =>
    value.replace(/https?:\/\/\S+/gi, '[hidden]')

const sanitizeToolValue = (value) => {
    if (typeof value === 'string') {
        return redactUrls(value)
    }

    if (Array.isArray(value)) {
        return value.map(item => sanitizeToolValue(item))
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, entry]) => [key, sanitizeToolValue(entry)])
        )
    }

    return value
}

const normalizeConversationTitle = (title) => {
    if (typeof title !== 'string') {
        return DEFAULT_CONVERSATION_TITLE
    }

    const normalized = title
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^["'`]+|["'`]+$/g, '')
        .replace(/[.?!]+$/, '')

    if (!normalized) {
        return DEFAULT_CONVERSATION_TITLE
    }

    if (normalized.length <= MAX_CONVERSATION_TITLE_LENGTH) {
        return normalized
    }

    return `${normalized.slice(0, MAX_CONVERSATION_TITLE_LENGTH).trimEnd()}...`
}

const buildConversationTitle = (content) => {
    if (typeof content !== 'string') {
        return DEFAULT_CONVERSATION_TITLE
    }

    const normalized = content.replace(/\s+/g, ' ').trim()

    if (!normalized) {
        return DEFAULT_CONVERSATION_TITLE
    }

    if (normalized.length <= MAX_CONVERSATION_TITLE_LENGTH) {
        return normalized
    }

    return `${normalized.slice(0, MAX_CONVERSATION_TITLE_LENGTH).trimEnd()}...`
}

const generateConversationTitle = async (content) => {
    if (typeof content !== 'string' || !content.trim()) {
        return DEFAULT_CONVERSATION_TITLE
    }

    const response = await ollamaProvider.chat([
        {
            role: 'system',
            content: 'Create a short, natural title for this chat from the user message. Return only the title, no quotes, no labels, and keep it under 6 words.'
        },
        {
            role: 'user',
            content
        }
    ])

    const generatedTitle = normalizeConversationTitle(response?.content ?? '')

    if (generatedTitle !== DEFAULT_CONVERSATION_TITLE) {
        return generatedTitle
    }

    return buildConversationTitle(content)
}

const formatToolResponse = (toolName, result) => {
    const safeResult = sanitizeToolValue(result)

    if (!safeResult || typeof safeResult !== 'object') {
        return String(safeResult ?? '')
    }

    if (safeResult.error) {
        return String(safeResult.error)
    }

    if (toolName === 'getProfile') {
        const contacts = safeResult.profile?.contacts || {}
        const contactEntries = Object.entries(contacts).filter(([, value]) => Boolean(value))

        return [
            `Profile for ${safeResult.username || 'Unknown user'}`,
            safeResult.profile?.status ? `Status: ${safeResult.profile.status}` : null,
            safeResult.profile?.aboutMe ? `About: ${safeResult.profile.aboutMe}` : null,
            contactEntries.length > 0
                ? `Contacts: ${contactEntries.map(([key, value]) => `${key}: ${value}`).join(', ')}`
                : null
        ].filter(Boolean).join('\n')
    }

    if (toolName === 'searchUsers') {
        const items = Array.isArray(safeResult.items) ? safeResult.items : []

        if (items.length === 0) {
            return `No users found for ${safeResult.term ? `"${safeResult.term}"` : 'your search'}.`
        }

        const lines = items.slice(0, 5).map((item, index) => {
            const status = item.profile?.status ? ` - ${item.profile.status}` : ''
            return `${index + 1}. ${item.username}${status}`
        })

        return [
            `Found ${safeResult.totalCount ?? items.length} users${safeResult.term ? ` for "${safeResult.term}"` : ''}.`,
            ...lines
        ].join('\n')
    }

    if (toolName === 'getRecentPosts') {
        const items = Array.isArray(result?.items) ? result.items : []

        return JSON.stringify({
            type: 'recentPosts',
            text: items.length === 0
                ? 'No recent posts were found.'
                : `Recent posts (${items.length}):`,
            posts: items.slice(0, 5).map((post, index) => ({
                index: index + 1,
                title: post.postTitle ?? '',
                author: post.owner?.username ?? '',
                summary: post.postInf ?? '',
                imageUrl: post.postImg ?? ''
            }))
        })
    }

    return JSON.stringify(safeResult, null, 2)
}


class AssistantService {
    async chat(conversationId, content, currentUserId) {
        const conversation = await conversationService.getById(conversationId, currentUserId)

        if (conversation?.title === DEFAULT_CONVERSATION_TITLE) {
            await conversationService.rename(
                conversationId,
                await generateConversationTitle(content)
            )
        }

        await historyService.add(
            conversationId,
            'user',
            content
        )

        const shortcut = parseToolShortcut(content)

        if (shortcut) {
            const toolResult = await socialToolsService.execute(
                shortcut.tool,
                shortcut.args,
                {
                    currentUserId
                }
            )
            const safeToolResult = sanitizeToolValue(toolResult)

            const response = formatToolResponse(shortcut.tool, safeToolResult)

            await historyService.add(
                conversationId,
                'tool',
                JSON.stringify({
                    tool: shortcut.tool,
                    arguments: shortcut.args,
                    result: safeToolResult
                })
            )

            await historyService.add(
                conversationId,
                'assistant',
                response
            )

            await conversationService.touch(
                conversationId,
                response
            )

            return response
        }

        const history =
            await historyService.get(conversationId)

        const messages = promptService.build(
            SYSTEM_PROMPT,
            history
        )

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
                const safeToolResult = sanitizeToolValue(toolResult)

                const serializedToolResult = JSON.stringify({
                    tool: toolName,
                    arguments: socialToolsService.parseArguments(toolArguments),
                    result: safeToolResult
                })
                lastToolResponse = formatToolResponse(toolName, safeToolResult)

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

export default new AssistantService()