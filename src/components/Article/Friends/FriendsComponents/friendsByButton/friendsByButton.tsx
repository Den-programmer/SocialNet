import React from 'react'
import classes from './friendsByButton.module.css'
import Friend from './Friend/friend'
import NoFriendsComponent from './NOfriendsComponent/NOfriendsComponent'
import { userType } from '../../../../../types/FriendsType/friendsType'

interface IFriendsByButton {
    friends: Array<userType>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

const FriendsByButton: React.FC<IFriendsByButton> = (props) => {
    const friends = props.friends.map((f: userType) => {
        return <Friend id={f.id} 
                       key={f.id} 
                       nickname={f.nickname} 
                       name={f.name} 
                       avatar={f.photos.large} 
                       followed={f.followed} 
                       follow={props.followThunk} 
                       unfollow={props.unfollowThunk}/>
    })
    return (
        <div className={classes.friends}>
            {friends.length !== 0 ? friends : <NoFriendsComponent />}
        </div>
    )
}

export default FriendsByButton