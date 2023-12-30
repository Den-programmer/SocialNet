import React from 'react'
import Friend from './Friend/friend'
import { userType } from '../../../types/FriendsType/friendsType'
import classes from './friends.module.scss'

interface FriendsPropsType {
    friends: Array<userType>
}

const Friends:React.FC<FriendsPropsType> = (props) => {
    const friendsArray = []

    for (let i = 1; i <= props.friends.length; i++) {
        if (i <= 4) {
            friendsArray.push(props.friends[i - 1])
        }
    }

    const friends = friendsArray.map(f => {
        return <Friend id={f.id} key={f.id} username={f.username}  avatar={f.profile.photos.large ? f.profile.photos.large : f.profile.photos.small}/>
    })
    return (
        <div className={classes.friends}>
            {friends.length !== 0 && <div>{friends}</div>}
        </div>
    )
}

export default Friends