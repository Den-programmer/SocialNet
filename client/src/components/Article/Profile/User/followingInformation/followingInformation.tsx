import React from 'react'
import classes from './followingInformation.module.scss'
import { userType } from '../../../../../types/FriendsType/friendsType'
import { useGetIsUserFollowedQuery } from '../../../../../DAL/usersApi'
import { useAppSelector } from '../../../../../hooks/hooks'
import { selectPosts } from '../../../../../BLL/selectors/profile-selectors'
import { useParams } from 'react-router-dom'

interface IFollowingInformation {
    authorizedUserId: string
    friends: Array<userType>
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

const FollowingInformation: React.FC<IFollowingInformation> = (props) => {
    const { userId } = useParams<{ userId: string }>()
    const { data: followed } = useGetIsUserFollowedQuery(userId || props.authorizedUserId, { skip: !userId }) // Followed can be undefined!

    const following = () => {
        if (followed) {
            props.unfollow(userId || "")
        } else {
            props.follow(userId || "")
        }
    }

    const posts = useAppSelector(selectPosts)

    return (
        <div className={classes.followingBlock}>
            <div className={classes.followingContainer}>
                <div className={classes.mainFollowingInf}>
                    <div className={classes.infBlock}>
                        <h3>Posts</h3>
                        <p>{posts?.length}</p>
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
                    {userId || "" === props.authorizedUserId ? (
                        followed ? (
                            <button onClick={following} className={classes.unfollowingButton}>
                                Unfollow
                            </button>
                        ) : (
                            <button onClick={following} className={classes.followingButton}>
                                Follow
                            </button>
                        )
                    ) : (
                        <div className={classes.horizontal_line}></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FollowingInformation