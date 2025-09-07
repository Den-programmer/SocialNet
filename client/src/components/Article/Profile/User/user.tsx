import React, { useMemo } from 'react'
import Avatar from './Avatar/avatar'
import FollowingInformation from './followingInformation/followingInformation'
import { IProfile } from '../profile'
import { contactsType } from '../../../../types/ProfileTypes/profileTypes'
import { Grid } from 'antd'
import classes from './user.module.scss'
import { bufferToUrl } from '../../../../utils/helpers/functions/function-helpers'

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

   const backgroundUrl = useMemo(() => {
      if (typeof background === 'string') return background
      if (
        background &&
        typeof background === 'object' &&
        'data' in background &&
        // @ts-ignore
        Array.isArray(background.data.data)
      ) {
        // @ts-ignore
        return bufferToUrl(background.data, background.contentType)
      }
    }, [background])

  const style: React.CSSProperties = {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'space-between',
    backgroundImage: `url(${backgroundUrl || defaultBackground})`,
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