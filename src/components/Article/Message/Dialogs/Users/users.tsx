import React from 'react'
import classes from './users.module.css'
import User from './User/user'
import defaultUser from '../../../../Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { userDialogType } from '../../../../../types/MessagesTypes/messagesTypes'

interface UsersPropType {
    dialogsData: Array<userDialogType>
}

const Users: React.FC<UsersPropType> = ({dialogsData}) => {
    const dialogs = dialogsData.map((d: userDialogType) => {
        return <User key={d.id} photo={d.photos.large ? d.photos.large : d.photos.small ? d.photos.small : defaultUser} id={d.id} 
                     hasNewMessages={d.hasNewMessages} 
                     lastDialogActivity={d.lastDialogActivityDate} 
                     lastUserActivityDate={d.lastUserActivityDate}
                     newMessagesCount={d.newMessagesCount}
                     userName={d.userName}
                     lastMessage={d.lastMessage}/>
    })
    return (
        <div className={classes.users}>
            {dialogs}
        </div>
    )
} 

export default Users