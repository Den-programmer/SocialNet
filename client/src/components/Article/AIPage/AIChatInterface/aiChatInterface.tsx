import React, { useState } from 'react'
import { Card, Input, Button, Avatar, Typography } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import { useGetChatCompletionMutation, useGetMessagesQuery } from '../../../../DAL/AI/aiAPI'
import classes from './aiChatInterface.module.scss'

const { Text } = Typography

export interface Msg {
    role: 'user' | 'assistant' | 'tool'
    content: string
}

type RecentPostsMessage = {
    type: 'recentPosts'
    text: string
    posts: Array<{
        index: number
        title: string
        author: string
        summary: string
        imageUrl: string
    }>
}

const parseStructuredContent = (content: string): RecentPostsMessage | null => {
    try {
        const parsed = JSON.parse(content)

        if (!parsed || typeof parsed !== 'object') {
            return null
        }

        if (parsed.type !== 'recentPosts' || typeof parsed.text !== 'string' || !Array.isArray(parsed.posts)) {
            return null
        }

        return parsed as RecentPostsMessage
    } catch {
        return null
    }
}

type AIChatInterfaceProps = {
    conversationId: string
}

const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ conversationId }) => {
    const [value, setValue] = useState('')

    const {
        data: response
    } = useGetMessagesQuery(conversationId, {
        skip: !conversationId
    })

    const messages = response?.data ?? []

    const [getChatCompletion, { isLoading: isChatLoading }] =
        useGetChatCompletionMutation()

    const send = async () => {
        const text = value.trim()

        if (!text) return

        if (!conversationId)
            return

        setValue('')

        await getChatCompletion({
            conversationId,
            content: text
        })
    }


    return (
        <div className={classes.aiChat}>
            <Card className={classes.aiChatCard}>
                <div className={classes.aiChatMessages}>
                    {messages.filter((m: Msg) => m.role === 'user' || m.role === 'assistant').map((m: Msg, i: number) => (
                        <div key={i} className={`${classes.aiMsg} ${classes[m.role]}`}>
                            <Avatar
                                icon={
                                    m.role === 'assistant'
                                        ? <RobotOutlined />
                                        : <UserOutlined />
                                }
                            />

                            <div className={classes.aiMsgBubble}>
                                {(() => {
                                    const structured = parseStructuredContent(m.content)

                                    if (!structured) {
                                        return <Text>{m.content}</Text>
                                    }

                                    return (
                                        <div className={classes.aiStructuredMessage}>
                                            <Text>{structured.text}</Text>

                                            {structured.posts.length > 0 ? (
                                                <div className={classes.aiPostGrid}>
                                                    {structured.posts.map(post => (
                                                        <div key={`${post.index}-${post.title}`} className={classes.aiPostCard}>
                                                            {post.imageUrl ? (
                                                                <img
                                                                    src={post.imageUrl}
                                                                    alt={post.title || 'Post image'}
                                                                    className={classes.aiPostImage}
                                                                />
                                                            ) : null}

                                                            <div className={classes.aiPostMeta}>
                                                                <Text strong>{post.title}</Text>
                                                                {post.author ? (
                                                                    <Text type="secondary">{post.author}</Text>
                                                                ) : null}
                                                                {post.summary ? (
                                                                    <Text>{post.summary}</Text>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                    )
                                })()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={classes.aiChatInput}>
                    <Input.TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        placeholder="Write a message..."
                        onPressEnter={(e) => {
                            if (!e.shiftKey) {
                                e.preventDefault()
                                send()
                            }
                        }}
                    />

                    <Button
                        type="primary"
                        loading={isChatLoading}
                        icon={<SendOutlined />}
                        onClick={send}
                    />
                </div>
            </Card>
        </div>
    )
}

export default AIChatInterface
