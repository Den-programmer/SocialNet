import { FC, useEffect, useState, useMemo } from 'react'
import classes from './avatar.module.scss'
import { contactsType } from '../../../../../types/ProfileTypes/profileTypes'

type AvatarType = string | File | undefined

interface IUserAvatar {
  name: string | undefined
  avatar: AvatarType
  contacts: contactsType | undefined
}

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER || ''
const facebook = import.meta.env.VITE_CLOUDINARY_FACEBOOK || ''
const twitter = import.meta.env.VITE_CLOUDINARY_X || ''
const youtube = import.meta.env.VITE_CLOUDINARY_YOUTUBE || ''

const Avatar: FC<IUserAvatar> = ({ name, avatar, contacts }) => {
  const [imageUrl, setImageUrl] = useState(defaultUserPhoto)

  useEffect(() => {
    let objectUrl: string | null = null

    if (typeof avatar === 'string' && avatar) {
      setImageUrl(avatar)
    } else if (avatar instanceof File) {
      objectUrl = URL.createObjectURL(avatar)
      setImageUrl(objectUrl)
    } else {
      setImageUrl(defaultUserPhoto)
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
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
          src={imageUrl || defaultUserPhoto}
          alt='avatar'
          onError={e => {
            e.currentTarget.onerror = null
            e.currentTarget.src = defaultUserPhoto
          }}
        />
        <div className={classes.userInf}>
          <div className={classes.name}>
            <h2>{name}</h2>
          </div>
          <div className={classes.horizontal_line} />
          <div className={classes.socialPanel}>{socials}</div>
        </div>
      </div>
    </div>
  )
}

export default Avatar