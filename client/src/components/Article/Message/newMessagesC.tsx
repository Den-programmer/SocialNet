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

const { TextArea } = Input
const { Text, Title } = Typography

const messageContainerStyles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .message-bubble {
    animation: slideIn 0.3s ease-out;
  }
  
  .dialog-item {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .dialog-item:hover {
    background-color: #f5f5f5 !important;
    transform: translateX(4px);
  }
  
  .online-dot {
    animation: pulse 2s infinite;
  }
`

if (!document.getElementById('message-styles')) {
  const style = document.createElement('style')
  style.id = 'message-styles'
  style.innerHTML = messageContainerStyles
  document.head.appendChild(style)
}

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
    <Card
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        borderRadius: 0,
        display: 'flex',
        padding: 0,
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: 'none',
        border: 'none',
        margin: 0,
      }}
    >
      <div
        style={{
          flex: '0 0 35%',
          borderRight: '1px solid #e8e8e8',
          background: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #e8e8e8',
          background: '#fff'
        }}>
          <Title level={4} style={{ 
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            color: '#1f1f1f'
          }}>
            Conversations
          </Title>
          <Text style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4, display: 'block' }}>
            {dialogsData?.length || 0} dialog{dialogsData?.length !== 1 ? 's' : ''}
          </Text>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
          {dialogsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
                    className="dialog-item"
                    onClick={() => dispatch(setUserDialogId(dialogId))}
                    style={{
                      backgroundColor: isSelected ? '#e6f7ff' : 'transparent',
                      cursor: 'pointer',
                      padding: '12px 12px',
                      borderRadius: 10,
                      margin: '6px 8px',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderLeft: isSelected ? '4px solid #1677ff' : '4px solid transparent',
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge 
                          dot={isSelected} 
                          color="#1677ff"
                          style={{ boxShadow: '0 0 0 2px #fff' }}
                        >
                          <Avatar
                            size={48}
                            icon={!avatarSrc && <UserOutlined />}
                            src={avatarSrc}
                            style={{
                              backgroundColor: '#1677ff',
                              border: isSelected ? '2px solid #1677ff' : 'none'
                            }}
                          />
                        </Badge>
                      }
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Text strong style={{ 
                            fontSize: 15,
                            color: isSelected ? '#1677ff' : '#1f1f1f',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {conversationUsername}
                          </Text>
                          <div 
                            className="online-dot"
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: '#52c41a',
                              flexShrink: 0
                            }}
                          />
                        </div>
                      }
                      description={
                        <Text style={{ 
                          fontSize: 12, 
                          color: '#8c8c8c',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block'
                        }}>
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
            <div style={{ padding: 20, textAlign: 'center' }}>
              <Empty description="No conversations" style={{ marginTop: 40 }} />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          flex: '1 1 65%',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          position: 'relative',
          minWidth: 0,
        }}
      >
        {!userDialogId ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 20,
              color: '#8c8c8c',
            }}
          >
            <Empty 
              description="Select a conversation to start messaging"
              style={{ marginTop: 0 }}
            />
          </div>
        ) : (
          <>
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #e8e8e8',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar
                  size={40}
                  src={selectedDialog?.participants.find((u: any) => u.id !== authorizedUserId)?.photos?.small}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: '#1677ff' }}
                />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>
                    {selectedDialog?.participants.find((u: any) => u.id !== authorizedUserId)?.username || 'Unknown'}
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>Active now</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button type="text" shape="circle" icon={<UserOutlined />} />
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                background: '#f5f7fa',
              }}
            >
              {messagesLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Spin />
                </div>
              ) : messagesTotalCount > 0 ? (
                messages.map((msg: any) => {
                  const isOwn = msg.sender.id === authorizedUserId
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        justifyContent: isOwn ? 'flex-end' : 'flex-start',
                        animation: 'slideIn 0.3s ease-out',
                      }}
                      className="message-bubble"
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          maxWidth: '70%',
                          alignItems: 'flex-end',
                          flexDirection: isOwn ? 'row-reverse' : 'row',
                        }}
                      >
                        {!isOwn && (
                          <Avatar
                            size={32}
                            src={msg.sender.photos?.small}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1677ff' }}
                          />
                        )}
                        <div
                          style={{
                            maxWidth: '100%',
                            padding: '12px 16px',
                            borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            background: isOwn ? '#1677ff' : '#e8e8e8',
                            color: isOwn ? '#fff' : '#333',
                            boxShadow: isOwn ? '0 2px 8px rgba(22, 119, 255, 0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
                            wordBreak: 'break-word',
                          }}
                        >
                          {!isOwn && (
                            <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 12, color: isOwn ? 'rgba(255,255,255,0.8)' : '#595959' }}>
                              {msg.sender.username}
                            </div>
                          )}
                          {msg.text ? (
                            <div style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>{msg.text}</div>
                          ) : msg.image ? null : (
                            <div style={{ fontStyle: 'italic', opacity: 0.6, fontSize: 14 }}>
                              [empty message]
                            </div>
                          )}
                          {msg.image && (
                            <div style={{ marginTop: msg.text ? 12 : 0 }}>
                              <img
                                src={msg.image}
                                alt="attachment"
                                style={{
                                  maxWidth: '100%',
                                  borderRadius: 12,
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                  cursor: 'pointer',
                                  transition: 'transform 0.2s ease, filter 0.2s ease',
                                }}
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
                          <div style={{ fontSize: 11, color: isOwn ? 'rgba(255,255,255,0.7)' : '#8c8c8c', marginTop: 8, fontWeight: 500 }}>
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Text italic style={{ fontSize: 16, color: '#bfbfbf' }}>
                    No messages yet. Start the conversation!
                  </Text>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px 20px',
                borderTop: '1px solid #e8e8e8',
                background: '#fff',
                gap: 10,
              }}
            >
              {imageUrl && (
                <div style={{ position: 'relative' }}>
                  <img
                    src={imageUrl}
                    alt="preview"
                    style={{
                      maxWidth: 70,
                      maxHeight: 90,
                      borderRadius: 8,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: '2px solid #e8e8e8',
                    }}
                  />
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      background: '#fff',
                      borderRadius: '50%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                    onClick={() => {
                      setFile(null)
                      setImageUrl(undefined)
                    }}
                  />
                </div>
              )}

              <TextArea
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
                style={{
                  flexGrow: 1,
                  borderRadius: 20,
                  padding: '12px 18px',
                  resize: 'none',
                  background: '#f5f5f5',
                  border: '1px solid #e8e8e8',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.background = '#fff'
                  e.target.style.borderColor = '#1677ff'
                  e.target.style.boxShadow = '0 0 0 2px rgba(22, 119, 255, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.background = '#f5f5f5'
                  e.target.style.borderColor = '#e8e8e8'
                  e.target.style.boxShadow = 'none'
                }}
              />

              <Tooltip title="Attach image (Ctrl+Enter to send)">
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                >
                  <Button
                    shape="circle"
                    icon={<PictureOutlined />}
                    size="large"
                    style={{
                      transition: 'all 0.2s ease',
                      color: '#1677ff',
                      borderColor: '#1677ff',
                      border: '2px solid #1677ff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(22, 119, 255, 0.1)'
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                </Upload>
              </Tooltip>

              <Tooltip title="Send (Ctrl+Enter)">
                <Button
                  shape="circle"
                  type="primary"
                  icon={<SendOutlined />}
                  size="large"
                  style={{
                    background: '#1677ff',
                    boxShadow: '0 2px 8px rgba(22, 119, 255, 0.3)',
                    transition: 'all 0.2s ease',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(22, 119, 255, 0.4)'
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 119, 255, 0.3)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }}
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
