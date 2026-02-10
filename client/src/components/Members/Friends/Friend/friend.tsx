import React, { useEffect, useState } from 'react'
import classes from './friend.module.scss'
import { NavLink } from 'react-router-dom'

interface FriendPropsType {
    avatar: string | File
    username: string
    id: string
}

const defaultUser = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER

const Friend: React.FC<FriendPropsType> = ({ avatar, username, id }) => {
    const [imageUrl, setImageUrl] = useState(defaultUser)

    useEffect(() => {
        let objectUrl: string | null = null

        if (typeof avatar === 'string') {
            setImageUrl(avatar)

        } else if (avatar instanceof File) {
            objectUrl = URL.createObjectURL(avatar)
            setImageUrl(objectUrl)

        } else if (
            avatar &&
            typeof avatar === 'object' &&
            // @ts-ignore
            avatar.data &&
            // @ts-ignore
            avatar.contentType
        ) {
            
            setImageUrl(
                // @ts-ignore
                `data:${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`
            )

        } else {
            setImageUrl(defaultUser)
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl)
        }
    }, [avatar])

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