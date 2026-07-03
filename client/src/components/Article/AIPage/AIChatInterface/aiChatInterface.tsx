import React, { useState } from 'react'
import { Card, Input, Button, Avatar, Typography } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import { useGetChatCompletionMutation } from '../../../../DAL/AI/aiAPI'
import classes from './aiChatInterface.module.scss'

const { Text } = Typography

interface Msg {
    role: 'user' | 'ai'
    text: string
}

const AIChatInterface: React.FC = () => {
    const [value, setValue] = useState('')

    const [messages, setMessages] = useState<Msg[]>([
        {
            role: 'ai',
            text: 'Hi! How can I help you?'
        }
    ])

    const [getChatCompletion, { isLoading }] =
        useGetChatCompletionMutation()

    const send = async () => {
        const text = value.trim()

        if (!text) return

        setMessages((prev) => [
            ...prev,
            {
                role: 'user',
                text
            }
        ])

        setValue('')

        try {
            const response = await getChatCompletion(text).unwrap()

            setMessages((prev) => [
                ...prev,
                {
                    role: 'ai',
                    text: response.data.content
                }
            ])
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'ai',
                    text: 'Something went wrong.'
                }
            ])
        }
    }

    return (
        <div className={classes.aiChat}>
            <Card className={classes.aiChatCard}>
                <div className={classes.aiChatMessages}>
                    {messages.map((m, i) => (
                        <div key={i} className={`${classes.aiMsg} ${classes[m.role]}`}>
                            <Avatar
                                icon={
                                    m.role === 'ai'
                                        ? <RobotOutlined />
                                        : <UserOutlined />
                                }
                            />

                            <div className={classes.aiMsgBubble}>
                                <Text>{m.text}</Text>
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
                        loading={isLoading}
                        icon={<SendOutlined />}
                        onClick={send}
                    />
                </div>
            </Card>
        </div>
    )
}

export default AIChatInterface