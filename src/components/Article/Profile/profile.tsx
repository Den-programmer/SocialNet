import React from 'react'
import classes from './profile.module.css'
import User from './User/user'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { profileType, postType } from '../../../BLL/reducer-profile'
import { userType } from '../../../types/FriendsType/friendsType'

export interface IProfile {
    profile: profileType
    posts: Array<postType>
    friends: Array<userType>
    updateStatus: (status: string) => void
}

const Profile: React.FC<IProfile> = (props) => {
    return(
        <div className={classes.profile}>
            <User updateStatus={props.updateStatus} profile={props.profile} posts={props.posts} friends={props.friends} biography={props.profile.aboutMe}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile