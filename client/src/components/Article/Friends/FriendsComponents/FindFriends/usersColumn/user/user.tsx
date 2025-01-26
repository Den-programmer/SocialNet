import React, { useState, MouseEvent } from 'react'
import './user.scss'
import defaultUserPhoto from './img/defaultUserPhoto.jpg'
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

// type MenuStyleType = {
//     top: string
//     left: string
// } 

const User: React.FC<IUser> = (props) => {
    // const [isMenuOpen, setIsMenuOpenStatus] = useState<boolean>(false)
    // const [styleMenu, setStyleMenu]= useState<MenuStyleType>({ top: 0 + 'px', left: 0 + 'px' })
    const following = () => {
        if (props.followed === false) {
            props.followThunk(props.id)
            props.createNotification('You\'ve got a new friend!', '/Friends', 'Friends')
        } else {
            props.unfollowThunk(props.id)
        }    
    }
    // const callContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    //     setIsMenuOpenStatus(true) 
    //     const realHigh = e.clientY 
    //     const realWidth = e.clientX 
    //     setStyleMenu({ top: realHigh + 'px', left: realWidth + 'px' })
    //     e.preventDefault()
    // }

    // const startChatting = () => {
    //     props.startDialog(props.id)
    //     return <Redirect to={"/Messages/dialog/" + props.id}/>
    // }

    // document.addEventListener('click', event => {
    //     if(event.button !== 2) {
    //         setIsMenuOpenStatus(false)
    //     }
    // })
    const userHandleClick = () => setTimeout(() => scrollToTop(), 250)
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
        <div className="user" onClick={userHandleClick}>
            <NavLink to={"/Profile/" + props.id}>
                {props.photo ? <img className="avatar" src={imageUrl} alt="" /> : <img className="avatar" src={defaultUserPhoto} alt="" />}
                <h3 className="user-name">{props.username}</h3>
            </NavLink>
            {/* {isMenuOpen && <div className="user-grid__menuWrapper">
                <div style={styleMenu} className="contextMenu">
                <ul className="contextMenu__list">
                    <li onClick={startChatting} className="contextMenu__list-item">Write the message</li>
                    <li className="contextMenu__list-item">Follow</li>
                    <li className="contextMenu__list-item">Unfollow</li>
                    <li className="contextMenu__list-item" onClick={() => props.addToBlacklist(props.id)}>To black list</li>
                </ul>
            </div>    
            </div>} */}
            {!props.followed ? <Button className="followBtn" variant="contained" color="default" disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Add this user to list of friends!">Following</Button> 
            : 
            <Button className="followBtn" variant="contained" color="primary" disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Delete this user from your list of friends!">Unfollow</Button>}
        </div>
    )
}

export default User