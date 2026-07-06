import React, { useState } from 'react'
import { Card, Input, Button, Avatar, Typography } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import { useGetChatCompletionMutation, useGetMessagesQuery } from '../../../../DAL/AI/aiAPI'
import classes from './aiChatInterface.module.scss'

const { Text } = Typography

export interface Msg {
    role: 'user' | 'assistant'
    content: string
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
                    {messages.map((m: Msg, i: number) => (
                        <div key={i} className={`${classes.aiMsg} ${classes[m.role]}`}>
                            <Avatar
                                icon={
                                    m.role === 'assistant'
                                        ? <RobotOutlined />
                                        : <UserOutlined />
                                }
                            />

                            <div className={classes.aiMsgBubble}>
                                <Text>{m.content}</Text>
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
