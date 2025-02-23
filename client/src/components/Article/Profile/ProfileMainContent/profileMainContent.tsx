import React from 'react'
import User from '../User/user'
import ProfileNav from '../ProfileNav/profileNavContainer'
import { postType, profileType } from '../../../../types/ProfileTypes/profileTypes'
import { userType } from '../../../../types/FriendsType/friendsType'
import EditAvatar from '../User/editPhoto/editPhotoContainer'

interface IProfileMainContent {
    followed: boolean
    posts: Array<postType>
    friends: Array<userType>
    background: string | undefined
    profile: profileType
    gender: string
    username: string
    authorizedUserId: string
    followThunk: (userId: string) => void
    unfollowThunk: (userId: string) => void
    getIsUserFollowed: (userId: string) => void
    updateStatusThunk: (status: string) => void
}

const ProfileMainContent:React.FC<IProfileMainContent> = (props) => {
    return (
        <div>
            <EditAvatar />
            <User followed={props.followed} 
            posts={props.posts} 
            friends={props.friends} 
            username={props.username}
            authorizedUserId={props.authorizedUserId}
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