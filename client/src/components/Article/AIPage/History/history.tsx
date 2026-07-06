import { useState } from 'react'
import React from 'react'
import { useDeleteConversationMutation, useRenameConversationMutation } from '../../../../DAL/AI/aiAPI'
import classes from '../aiPage.module.scss'
import { Empty, Button, Popconfirm, message, Modal, Input, Spin } from 'antd'

type AIConversation = {
  _id: string
  title: string
  lastMessage?: string
  updatedAt?: string
}

interface HistoryAIContentProps {
    conversations: AIConversation[]
    selectedConversationId: string
    setSelectedConversationId: (conversationId: string) => void
    isCreatingConversation: boolean
    isConversationsLoading: boolean
    startConversation: () => Promise<void>
}

const HistoryAIContent: React.FC<HistoryAIContentProps> = (props) => {
    const [renameConversationId, setRenameConversationId] = useState('')
    const [renameTitle, setRenameTitle] = useState('')
    const [renameConversation, { isLoading: isRenamingConversation }] =
        useRenameConversationMutation()
    const [deleteConversation] = useDeleteConversationMutation()

    const removeConversation = async (conversationId: string) => {
        await deleteConversation(conversationId).unwrap()

        if (props.selectedConversationId === conversationId) {
            props.setSelectedConversationId('')
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
    return (
        <div className={classes.aiHistory}>
            <Button
                type="primary"
                onClick={() => void props.startConversation()}
                loading={props.isCreatingConversation}
            >
                New chat
            </Button>

            <Spin spinning={props.isConversationsLoading}>
                {props.conversations.length === 0 ? (
                    <Empty description="No chat history yet" />
                ) : (
                    <ul className={classes.aiHistoryList}>
                        {props.conversations.map((conversation: AIConversation) => (
                            <li
                                key={conversation._id}
                                className={`${classes.aiHistoryItem} ${props.selectedConversationId === conversation._id ? classes.aiHistoryItemActive : ''}`}
                                onClick={() => props.setSelectedConversationId(conversation._id)}
                            >
                                <div className={classes.aiHistoryItemContent}>
                                    <div>{conversation.title || 'New Chat'}</div>
                                    <div>{conversation.lastMessage || 'No messages yet'}</div>
                                </div>

                                <div className={classes.aiHistoryItemActions}>
                                    <Button
                                        type="text"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            openRenameConversation(conversation)
                                        }}
                                    >
                                        Rename
                                    </Button>

                                    <Popconfirm
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
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Spin>

            <Modal
                title="Rename chat"
                open={Boolean(renameConversationId)}
                onCancel={closeRenameConversation}
                onOk={() => void submitRenameConversation()}
                okText="Save"
                confirmLoading={isRenamingConversation}
                destroyOnHidden
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
}

export default HistoryAIContent