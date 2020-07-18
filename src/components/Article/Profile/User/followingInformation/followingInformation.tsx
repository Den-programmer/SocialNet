import React from 'react'
import classes from './followingInformation.module.css'
import { postType } from '../../../../../BLL/reducer-profile'
import { userType } from '../../../../../types/FriendsType/friendsType'

interface IFollowingInformation {
    posts: Array<postType>
    userId: number | null
    friends: Array<userType>
}

const FollowingInformation: React.FC<IFollowingInformation> = (props) => {
    return (
        <div className={classes.followingBlock}>
            <div className={classes.followingContainer}>
                <div className={classes.mainFollowingInf}>
                    <div className={classes.infBlock}>
                        <h3>Posts</h3>
                        <p>{props.posts.length}</p>
                    </div>
                    <div className={classes.infBlock}>
                        <h3>Followers</h3>
                        <p>123 thous.</p>
                    </div>
                    <div className={classes.infBlock}>
                        <h3>Following</h3>
                        <p>{props.friends.length}</p>
                    </div>
                </div>
                <div className={classes.btn_following}>
                    {props.userId !== 7149 ? <button>Follow/Unfollow</button> : <div className={classes.horizontal_line}></div>}
                </div>
            </div>
        </div>
    )
}

export default FollowingInformation