import React, { useEffect } from 'react'
import classes from './followingInformation.module.scss'
import { postType } from '../../../../../types/ProfileTypes/profileTypes'
import { userType } from '../../../../../types/FriendsType/friendsType'

interface IFollowingInformation {
    posts: Array<postType>
    userId: string
    authorizedUserId: string
    followed: boolean
    friends: Array<userType>
    getIsUserFollowed: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

const FollowingInformation: React.FC<IFollowingInformation> = (props) => {
    useEffect(() => {
        props.getIsUserFollowed(props.userId)
    })

    const following = () => {
        if(props.followed) {
            props.unfollow(props.userId)
        } else {
            props.follow(props.userId)
        }
    }

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
                    {props.userId !== props.authorizedUserId ? 
                    props.followed ? 
                    <button onClick={following} className={classes.followingButton}>Following</button> : 
                    <button onClick={following} className={classes.unfollowingButton}>Unfollow</button> : 
                    <div className={classes.horizontal_line}></div>}
                </div>
            </div>
        </div>
    )
}

export default FollowingInformation