import React from 'react';
import Avatar from './Avatar/avatar';
import UserInf from './UserInf/userInf';
import classes from './user.module.css';

const User = (props) => {
    return (
        <div className={classes.user}>
           <Avatar />
           <UserInf name="LightL2" birthDate="27/01/2005" city="Kharkiv"/>
        </div>
    );
} 


export default User;