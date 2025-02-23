import React, { useEffect } from 'react'
import User from './User/user'
import { profileType, postType } from '../../../types/ProfileTypes/profileTypes'
import { userType } from '../../../types/FriendsType/friendsType'
import ProfileNav from './ProfileNav/profileNavContainer'
import Biography from './User/biography/biography'
import Contacts from './User/Contacts/contacts'
import EditPhoto from './User/editPhoto/editPhotoContainer'
import { requireUsersPosts } from '../../../BLL/reducer-profile'

export interface IProfile {
    followed: boolean
    profile: profileType
    username: string
    authorizedUserId: string
    posts: Array<postType>
    friends: Array<userType>
    background: string | undefined
    gender: string
    updateStatus: (status: string) => void
    getIsUserFollowed: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

interface Significance {
    requireUsersPosts: (userId: string) => void
}

const Profile: React.FC<IProfile & Significance> = (props) => {
    useEffect(() => {
        requireUsersPosts(props.authorizedUserId)
    }, [])
    return(
        <div style={{ width: '100%' }}>
            <EditPhoto />
            <User followed={props.followed} 
            posts={props.posts} 
            friends={props.friends} 
            username={props.username}
            background={props.background} 
            gender={props.gender}
            updateStatus={props.updateStatus}
            follow={props.follow}
            unfollow={props.unfollow}
            getIsUserFollowed={props.getIsUserFollowed} 
            contacts={props.profile.contacts} 
            profile={props.profile}
            authorizedUserId={props.authorizedUserId}/>
            <ProfileNav />
            <Biography gender={props.gender} userName={props.username} AboutMe={props.profile.aboutMe}/>
            <Contacts contacts={props.profile.contacts}/>
        </div>
    )
}

export default Profile