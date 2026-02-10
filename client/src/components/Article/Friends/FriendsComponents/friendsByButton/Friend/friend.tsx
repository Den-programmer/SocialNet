import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Button, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import classes from './friend.module.scss'

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER || ''

interface IFriend {
  id: string
  avatar: string | File
  username: string
  followed: boolean
  follow: (userId: string) => void
  unfollow: (userId: string) => void
}

const Friend: React.FC<IFriend> = ({ id, avatar, username, followed, follow, unfollow }) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultUserPhoto)

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
      'data' in avatar &&
       // @ts-ignore
      Array.isArray(avatar.data)
    ) {
      // @ts-ignore
      setImageUrl(`data:${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`)
    } else {
      setImageUrl(defaultUserPhoto)
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [avatar])

  const handleToggleFollow = () => {
    followed ? unfollow(id) : follow(id)
  }

  return (
    <Card className={classes.card}>
      <div className={classes.user}>
        <NavLink to={`/Profile/${id}`} className={classes.navLink}>
          <Avatar
            size={100}
            src={imageUrl}
            icon={<UserOutlined />}
            className={classes.avatar}
          />
          <h5 className={classes.userName}>{username}</h5>
        </NavLink>
        <Button type={followed ? 'default' : 'primary'} onClick={handleToggleFollow}>
          {followed ? 'Following' : 'Follow'}
        </Button>
      </div>
    </Card>
  )
}

export default Friend
