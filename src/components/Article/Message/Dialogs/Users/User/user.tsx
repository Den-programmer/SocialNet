import React from 'react'
import classes from './user.module.css'
import { NavLink } from 'react-router-dom'

interface UserPropType {
    id: number
    photo: string
    hasNewMessages: boolean
    lastDialogActivity: string
    lastUserActivityDate: string
    newMessagesCount: number
    userName: string
    lastMessage: string | null | undefined
}

const User: React.FC<UserPropType> = (props) => {

    const path = "/Messages/dialog/" + props.id

    return (
        <NavLink to={path}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    <img src={props.photo} alt="user" />
                </div>
                <div className={classes.userInf}>
                    <h3 className={classes.userName}>{props.userName}</h3>
                    <p className={classes.lastMessage}>{props.lastMessage}</p>
                </div>
            </div>
        </NavLink>
    )
}


export default User