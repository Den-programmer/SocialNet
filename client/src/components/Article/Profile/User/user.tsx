import React from 'react'
import Avatar from './Avatar/avatar'
import FollowingInformation from './followingInformation/followingInformation'
import { IProfile } from '../profile'
import { contactsType } from '../../../../types/ProfileTypes/profileTypes'
import { useMediaQuery } from '@material-ui/core'
import classes from './user.module.scss'

interface IUser extends IProfile {
    contacts: contactsType
}

const defaultAvatar = process.env.REACT_APP_CLOUDINARY_DEFAULT_USER

const User: React.FC<IUser> = (props) => {
    const isMobile = useMediaQuery('(max-width: 800px)')
    const backgroundMobile: React.CSSProperties = {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: "url(" + props.background + ")"
    }
    const background: React.CSSProperties = {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundImage: "url(" + props.background + ")",
    }
    
    return (
        <div className={classes.user} style={isMobile ? backgroundMobile : background}>
            <Avatar contacts={props.contacts} avatar={props.profile.photos.large ? props.profile.photos.large : defaultAvatar} name={props.username} />
            <FollowingInformation 
            getIsUserFollowed={props.getIsUserFollowed} 
            follow={props.follow} unfollow={props.unfollow} 
            followed={props.followed} userId={props.profile.userId} 
            authorizedUserId={props.authorizedUserId} posts={props.posts} 
            friends={props.friends} />
        </div>
    )
}


export default User