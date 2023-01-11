import React from 'react'
import classes from './users.module.scss'
import User from './User/user'
import defaultUser from '../../../../Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { userDialogType } from '../../../../../types/MessagesTypes/messagesTypes'
import NoDialogs from './NoDialogs/noDialogs'

interface UsersPropType {
    trim: string
    dialogsData: Array<userDialogType>
    userDialogId: number
    setUserDialogId: (userId: number) => void
    getDialogMessages: (userId: number) => void
    setUserActiveStatus: (userId: number) => void
}

const Users: React.FC<UsersPropType> = React.memo(({ dialogsData, setUserDialogId, getDialogMessages, userDialogId, setUserActiveStatus, trim }) => {
    function createDialogs(d: userDialogType) {
        return <User userDialogId={userDialogId} key={d.id} photo={d.photos.large ? d.photos.large : d.photos.small ? d.photos.small : defaultUser} id={d.id}
        hasNewMessages={d.hasNewMessages}
        lastDialogActivity={d.lastDialogActivityDate}
        lastUserActivityDate={d.lastUserActivityDate}
        newMessagesCount={d.newMessagesCount}
        userName={d.userName}
        isActive={d.isActive}
        lastMessage={d.lastMessage} setUserDialogId={setUserDialogId}
        getDialogMessages={getDialogMessages} setUserActiveStatus={setUserActiveStatus}/>
    }
    
    const dialogs = dialogsData.map((d: userDialogType) => createDialogs(d))
    const dialogsSorted = dialogsData.filter(item => item.userName.indexOf(trim) > -1 && true).map((d: userDialogType) => createDialogs(d))
    return (
        <div className={classes.users}>
            {trim !== '' ? dialogsSorted.length !== 0 ? dialogsSorted : <NoDialogs /> : dialogs.length === 0 ? <NoDialogs /> : dialogs}
        </div>
    )
})

export default Users