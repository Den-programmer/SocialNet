import classes from '../messages.module.scss'
import { Avatar, Button, Tooltip, Typography, Spin, message as antMessage, Popover } from 'antd'
import {
    UserOutlined,
    DeleteOutlined,
    MessageOutlined,
    ArrowLeftOutlined,
    SmileOutlined,
    PictureOutlined,
    SendOutlined,
} from '@ant-design/icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useDeleteMessageMutation, useSendDialogMessagesMutation } from '../../../../DAL/graphQL/graphqlApi'
import { EMOJI_ROWS } from '../../../../data/options/optionsMenuData'
import { selectUsersOnline } from '../../../../BLL/selectors/selectors'
import { useAppSelector } from '../../../../hooks/hooks'
import Upload, { UploadChangeParam, UploadFile } from 'antd/es/upload'
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea'
import imageCompression from 'browser-image-compression'
import { MessageType, userDialogType, MessageParticipant } from '../../../../types/MessagesTypes/messagesTypes'

const { Text } = Typography

interface MessagesPanelProps {
    messages: MessageType[]
    selectedDialog: userDialogType | null
    userDialogId: string
    authorizedUserId: string
    setLightboxImage: (url: string | null) => void
    messagesLoading?: boolean
    mobileShowChat: boolean
    setMobileShowChat: (val: boolean) => void
}

const MessagesPanel: React.FC<MessagesPanelProps> = ({ messages, selectedDialog, userDialogId, authorizedUserId, setLightboxImage, messagesLoading, mobileShowChat, setMobileShowChat }) => {
    const inputRef = useRef<TextAreaRef | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const onlineUsers = useAppSelector(selectUsersOnline)
    const [sendMessage, { isLoading: isSending }] = useSendDialogMessagesMutation()
    const [deleteMessage] = useDeleteMessageMutation()

    // Input state

    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState<string>()

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null)

    const selectedConversationOtherId = selectedDialog?.participants?.find((u: MessageParticipant) => u.id !== authorizedUserId)?.id
    const isSelectedUserOnline = onlineUsers.some((u: { userId: string }) => u.userId === selectedConversationOtherId)

    const handleSend = async () => {
        if ((!input.trim() && !imageUrl) || !userDialogId || isSending) return
        const text = input.trim()
        setInput('')
        setFile(null)
        setImageUrl(undefined)
        setShowEmojiPicker(false)

        try {
            await sendMessage({ conversationId: userDialogId, text, image: imageUrl }).unwrap()
        } catch {
            antMessage.error('Failed to send message')
        }
    }

    const handleDeleteMessage = async (msg: MessageType) => {
        await deleteMessage({ messageId: msg.id, conversationId: userDialogId })
    }

    const handleUpload = (info: UploadChangeParam<UploadFile<File>>) => {
        const uploadedFile = info.file.originFileObj
        if (uploadedFile) setFile(uploadedFile)
    }

    const handleEmojiSelect = (emoji: string) => {
        setInput((prev) => prev + emoji)
        inputRef.current?.focus()
    }

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    // Compress image and build preview URL
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        if (!file) return
        let cancelled = false
        const processImage = async () => {
            try {
                const compressed = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                })
                if (cancelled) return
                const reader = new FileReader()
                reader.onload = (e) => {
                    if (!cancelled) setImageUrl(e.target?.result as string)
                }
                reader.readAsDataURL(compressed)
            } catch {
                if (!cancelled) antMessage.error('Failed to process image')
            }
        }
        processImage()
        return () => { cancelled = true }
    }, [file])

    const emojiPickerContent = (
        <div className={classes.emojiGrid}>
            {EMOJI_ROWS.map((row, ri) => (
                <div key={ri} className={classes.emojiRow}>
                    {row.map((emoji) => (
                        <button
                            key={emoji}
                            className={classes.emojiBtn}
                            onClick={() => handleEmojiSelect(emoji)}
                            type="button"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )

    return (
        < div className={`${classes.messagesSection} ${mobileShowChat ? classes.messagesSectionVisible : ''}`
        }>
            {!userDialogId ? (
                <div className={classes.noSelectionState}>
                    <div className={classes.noSelectionIconWrap}>
                        <MessageOutlined className={classes.noSelectionIcon} />
                    </div>
                    <Text className={classes.noSelectionTitle}>Your Messages</Text>
                    <Text className={classes.noSelectionSubtitle}>
                        Select a conversation from the left to start chatting
                    </Text>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className={classes.messagesHeader}>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            className={classes.mobileBackButton}
                            onClick={() => setMobileShowChat(false)}
                        />
                        <div className={classes.userInfo}>
                            <Avatar
                                size={40}
                                src={selectedDialog?.participants?.find((u: MessageParticipant) => u.id !== authorizedUserId)?.photos?.small ?? undefined}
                                icon={<UserOutlined />}
                                className={classes.avatarPrimary}
                            />
                            <div>
                                <div className={classes.userName}>
                                    {selectedDialog?.participants?.find((u: MessageParticipant) => u.id !== authorizedUserId)?.username || 'Unknown'}
                                </div>
                            </div>
                        </div>
                        <div className={classes.headerActions}>
                            <Button type="text" shape="circle" icon={<UserOutlined />} />
                        </div>
                    </div>

                    {/* Message list */}
                    <div className={classes.messagesContainer}>
                        {messagesLoading ? (
                            <div className={classes.loadingContainer}><Spin /></div>
                        ) : messages.length > 0 ? (
                            messages.map((msg: MessageType, idx: number) => {
                                const isOwn = msg.sender?.id === authorizedUserId || msg.sender?.id === '__optimistic__'
                                const isTemp = msg.id?.startsWith('temp-')
                                const prevMsg = messages[idx - 1]
                                const nextMsg = messages[idx + 1]
                                const isClustered = prevMsg && prevMsg.sender?.id === msg.sender?.id
                                const isLastInCluster = !nextMsg || nextMsg.sender?.id !== msg.sender?.id

                                // Date separator
                                const msgDate = new Date(msg.createdAt)
                                const prevDate = prevMsg ? new Date(prevMsg.createdAt) : null
                                const showDateSeparator =
                                    !prevDate || msgDate.toDateString() !== prevDate.toDateString()

                                const formattedDate = (() => {
                                    const today = new Date()
                                    const yesterday = new Date(today)
                                    yesterday.setDate(today.getDate() - 1)
                                    if (msgDate.toDateString() === today.toDateString()) return 'Today'
                                    if (msgDate.toDateString() === yesterday.toDateString()) return 'Yesterday'
                                    return msgDate.toLocaleDateString([], {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })
                                })()

                                return (
                                    <Fragment key={msg.id || idx}>
                                        {showDateSeparator && (
                                            <div className={classes.dateSeparator}>
                                                <span className={classes.dateSeparatorLabel}>{formattedDate}</span>
                                            </div>
                                        )}
                                        <div
                                            className={`${classes.messageBubble} ${isOwn ? classes.messageBubbleOwn : classes.messageBubbleOther} ${isClustered ? classes.messageBubbleClustered : ''}`}
                                            onMouseEnter={() => setHoveredMessageId(msg.id)}
                                            onMouseLeave={() => setHoveredMessageId(null)}
                                        >
                                            <div
                                                className={`${classes.messageWrapper} ${isOwn ? classes.messageWrapperOwn : classes.messageWrapperOther}`}
                                            >
                                                {!isOwn && (
                                                    isLastInCluster ? (
                                                        <Avatar
                                                            size={32}
                                                            src={msg.sender?.photos?.small ?? undefined}
                                                            icon={<UserOutlined />}
                                                            className={classes.avatarPrimary}
                                                        />
                                                    ) : (
                                                        <div className={classes.avatarPlaceholder} />
                                                    )
                                                )}

                                                <div
                                                    className={`${classes.messageContent} ${isOwn ? classes.messageContentOwn : classes.messageContentOther} ${isClustered ? (isOwn ? classes.messageContentOwnClustered : classes.messageContentOtherClustered) : ''} ${isTemp ? classes.messageContentPending : ''}`}
                                                >
                                                    {!isOwn && !isClustered && (
                                                        <div className={`${classes.messageSenderName} ${classes.messageSenderNameOther}`}>
                                                            {msg.sender?.username}
                                                        </div>
                                                    )}
                                                    {msg.text ? (
                                                        <div className={classes.messageText}>{msg.text}</div>
                                                    ) : !msg.image ? (
                                                        <div className={classes.emptyMessage}>[empty message]</div>
                                                    ) : null}
                                                    {msg.image && (
                                                        <div className={`${classes.messageImageWrapper} ${!msg.text ? classes.imageOnly : ''}`}>
                                                            <img
                                                                src={msg.image}
                                                                alt="attachment"
                                                                className={`${classes.messageImage} ${!msg.text ? classes.messageImageOnly : ''}`}
                                                                onClick={() => setLightboxImage(msg.image!)}
                                                            />
                                                        </div>
                                                    )}
                                                    {isLastInCluster && (
                                                        <div className={`${classes.messageTimestamp} ${isOwn ? classes.messageTimestampOwn : classes.messageTimestampOther}`}>
                                                            {isTemp ? '...' : new Date(msg.createdAt).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Delete button for own messages */}
                                                {isOwn && !isTemp && hoveredMessageId === msg.id && (
                                                    <Tooltip title="Delete message">
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            danger
                                                            shape="circle"
                                                            icon={<DeleteOutlined />}
                                                            className={classes.deleteMessageButton}
                                                            onClick={() => handleDeleteMessage(msg)}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                        ) : (
                            <div className={classes.noMessagesState}>
                                <Text className={classes.noMessagesText}>
                                    No messages yet. Start the conversation!
                                </Text>
                            </div>
                        )}
                        <div ref={messagesEndRef} className={classes.scrollAnchor} />
                    </div>

                    {/* Input area */}
                    <div className={classes.inputSection}>
                        {imageUrl && (
                            <div className={classes.imagePreview}>
                                <img src={imageUrl} alt="preview" className={classes.imagePreviewImg} />
                                <Button
                                    className={classes.deleteImageButton}
                                    type="text"
                                    size="small"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => { setFile(null); setImageUrl(undefined) }}
                                />
                            </div>
                        )}

                        <TextArea
                            ref={inputRef}
                            className={classes.messageInput}
                            placeholder="Write a message... (Ctrl+Enter to send)"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value)
                            }}
                            onPressEnter={(e) => {
                                if (e.ctrlKey || e.metaKey) {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                        />

                        <Popover
                            content={emojiPickerContent}
                            trigger="click"
                            open={showEmojiPicker}
                            onOpenChange={setShowEmojiPicker}
                            placement="topRight"
                            classNames={{ root: classes.emojiPopover }}
                        >
                            <Tooltip title="Emoji">
                                <Button
                                    className={classes.emojiButton}
                                    shape="circle"
                                    icon={<SmileOutlined />}
                                    size="large"
                                />
                            </Tooltip>
                        </Popover>

                        <Tooltip title="Attach image">
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleUpload}
                            >
                                <Button
                                    className={classes.uploadButton}
                                    shape="circle"
                                    icon={<PictureOutlined />}
                                    size="large"
                                />
                            </Upload>
                        </Tooltip>

                        <Tooltip title="Send (Ctrl+Enter)">
                            <Button
                                className={classes.sendButton}
                                shape="circle"
                                type="primary"
                                icon={<SendOutlined />}
                                size="large"
                                loading={isSending}
                                onClick={handleSend}
                                disabled={!input.trim() && !imageUrl}
                            />
                        </Tooltip>
                    </div>
                </>
            )}
        </div >
    )
}

export default MessagesPanel 