import React, { useState, MouseEvent } from 'react'
import classes from './user.module.scss'
import defaultUserPhoto from './img/defaultUserPhoto.jpg'
import { NavLink, Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'

interface IUser {
    followed: boolean
    followingInProcess: Array<number>
    username: string
    id: any
    photo: string | File
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    startDialog: (userId: number) => void
    addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    addToBlacklist: (itemId: number) => void
}

type MenuStyleType = {
    top: string
    left: string
} 

const User: React.FC<IUser> = (props) => {
    const [isMenuOpen, setIsMenuOpenStatus] = useState<boolean>(false)
    const [styleMenu, setStyleMenu]= useState<MenuStyleType>({ top: 0 + 'px', left: 0 + 'px' })
    const following = () => {
        if (props.followed === false) {
            props.followThunk(props.id)
            props.addNotification('You\'ve got a new friend!', '/Friends', 'Friends')
        } else {
            props.unfollowThunk(props.id)
        }    
    }
    const callContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        setIsMenuOpenStatus(true) 
        const realHigh = e.clientY 
        const realWidth = e.clientX 
        setStyleMenu({ top: realHigh + 'px', left: realWidth + 'px' })
        e.preventDefault()
    }

    const startChatting = () => {
        props.startDialog(props.id)
        return <Redirect to={"/Messages/dialog/" + props.id}/>
    }

    document.addEventListener('click', event => {
        if(event.button !== 2) {
            setIsMenuOpenStatus(false)
        }
    })
    const imageUrl = typeof props.photo === 'string'
        ? props.photo
        : props.photo instanceof File
            ? URL.createObjectURL(props.photo)
            // @ts-ignore
            : props.photo.data && props.photo.contentType
            // @ts-ignore
                ? `data:${props.photo.contentType};base64,${Buffer.from(props.photo.data).toString('base64')}`
                : defaultUserPhoto
    return (
        <div className={classes.user} onContextMenu={callContextMenu}>
            <NavLink to={"/Profile/" + props.id}>
                {props.photo ? <img className={classes.avatar} src={imageUrl} alt="" /> : <img className={classes.avatar} src={defaultUserPhoto} alt="" />}
                <h3 className={classes.userName}>{props.username}</h3>
            </NavLink>
            {isMenuOpen && <div className={classes.menuWrapper}>
                <div style={styleMenu} className="contextMenu">
                <ul className="contextMenu__list">
                    <li onClick={startChatting} className="contextMenu__list-item">Write the message</li>
                    <li className="contextMenu__list-item">Follow</li>
                    <li className="contextMenu__list-item">Unfollow</li>
                    <li className="contextMenu__list-item" onClick={() => props.addToBlacklist(props.id)}>To black list</li>
                </ul>
            </div>    
            </div>}
            {!props.followed ? <Button className={classes.followBtn} variant="contained" color="default" disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Add this user to list of friends!">Following</Button> 
            : 
            <Button className={classes.followBtn} variant="contained" color="primary" disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Delete this user from your list of friends!">Unfollow</Button>}
        </div>
    )
}

export default User