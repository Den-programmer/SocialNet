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
} from 'antd'
import {
  SendOutlined,
  UserOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import NoDialogs from '../../common/NoDialogs/noDialogs'
import Preloader from '../../common/preloader/preloader'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { selectUserDialogId } from '../../../BLL/selectors/messages-selectors'
import { setUserDialogId } from '../../../BLL/reducer-messages'
import { useGetAllDialogsQuery, useSendDialogMessagesMutation } from '../../../DAL/graphQL/graphqlApi'

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

  // For loading state, you may want to add a loading state for messages
  const messagesLoading = dialogsLoading // Or use a separate loading if you have one

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
        maxWidth: 1000,
        height: 650,
        borderRadius: 20,
        display: 'flex',
        padding: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
      }}
    >
      <div
        style={{
          width: 300,
          borderRight: '1px solid #e0e0e0',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0 }}>
            Dialogs
          </Title>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {dialogsLoading ? (
            <Preloader />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={dialogsData}
              renderItem={(dialog: any) => {
                // Find the other participant (not the authorized user)
                const otherUser = dialog.participants.find((u: any) => u.id !== authorizedUserId)
                const dialogId = dialog.id
                const avatarSrc = otherUser?.photos?.small || undefined
                const conversationUsername = otherUser?.username || 'Unknown User'
                return (
                  <List.Item
                    onClick={() => dispatch(setUserDialogId(dialogId))}
                    style={{
                      backgroundColor:
                        dialogId === userDialogId ? '#e6f7ff' : 'transparent',
                      cursor: 'pointer',
                      padding: '14px 18px',
                      borderRadius: 12,
                      margin: '4px 8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={dialogId === userDialogId} color="blue">
                          <Avatar
                            size={48}
                            icon={!avatarSrc && <UserOutlined />}
                            src={avatarSrc}
                          />
                        </Badge>
                      }
                      title={
                        <Text strong style={{ fontSize: 16 }}>
                          {conversationUsername}
                        </Text>
                      }
                    />
                  </List.Item>
                )
              }}
              locale={{ emptyText: <NoDialogs /> }}
            />
          )}
        </div>
      </div>

      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#f9f9f9',
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#f5f7fa',
          }}
        >
          {messagesLoading ? (
            <Preloader />
          ) : messagesTotalCount > 0 ? (
            messages.map((msg: any) => {
              const isOwn = msg.sender.id === authorizedUserId
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '65%',
                      padding: '12px 16px',
                      borderRadius: 16,
                      background: isOwn ? '#1677ff' : '#fff',
                      color: isOwn ? '#fff' : '#333',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      wordBreak: 'break-word',
                    }}
                  >
                    {!isOwn && <div style={{ fontWeight: 500, marginBottom: 4 }}>{msg.sender.username}</div>}
                    {msg.text ? <div>{msg.text}</div> : msg.image ? null : <div style={{ fontStyle: 'italic', opacity: 0.6 }}>[empty message]</div>}
                    {msg.image && (
                      <div style={{ marginTop: msg.text ? 8 : 0 }}>
                        <img
                          src={msg.image}
                          alt="attachment"
                          style={{
                            maxWidth: '100%',
                            borderRadius: 12,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          }}
                        />
                      </div>
                    )}
                    <div style={{ fontSize: 12, color: isOwn ? '#e0e0e0' : '#888', marginTop: 4 }}>{new Date(msg.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              )
            })
          ) : (
            <Text italic style={{ fontSize: 18, color: '#999' }}>
              No messages yet
            </Text>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '14px 16px',
            borderTop: '1px solid #eee',
            background: '#fff',
          }}
        >
          {imageUrl && (
            <div style={{ marginRight: 10 }}>
              <img
                src={imageUrl}
                alt=""
                style={{
                  maxWidth: 70,
                  maxHeight: 90,
                  borderRadius: 10,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              />
            </div>
          )}

          <TextArea
            placeholder={file ? '' : 'Type your message...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              e.preventDefault()
              handleSend()
            }}
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{
              flexGrow: 1,
              marginRight: 10,
              borderRadius: 20,
              padding: '10px 16px',
              resize: 'none',
              background: '#f5f5f5',
            }}
          />

          <Tooltip title="Attach image">
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button
                shape="circle"
                icon={<PictureOutlined />}
                style={{ marginRight: 8 }}
              />
            </Upload>
          </Tooltip>

          <Tooltip title="Send">
            <Button
              shape="circle"
              type="primary"
              icon={<SendOutlined />}
              size="large"
              onClick={handleSend}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  )
}

export default MessagesPage
