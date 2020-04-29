import React from 'react';
import Avatar from './Avatar/avatar';
import UserInf from './UserInf/userInf';
import classes from './user.module.css';
import defaultAvatar from '../../Profile/images/withoutAvatar/defaultUserPhoto.jpg';

const User = (props) => {
    return (
        <div className={classes.user}>
           <Avatar avatar={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}/>
           <UserInf name={props.profile.fullName} 
           birthDate="props.profile.aboutMe.birthDate"
           city="props.profile.location.city"
           href={props.profile.contacts.instagram ? props.profile.aboutMe.instagram : ""}/>
           
           {/* <UserInf name="LightL2" birthDate="27/01/2005" city="Kharkiv"/> */}
        </div>
    );
} 


export default User;