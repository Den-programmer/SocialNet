import { useState, useEffect, useRef, Fragment } from 'react'
import {
  Card,
  Input,
  Button,
  Avatar,
  List,
  Upload,
  Typography,
  Tooltip,
  Badge,
  Spin,
  Empty,
  Modal,
  Popover,
  message as antMessage,
} from 'antd'
import imageCompression from 'browser-image-compression'
import {
  SendOutlined,
  UserOutlined,
  PictureOutlined,
  DeleteOutlined,
  SearchOutlined,
  SmileOutlined,
  MessageOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import NoDialogs from '../../common/NoDialogs/noDialogs'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { selectUserDialogId } from '../../../BLL/selectors/messages-selectors'
import { setUserDialogId } from '../../../BLL/reducer-messages'
import {
  useGetAllDialogsQuery,
  useSendDialogMessagesMutation,
  useDeleteMessageMutation,
  useStartDialogMutation,
  useSetTypingMutation,
  useTypingSubscription,
  useDeleteDialogMutation,
} from '../../../DAL/graphQL/graphqlApi'
import { useLazyGetUsersQuery } from '../../../DAL/usersApi'
import classes from './messages.module.scss'
import { EMOJI_ROWS } from '../../../data/options/optionsMenuData'

const { TextArea } = Input
const { Text, Title } = Typography

const MessagesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const userDialogId = useAppSelector(selectUserDialogId)
  const authorizedUserId = useAppSelector(selectAuthorizedUserId)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const {
    data: dialogsData,
    isLoading: dialogsLoading,
  } = useGetAllDialogsQuery({})

  // Find the selected dialog
  const selectedDialog = (dialogsData?.find((d: any) => d.id === userDialogId) || null) as any
  const messages: any[] = selectedDialog?.messages || []
  const messagesLoading = dialogsLoading

  const [sendMessage, { isLoading: isSending }] = useSendDialogMessagesMutation()
  const [deleteMessage] = useDeleteMessageMutation()
  const [startDialog] = useStartDialogMutation()
  const [setTyping] = useSetTypingMutation()
  const [deleteDialog] = useDeleteDialogMutation()
  const [fetchUsers, { data: usersData, isFetching: isUsersLoading }] = useLazyGetUsersQuery()

  // Real-time typing indicator
  const typingUsers = useTypingSubscription(userDialogId || undefined)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTypingRef = useRef(false)

  // Input state
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>()
  const [search, setSearch] = useState('')

  // UI state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showNewDialogModal, setShowNewDialogModal] = useState(false)
  const [newDialogSearch, setNewDialogSearch] = useState('')
  const [startingDialogFor, setStartingDialogFor] = useState<string | null>(null)
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null)
  const [mobileShowChat, setMobileShowChat] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Auto-select first dialog when dialogs load
  useEffect(() => {
    if (!userDialogId && dialogsData && dialogsData.length > 0) {
      const firstDialog = dialogsData[0] as any
      dispatch(setUserDialogId(firstDialog.id))
    }
  }, [dialogsData, userDialogId, dispatch])

  // Compress image and build preview URL
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

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  // Filtered dialogs by search
  const filteredDialogs = (dialogsData || []).filter((d: any) => {
    if (!search.trim()) return true
    const otherUser = d.participants?.find((u: any) => u.id !== authorizedUserId)
    return otherUser?.username?.toLowerCase().includes(search.toLowerCase())
  })

  // Filtered users for new dialog modal — exclude the logged-in user (handle both id and _id field names)
  const filteredUsers = (usersData?.items || []).filter((u: any) => {
    const userId = String(u.id || u._id || '')
    return userId !== String(authorizedUserId)
  })

  const handleSend = async () => {
    if ((!input.trim() && !imageUrl) || !userDialogId || isSending) return
    const text = input.trim()
    setInput('')
    setFile(null)
    setImageUrl(undefined)
    setShowEmojiPicker(false)

    if (isTypingRef.current) {
      isTypingRef.current = false
      setTyping({ conversationId: userDialogId, isTyping: false })
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
    try {
      await sendMessage({ conversationId: userDialogId, text, image: imageUrl }).unwrap()
    } catch {
      antMessage.error('Failed to send message')
    }
  }

  const handleDeleteMessage = async (msg: any) => {
    await deleteMessage({ messageId: msg.id, conversationId: userDialogId })
  }

  const handleDeleteDialog = async () => {
    if (!deleteDialogId) return
    setIsDeleting(true)
    try {
      await deleteDialog({ dialogId: deleteDialogId }).unwrap()
      if (userDialogId === deleteDialogId) {
        const remaining = (dialogsData || []).filter((d: any) => d.id !== deleteDialogId)
        dispatch(setUserDialogId(remaining.length > 0 ? (remaining[0] as any).id : ''))
      }
    } catch (e) {
      console.error('Failed to delete conversation', e)
    } finally {
      setIsDeleting(false)
      setDeleteDialogId(null)
    }
  }

  const handleUpload = (info: UploadChangeParam<UploadFile<File>>) => {
    const uploadedFile = info.file.originFileObj
    if (uploadedFile) setFile(uploadedFile)
  }

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji)
    handleTypingEvent()
    inputRef.current?.focus()
  }

  // Emit typing events with debounce
  const handleTypingEvent = () => {
    if (!userDialogId) return
    if (!isTypingRef.current) {
      isTypingRef.current = true
      setTyping({ conversationId: userDialogId, isTyping: true })
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false
      setTyping({ conversationId: userDialogId, isTyping: false })
      typingTimeoutRef.current = null
    }, 2000)
  }

  const handleOpenNewDialog = () => {
    setNewDialogSearch('')
    fetchUsers({ pageSize: 30 })
    setShowNewDialogModal(true)
  }

  const handleNewDialogSearch = (val: string) => {
    setNewDialogSearch(val)
    fetchUsers({ pageSize: 30, term: val })
  }

  const handleStartDialog = async (userId: string) => {
    setStartingDialogFor(userId)
    try {
      const result = await startDialog(userId).unwrap()
      if (result) {
        const dialogId = result.id || (result as any)._id
        if (dialogId) {
          // Small delay so the optimistic cache update from onQueryStarted applies first
          await new Promise(r => setTimeout(r, 100))
          dispatch(setUserDialogId(dialogId))
        }
      }
    } catch (e) {
      console.error('Failed to start dialog', e)
    } finally {
      setStartingDialogFor(null)
      setShowNewDialogModal(false)
    }
  }

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
    <Card className={classes.card}>
      {/* ===== Left: Dialogs sidebar ===== */}
      <div className={`${classes.dialogsSection} ${mobileShowChat ? classes.dialogsSectionHidden : ''}`}>
        <div className={classes.dialogsHeader}>
          <div className={classes.dialogsHeaderTop}>
            <Title level={4} className={classes.dialogsTitle}>
              Conversations
            </Title>
            <div className={classes.dialogsHeaderActions}>
              <Text className={classes.dialogsCount}>
                {filteredDialogs.length} dialog{filteredDialogs.length !== 1 ? 's' : ''}
              </Text>
              <Tooltip title="New conversation">
                <Button
                  type="text"
                  shape="circle"
                  icon={<PlusOutlined />}
                  size="small"
                  className={classes.newDialogButton}
                  onClick={handleOpenNewDialog}
                />
              </Tooltip>
            </div>
          </div>
          <Input
            className={classes.searchInput}
            placeholder="Search conversations..."
            prefix={<SearchOutlined className={classes.searchIcon} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </div>

        <div className={classes.dialogsList}>
          {dialogsLoading ? (
            <div className={classes.loadingContainer}><Spin /></div>
          ) : filteredDialogs.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={filteredDialogs}
              renderItem={(dialog: any) => {
                const otherUser = dialog.participants.find((u: any) => u.id !== authorizedUserId)
                const dialogId = dialog.id
                const avatarSrc = otherUser?.photos?.small || undefined
                const conversationUsername = otherUser?.username || 'Unknown User'
                const isSelected = dialogId === userDialogId
                const lastMsg = dialog.messages?.[dialog.messages.length - 1]
                const lastMsgTime = lastMsg?.createdAt
                  ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''

                return (
                  <List.Item
                    className={`${classes.dialogItem} ${isSelected ? classes.dialogItemSelected : classes.dialogItemUnselected}`}
                    onClick={() => {
                    dispatch(setUserDialogId(dialogId))
                    setMobileShowChat(true)
                  }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={isSelected} color="#1677ff" className={classes.avatarBadge}>
                          <Avatar
                            size={46}
                            icon={!avatarSrc && <UserOutlined />}
                            src={avatarSrc}
                            className={`${classes.avatarPrimary} ${isSelected ? classes.avatarBorder : ''}`}
                          />
                        </Badge>
                      }
                      title={
                        <div className={classes.dialogUserNameMetadata}>
                          <Text strong className={`${classes.dialogUserName} ${isSelected ? classes.dialogUserNameSelected : ''}`}>
                            {conversationUsername}
                          </Text>
                          <div className={classes.dialogMetaRight}>
                            {lastMsgTime && (
                              <span className={classes.dialogTimestamp}>{lastMsgTime}</span>
                            )}
                            <Tooltip title="Delete conversation">
                              <Button
                                type="text"
                                size="small"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                className={classes.deleteDialogButton}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setDeleteDialogId(dialogId)
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      }
                      description={
                        <Text className={classes.dialogLastMessage}>
                          {lastMsg?.text?.substring(0, 45) || 'No messages yet'}
                        </Text>
                      }
                    />
                  </List.Item>
                )
              }}
              locale={{ emptyText: <NoDialogs /> }}
            />
          ) : (
            <div className={classes.noConversationsContainer}>
              <Empty
                image={<MessageOutlined className={classes.emptyIcon} />}
                description={search ? `No results for "${search}"` : 'No conversations yet'}
                className={classes.emptyMargin}
              />
            </div>
          )}
        </div>
      </div>

      {/* ===== Right: Messages panel ===== */}
      <div className={`${classes.messagesSection} ${mobileShowChat ? classes.messagesSectionVisible : ''}`}>
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
                  src={selectedDialog?.participants?.find((u: any) => u.id !== authorizedUserId)?.photos?.small}
                  icon={<UserOutlined />}
                  className={classes.avatarPrimary}
                />
                <div>
                  <div className={classes.userName}>
                    {selectedDialog?.participants?.find((u: any) => u.id !== authorizedUserId)?.username || 'Unknown'}
                  </div>
                  <div className={classes.userStatus}>
                    {typingUsers.length > 0
                      ? `${typingUsers.map(t => t.username).join(', ')} typing...`
                      : 'Active now'
                    }
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
                messages.map((msg: any, idx: number) => {
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
                                src={msg.sender?.photos?.small}
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
                                  onClick={() => setLightboxImage(msg.image)}
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
              {typingUsers.length > 0 && (
                <div className={classes.typingIndicator}>
                  <div className={classes.typingDots}>
                    <span /><span /><span />
                  </div>
                  <Text className={classes.typingText}>
                    {typingUsers.map(t => t.username).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                  </Text>
                </div>
              )}
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
                ref={inputRef as any}
                className={classes.messageInput}
                placeholder="Write a message... (Ctrl+Enter to send)"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  handleTypingEvent()
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
      </div>

      {/* ===== Delete Conversation Confirmation Modal ===== */}
      <Modal
        title="Delete Conversation"
        open={!!deleteDialogId}
        onCancel={() => setDeleteDialogId(null)}
        onOk={handleDeleteDialog}
        okText="Delete"
        okButtonProps={{ danger: true, loading: isDeleting }}
        cancelButtonProps={{ disabled: isDeleting }}
      >
        <p>Are you sure you want to delete this conversation? All messages will be permanently removed.</p>
      </Modal>

      {/* ===== New Conversation Modal ===== */}
      <Modal
        title="New Conversation"
        open={showNewDialogModal}
        onCancel={() => setShowNewDialogModal(false)}
        footer={null}
        className={classes.newDialogModal}
      >
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          value={newDialogSearch}
          onChange={(e) => handleNewDialogSearch(e.target.value)}
          allowClear
          className={classes.newDialogSearch}
        />
        {isUsersLoading ? (
          <div className={classes.loadingContainer} style={{ height: 200 }}><Spin /></div>
        ) : (
          <List
            className={classes.newDialogUserList}
            dataSource={filteredUsers}
            renderItem={(user: any) => {
              const userId = String(user.id || user._id || '')
              return (
              <List.Item
                className={classes.newDialogUserItem}
                actions={[
                  <Button
                    key="start"
                    type="primary"
                    size="small"
                    loading={startingDialogFor === userId}
                    onClick={() => handleStartDialog(userId)}
                  >
                    Message
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={user.photos?.small}
                      icon={!user.photos?.small && <UserOutlined />}
                    />
                  }
                  title={user.username}
                />
              </List.Item>
              )
            }}
            locale={{ emptyText: 'No users found' }}
          />
        )}
      </Modal>

      {/* ===== Image Lightbox Modal ===== */}
      <Modal
        open={!!lightboxImage}
        onCancel={() => setLightboxImage(null)}
        footer={null}
        centered
        width="auto"
        className={classes.lightboxModal}
        styles={{ body: { padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
      >
        {lightboxImage && (
          <img
            src={lightboxImage}
            alt="Full size"
            className={classes.lightboxImage}
          />
        )}
      </Modal>
    </Card>
  )
}

export default MessagesPage
