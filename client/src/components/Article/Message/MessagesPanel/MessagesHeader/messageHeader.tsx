import React from 'react'
import classes from '../../messages.module.scss'
import { MessageParticipant, userDialogType } from '../../../../../types/MessagesTypes/messagesTypes'
import { Avatar, Button } from 'antd'
import {
    UserOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons'


interface IMessagesHeaderProps {
    selectedDialog: userDialogType | null
    authorizedUserId: string
    setMobileShowChat: (val: boolean) => void
}

const MessageHeader: React.FC<IMessagesHeaderProps> = (props) => {
    return (
        <div className={classes.messagesHeader}>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className={classes.mobileBackButton}
                onClick={() => props.setMobileShowChat(false)}
            />
            <div className={classes.userInfo}>
                <Avatar
                    size={40}
                    src={props.selectedDialog?.participants?.find((u: MessageParticipant) => u.id !== props.authorizedUserId)?.photos?.small || undefined}
                    icon={<UserOutlined />}
                    className={classes.avatarPrimary}
                />
                <div>
                    <div className={classes.userName}>
                        {props.selectedDialog?.participants?.find((u: MessageParticipant) => u.id !== props.authorizedUserId)?.username || 'Unknown'}
                    </div>
                </div>
            </div>
            <div className={classes.headerActions}>
                <Button type="text" shape="circle" icon={<UserOutlined />} />
            </div>
        </div>
    )
}

export default MessageHeader