import React from 'react'
import classes from './users.module.css'
import User from './User/user'
import user from './User/images/user.jpg'
import { userDialogType } from '../../../../../types/MessagesTypes/messagesTypes'

interface UsersPropType {
    dialogsData: Array<userDialogType>
}

const Users: React.FC<UsersPropType> = ({dialogsData}) => {
    const dialogs = dialogsData.map((d: userDialogType) => {
        return <User key={d.id} avatar={user} id={d.id} nickname={d.nickname} lastMessage={d.lastMessage}/>
    })
    return (
        <div className={classes.users}>
            {dialogs}
        </div>
    )
} 

export default Users

