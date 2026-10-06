import React, { useRef, useState, useEffect, useCallback } from 'react'
import classes from '../../messages.module.scss'
import { Button, Tooltip, Popover, Modal, message as antMessage } from 'antd'
import {
    CloseOutlined,
    DeleteOutlined,
    FileImageOutlined,
    SmileOutlined,
    PictureOutlined,
    SendOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import Upload from 'antd/es/upload'
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
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
    const [showUploadDialog, setShowUploadDialog] = useState(false)
    const [showCaptionDialog, setShowCaptionDialog] = useState(false)

    const [sendMessage, { isLoading: isSending }] = useSendDialogMessagesMutation()

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isTypingRef = useRef(false)

    const handleBeforeUpload = (uploadedFile: File) => {
        if (!uploadedFile.type.startsWith('image/')) {
            antMessage.error('Please choose an image file')
            return Upload.LIST_IGNORE
        }

        if (uploadedFile.size > 10 * 1024 * 1024) {
            antMessage.error('Images must be smaller than 10 MB')
            return Upload.LIST_IGNORE
        }

        setFile(uploadedFile)
        setShowAttachmentMenu(false)
        setShowUploadDialog(false)
        return false
    }

    const handleEmojiSelect = (emoji: string) => {
        setInput((prev) => prev + emoji)
        inputRef.current?.focus()
    }

    const clearAttachment = () => {
        setFile(null)
        setImageUrl(undefined)
        setCaption('')
        setShowCaptionDialog(false)
    }

    const [input, setInput] = useState('')
    const [caption, setCaption] = useState('')
    const [imageUrl, setImageUrl] = useState<string>()
    const [isProcessingImage, setIsProcessingImage] = useState(false)

    const emitTyping = useCallback((isTyping: boolean) => {
        const receiverId = selectedDialog?.participants.find(p => p.id !== authorizedUserId)?.id
        if (!receiverId) return

        socketService.socket?.emit('typing', {
            conversationId,
            receiverId,
            isTyping,
            username: selectedDialog?.participants.find(p => p.id === authorizedUserId)?.username
        })
    }, [authorizedUserId, conversationId, selectedDialog])

    const handleSend = async () => {
        const text = imageUrl ? caption.trim() : input.trim()
        if ((!text && !imageUrl) || !conversationId || isSending || isProcessingImage) return

        if (isTypingRef.current) {
            isTypingRef.current = false
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
            emitTyping(false)
        }

        try {
            await sendMessage({ conversationId, text, image: imageUrl }).unwrap()
            setInput('')
            clearAttachment()
            setShowEmojiPicker(false)
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
    }, [conversationId, emitTyping])

    useEffect(() => {
        setInput('')
        clearAttachment()
        setShowEmojiPicker(false)
        setShowAttachmentMenu(false)
        setShowUploadDialog(false)
        setShowCaptionDialog(false)
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
        if (!file) {
            setIsProcessingImage(false)
            return
        }

        let cancelled = false
        setIsProcessingImage(true)
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
                    if (!cancelled) {
                        setImageUrl(e.target?.result as string)
                        setIsProcessingImage(false)
                        setShowCaptionDialog(true)
                    }
                }
                reader.readAsDataURL(compressed)
            } catch {
                if (!cancelled) {
                    antMessage.error('Failed to process image')
                    clearAttachment()
                    setIsProcessingImage(false)
                }
            }
        }
        processImage()
        return () => { cancelled = true }
    }, [file])

    return (
        <div className={classes.inputSection}>
            {imageUrl && (
                <div className={classes.imagePreviewCard}>
                    <div className={classes.imagePreview}>
                        <img src={imageUrl} alt="preview" className={classes.imagePreviewImg} />
                        <Button
                            className={classes.deleteImageButton}
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={clearAttachment}
                        />
                    </div>
                    <span className={classes.imageCaptionText}>{caption || 'No caption'}</span>
                </div>
            )}

            {!imageUrl && <TextArea
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
            />}

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

            <Popover
                trigger="click"
                open={showAttachmentMenu}
                onOpenChange={setShowAttachmentMenu}
                placement="topRight"
                content={<div className={classes.attachmentMenu}>
                    <button
                        type="button"
                        className={classes.attachmentOption}
                        onClick={() => {
                            setShowAttachmentMenu(false)
                            setShowUploadDialog(true)
                        }}
                    >
                        <FileImageOutlined />
                        <span>Upload photo</span>
                    </button>
                </div>}
            >
                <Tooltip title="Attach image">
                    <Button className={classes.uploadButton} shape="circle" icon={<PictureOutlined />} size="large" />
                </Tooltip>
            </Popover>

            <Tooltip title="Send (Ctrl+Enter)">
                <Button
                    className={classes.sendButton}
                    shape="circle"
                    type="primary"
                    icon={<SendOutlined />}
                    size="large"
                    loading={isSending || isProcessingImage}
                    onClick={handleSend}
                    disabled={(!input.trim() && !imageUrl) || isProcessingImage}
                />
            </Tooltip>

            <Modal
                open={showUploadDialog}
                onCancel={() => setShowUploadDialog(false)}
                footer={null}
                centered
                className={classes.uploadModal}
                closeIcon={<CloseOutlined />}
            >
                <div className={classes.uploadModalHeader}>
                    <span className={classes.uploadModalEyebrow}>ATTACHMENT</span>
                    <h3>Choose a photo</h3>
                    <p>Drop an image here or browse your device.</p>
                </div>
                <Upload.Dragger
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                    className={classes.uploadDropzone}
                >
                    <p className={classes.uploadDropzoneIcon}><PictureOutlined /></p>
                    <p className={classes.uploadDropzoneTitle}>Drag and drop a photo here</p>
                    <p className={classes.uploadDropzoneOr}>or</p>
                    <Button type="primary" icon={<UploadOutlined />}>Choose from device</Button>
                </Upload.Dragger>
            </Modal>

            <Modal
                open={showCaptionDialog && Boolean(imageUrl)}
                onCancel={clearAttachment}
                title="Add a caption"
                centered
                className={classes.captionModal}
                okText="Use photo"
                cancelText="Remove"
                onOk={() => setShowCaptionDialog(false)}
                okButtonProps={{ disabled: isProcessingImage }}
            >
                {imageUrl && <img src={imageUrl} alt="Selected attachment" className={classes.captionModalImage} />}
                <TextArea
                    autoFocus
                    className={classes.captionModalInput}
                    placeholder="Add a caption..."
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    maxLength={500}
                    showCount
                    autoSize={{ minRows: 2, maxRows: 5 }}
                />
            </Modal>
        </div>
    )
}

export default MessagesInputArea
