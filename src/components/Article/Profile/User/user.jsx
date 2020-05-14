import React from 'react';
import Avatar from './Avatar/avatar';
import Contacts from './Contacts/contacts';
import classes from './user.module.css';
import defaultAvatar from '../../Profile/images/withoutAvatar/defaultUserPhoto.jpg';
import FollowingInformation from './followingInformation/followingInformation';
import Biography from './biography/biography';
import Status from './Status/status';

const User = (props) => {
    return (
        <div className={classes.user}>
            <div className={classes.row}>
                <Avatar avatar={props.profile.photos.large ? props.profile.photos.large : defaultAvatar} name={props.profile.fullName}/>
                <FollowingInformation posts={props.posts} friends={props.friends}/>
                <Status updateStatus={props.updateStatus} status={props.profile.status}/>
                {/* <Biography biography={props.biography}/> */}
            </div>
            <div>
                <Contacts contacts={props.profile.contacts}/>
            </div>
        </div>
    );
} 


export default User;