import React from 'react'
import classes from './friend.module.scss'
import { NavLink } from 'react-router-dom'

interface FriendPropsType {
    avatar: string | File   
    username: string
    id: string
}

const defaultUser = process.env.REACT_APP_CLOUDINARY_DEFAULT_USER

const Friend:React.FC<FriendPropsType> = ({avatar, username, id}) => {
    const imageUrl = typeof avatar === 'string'
        ? avatar
        : avatar instanceof File
            ? URL.createObjectURL(avatar)
            // @ts-ignore
            : avatar.data && avatar.contentType
            // @ts-ignore
                ? `data:${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`
                : defaultUser
    return (
        <div className={classes.friend}>
            <NavLink className={classes.friendLink} to={`/Profile/${id}`}>
                <img className={classes.avatar} src={imageUrl} alt="" />
                <h6 className={classes.userName}>
                    {username}
                </h6>
            </NavLink>
        </div>
    )
}

export default Friend