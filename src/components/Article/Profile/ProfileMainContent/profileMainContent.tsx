import React from 'react'
import User from '../User/user'
import ProfileNav from '../ProfileNav/profileNavContainer'
import { postType, profileType } from '../../../../BLL/reducer-profile'
import { userType } from '../../../../types/FriendsType/friendsType'

interface IProfileMainContent {
    followed: boolean
    posts: Array<postType>
    friends: Array<userType>
    background: string
    profile: profileType
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    getIsUserFollowed: (userId: number) => void
    updateStatusThunk: (status: string) => void
}

const ProfileMainContent:React.FC<IProfileMainContent> = (props) => {
    return (
        <div>
            <User followed={props.followed} 
            posts={props.posts} 
            friends={props.friends} 
            background={props.background} 
            updateStatus={props.updateStatusThunk}
            follow={props.followThunk}
            unfollow={props.unfollowThunk}
            getIsUserFollowed={props.getIsUserFollowed} 
            contacts={props.profile.contacts} 
            biography={props.profile.aboutMe} 
            profile={props.profile}/>
            <ProfileNav />
        </div>
    )
}

export default ProfileMainContent