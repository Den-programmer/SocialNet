import React from 'react'
import User from '../User/user'
import ProfileNav from '../ProfileNav/profileNav'
import EditAvatar from '../User/editPhoto/editPhoto'
import { useAppSelector } from '../../../../hooks/hooks'
import { selectGender, selectUserBackground, selectUsersName, selectUsersProfile } from '../../../../BLL/selectors/profile-selectors'
import { selectFriends } from '../../../../BLL/selectors/users-selectors'
import { selectAuthorizedUserId } from '../../../../BLL/selectors/auth-selectors'
import { useFollowUserMutation, useUnfollowUserMutation } from '../../../../DAL/usersApi'

const ProfileMainContent:React.FC = () => {
    const profile = useAppSelector(selectUsersProfile)

    const background = useAppSelector(selectUserBackground)
    const gender = useAppSelector(selectGender)
    const username = useAppSelector(selectUsersName)
    const authorizedUserId = useAppSelector(selectAuthorizedUserId)


    const friends = useAppSelector(selectFriends)
    const [follow] = useFollowUserMutation()  
    const [unfollow] = useUnfollowUserMutation()
    return (
        <div>
            <EditAvatar />
            <User
            friends={friends} 
            username={username}
            authorizedUserId={authorizedUserId}
            background={background} 
            follow={follow}
            unfollow={unfollow}
            gender={gender}
            contacts={profile.contacts} 
            profile={profile}/>
            <ProfileNav />
        </div>
    )
}

export default ProfileMainContent