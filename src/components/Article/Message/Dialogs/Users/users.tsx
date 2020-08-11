import React from 'react'
import classes from './users.module.css'
import User from './User/user'
import defaultUser from '../../../../Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { userDialogType } from '../../../../../types/MessagesTypes/messagesTypes'
import { NavLink } from 'react-router-dom'

interface UsersPropType {
    dialogsData: Array<userDialogType>
    userDialogId: number | null
    setUserDialogId: (userId: number) => void
    getDialogMessages: (userId: number) => void
}

const Users: React.FC<UsersPropType> = ({ dialogsData, setUserDialogId, getDialogMessages, userDialogId }) => {
    const dialogs = dialogsData.map((d: userDialogType) => {
        return <User userDialogId={userDialogId} key={d.id} photo={d.photos.large ? d.photos.large : d.photos.small ? d.photos.small : defaultUser} id={d.id}
            hasNewMessages={d.hasNewMessages}
            lastDialogActivity={d.lastDialogActivityDate}
            lastUserActivityDate={d.lastUserActivityDate}
            newMessagesCount={d.newMessagesCount}
            userName={d.userName}
            lastMessage={d.lastMessage} setUserDialogId={setUserDialogId}
            getDialogMessages={getDialogMessages} />
    })
    return (
        <div className={classes.users}>
            {dialogs.length === 0 ? <div className={classes.noDialogs}>
                <h3 className={classes.titleNoDialogs}>You have no dialogs yet!</h3>
                <div className={classes.btn_findDialogs}>
                    <NavLink to='/Friends/FindUsers'>Find dialogs</NavLink>
                </div>
            </div> : dialogs}
        </div>
    )
}

export default Users