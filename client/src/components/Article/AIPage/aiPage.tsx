import { useEffect, useState } from 'react'
import { useAuthRedirect } from "../../../hooks/hooks"
import classes from './aiPage.module.scss'
import { Card, Tabs, Avatar, Row, Col, Typography, List, Empty, Button, Popconfirm, message, Modal, Input } from 'antd'
import {
  RobotOutlined,
  MessageOutlined,
  ThunderboltOutlined,
  HistoryOutlined
} from '@ant-design/icons'
import Title from "antd/es/typography/Title"
import AIChatInterface from "./AIChatInterface/aiChatInterface"
import { useCreateConversationMutation, useDeleteConversationMutation, useGetConversationsQuery, useRenameConversationMutation } from '../../../DAL/AI/aiAPI'

type AIConversation = {
  _id: string
  title: string
  lastMessage?: string
  updatedAt?: string
}

const AIPage = () => { 
  useAuthRedirect()
  const [selectedConversationId, setSelectedConversationId] = useState('')
  const [renameConversationId, setRenameConversationId] = useState('')
  const [renameTitle, setRenameTitle] = useState('')

  const {
    data: conversationsResponse,
    isLoading: isConversationsLoading
  } = useGetConversationsQuery()

  const conversations = conversationsResponse?.data ?? []

  const [createConversation, { isLoading: isCreatingConversation }] =
    useCreateConversationMutation()
  const [deleteConversation] = useDeleteConversationMutation()
  const [renameConversation, { isLoading: isRenamingConversation }] =
    useRenameConversationMutation()

  const startConversation = async () => {
    const response = await createConversation().unwrap()
    setSelectedConversationId(response.data._id)
  }

  const removeConversation = async (conversationId: string) => {
    await deleteConversation(conversationId).unwrap()

    if (selectedConversationId === conversationId) {
      setSelectedConversationId('')
    }

    message.success('Chat deleted')
  }

  const openRenameConversation = (conversation: AIConversation) => {
    setRenameConversationId(conversation._id)
    setRenameTitle(conversation.title || 'New Chat')
  }

  const closeRenameConversation = () => {
    setRenameConversationId('')
    setRenameTitle('')
  }

  const submitRenameConversation = async () => {
    const nextTitle = renameTitle.trim()

    if (!nextTitle) {
      message.error('Enter a chat name')
      return
    }

    await renameConversation({
      conversationId: renameConversationId,
      title: nextTitle
    }).unwrap()

    message.success('Chat renamed')
    closeRenameConversation()
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

  const historyContent = (
    <div className={classes.aiHistory}>
      <Button
        type="primary"
        onClick={() => void startConversation()}
        loading={isCreatingConversation}
      >
        New chat
      </Button>

      <List
        className={classes.aiHistoryList}
        loading={isConversationsLoading}
        dataSource={conversations}
        locale={{
          emptyText: <Empty description="No chat history yet" />
        }}
        renderItem={(conversation: AIConversation) => (
          <List.Item
            className={`${classes.aiHistoryItem} ${selectedConversationId === conversation._id ? classes.aiHistoryItemActive : ''}`}
            onClick={() => setSelectedConversationId(conversation._id)}
            actions={[
              <Button
                key="rename"
                type="text"
                onClick={(event) => {
                  event.stopPropagation()
                  openRenameConversation(conversation)
                }}
              >
                Rename
              </Button>,
              <Popconfirm
                key="delete"
                title="Delete chat"
                description="This will permanently remove the conversation and its messages."
                okText="Delete"
                okButtonProps={{ danger: true }}
                onConfirm={() => removeConversation(conversation._id)}
              >
                <Button danger type="text" onClick={(event) => event.stopPropagation()}>
                  Delete
                </Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={conversation.title || 'New Chat'}
              description={conversation.lastMessage || 'No messages yet'}
            />
          </List.Item>
        )}
      />

      <Modal
        title="Rename chat"
        open={Boolean(renameConversationId)}
        onCancel={closeRenameConversation}
        onOk={() => void submitRenameConversation()}
        okText="Save"
        confirmLoading={isRenamingConversation}
        destroyOnClose
      >
        <Input
          value={renameTitle}
          onChange={(event) => setRenameTitle(event.target.value)}
          placeholder="Chat title"
          onPressEnter={() => void submitRenameConversation()}
          autoFocus
        />
      </Modal>
    </div>
  )

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
              children: <div>AI Tools & Actions</div>
            },
            {
              key: 'history',
              label: 'History',
              icon: <HistoryOutlined />,
              children: historyContent
            }
          ]}
        />
      </Card>
    </div>
  )
}

export default AIPage