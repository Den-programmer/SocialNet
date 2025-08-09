import React, { useState, MouseEvent, useEffect, useRef } from 'react'
import './user.scss'
import defaultUserPhoto from './img/defaultUserPhoto.webp'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { scrollToTop } from '../../../../../../../utils/helpers/functions/function-helpers'
import { addToBlacklist } from '../../../../../../../BLL/reducer-friends'
import { useAddNotificationMutation } from '../../../../../../../DAL/notificationApi'

interface IUser {
  followed: boolean
  followingInProcess: Array<string>
  username: string
  id: string
  photo: string | File
  followThunk: (userId: string) => void
  unfollowThunk: (userId: string) => void
  // startDialog: (userId: string) => void
}

const User: React.FC<IUser> = ({
  followed,
  followingInProcess,
  username,
  id,
  photo,
  followThunk,
  unfollowThunk,
  // startDialog
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState({ top: '0px', left: '0px' })
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const [createNotification] = useAddNotificationMutation()

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

  const handleChat = () => {
    // startDialog(id)
    navigate(`/Messages/dialog/${id}`)
  }

  const handleFollow = () => {
    if (!followed) {
      followThunk(id)
      createNotification({title: "You've got a new friend!", pageUrl: '/Friends', itemType: 'Friends'})
    } else {
      unfollowThunk(id)
    }
  }

  const imageUrl =
    typeof photo === 'string'
      ? photo
      : photo instanceof File
        ? URL.createObjectURL(photo)
        : defaultUserPhoto

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
              onClick={() => addToBlacklist(id)}
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