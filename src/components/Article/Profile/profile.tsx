import React from 'react'
import classes from './profile.module.css'
import User from './User/user'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { profileType, postType } from '../../../BLL/reducer-profile'
import { userType } from '../../../types/FriendsType/friendsType'

export interface IProfile {
    followed: boolean
    profile: profileType
    posts: Array<postType>
    friends: Array<userType>
    updateStatus: (status: string) => void
    getIsUserFollowed: (userId: number | null) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Profile: React.FC<IProfile> = (props) => {
    return(
        <div className={classes.profile}>
            <User follow={props.follow} unfollow={props.unfollow} followed={props.followed} getIsUserFollowed={props.getIsUserFollowed} updateStatus={props.updateStatus} profile={props.profile} posts={props.posts} friends={props.friends} biography={props.profile.aboutMe}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile