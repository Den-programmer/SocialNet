import React from 'react'
import classes from './friends.module.css'
import Friend from './Friend/friend'
import defaultUser from './images/withoutAvatar/defaultUserPhoto.jpg'
import { NavLink } from 'react-router-dom'
import { userType } from '../../../types/FriendsType/friendsType'

interface FriendsPropsType {
    friends: Array<userType>
}

const Friends:React.FC<FriendsPropsType> = (props) => {
    let Friends = props.friends
    let friendsArray = []

    for (let i = 0; i < Friends.length; i++) {
        if (i <= 2) {
            friendsArray.push(Friends[i])
        }
    }

    let friends = friendsArray.map(f => {
        return <Friend id={f.id} key={f.id} name={f.name} nickname={f.nickname} avatar={f.photos.large ? f.photos.large : defaultUser}/>
    })
    return (
        <div className={classes.friends}>
            <div className={classes.title}>
                <NavLink className={classes.titleNavLink} to="/Friends/DataFriends"><h2>Friends</h2></NavLink> 
            </div>
            {friends.length !== 0 && <div className={classes.friendsList}>
                {friends}
            </div>}
        </div>
    )
}

export default Friends