import { FC, useEffect, useState, useMemo } from 'react'
import classes from './avatar.module.scss'
import { contactsType } from '../../../../../types/ProfileTypes/profileTypes'

type BufferAvatar = {
  contentType: string
  data: { type: 'Buffer'; data: number[] }
}

type AvatarType = string | File | BufferAvatar | undefined

interface IUserAvatar {
  name: string | undefined
  avatar: AvatarType
  contacts: contactsType | undefined
}

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER || ''
const facebook = import.meta.env.VITE_CLOUDINARY_FACEBOOK || ''
const twitter = import.meta.env.VITE_CLOUDINARY_X || ''
const youtube = import.meta.env.VITE_CLOUDINARY_YOUTUBE || ''

type ResolvedImage = { url: string; revoke?: () => void }

const bufferToUrl = (input: { type: 'Buffer'; data: number[] }, contentType: string): ResolvedImage => {
  const byteArray = new Uint8Array(input.data)
  const blob = new Blob([byteArray], { type: contentType })
  const url = URL.createObjectURL(blob)
  return {
    url,
    revoke: () => URL.revokeObjectURL(url)
  }
}

const resolveImage = (img: AvatarType, fallback: string): ResolvedImage => {
  if (typeof img === 'string') return { url: img }
  if (img instanceof File) {
    const url = URL.createObjectURL(img)
    return { url, revoke: () => URL.revokeObjectURL(url) }
  }
  if (img && 'data' in img && Array.isArray(img.data.data)) {
    return bufferToUrl(img.data, img.contentType)
  }
  return { url: fallback }
}

const Avatar: FC<IUserAvatar> = ({ name, avatar, contacts }) => {
  const [imageUrl, setImageUrl] = useState(defaultUserPhoto)

  useEffect(() => {
    const result = resolveImage(avatar, defaultUserPhoto)
    setImageUrl(result.url)

    return () => result.revoke?.()
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