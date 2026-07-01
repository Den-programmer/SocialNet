import classes from '../messages.module.scss'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { MessageType, userDialogType } from '../../../../types/MessagesTypes/messagesTypes'
import NoMessages from './noMessages/noMessages'
import NoConversation from './noConversation/noConversation'
import MessageFragment from './messageFragment/messageFragment'
import MessagesHeader from './MessagesHeader/messageHeader'
import MessagesInputArea from './MessagesInputArea/messagesInputArea'
import { socketService } from '../../../../DAL/socket'

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
   
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [typingUser, setTypingUser] = useState<string | null>(null)

    useEffect(() => {
        if (!userDialogId) return

        const handleUserTyping = (data: { userId: string; username: string; conversationId: string; isTyping: boolean }) => {
            if (data.conversationId === userDialogId && data.userId !== authorizedUserId) {
                setTypingUser(data.isTyping ? data.username : null)
            }
        }

        const removeReadySubscription = socketService.onSocketAvailable((socket) => {
            socket.on('userTyping', handleUserTyping)
        })

        return () => {
            removeReadySubscription()
            socketService.socket?.off('userTyping', handleUserTyping)
            setTypingUser(null)
        }
    }, [userDialogId, authorizedUserId])

    

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    // Generate message nodes with clustering and date separators

    const messageNodes = messages.map((msg: MessageType, idx: number) => {
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

        return <MessageFragment
            key={msg.id}
            userDialogId={userDialogId}
            msg={msg}
            idx={idx}
            isOwn={isOwn}
            isTemp={isTemp}
            isClustered={isClustered}
            isLastInCluster={isLastInCluster}
            showDateSeparator={showDateSeparator}
            formattedDate={formattedDate}
            setLightboxImage={setLightboxImage}
        />
    })

    return (
        < div className={`${classes.messagesSection} ${mobileShowChat ? classes.messagesSectionVisible : ''}`
        }>
            {!userDialogId ? <NoConversation /> : (
                <>
                    <MessagesHeader selectedDialog={selectedDialog} 
                    authorizedUserId={authorizedUserId} 
                    setMobileShowChat={setMobileShowChat} />

                    {/* Message list */}
                    <div className={classes.messagesContainer}>
                        {messagesLoading ? (
                            <div className={classes.loadingContainer}><Spin /></div>
                        ) : messages.length > 0 ? messageNodes : <NoMessages />}
                        {typingUser && (
                            <div className={classes.typingIndicator}>
                                {typingUser} is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} className={classes.scrollAnchor} />
                    </div>
                    
                    <MessagesInputArea 
                        conversationId={userDialogId} 
                        selectedDialog={selectedDialog}
                        authorizedUserId={authorizedUserId}
                    />
                </>
            )}
        </div >
    )
}

export default MessagesPanel 
