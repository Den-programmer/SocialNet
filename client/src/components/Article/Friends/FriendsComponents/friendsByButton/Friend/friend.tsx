import React from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Button, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import classes from './friend.module.scss'
import defaultUserPhoto from './img/defaultUserPhoto.webp'

interface IFriend {
  id: string
  avatar: string | File
  username: string
  followed: boolean
  follow: (userId: string) => void
  unfollow: (userId: string) => void
}

const Friend: React.FC<IFriend> = ({ id, avatar, username, followed, follow, unfollow }) => {
  const handleToggleFollow = () => {
    followed ? unfollow(id) : follow(id)
  }

  const getImageUrl = (): string => {
    if (typeof avatar === 'string') return avatar
    if (avatar instanceof File) return URL.createObjectURL(avatar)
    // @ts-ignore
    if (avatar?.data && avatar?.contentType) {
      // @ts-ignore
      return `data:${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`
    }
    return defaultUserPhoto
  }

  return (
    <Card className={classes.card}>
      <div className={classes.user}>
        <NavLink to={`/Profile/${id}`} className={classes.navLink}>
          <Avatar
            size={100}
            src={getImageUrl()}
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