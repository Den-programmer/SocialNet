import React from 'react'
import Friend from './Friend/friend'
import classes from './friends.module.scss'
import { useAppSelector } from '../../../hooks/hooks'
import { selectFriends } from '../../../BLL/selectors/users-selectors'

const Friends:React.FC = () => {
    const friendsArray = []
    const friendsData = useAppSelector(selectFriends)

    for (let i = 1; i <= friendsData.length; i++) {
        if (i <= 4) {
            friendsArray.push(friendsData[i - 1])
        }
    }

    const friends = friendsArray.map(f => {
        return <Friend id={f.id} key={f.id} 
        username={f.username}  
        avatar={f.profile?.photos?.large || f.profile?.photos?.small}
        />
    })
    return (
        <div className={classes.friends}>
            {friends.length !== 0 && <div>{friends}</div>}
        </div>
    )
}

export default Friends