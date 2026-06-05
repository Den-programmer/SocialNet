import React, { Fragment, useState } from 'react'
import classes from '../../messages.module.scss'
import { Avatar, Button, Tooltip } from 'antd'
import {
    UserOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import { MessageType } from '../../../../../types/MessagesTypes/messagesTypes'
import { useDeleteMessageMutation } from '../../../../../DAL/graphQL/graphqlApi'

interface MessageProps {
    msg: MessageType
    idx: number
    isOwn: boolean
    isTemp: boolean
    isClustered: boolean
    isLastInCluster: boolean
    showDateSeparator: boolean
    formattedDate: string
    userDialogId: string
    setLightboxImage: (url: string) => void
}

const MessageFragment: React.FC<MessageProps> = (props) => {
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null)

    const [deleteMessage] = useDeleteMessageMutation()

    const handleDeleteMessage = async (msg: MessageType) => {
        await deleteMessage({ messageId: msg.id, conversationId: props.userDialogId })
    }

    return (
        <Fragment key={props.msg.id || props.idx}>
            {props.showDateSeparator && (
                <div className={classes.dateSeparator}>
                    <span className={classes.dateSeparatorLabel}>{props.formattedDate}</span>
                </div>
            )}
            <div
                className={`${classes.messageBubble} ${props.isOwn ? classes.messageBubbleOwn : 
                    classes.messageBubbleOther} ${props.isClustered ? 
                        classes.messageBubbleClustered : ''}`}
                onMouseEnter={() => setHoveredMessageId(props.msg.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
            >
                <div
                    className={`${classes.messageWrapper} ${props.isOwn ? classes.messageWrapperOwn : classes.messageWrapperOther}`}
                >
                    {!props.isOwn && (
                        props.isLastInCluster ? (
                            <Avatar
                                size={32}
                                src={props.msg.sender?.photos?.small || undefined}
                                icon={<UserOutlined />}
                                className={classes.avatarPrimary}
                            />
                        ) : (
                            <div className={classes.avatarPlaceholder} />
                        )
                    )}

                    <div
                        className={`${classes.messageContent} ${props.isOwn ?
                             classes.messageContentOwn : classes.messageContentOther} ${props.isClustered ? 
                                (props.isOwn ? classes.messageContentOwnClustered : classes.messageContentOtherClustered) : ''} ${props.isTemp ? 
                                    classes.messageContentPending : ''}`}
                    >
                        {!props.isOwn && !props.isClustered && (
                            <div className={`${classes.messageSenderName} ${classes.messageSenderNameOther}`}>
                                {props.msg.sender?.username}
                            </div>
                        )}
                        {props.msg.text ? (
                            <div className={classes.messageText}>{props.msg.text}</div>
                        ) : !props.msg.image ? (
                            <div className={classes.emptyMessage}>[empty message]</div>
                        ) : null}
                        {props.msg.image && (
                            <div className={`${classes.messageImageWrapper} ${!props.msg.text ? classes.imageOnly : ''}`}>
                                <img
                                    src={props.msg.image}
                                    alt="attachment"
                                    className={`${classes.messageImage} ${!props.msg.text ? classes.messageImageOnly : ''}`}
                                    onClick={() => props.setLightboxImage(props.msg.image!)}
                                />
                            </div>
                        )}
                        {props.isLastInCluster && (
                            <div className={`${classes.messageTimestamp} ${props.isOwn ? classes.messageTimestampOwn : classes.messageTimestampOther}`}>
                                {props.isTemp ? '...' : new Date(props.msg.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        )}
                    </div>

                    {/* Delete button for own messages */}
                    {props.isOwn && !props.isTemp && hoveredMessageId === props.msg.id && (
                        <Tooltip title="Delete message">
                            <Button
                                type="text"
                                size="small"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                className={classes.deleteMessageButton}
                                onClick={() => handleDeleteMessage(props.msg)}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default MessageFragment