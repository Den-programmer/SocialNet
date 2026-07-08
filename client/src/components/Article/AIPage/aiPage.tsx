import { useEffect, useState } from 'react'
import { useAuthRedirect } from "../../../hooks/hooks"
import classes from './aiPage.module.scss'
import { Card, Tabs, Avatar, Row, Col, Typography } from 'antd'
import {
  RobotOutlined,
  MessageOutlined,
  ThunderboltOutlined,
  HistoryOutlined
} from '@ant-design/icons'
import Title from "antd/es/typography/Title"
import AIChatInterface from "./AIChatInterface/aiChatInterface"
import { useCreateConversationMutation, useGetConversationsQuery } from '../../../DAL/AI/aiAPI'
import HistoryAIContent from './History/history'
import AITools from './AITools/aiTools'

const AIPage = () => {
  useAuthRedirect()
  const [selectedConversationId, setSelectedConversationId] = useState('')

  const {
    data: conversationsResponse,
    isLoading: isConversationsLoading
  } = useGetConversationsQuery()

  const conversations = conversationsResponse?.data ?? []

  const [createConversation, { isLoading: isCreatingConversation }] =
    useCreateConversationMutation()

  const startConversation = async () => {
    const response = await createConversation().unwrap()
    setSelectedConversationId(response.data._id)
  }

  useEffect(() => {
    if (selectedConversationId) {
      return
    }

    if (conversations.length > 0) {
      setSelectedConversationId(conversations[0]._id)
      return
    }

    if (!isConversationsLoading && !isCreatingConversation) {
      void startConversation()
    }
  }, [
    conversations,
    isConversationsLoading,
    isCreatingConversation,
    selectedConversationId
  ])

  return (
    <div className={classes.aiPage}>
      <div className={classes.aiHeader}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar
              size={96}
              icon={<RobotOutlined />}
              className={classes.aiAvatar}
            />
          </Col>

          <Col>
            <Title level={2} className={classes.aiTitle}>
              AI Assistant
            </Title>
            <Typography className={classes.aiSubtitle}>
              Your personal intelligence layer
            </Typography>
          </Col>
        </Row>
      </div>

      <Card className={classes.aiCard}>
        <Tabs
          defaultActiveKey="chat"
          items={[
            {
              key: 'chat',
              label: 'Chat',
              icon: <MessageOutlined />,
              children: <AIChatInterface conversationId={selectedConversationId} />
            },
            {
              key: 'tools',
              label: 'Tools',
              icon: <ThunderboltOutlined />,
              children: <AITools conversationId={selectedConversationId} />
            },
            {
              key: 'history',
              label: 'History',
              icon: <HistoryOutlined />,
              children: <HistoryAIContent 
                conversations={conversations} 
                selectedConversationId={selectedConversationId} 
                setSelectedConversationId={setSelectedConversationId} 
                isCreatingConversation={isCreatingConversation}
                isConversationsLoading={isConversationsLoading}
                startConversation={startConversation}
              />
            }
          ]}
        />
      </Card>
    </div>
  )
}

export default AIPage