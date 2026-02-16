import { useState, useEffect, useRef } from 'react'
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
} from 'antd'
import {
  SendOutlined,
  UserOutlined,
  PictureOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import NoDialogs from '../../common/NoDialogs/noDialogs'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { selectUserDialogId } from '../../../BLL/selectors/messages-selectors'
import { setUserDialogId } from '../../../BLL/reducer-messages'
import { useGetAllDialogsQuery, useSendDialogMessagesMutation } from '../../../DAL/graphQL/graphqlApi'
import classes from './messages.module.scss'

const { TextArea } = Input
const { Text, Title } = Typography

const MessagesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const userDialogId = useAppSelector(selectUserDialogId)
  const authorizedUserId = useAppSelector(selectAuthorizedUserId)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const {
    data: dialogsData,
    isLoading: dialogsLoading,
    refetch: refetchDialogs,
  } = useGetAllDialogsQuery({})

  // Find the selected dialog (by id)
  const selectedDialog = dialogsData?.find((d: any) => d.id === userDialogId)

  // Messages for the selected dialog
  const messages = selectedDialog?.messages || []
  const messagesTotalCount = messages.length

  const messagesLoading = dialogsLoading

  // For sending messages
  const [sendMessage] = useSendDialogMessagesMutation()

  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => setImageUrl(e.target?.result as string)
    reader.readAsDataURL(file)
  }, [file])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = async () => {
    if ((input.trim() || imageUrl) && userDialogId) {
      await sendMessage({
        conversationId: userDialogId,
        text: input,
        image: imageUrl,
      })
      setInput('')
      setFile(null)
      setImageUrl(undefined)
      refetchDialogs()
    }
  }

  const handleUpload = (info: UploadChangeParam<UploadFile<File>>) => {
    const uploadedFile = info.file.originFileObj
    if (uploadedFile) setFile(uploadedFile)
  }

  return (
    <Card className={classes.card}>
      <div className={classes.dialogsSection}>
        <div className={classes.dialogsHeader}>
          <Title level={4} className={classes.dialogsTitle}>
            Conversations
          </Title>
          <Text className={classes.dialogsCount}>
            {dialogsData?.length || 0} dialog{dialogsData?.length !== 1 ? 's' : ''}
          </Text>
        </div>
        <div className={classes.dialogsList}>
          {dialogsLoading ? (
            <div className={classes.loadingContainer}>
              <Spin />
            </div>
          ) : dialogsData && dialogsData.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={dialogsData}
              renderItem={(dialog: any) => {
                const otherUser = dialog.participants.find((u: any) => u.id !== authorizedUserId)
                const dialogId = dialog.id
                const avatarSrc = otherUser?.photos?.small || undefined
                const conversationUsername = otherUser?.username || 'Unknown User'
                const isSelected = dialogId === userDialogId
                
                return (
                  <List.Item
                    className={`${classes.dialogItem} ${isSelected ? classes.dialogItemSelected : classes.dialogItemUnselected}`}
                    onClick={() => dispatch(setUserDialogId(dialogId))}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge 
                          dot={isSelected} 
                          color="#1677ff"
                          className={classes.avatarBadge}
                        >
                          <Avatar
                            size={48}
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
                          <div 
                            className={classes.onlineDot}
                          />
                        </div>
                      }
                      description={
                        <Text className={classes.dialogLastMessage}>
                          {dialog.messages?.[dialog.messages.length - 1]?.text?.substring(0, 40) || 'No messages yet'}
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
              <Empty description="No conversations" className={classes.emptyMargin} />
            </div>
          )}
        </div>
      </div>

      <div className={classes.messagesSection}>
        {!userDialogId ? (
          <div className={classes.noSelectionState}>
            <Empty 
              description="Select a conversation to start messaging"
              className={classes.noSelectionMargin}
            />
          </div>
        ) : (
          <>
            <div className={classes.messagesHeader}>
              <div className={classes.userInfo}>
                <Avatar
                  size={40}
                  src={selectedDialog?.participants.find((u: any) => u.id !== authorizedUserId)?.photos?.small}
                  icon={<UserOutlined />}
                  className={classes.avatarPrimary}
                />
                <div>
                  <div className={classes.userName}>
                    {selectedDialog?.participants.find((u: any) => u.id !== authorizedUserId)?.username || 'Unknown'}
                  </div>
                  <div className={classes.userStatus}>Active now</div>
                </div>
              </div>
              <div className={classes.headerActions}>
                <Button type="text" shape="circle" icon={<UserOutlined />} />
              </div>
            </div>

            <div className={classes.messagesContainer}>
              {messagesLoading ? (
                <div className={classes.loadingContainer}>
                  <Spin />
                </div>
              ) : messagesTotalCount > 0 ? (
                messages.map((msg: any) => {
                  const isOwn = msg.sender.id === authorizedUserId
                  return (
                    <div
                      key={msg.id}
                      className={`${classes.messageBubble} ${isOwn ? classes.messageBubbleOwn : classes.messageBubbleOther}`}
                    >
                      <div
                        className={`${classes.messageWrapper} ${isOwn ? classes.messageWrapperOwn : classes.messageWrapperOther}`}
                      >
                        {!isOwn && (
                          <Avatar
                            size={32}
                            src={msg.sender.photos?.small}
                            icon={<UserOutlined />}
                            className={classes.avatarPrimary}
                          />
                        )}
                        <div
                          className={`${classes.messageContent} ${isOwn ? classes.messageContentOwn : classes.messageContentOther}`}
                        >
                          {!isOwn && (
                            <div className={`${classes.messageSenderName} ${isOwn ? classes.messageSenderNameOwn : classes.messageSenderNameOther}`}>
                              {msg.sender.username}
                            </div>
                          )}
                          {msg.text ? (
                            <div className={classes.messageText}>{msg.text}</div>
                          ) : msg.image ? null : (
                            <div className={classes.emptyMessage}>
                              [empty message]
                            </div>
                          )}
                          {msg.image && (
                            <div className={`${classes.messageImageWrapper} ${!msg.text ? classes.imageOnly : ''}`}>
                              <img
                                src={msg.image}
                                alt="attachment"
                                className={`${classes.messageImage} ${!msg.text ? classes.messageImageOnly : ''}`}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.03)'
                                  e.currentTarget.style.filter = 'brightness(1.1)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)'
                                  e.currentTarget.style.filter = 'brightness(1)'
                                }}
                              />
                            </div>
                          )}
                          <div className={`${classes.messageTimestamp} ${isOwn ? classes.messageTimestampOwn : classes.messageTimestampOther}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
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

            <div className={classes.inputSection}>
              {imageUrl && (
                <div className={classes.imagePreview}>
                  <img
                    src={imageUrl}
                    alt="preview"
                    className={classes.imagePreviewImg}
                  />
                  <Button
                    className={classes.deleteImageButton}
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setFile(null)
                      setImageUrl(undefined)
                    }}
                  />
                </div>
              )}

              <TextArea
                className={classes.messageInput}
                placeholder="Write a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                autoSize={{ minRows: 1, maxRows: 4 }}
              />

              <Tooltip title="Attach image (Ctrl+Enter to send)">
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
                  onClick={handleSend}
                />
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

export default MessagesPage
