import { FC, useMemo } from 'react'
import classes from './avatar.module.scss'
import { contactsType } from '../../../../../types/ProfileTypes/profileTypes'
import { bufferToUrl } from '../../../../../utils/helpers/functions/function-helpers'

interface BufferAvatar {
  contentType: string
  data: {
    type: 'Buffer'
    data: number[]
  }
}

type AvatarType = string | File | BufferAvatar | undefined

interface IUserAvatar {
  name: string | undefined
  avatar: AvatarType
  contacts: contactsType | undefined
}

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER || null
const facebook = import.meta.env.VITE_CLOUDINARY_FACEBOOK || ''
const twitter = import.meta.env.VITE_CLOUDINARY_X || ''
const youtube = import.meta.env.VITE_CLOUDINARY_YOUTUBE || ''

const Avatar: FC<IUserAvatar> = ({ name, avatar, contacts }) => {
   const imageUrl = useMemo(() => {
    if (typeof avatar === 'string') return avatar
    if (avatar instanceof File) return URL.createObjectURL(avatar)

    if (
      avatar &&
      typeof avatar === 'object' &&
      'data' in avatar &&
      Array.isArray(avatar.data.data)
    ) {
      return bufferToUrl(avatar.data, avatar.contentType)
    }

    return defaultUserPhoto
  }, [avatar])
  
  const socials = useMemo(() => {
    const iconMap: Record<string, string> = { facebook, twitter, youtube }

    return Object.entries(contacts || {})
      .filter(([key, value]) => key in iconMap && !!value)
      .map(([key, value], index) => (
        <a key={index} href={value as string} target='_blank' rel='noopener noreferrer'>
          <div className={classes.social}>
            <img loading='lazy' src={iconMap[key]} alt={key} />
          </div>
        </a>
      ))
  }, [contacts])

  return (
    <div className={classes.avatarWrapper}>
      <div className={classes.avatar}>
        <img
          className={classes.userImg}
          src={imageUrl}
          alt='avatar'
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = defaultUserPhoto || ''
          }}
        />
        <div className={classes.userInf}>
          <div className={classes.name}>
            <h2>{name}</h2>
          </div>
          <div className={classes.horizontal_line} />
          <div className={classes.socialPanel}>
            {socials}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Avatar