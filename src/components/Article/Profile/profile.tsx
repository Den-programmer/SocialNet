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
    getIsUserFollowed: (userId: number | null) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Profile: React.FC<IProfile> = (props) => {
    return(
        <div style={{ width: '100%' }}>
            <User contacts={props.profile.contacts} background={props.background} follow={props.follow} unfollow={props.unfollow} followed={props.followed} getIsUserFollowed={props.getIsUserFollowed} updateStatus={props.updateStatus} profile={props.profile} posts={props.posts} friends={props.friends} biography={props.profile.aboutMe}/>
            <ProfileNav />
            <Biography userName={props.profile.fullName} AboutMe={props.profile.aboutMe}/>
            <Contacts contacts={props.profile.contacts}/>
        </div>
    )
}

export default Profile