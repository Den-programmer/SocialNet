import React from 'react'
import classes from './user.module.scss'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

interface UserPropType {
    id: number
    userDialogId: number | null
    photo: string
    hasNewMessages: boolean
    lastDialogActivity: string
    lastUserActivityDate: string
    newMessagesCount: number
    userName: string
    isActive: boolean
    lastMessage: string | null | undefined
    setUserDialogId: (userId: number) => void
    getDialogMessages: (userId: number) => void
    setUserActiveStatus: (userId: number) => void
}

const User: React.FC<UserPropType> = (props) => {
    const path = `/Messages/dialog/${props.id}`

    const getUserMessages = () => {
        props.setUserDialogId(props.id)
        props.getDialogMessages(props.id)
        props.setUserActiveStatus(props.id)
    }

    return (
        <NavLink className={classes.userContainer} onClick={getUserMessages} to={path}>
            <div className={props.isActive ? classes.userActive : classes.user}>
                <Avatar className={classes.avatar} alt="user" src={props.photo}/>
                <div className={classes.userInf}>
                    <h3 className={classes.userName}>{props.userName}</h3>
                    <p className={classes.lastMessage}>{props.lastMessage ? props.lastMessage : 'Be the first to write if you want'}</p>
                </div>
            </div>
        </NavLink>
    )
}


export default User