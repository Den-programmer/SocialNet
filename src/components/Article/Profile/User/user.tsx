import React from 'react'
import Avatar from './Avatar/avatar'
import defaultAvatar from '../../Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import FollowingInformation from './followingInformation/followingInformation'
import { IProfile } from '../profile'
import { contactsType } from '../../../../BLL/reducer-profile'

interface IUser extends IProfile {
    contacts: contactsType
}

const User: React.FC<IUser> = (props) => {
    const background = { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundImage: "url(" + props.background + ")", 
        width: '100%',
        height: '370px', 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover' 
    }
    return (
        <div style={background}>
            <Avatar contacts={props.contacts} avatar={props.profile.photos.large ? props.profile.photos.large : defaultAvatar} name={props.profile.fullName} />
            <FollowingInformation getIsUserFollowed={props.getIsUserFollowed} follow={props.follow} unfollow={props.unfollow} followed={props.followed} userId={props.profile.userId} posts={props.posts} friends={props.friends} />
        </div>
    )
}


export default User