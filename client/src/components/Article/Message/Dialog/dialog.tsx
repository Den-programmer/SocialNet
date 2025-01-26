import { message, userDialogType } from '../../../../types/MessagesTypes/messagesTypes'
import React from 'react'
import classes from './dialog.module.scss'
import Conversation from './Conversation/conversation'
import DialogForm from './dialogForm/dialogForm'
import { Avatar, IconButton } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import defaultUser from '../../Profile/images/withoutAvatar/defaultUserPhoto.jpg'

interface DialogPropsType {
    isUserProfileMenuOpen: boolean
    messages: Array<message>
    dialogsData: Array<userDialogType>
    sendMessage: (userId: string, message: string) => void
    setUserProfileMenuStatus: (status: boolean) => void
    userDialogId: string
}

const Dialog: React.FC<DialogPropsType> = ({ messages, sendMessage, dialogsData, setUserProfileMenuStatus, isUserProfileMenuOpen, userDialogId }) => {
    const Messages = messages.map((ms: message) => {
        return <Conversation key={ms.id} id={ms.id} messageText={ms.messageText} />
    })
    const currentUser = dialogsData.filter((item: userDialogType) => item.isActive && true).find((item: userDialogType) => item)
    const checkUserPhoto = currentUser?.photos.large ? currentUser?.photos.large : currentUser?.photos.small ?
        currentUser?.photos.small : defaultUser
    return (
        <div className={classes.dialog}>
            <div className={classes.dialog__header}>
                <div className={classes.dialog__header_profile}>
                    <Avatar alt="user"
                        src={checkUserPhoto} />
                    <h3 className={classes.dialog_userName}>{currentUser?.userName}</h3>
                </div>
                <div className={classes.dialog__header_panel}>
                    <IconButton onClick={() => setUserProfileMenuStatus(!isUserProfileMenuOpen)} color="inherit">
                        <InfoIcon className={classes.infoIcon} />
                    </IconButton>
                </div>
            </div>
            <div className={classes.dialogContent}>
                <div className={classes.userProfileContainer}>
                    <div className={classes.userProfile}>
                        <Avatar className={classes.avatar} alt="userProfile" src={checkUserPhoto} />
                        <h3 className={classes.avatarTitle}>{currentUser?.userName}</h3>
                    </div>
                </div>
                {Messages.length !== 0 ? <div className={classes.messages}>{Messages}</div>
                    : <h3 className={classes.titleNoMessages}>You have not corresponded with this user yet...</h3>}
            </div>
            <DialogForm sendMessage={sendMessage} userDialogId={userDialogId}/>
        </div>
    )
}

export default Dialog