import React from 'react'
import classes from './friendsNav.module.css'
import { createFriendsNavBtn } from '../../../../utils/helpers/functions/function-helpers'

interface IFriendsNav {  }

const FriendsNav: React.FC<IFriendsNav> = (props) => {
    return (
        <div className={classes.friendsButtons}>
            <div className={classes.btn_friends}>
                {createFriendsNavBtn("Here's your friends!", "/Friends/DataFriends", "Friends")}
            </div>
            <div className={classes.btn_findFriends}>
                {createFriendsNavBtn("You can find new friend here!", "/Friends/FindUsers", "Find Friends")}
            </div>
        </div>
    )
}

export default FriendsNav