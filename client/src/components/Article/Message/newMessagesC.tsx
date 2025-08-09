import { useState, useEffect, useRef } from 'react'
import {
  Card,
  Input,
  Button,
  Avatar,
  List,
  Upload,
  Typography,
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
import { useGetAllDialogsQuery, useSendDialogMessagesMutation } from '../../../DAL/messagesApi'
import Preloader from '../../common/preloader/preloader'
import { message } from '../../../types/MessagesTypes/messagesTypes'

const { TextArea } = Input
const { Text } = Typography

interface MessagesPageProps {
  userDialogId: string
  messages: Array<message>
  setUserDialogId: (userDialogId: string) => void
}

const MessagesPage:React.FC<MessagesPageProps> = ({
  userDialogId,
  messages,
  setUserDialogId
}) => {
  const { data: dialogsData, isLoading } = useGetAllDialogsQuery()
  const [sendDialogMessages, {  }] = useSendDialogMessagesMutation()
  
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

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
    <Card style={{ width: '100%', maxWidth: 800, height: 500, borderRadius: 12, display: 'flex', padding: 0, overflow: 'hidden' }}>
      <div style={{ width: 250, borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        {isLoading ? <Preloader /> : <List
          itemLayout="horizontal"
          dataSource={dialogsData}
          renderItem={(dialog) => (
            <List.Item
              onClick={() => setUserDialogId(dialog._id)}
              style={{
                backgroundColor: dialog._id === userDialogId ? '#f5f5f5' : '#fff',
                cursor: 'pointer',
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={!dialog.photos?.small && <UserOutlined />}
                    src={dialog.photos?.small || undefined}
                  />
                }
                title={dialog.userName}
              />
            </List.Item>
          )}
          locale={{
            emptyText: <NoDialogs />,
          }}
        />}
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 8,
                }}
              >
                <Conversation id={msg._id} messageText={msg.messageText} />
              </div>
            ))
          ) : (
            <Text italic style={{ fontSize: 20 }}>
              No messages
            </Text>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 8,
            borderTop: '1px solid #ccc',
          }}
        >
          {imageUrl && (
            <div style={{ marginRight: 8 }}>
              <img
                src={imageUrl}
                alt=""
                style={{
                  maxWidth: 60,
                  maxHeight: 80,
                  borderRadius: '25%',
                }}
              />
            </div>
          )}

          <TextArea
            placeholder={file ? '' : 'Type a message...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              e.preventDefault()
              handleSend()
            }}
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{ flexGrow: 1, marginRight: 8 }}
          />

          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<PictureOutlined />} />
          </Upload>

          <Button icon={<SendOutlined />} type="primary" onClick={handleSend} />
        </div>
      </div>
    </Card>
  )
}

export default MessagesPage