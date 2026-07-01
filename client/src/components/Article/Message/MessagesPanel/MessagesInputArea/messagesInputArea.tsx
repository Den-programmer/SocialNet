import React, { useRef, useState, useEffect } from 'react'
import classes from '../../messages.module.scss'
import { Button, Tooltip, Popover, message as antMessage } from 'antd'
import {
    DeleteOutlined,
    SmileOutlined,
    PictureOutlined,
    SendOutlined,
} from '@ant-design/icons'
import Upload, { UploadChangeParam, UploadFile } from 'antd/es/upload'
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea'
import { EmojiPickerContent } from '../../messages-utils/messages-utils'
import { useSendDialogMessagesMutation } from '../../../../../DAL/messagesApi'
import imageCompression from 'browser-image-compression'
import { socketService } from '../../../../../DAL/socket'
import { userDialogType } from '../../../../../types/MessagesTypes/messagesTypes'

interface MessagesInputAreaProps {
    conversationId: string
    selectedDialog: userDialogType | null
    authorizedUserId: string
}

const MessagesInputArea: React.FC<MessagesInputAreaProps> = ({ conversationId, selectedDialog, authorizedUserId }) => {
    const inputRef = useRef<TextAreaRef | null>(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const [sendMessage, { isLoading: isSending }] = useSendDialogMessagesMutation()

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isTypingRef = useRef(false)

    const handleUpload = (info: UploadChangeParam<UploadFile<File>>) => {
        const uploadedFile = info.file.originFileObj
        if (uploadedFile) setFile(uploadedFile)
    }

    const handleEmojiSelect = (emoji: string) => {
        setInput((prev) => prev + emoji)
        inputRef.current?.focus()
    }

    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState<string>()

    const emitTyping = (isTyping: boolean) => {
        const receiverId = selectedDialog?.participants.find(p => p.id !== authorizedUserId)?.id
        if (!receiverId) return

        socketService.socket?.emit('typing', {
            conversationId,
            receiverId,
            isTyping,
            username: selectedDialog?.participants.find(p => p.id === authorizedUserId)?.username
        })
    }

    const handleSend = async () => {
        if ((!input.trim() && !imageUrl) || !conversationId || isSending) return
        const text = input.trim()
        setInput('')
        setFile(null)
        setImageUrl(undefined)
        setShowEmojiPicker(false)

        if (isTypingRef.current) {
            isTypingRef.current = false
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
            emitTyping(false)
        }

        try {
            await sendMessage({ conversationId, text, image: imageUrl }).unwrap()
        } catch {
            antMessage.error('Failed to send message')
        }
    }

    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        return () => {
            if (isTypingRef.current) {
                emitTyping(false)
            }
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        }
    }, [conversationId])

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)

        if (!isTypingRef.current) {
            isTypingRef.current = true
            emitTyping(true)
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false
            emitTyping(false)
        }, 3000)
    }

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

    return (
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
                onChange={handleInputChange}
                onPressEnter={(e) => {
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault()
                        handleSend()
                    }
                }}
                autoSize={{ minRows: 1, maxRows: 4 }}
            />

            <Popover
                content={<EmojiPickerContent onEmojiSelect={handleEmojiSelect} />}
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
    )
}

export default MessagesInputArea
