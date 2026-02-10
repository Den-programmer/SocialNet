import React, { useState, MouseEvent, useEffect, useRef } from 'react'
import './user.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { bufferToUrl, scrollToTop } from '../../../../../../../utils/helpers/functions/function-helpers'
import { addToBlacklist } from '../../../../../../../BLL/reducer-friends'
import { useAddNotificationMutation } from '../../../../../../../DAL/notificationApi'
import { setUserDialogId } from '../../../../../../../BLL/reducer-messages'
import { useStartDialogMutation } from '../../../../../../../DAL/graphQL/graphqlApi'
import { useAppDispatch } from '../../../../../../../hooks/hooks'

interface IUser {
  followed: boolean
  followingInProcess: Array<string>
  username: string
  id: string
  photo: string | File
  followThunk: (userId: string) => void
  unfollowThunk: (userId: string) => void
}

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER || ''

const User: React.FC<IUser> = ({
  followed,
  followingInProcess,
  username,
  id,
  photo,
  followThunk,
  unfollowThunk
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState({ top: '0px', left: '0px' })

  const [imageUrl, setImageUrl] = useState<string>(photo || defaultUserPhoto)

  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [createNotification] = useAddNotificationMutation()
  const [startDialog] = useStartDialogMutation()

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMenuStyle({ top: `${e.clientY}px`, left: `${e.clientX}px` })
    setIsMenuOpen(true)
  }

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect()
      let top = menuRect.top
      let left = menuRect.left

      if (menuRect.right > window.innerWidth) {
        left = window.innerWidth - menuRect.width
      }
      if (menuRect.bottom > window.innerHeight) {
        top = window.innerHeight - menuRect.height
      }

      setMenuStyle({ top: `${top}px`, left: `${left}px` })
    }
  }, [isMenuOpen])

  useEffect(() => {
    const closeMenu = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChat = async () => {
    try {
      const res = await startDialog(id).unwrap()
      if (!res) {
        console.error('Failed to start dialog: response is null')
        return
      }
      const dialogId = res[1]._id
      dispatch(setUserDialogId(dialogId))
      setIsMenuOpen(false)
      navigate('/Messages')
    } catch (err) {
      console.error('Failed to make a chat.', err)
    }
  }

  const handleFollow = () => {
    if (!followed) {
      followThunk(id)
      createNotification({ title: "You've got a new friend!", pageUrl: '/Friends', itemType: 'Friends' })
    } else {
      unfollowThunk(id)
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    let objectUrl: string | null = null

    if (photo instanceof File) {
      objectUrl = URL.createObjectURL(photo)
      setImageUrl(objectUrl)

    } else if (typeof photo === 'string') {
      setImageUrl(photo)

     // @ts-ignore
    } else if (photo?.data && photo?.contentType) {
      // @ts-ignore
      const result = bufferToUrl(photo, photo.contentType)
      objectUrl = result.url
      setImageUrl(result.url)
    }

    // Fallback
    else {
      setImageUrl(defaultUserPhoto)
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [photo])

  return (
    <div className="user" onClick={() => setTimeout(scrollToTop, 250)} onContextMenu={handleContextMenu}>
      <NavLink to={`/Profile/${id}`}>
        <img className="avatar" src={imageUrl} alt="User avatar" />
        <h3 className="user-name">{username}</h3>
      </NavLink>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="contextMenu"
          style={{ ...menuStyle, position: 'fixed' }}
        >
          <ul className="contextMenu__list">
            <li onClick={handleChat} className="contextMenu__list-item">Write a message</li>
            <li onClick={handleFollow} className="contextMenu__list-item">
              {followed ? 'Unfollow' : 'Follow'}
            </li>
            <li
              className="contextMenu__list-item"
              onClick={() => {
                dispatch(addToBlacklist(id))
                setIsMenuOpen(false)
              }}
            >
              To blacklist
            </li>
          </ul>
        </div>
      )}

      <Button
        className="followBtn"
        type={followed ? 'primary' : 'default'}
        loading={followingInProcess.includes(id)}
        onClick={handleFollow}
        block
      >
        {followed ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  )
}

export default User