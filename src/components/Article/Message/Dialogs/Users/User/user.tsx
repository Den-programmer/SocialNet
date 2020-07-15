import React from 'react'
import classes from './user.module.css'
import { NavLink } from 'react-router-dom'

interface UserPropType {
    id: number
    avatar: string
    nickname: string
    lastMessage: string
}

const User:React.FC<UserPropType> = ({id, avatar, nickname, lastMessage}) => {

    let path = "/Messages/dialog" + id;

    return (
        <NavLink to={path}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    <img src={avatar} alt="user" />
                </div>
                <div className={classes.userInf}>
                    <h3 className={classes.userName}>{nickname}</h3>
                    <p className={classes.lastMessage}>{lastMessage}</p>
                </div>
            </div>
        </NavLink>
    )
}


export default User