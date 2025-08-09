import React from 'react'
import Avatar from './Avatar/avatar'
import FollowingInformation from './followingInformation/followingInformation'
import { IProfile } from '../profile'
import { contactsType } from '../../../../types/ProfileTypes/profileTypes'
import { Grid } from 'antd'
import classes from './user.module.scss'

interface IUser extends IProfile {
  contacts: contactsType | undefined
}

const { useBreakpoint } = Grid

const defaultBackground = import.meta.env.VITE_CLOUDINARY_DEFAULT_BACKGROUND

const User: React.FC<IUser> = ({
  contacts,
  profile,
  background,
  username,
  follow,
  unfollow,
  authorizedUserId,
  friends
}) => {
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const style: React.CSSProperties = {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'space-between',
    backgroundImage: `url(${background || defaultBackground})`,
  }

  return (
    <div className={classes.user} style={style}>
      <Avatar
        contacts={contacts}
        avatar={profile?.photos?.large}
        name={username}
      />
      <FollowingInformation
        follow={follow}
        unfollow={unfollow}
        authorizedUserId={authorizedUserId}
        friends={friends}
      />
    </div>
  )
}

export default User