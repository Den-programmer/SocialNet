import React, { useState, MouseEvent, useEffect, useRef } from 'react'
import './user.scss'
import defaultUserPhoto from './img/defaultUserPhoto.webp'
import { NavLink, Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { scrollToTop } from '../../../../../../../utils/helpers/functions/function-helpers'

interface IUser {
    followed: boolean
    followingInProcess: Array<string>
    username: string
    id: string
    photo: string | File
    followThunk: (userId: string) => void
    unfollowThunk: (userId: string) => void
    startDialog: (userId: string) => void
    createNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    addToBlacklist: (itemId: string) => void
}

const User: React.FC<IUser> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuStyle, setMenuStyle] = useState({ top: '0px', left: '0px' })
    const menuRef = useRef<HTMLDivElement>(null)

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        let posX = e.clientX
        let posY = e.clientY
        setMenuStyle({ top: posY + 'px', left: posX + 'px' })
        setIsMenuOpen(true)
    };

    useEffect(() => {
        if (isMenuOpen && menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect()
            let { top, left } = menuRect
            const overflowRight = (menuRect.right > window.innerWidth)
            const overflowBottom = (menuRect.bottom > window.innerHeight)

            if (overflowRight) {
                left = window.innerWidth - menuRect.width
            }
            if (overflowBottom) {
                top = window.innerHeight - menuRect.height
            }
            setMenuStyle({ top: top + 'px', left: left + 'px' })
        }
    }, [isMenuOpen])

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsMenuOpen(false)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleChat = () => {
        props.startDialog(props.id)
        return <Redirect to={`/Messages/dialog/${props.id}`} />
    }

    const handleFollow = () => {
        if (!props.followed) {
            props.followThunk(props.id)
            props.createNotification("You've got a new friend!", '/Friends', 'Friends')
        } else {
            props.unfollowThunk(props.id)
        }
    }

    const imageUrl = typeof props.photo === 'string'
        ? props.photo
        : props.photo instanceof File
            ? URL.createObjectURL(props.photo)
            : defaultUserPhoto

    return (
        <div className="user" onClick={() => setTimeout(scrollToTop, 250)} onContextMenu={handleContextMenu}>
            <NavLink to={`/Profile/${props.id}`}>
                <img className="avatar" src={imageUrl} alt="User avatar" />
                <h3 className="user-name">{props.username}</h3>
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
                            {props.followed ? 'Unfollow' : 'Follow'}
                        </li>
                        <li 
                            className="contextMenu__list-item" 
                            onClick={() => props.addToBlacklist(props.id)}
                        >
                            To blacklist
                        </li>
                    </ul>
                </div>
            )}
            <Button 
                className="followBtn" 
                variant="contained" 
                color={props.followed ? "primary" : "default"} 
                disabled={props.followingInProcess.includes(props.id)} 
                onClick={handleFollow}
            >
                {props.followed ? 'Unfollow' : 'Follow'}
            </Button>
        </div>
    )
}

export default User