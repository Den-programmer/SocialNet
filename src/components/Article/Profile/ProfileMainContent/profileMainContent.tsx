import React from 'react'
import User from '../User/user'
import ProfileNav from '../ProfileNav/profileNavContainer'
import { postType, profileType } from '../../../../BLL/reducer-profile'
import { userType } from '../../../../types/FriendsType/friendsType'
import EditAvatar from '../User/editPhoto/editPhotoContainer'

interface IProfileMainContent {
    followed: boolean
    posts: Array<postType>
    friends: Array<userType>
    background: string
    profile: profileType
    gender: string
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    getIsUserFollowed: (userId: number) => void
    updateStatusThunk: (status: string) => void
}

const ProfileMainContent:React.FC<IProfileMainContent> = (props) => {
    return (
        <div>
            <EditAvatar />
            <User followed={props.followed} 
            posts={props.posts} 
            friends={props.friends} 
            background={props.background} 
            updateStatus={props.updateStatusThunk}
            follow={props.followThunk}
            unfollow={props.unfollowThunk}
            gender={props.gender}
            getIsUserFollowed={props.getIsUserFollowed} 
            contacts={props.profile.contacts} 
            profile={props.profile}/>
            <ProfileNav />
        </div>
    )
}

export default ProfileMainContent