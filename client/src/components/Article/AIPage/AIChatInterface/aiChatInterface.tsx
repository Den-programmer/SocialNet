import React from 'react'
import { useGetGroqChatCompletionQuery } from "../../../../DAL/AI/aiAPI"
import classes from './aiChatInterface.module.scss'
import { useState } from 'react'
import { Card, Input, Button, Avatar, Typography } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'

const { Text } = Typography

interface Msg {
    role: 'user' | 'ai'
    text: string 
}

const AIChatInterface: React.FC = () => {
    let data = {
      data: {
        content: "This is a mock AI response."
      }
    }
    const isLoading: boolean = false
    const error = "In developing"
    const [value, setValue] = useState('')
    // const { data, error, isLoading } = useGetGroqChatCompletionQuery(value)
    const content = data?.data.content || ''

    const [messages, setMessages] = useState<Msg[]>([
        { role: 'ai', text: 'Hi! How can I help you?' }
    ])
    
    const send = () => {
        if (!value.trim()) return

        setMessages((prev) => [
            ...prev,
            { role: 'user', text: value },
            { role: 'ai', text: error ? error.toString() : isLoading ? '...' : content }
        ])

        setValue('')
    }

    return (
        <div className={classes.aiChat}>
            <span>AI Chat Interface</span>
            <Card className={classes.aiChatCard}>
                <div className={classes.aiChatMessages}>
                    {messages.map((m, i) => (
                        <div key={i} className={classes.aiMsg + ` ${m.role}`}>
                            <Avatar
                                icon={m.role === 'ai' ? <RobotOutlined /> : <UserOutlined />}
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
                        onChange={e => setValue(e.target.value)}
                        onPressEnter={e => {
                            if (!e.shiftKey) {
                                e.preventDefault()
                                send()
                            }
                        }}
                        placeholder="Skriv til AI..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                    />
                    <Button type="primary" icon={<SendOutlined />} onClick={send} />
                </div>
            </Card>
        </div>
    )
}

export default AIChatInterface 