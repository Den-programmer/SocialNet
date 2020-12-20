import React from 'react'
import User from './User/user'
import { profileType, postType } from '../../../BLL/reducer-profile'
import { userType } from '../../../types/FriendsType/friendsType'
import ProfileNav from './ProfileNav/profileNavContainer'
import Biography from './User/biography/biography'
import Contacts from './User/Contacts/contacts'

export interface IProfile {
    followed: boolean
    profile: profileType
    posts: Array<postType>
    friends: Array<userType>
    background: string
    updateStatus: (status: string) => void
    getIsUserFollowed: (userId: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Profile: React.FC<IProfile> = (props) => {
    return(
        <div style={{ width: '100%' }}>
            <User followed={props.followed} 
            posts={props.posts} 
            friends={props.friends} 
            background={props.background} 
            updateStatus={props.updateStatus}
            follow={props.follow}
            unfollow={props.unfollow}
            getIsUserFollowed={props.getIsUserFollowed} 
            contacts={props.profile.contacts} 
            biography={props.profile.aboutMe} 
            profile={props.profile}/>
            <ProfileNav />
            <Biography userName={props.profile.fullName} AboutMe={props.profile.aboutMe}/>
            <Contacts contacts={props.profile.contacts}/>
        </div>
    )
}

export default Profile