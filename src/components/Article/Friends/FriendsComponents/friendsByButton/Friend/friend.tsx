import React from 'react'
import classes from './friend.module.css'
import defaultUserPhoto from './img/defaultUserPhoto.jpg'
import { NavLink } from 'react-router-dom'

interface IFriend {
    id: number
    avatar: string
    nickname: string
    name: string
    followed: boolean
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const Friend: React.FC<IFriend> = (props) => {
    let following = () => {
        if (props.followed === false) props.follow(props.id)
        props.unfollow(props.id)
    }
    return (
        <div className={classes.ObjectUser}>
            <div className={classes.user}>
                <NavLink to={"/Profile/" + props.id}>
                    {props.avatar ? <img src={props.avatar} alt="" /> : <img src={defaultUserPhoto} alt="" />}
                    <h5>{props.nickname ? props.nickname : props.name}</h5>
                </NavLink>
                <div className={classes.following}>
                    {props.followed ? <button onClick={following}>Followed</button> : <button onClick={following}>Follow</button>} 
                </div>
            </div>
        </div>
    )
}

export default Friend