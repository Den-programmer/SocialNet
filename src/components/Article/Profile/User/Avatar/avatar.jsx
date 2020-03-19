import React from 'react';
import classes from './avatar.module.css';
import avatar from './img/avatar.jpg';

const Avatar = () => {
    return (
        <div className={classes.avatar}>
            <img src={avatar} alt="avatar" />
        </div>
    );
}

export default Avatar;