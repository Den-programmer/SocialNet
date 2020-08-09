import React, { useState, MouseEvent } from 'react'
import classes from './user.module.css'
import defaultUserPhoto from './img/defaultUserPhoto.jpg'
import { NavLink } from 'react-router-dom'

interface IUser {
    followed: boolean
    followingInProcess: Array<number>
    nickname: string
    name: string
    id: number
    photo: any
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
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
    document.addEventListener('click', event => {
        if(event.button !== 2) {
            setIsMenuOpenStatus(false)
        }
    })
    return (
        <div className={classes.user} onContextMenu={callContextMenu}>
            <NavLink to={"/Profile/" + props.id}>
                {props.photo ? <img src={props.photo} alt="" /> : <img src={defaultUserPhoto} alt="" />}
                <h4>{props.nickname}</h4>
                <h6>{props.name}</h6>
            </NavLink>
            {isMenuOpen && <div style={styleMenu} className={classes.contextMenu}>
                <ul className={classes.list}>
                    <li>Write the message</li>
                    <li>Follow</li>
                    <li>Unfollow</li>
                </ul>
            </div>}
            {props.followed ? <button className={classes.btn_following} disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Add this user to list of friends!">Following</button> 
            : 
            <button className={classes.btn_unfollow} disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Delete this user from your list of friends!">Unfollow</button>}
        </div>
    )
}

export default User