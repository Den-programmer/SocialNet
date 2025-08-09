import React from 'react'
import { profileType } from '../../../types/ProfileTypes/profileTypes'
import { userType } from '../../../types/FriendsType/friendsType'
import Biography from './User/biography/biography'
import Contacts from './User/Contacts/contacts'
import ProfileMainContent from './ProfileMainContent/profileMainContent'

export interface IProfile {
    profile: profileType | undefined
    username: string | undefined
    authorizedUserId: string
    friends: Array<userType>
    background: string | undefined
    gender: string | undefined
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

const Profile: React.FC<IProfile> = (props) => {
    return(
        <div style={{ width: '100%' }}>
            <ProfileMainContent />
            <Biography gender={props.gender} userName={props.username} AboutMe={props.profile?.aboutMe}/>
            <Contacts contacts={props.profile?.contacts}/>
        </div>
    )
}

export default Profile