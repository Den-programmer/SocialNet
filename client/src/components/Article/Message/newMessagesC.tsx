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
  Badge
} from 'antd'
import {
  SendOutlined,
  UserOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import Conversation from '../../common/Conversation/conversation'
import NoDialogs from '../../common/NoDialogs/noDialogs'
import { useGetAllDialogsQuery, useGetDialogMessagesQuery, useSendDialogMessagesMutation } from '../../../DAL/messagesApi'
import Preloader from '../../common/preloader/preloader'
import { message, userDialogType } from '../../../types/MessagesTypes/messagesTypes'
import { useAppSelector } from '../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'

const { TextArea } = Input
const { Text, Title } = Typography

interface MessagesPageProps {
  userDialogId: string
  setUserDialogId: (userDialogId: string) => void
}

const MessagesPage:React.FC<MessagesPageProps> = ({
  userDialogId,
  setUserDialogId
}) => {
  const authorizedUserId = useAppSelector(selectAuthorizedUserId)

  const { data: dialogsData, isLoading } = useGetAllDialogsQuery()
  const [sendDialogMessages] = useSendDialogMessagesMutation()
  
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>()
  const { data } = useGetDialogMessagesQuery({ userId1: authorizedUserId, userId2: userDialogId }, { skip: !userDialogId })
  const messages = data && 'items' in data
    ? data
    : { items: [] as message[], totalCount: 0, error: null }
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  debugger
  useEffect(() => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [file])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim() || imageUrl) {
      sendDialogMessages({userId:userDialogId, message: input, image: imageUrl})
      setInput('')
      setImageUrl(undefined)
      setFile(null)
    }
  }

  const handleUpload = (info: UploadChangeParam<UploadFile<File>>) => {
    const uploadedFile = info.file.originFileObj
    if (uploadedFile) {
      setFile(uploadedFile)
    }
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
          <Title level={4} style={{ margin: 0 }}>Dialogs</Title>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {isLoading ? (
            <Preloader />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={dialogsData}
              renderItem={(dialog: userDialogType) => (
                <List.Item
                  onClick={() => setUserDialogId(dialog._id)}
                  style={{
                    backgroundColor: dialog._id === userDialogId ? '#e6f7ff' : 'transparent',
                    cursor: 'pointer',
                    padding: '14px 18px',
                    borderRadius: 12,
                    margin: '4px 8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot={dialog._id === userDialogId} color="blue">
                        <Avatar
                          size={48}
                          icon={!dialog.photos?.small && <UserOutlined />}
                          src={dialog.photos?.small || undefined}
                        />
                      </Badge>
                    }
                    title={
                      <Text strong style={{ fontSize: 16 }}>{dialog.userName}</Text>
                    }
                  />
                </List.Item>
              )}
              locale={{
                emptyText: <NoDialogs />,
              }}
            />
          )}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #eee', background: '#fff' }}>
          <Text strong style={{ fontSize: 18 }}>
            {dialogsData?.find((d: userDialogType) => d._id === userDialogId)?.userName || 'Select a dialog'}
          </Text>
        </div>

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
          {messages.items.length > 0 ? (
            messages.items?.map((msg: message) => (
              <div
                key={msg._id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '65%',
                    padding: '12px 16px',
                    borderRadius: 16,
                    background: msg.sender === 'user' ? '#1677ff' : '#fff',
                    color: msg.sender === 'user' ? '#fff' : '#333',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    wordBreak: 'break-word',
                  }}
                >
                  <Conversation id={msg._id} messageText={msg.messageText} />
                  {msg.image && (
                    <div style={{ marginTop: 8 }}>
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
                </div>
              </div>
            ))
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
